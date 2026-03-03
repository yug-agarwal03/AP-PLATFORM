'use server'

import { createClient } from '@/lib/supabase/server'
import { UserRole } from '@/lib/types/database'

export interface DashboardStats {
    totalChildren: number
    screenedChildren: number
    coverage: number
    openFlags: number
    pendingReferrals: number
    delta: {
        children: string
        screened: string
        coverage: string
        flags: string
        referrals: string
    }
}

export interface RiskDistribution {
    name: string
    value: number
    color: string
}

export interface MandalCoverage {
    name: string
    count: number
    coverage: number
}

const RISK_COLORS = {
    low: '#22C55E',
    medium: '#F59E0B',
    high: '#F97316',
    critical: '#EF4444'
}

export async function getCdpoDashboardData() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    // Get CDPO profile to know their mandal_id or district_id context
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile) throw new Error('Profile not found')

    // CDPO typically manages a Project/Mandal or is assigned to a region.
    // Based on the schema, profiles have mandal_id.
    const mandalId = profile.mandal_id

    // Let's get list of AWC IDs for this mandal
    const { data: awcs } = await supabase
        .from('awcs')
        .select('id')
        .eq('mandal_id', mandalId)

    const awcIds = awcs?.map(a => a.id) || []

    if (awcIds.length === 0) {
        return {
            stats: {
                totalChildren: 0,
                screenedChildren: 0,
                coverage: 0,
                openFlags: 0,
                pendingReferrals: 0,
                delta: { children: '0', screened: '0', coverage: '0', flags: '0', referrals: '0' }
            },
            riskDistribution: [],
            mandalCoverage: []
        }
    }

    // 2. Stats
    const { count: childrenCount } = await supabase
        .from('children')
        .select('*', { count: 'exact', head: true })
        .in('awc_id', awcIds)
        .eq('is_active', true)

    const { count: screenedCount } = await supabase
        .from('children')
        .select('*', { count: 'exact', head: true })
        .in('awc_id', awcIds)
        .not('last_screening_date', 'is', null)

    const childResponse = await supabase.from('children').select('id').in('awc_id', awcIds)
    const childIds = childResponse.data?.map(c => c.id) || []

    const { count: flagsCount } = await supabase
        .from('flags')
        .select('*', { count: 'exact', head: true })
        .in('status', ['raised', 'acknowledged', 'in_progress'])
        .in('child_id', childIds)

    const { count: referralsCount } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .in('status', ['created', 'informed', 'scheduled'])
        .in('child_id', childIds)

    const coverage = childrenCount ? Math.round((screenedCount || 0) / childrenCount * 100) : 0

    // 3. Risk Distribution
    const { data: riskData } = await supabase
        .from('children')
        .select('current_risk_level')
        .in('awc_id', awcIds)
        .not('current_risk_level', 'is', null)

    const risks = (riskData || []).reduce((acc: any, curr) => {
        const level = curr.current_risk_level || 'low'
        acc[level] = (acc[level] || 0) + 1
        return acc
    }, {})

    const riskDistribution = [
        { name: 'Low', value: risks.low || 0, color: RISK_COLORS.low },
        { name: 'Medium', value: risks.medium || 0, color: RISK_COLORS.medium },
        { name: 'High', value: risks.high || 0, color: RISK_COLORS.high },
        { name: 'Critical', value: risks.critical || 0, color: RISK_COLORS.critical },
    ]

    // 4. Mandal Comparison (Screening coverage by Mandal)
    // For CDPO, we usually show mandals within their district if they manage a district, 
    // or AWCs within their mandal. Given "CDPO" usually manages a Project (Mandal), 
    // let's show AWC coverage as "Mandals" in the heatmap for now, or fetch actual Mandals if District ID is present.

    let mandalCoverage: MandalCoverage[] = []
    if (profile.district_id) {
        const { data: districtMandals } = await supabase
            .from('mandals')
            .select('id, name')
            .eq('district_id', profile.district_id)

        if (districtMandals) {
            for (const m of districtMandals) {
                const { data: mAwcs } = await supabase.from('awcs').select('id').eq('mandal_id', m.id)
                const mAwcIds = mAwcs?.map(a => a.id) || []

                if (mAwcIds.length > 0) {
                    const { count: mTotal } = await supabase.from('children').select('*', { count: 'exact', head: true }).in('awc_id', mAwcIds).eq('is_active', true)
                    const { count: mScreened } = await supabase.from('children').select('*', { count: 'exact', head: true }).in('awc_id', mAwcIds).not('last_screening_date', 'is', null)

                    mandalCoverage.push({
                        name: m.name,
                        count: mTotal || 0,
                        coverage: mTotal ? Math.round((mScreened || 0) / mTotal * 100) : 0
                    })
                }
            }
        }
    }

    // 5. Delta calculation (Historical comparison)
    // Since we don't have a snapshots table yet, we'll calculate based on created_at for this month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count: newChildren } = await supabase
        .from('children')
        .select('*', { count: 'exact', head: true })
        .in('awc_id', awcIds)
        .gte('registered_at', startOfMonth.toISOString())

    const { count: newScreened } = await supabase
        .from('children')
        .select('*', { count: 'exact', head: true })
        .in('awc_id', awcIds)
        .gte('last_screening_date', startOfMonth.toISOString())

    // 6. Project context info
    const { data: mandal } = await supabase
        .from('mandals')
        .select('name')
        .eq('id', mandalId)
        .single()

    return {
        projectInfo: {
            name: mandal?.name || 'Unknown Project',
            mandalCount: mandalCoverage.length || 1,
            awcCount: awcIds.length
        },
        stats: {
            totalChildren: childrenCount || 0,
            screenedChildren: screenedCount || 0,
            coverage,
            openFlags: flagsCount || 0,
            pendingReferrals: referralsCount || 0,
            delta: {
                children: `+${newChildren || 0} this month`,
                screened: `+${newScreened || 0}`,
                coverage: '+0%', // Trends require more complex time-series data
                flags: '-0',
                referrals: '+0'
            }
        },
        riskDistribution,
        mandalCoverage
    }
}

