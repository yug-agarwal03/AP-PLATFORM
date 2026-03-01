'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function getAwcs() {
    const supabase = createAdminClient()

    // Fetch AWCs with related master data
    const { data: awcs, error } = await supabase
        .from('awcs')
        .select(`
            *,
            panchayats(name),
            sectors(name),
            mandals(name, districts(name))
        `)
        .order('name')

    if (error) throw error

    // Fetch all AWWs (assigned to AWCs)
    const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, phone, awc_id')
        .eq('role', 'aww')

    // Fetch children counts per AWC
    const { data: childrenCounts } = await supabase
        .from('children')
        .select('awc_id')
        .eq('is_active', true)

    const countsMap: Record<string, number> = {}
    childrenCounts?.forEach(c => {
        countsMap[c.awc_id] = (countsMap[c.awc_id] || 0) + 1
    })

    const profileMap: Record<string, any> = {}
    profiles?.forEach(p => {
        if (p.awc_id) {
            profileMap[p.awc_id] = p
        }
    })

    return awcs.map(awc => ({
        id: awc.id,
        name: awc.name,
        code: awc.code,
        panchayat: awc.panchayats?.name || 'N/A',
        sector: awc.sectors?.name || 'N/A',
        mandal: awc.mandals?.name || 'N/A',
        district: awc.mandals?.districts?.name || 'N/A',
        awwName: profileMap[awc.id]?.name || null,
        awwPhone: profileMap[awc.id]?.phone || null,
        childrenActive: countsMap[awc.id] || 0,
        childrenTarget: awc.target_children || 40,
        status: awc.is_active ? 'ACTIVE' : 'INACTIVE',
        latitude: awc.latitude,
        longitude: awc.longitude
    }))
}

export async function createAWC(data: any) {
    const supabase = createAdminClient()

    const { data: awc, error } = await supabase
        .from('awcs')
        .insert({
            name: data.name,
            code: data.code,
            panchayat_id: data.panchayat_id || null,
            sector_id: data.sector_id,
            mandal_id: data.mandal_id,
            latitude: data.latitude,
            longitude: data.longitude,
            target_children: data.target_children || 40,
            is_active: true
        })
        .select()
        .single()

    if (error) throw error

    if (data.aww_id) {
        await supabase
            .from('profiles')
            .update({ awc_id: awc.id })
            .eq('id', data.aww_id)
    }

    revalidatePath('/admin/geography')
    revalidatePath('/admin/geography/awcs')
    return awc
}

export async function updateAWC(id: string, data: any) {
    const supabase = createAdminClient()

    const { error: awcError } = await supabase
        .from('awcs')
        .update({
            name: data.name,
            code: data.code,
            panchayat_id: data.panchayat_id || null,
            sector_id: data.sector_id,
            mandal_id: data.mandal_id,
            latitude: data.latitude,
            longitude: data.longitude,
            target_children: data.target_children,
            is_active: data.status === 'ACTIVE'
        })
        .eq('id', id)

    if (awcError) throw awcError

    // Handle AWW assignment change
    if (data.aww_id) {
        // First unassign current worker if any
        await supabase
            .from('profiles')
            .update({ awc_id: null })
            .eq('awc_id', id)

        // Then assign new worker
        await supabase
            .from('profiles')
            .update({ awc_id: id })
            .eq('id', data.aww_id)
    }

    revalidatePath('/admin/geography')
    revalidatePath('/admin/geography/awcs')
    return { success: true }
}

export async function getMasterData() {
    const supabase = createAdminClient()

    const [
        { data: districts },
        { data: mandals },
        { data: sectors },
        { data: panchayats },
        { data: unassignedWorkers }
    ] = await Promise.all([
        supabase.from('districts').select('id, name').order('name'),
        supabase.from('mandals').select('id, name, district_id').order('name'),
        supabase.from('sectors').select('id, name, mandal_id').order('name'),
        supabase.from('panchayats').select('id, name, sector_id').order('name'),
        supabase.from('profiles').select('id, name, role, mandal_id').eq('role', 'aww').is('awc_id', null)
    ])

    return {
        districts: districts || [],
        mandals: mandals || [],
        sectors: sectors || [],
        panchayats: panchayats || [],
        unassignedWorkers: unassignedWorkers || []
    }
}
