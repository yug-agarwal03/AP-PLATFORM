'use server'

import { createAdminClient } from '@/lib/supabase/admin'

export async function getAssignmentHierarchy() {
    const supabase = createAdminClient()

    // 1. Fetch all geographic data
    const [
        { data: districts },
        { data: mandals },
        { data: sectors },
        { data: awcs },
        { data: profiles }
    ] = await Promise.all([
        supabase.from('districts').select('id, name, code').order('name'),
        supabase.from('mandals').select('id, name, code, district_id').order('name'),
        supabase.from('sectors').select('id, name, code, mandal_id').order('name'),
        supabase.from('awcs').select('id, name, code, sector_id, mandal_id').order('name'),
        supabase.from('profiles').select('id, name, role, awc_id, mandal_id, district_id, state_id, is_active').eq('is_active', true)
    ])

    if (!districts) return null

    // Helper maps
    const profileMap = {
        commissioner: (profiles || []).filter(p => p.role === 'commissioner'),
        district: (profiles || []).filter(p => p.role === 'district_officer'),
        cdpo: (profiles || []).filter(p => p.role === 'cdpo'),
        supervisor: (profiles || []).filter(p => p.role === 'supervisor'),
        aww: (profiles || []).filter(p => p.role === 'aww')
    }

    // Build the tree
    const root: any = {
        id: 'state-root',
        name: profileMap.commissioner[0]?.name || 'VACANT',
        title: 'Andhra Pradesh',
        role: 'COMMISSIONER',
        type: 'STATE',
        status: profileMap.commissioner[0] ? 'ASSIGNED' : 'VACANT',
        childrenCount: districts.length,
        children: districts.map(d => {
            const districtUser = profileMap.district.find(p => p.district_id === d.id)
            const dMandals = (mandals || []).filter(m => m.district_id === d.id)

            return {
                id: d.id,
                name: districtUser?.name || 'VACANT',
                title: `${d.name} District`,
                role: 'DISTRICT_OFFICER',
                type: 'DISTRICT',
                status: districtUser ? 'ASSIGNED' : 'VACANT',
                childrenCount: dMandals.length,
                children: dMandals.map(m => {
                    const cdpoUser = profileMap.cdpo.find(p => p.mandal_id === m.id)
                    const mSectors = (sectors || []).filter(s => s.mandal_id === m.id)

                    return {
                        id: m.id,
                        name: cdpoUser?.name || 'VACANT',
                        title: `${m.name} Project`,
                        role: 'CDPO',
                        type: 'CDPO',
                        status: cdpoUser ? 'ASSIGNED' : 'VACANT',
                        childrenCount: mSectors.length,
                        children: mSectors.map(s => {
                            // Since supervisor doesn't have sector_id in profile, check by name/code or assume supervisor at mandal?
                            // Actually, let's look for supervisor role assigned to mandal if sector_id is missing
                            const supervisorUser = profileMap.supervisor.find(p => p.mandal_id === m.id)
                            const sAwcs = (awcs || []).filter(awc => awc.sector_id === s.id)

                            return {
                                id: s.id,
                                name: supervisorUser?.name || 'VACANT',
                                title: `${s.name} Sector`,
                                role: 'SUPERVISOR',
                                type: 'MANDAL', // Using MANDAL type as per mock for Sector/Supervisor level
                                status: supervisorUser ? 'ASSIGNED' : 'VACANT',
                                childrenCount: sAwcs.length,
                                children: sAwcs.map(awc => {
                                    const awwUser = profileMap.aww.find(p => p.awc_id === awc.id)
                                    return {
                                        id: awc.id,
                                        name: awwUser?.name || 'VACANT',
                                        title: awc.name,
                                        role: 'AWW',
                                        type: 'AWC',
                                        status: awwUser ? 'ASSIGNED' : 'VACANT',
                                        childrenCount: 0 // Placeholder
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    // Stats for sidebar
    const stats = {
        unassignedAWWs: (profiles || []).filter(p => p.role === 'aww' && !p.awc_id).length,
        unassignedSupervisors: (profiles || []).filter(p => p.role === 'supervisor' && !p.mandal_id).length,
        vacantAWCs: (awcs || []).filter(awc => !profileMap.aww.some(p => p.awc_id === awc.id)).length,
        vacantSectors: (sectors || []).filter(s => !profileMap.supervisor.some(p => p.mandal_id === s.mandal_id)).length
    }

    return { root, stats }
}