export async function getChildrenRegistry(page: number = 1, pageSize: number = 10, search?: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('mandal_id')
        .eq('id', user.id)
        .single()

    if (!profile?.mandal_id) throw new Error('Mandal assignment not found')

    const { data: awcs } = await supabase
        .from('awcs')
        .select('id, name')
        .eq('mandal_id', profile.mandal_id)

    const awcIds = awcs?.map(a => a.id) || []
    const awcMap = (awcs || []).reduce((acc: any, curr) => {
        acc[curr.id] = curr.name
        return acc
    }, {})

    let query = supabase
        .from('children')
        .select(`
            *,
            awcs (name)
        `, { count: 'exact' })
        .in('awc_id', awcIds)
        .eq('is_active', true)
        .order('registered_at', { ascending: false })

    if (search) {
        query = query.or(`name.ilike.%${search}%,id.ilike.%${search}%`)
    }

    const { data: children, count, error } = await query
        .range((page - 1) * pageSize, page * pageSize - 1)

    if (error) throw error

    // Transform children data for the UI
    const transformedChildren = (children || []).map(child => {
        const dob = new Date(child.dob)
        const today = new Date()
        const ageInMonths = (today.getFullYear() - dob.getFullYear()) * 12 + (today.getMonth() - dob.getMonth())
        const years = Math.floor(ageInMonths / 12)
        const months = ageInMonths % 12
        const ageDisplay = years > 0 ? `${years}y ${months}m` : `${months}m`

        return {
            id: child.id,
            name: child.name,
            age: ageDisplay,
            gender: child.gender === 'male' ? 'Male' : 'Female',
            mandal: 'Current Project', // Since we filtered by CDPO's mandal
            awc: (child as any).awcs?.name || 'Unknown',
            risk: (child.current_risk_level || 'LOW').toUpperCase(),
            lastActivity: child.last_screening_date ? new Date(child.last_screening_date).toLocaleDateString() : 'Never',
            healthScore: 75, // Placeholder, usually would come from last assessment
            growth: 'Standard' // Placeholder
        }
    })

    return {
        children: transformedChildren,
        total: count || 0,
        page,
        pageSize
    }
}

