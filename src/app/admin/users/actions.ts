'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function updateUserRole(userId: string, role: string) {
    const supabase = createAdminClient()
    const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId)

    if (error) throw error

    // Audit log
    await supabase.from('audit_log').insert({
        user_id: userId,
        action: 'role_update',
        resource_type: 'profile',
        resource_id: userId,
        details: { new_role: role },
        purpose: 'Administrative action'
    })

    revalidatePath('/admin/users')
    return { success: true }
}

export async function updateUserStatus(userId: string, is_active: boolean) {
    const supabase = createAdminClient()
    const { error } = await supabase
        .from('profiles')
        .update({ is_active })
        .eq('id', userId)

    if (error) throw error

    await supabase.from('audit_log').insert({
        user_id: userId,
        action: 'status_update',
        resource_type: 'profile',
        resource_id: userId,
        details: { is_active },
        purpose: 'Administrative action'
    })

    revalidatePath('/admin/users')
    return { success: true }
}

export async function deleteUser(userId: string) {
    const supabase = createAdminClient()

    // Audit log before deletion as user_id link might break
    await supabase.from('audit_log').insert({
        user_id: userId,
        action: 'user_deletion',
        resource_type: 'user',
        resource_id: userId,
        purpose: 'Administrative action'
    })

    const { error: authError } = await supabase.auth.admin.deleteUser(userId)
    if (authError) throw authError

    const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)

    if (profileError) console.error('Error deleting profile:', profileError)

    revalidatePath('/admin/users')
    return { success: true }
}

export async function forceLogout(userId: string) {
    const supabase = createAdminClient()
    const { error } = await supabase.auth.admin.signOut(userId)

    if (error) throw error

    await supabase.from('audit_log').insert({
        user_id: userId,
        action: 'force_logout',
        resource_type: 'session',
        resource_id: userId,
        purpose: 'Security action'
    })

    return { success: true }
}

export async function reassignUser(userId: string, assignment: { awc_id?: string | null, mandal_id?: string | null, district_id?: string | null }) {
    const supabase = createAdminClient()
    const { error } = await supabase
        .from('profiles')
        .update(assignment)
        .eq('id', userId)

    if (error) throw error

    await supabase.from('audit_log').insert({
        user_id: userId,
        action: 'reassignment',
        resource_type: 'assignment',
        resource_id: userId,
        details: assignment,
        purpose: 'Administrative action'
    })

    revalidatePath('/admin/users')
    return { success: true }
}

export async function updateProfile(userId: string, data: { name?: string, phone?: string, email?: string }) {
    const supabase = createAdminClient()

    const { error: profileError } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', userId)

    if (profileError) throw profileError

    if (data.email) {
        const { error: authError } = await supabase.auth.admin.updateUserById(userId, { email: data.email, user_metadata: { name: data.name } })
        if (authError) console.warn('Auth update warning:', authError)
    }

    await supabase.from('audit_log').insert({
        user_id: userId,
        action: 'profile_update',
        resource_type: 'profile',
        resource_id: userId,
        details: data,
        purpose: 'Administrative action'
    })

    revalidatePath('/admin/users')
    return { success: true }
}