export async function getMandalComparisonData() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('district_id')
        .eq('id', user.id)
        .single()

    if (!profile?.district_id) throw new Error('District context not found')

    const { data: mandals } = await supabase
        .from('mandals')
        .select('id, name')
        .eq('district_id', profile.district_id)

    if (!mandals) return []

    const comparisonData = []

    for (const mandal of mandals) {
        const { data: awcs } = await supabase
            .from('awcs')
            .select('id')
            .eq('mandal_id', mandal.id)

        const awcIds = awcs?.map(a => a.id) || []

        if (awcIds.length === 0) continue

        const { count: childrenCount } = await supabase
            .from('children')
            .select('*', { count: 'exact', head: true })
            .in('awc_id', awcIds)
            .eq('is_active', true)

        const { count: screenedCount } = await supabase
            .from('children')
            .select('*', { count: 'exact', head: true })
            .in('awc_id', awcIds)
            .not('last_screening_date', 'is', null)

        const { count: criticalChildren } = await supabase
            .from('children')
            .select('*', { count: 'exact', head: true })
            .in('awc_id', awcIds)
            .eq('current_risk_level', 'critical')

        comparisonData.push({
            id: mandal.id,
            name: mandal.name,
            awcs: awcIds.length,
            children: childrenCount || 0,
            coverage: childrenCount ? Math.round((screenedCount || 0) / childrenCount * 100) : 0,
            crit: criticalChildren || 0,
            score: (7 + Math.random() * 2).toFixed(1) // Dynamic mock for visual score
        })
    }

    return comparisonData
}

export async function getScreeningMatrixData() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('mandal_id')
        .eq('id', user.id)
        .single()

    if (!profile?.mandal_id) throw new Error('Mandal assignment not found')

    const { data: awcs } = await supabase
        .from('awcs')
        .select('id')
        .eq('mandal_id', profile.mandal_id)

    const awcIds = awcs?.map(a => a.id) || []

    // 1. Coverage Trend (Last 6 months)
    const coverageTrend = []
    for (let i = 5; i >= 0; i--) {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        const monthLabel = date.toLocaleString('default', { month: 'short' })
        const start = new Date(date.getFullYear(), date.getMonth(), 1).toISOString()
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).toISOString()

        const { count: screenedCount } = await supabase
            .from('children')
            .select('*', { count: 'exact', head: true })
            .in('awc_id', awcIds)
            .lte('last_screening_date', end)

        const { count: totalCount } = await supabase
            .from('children')
            .select('*', { count: 'exact', head: true })
            .in('awc_id', awcIds)
            .lte('registered_at', end)

        coverageTrend.push({
            month: monthLabel,
            coverage: totalCount ? Math.round(((screenedCount || 0) / totalCount) * 100) : 0
        })
    }

    // 2. Risk Distribution (Re-using logic but returning specifically for matrix)
    const { data: riskData } = await supabase
        .from('children')
        .select('current_risk_level')
        .in('awc_id', awcIds)
        .not('current_risk_level', 'is', null)

    const risks = (riskData || []).reduce((acc: any, curr) => {
        const level = (curr.current_risk_level || 'low').toLowerCase()
        acc[level] = (acc[level] || 0) + 1
        return acc
    }, {})

    const riskDistribution = [
        { name: 'Low', value: risks.low || 0, color: '#000000' },
        { name: 'Medium', value: risks.medium || 0, color: '#444444' },
        { name: 'High', value: risks.high || 0, color: '#888888' },
        { name: 'Critical', value: risks.critical || 0, color: '#CCCCCC' },
    ]

    // 3. Demographic Breakdown (Age Groups)
    const { data: childrenData } = await supabase
        .from('children')
        .select('dob, last_screening_date')
        .in('awc_id', awcIds)

    const today = new Date()
    const ageGroups = [
        { group: '0-1y', screened: 0, total: 0 },
        { group: '1-3y', screened: 0, total: 0 },
        { group: '3-6y', screened: 0, total: 0 },
    ]

    for (const child of childrenData || []) {
        const dob = new Date(child.dob)
        const ageInMonths = (today.getFullYear() - dob.getFullYear()) * 12 + (today.getMonth() - dob.getMonth())
        const isScreened = child.last_screening_date !== null

        let groupIdx = -1
        if (ageInMonths <= 12) groupIdx = 0
        else if (ageInMonths <= 36) groupIdx = 1
        else if (ageInMonths <= 72) groupIdx = 2

        if (groupIdx !== -1) {
            ageGroups[groupIdx].total++
            if (isScreened) ageGroups[groupIdx].screened++
        }
    }

    // 4. KPIs
    const totalChildren = childrenData?.length || 0
    const totalScreened = childrenData?.filter(c => c.last_screening_date).length || 0
    const coverageRate = totalChildren ? ((totalScreened / totalChildren) * 100).toFixed(1) : '0.0'
    const highRiskCount = (risks.high || 0) + (risks.critical || 0)

    const kpis = [
        { label: 'TOTAL SCREENED', value: totalScreened.toLocaleString(), delta: '+0', isUp: true, color: 'black' },
        { label: 'COVERAGE RATE', value: `${coverageRate}%`, delta: '+0%', isUp: true, color: 'black' },
        { label: 'HIGH RISK (PH-2)', value: highRiskCount.toLocaleString(), delta: '-0', isUp: false, color: 'red-500' },
        { label: 'SYNC LATENCY', value: '1.2h', delta: '-0h', isUp: false, color: 'black' },
    ]

    return {
        coverageTrend,
        riskDistribution,
        ageGroups,
        kpis,
        totalScreened
    }
}

export async function getAwwPerformanceData() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    const { data: profile } = await supabase
        .from('profiles')
        .select('mandal_id')
        .eq('id', user.id)
        .single()

    if (!profile?.mandal_id) throw new Error('Mandal assignment not found')

    const { data: awws } = await supabase
        .from('profiles')
        .select('id, name, last_login_at')
        .eq('role', 'aww')
        .eq('mandal_id', profile.mandal_id)

    if (!awws) return { performances: [], highlights: [] }

    const performances = []
    let totalCoverageSum = 0
    let topPerformersCount = 0
    let belowTargetCount = 0

    for (const aww of awws) {
        // Try to find the AWC they usually work in by looking at children they registered
        const { data: registeredChildren } = await supabase
            .from('children')
            .select('awc_id, awcs(name)')
            .eq('registered_by', aww.id)
            .limit(1)

        const awcInfo = registeredChildren?.[0]
        const awcId = awcInfo?.awc_id
        const awcName = (awcInfo as any)?.awcs?.name || 'Unknown AWC'

        if (awcId) {
            const { count: totalInAwc } = await supabase.from('children').select('*', { count: 'exact', head: true }).eq('awc_id', awcId).eq('is_active', true)
            const { count: screenedInAwc } = await supabase.from('children').select('*', { count: 'exact', head: true }).eq('awc_id', awcId).not('last_screening_date', 'is', null)

            // Get flag count for children in this AWC
            const { data: childrenInAwc } = await supabase.from('children').select('id').eq('awc_id', awcId)
            const childIds = childrenInAwc?.map(c => c.id) || []

            let openFlags = 0
            if (childIds.length > 0) {
                const { count } = await supabase.from('flags').select('*', { count: 'exact', head: true }).in('child_id', childIds).in('status', ['raised', 'acknowledged', 'in_progress'])
                openFlags = count || 0
            }

            const coverage = totalInAwc ? Math.round(((screenedInAwc || 0) / totalInAwc) * 100) : 0
            const score = Math.min(100, Math.round((coverage * 0.7) + (100 - (openFlags * 5)) * 0.3))

            const lastActiveDate = aww.last_login_at ? new Date(aww.last_login_at) : null
            const now = new Date()
            const diffMin = lastActiveDate ? Math.floor((now.getTime() - lastActiveDate.getTime()) / 60000) : null
            const lastActiveStr = diffMin === null ? 'Never' : diffMin < 60 ? `${diffMin}m ago` : diffMin < 1440 ? `${Math.floor(diffMin / 60)}h ago` : `${Math.floor(diffMin / 1440)}d ago`

            const status = score >= 90 ? 'Top Performer' : score >= 70 ? 'Compliant' : 'Under Review'

            performances.push({
                id: `AWW-${aww.id.substring(0, 4)}`,
                name: aww.name,
                mandal: awcName,
                role: 'Anganwadi Worker',
                coverage,
                score,
                flags: openFlags,
                status,
                lastActive: lastActiveStr
            })

            totalCoverageSum += coverage
            if (score >= 90) topPerformersCount++
            if (coverage < 60) belowTargetCount++
        } else {
            performances.push({
                id: `AWW-${aww.id.substring(0, 4)}`,
                name: aww.name,
                mandal: 'No AWC Assigned',
                role: 'Anganwadi Worker',
                coverage: 0,
                score: 0,
                flags: 0,
                status: 'Under Review',
                lastActive: 'Never'
            })
            belowTargetCount++
        }
    }

    const avgCoverage = performances.length ? Math.round(totalCoverageSum / performances.length) : 0

    const highlights = [
        { label: 'AVG COVERAGE', value: `${avgCoverage}%`, color: 'black' },
        { label: 'TOP PERFORMERS', value: topPerformersCount.toString(), color: 'green' },
        { label: 'BELOW TARGET', value: belowTargetCount.toString(), color: 'red' },
        { label: 'RESPONSE TIME', value: '1.2d', color: 'black' },
    ]

    return { performances, highlights }
}
