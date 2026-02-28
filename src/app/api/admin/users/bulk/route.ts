import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    try {
        const supabase = await createClient()

        // Debug: Log cookies to see if auth session is present
        const cookieStore = await cookies()
        console.log('API Route Cookies:', cookieStore.getAll().map((c: any) => c.name))

        // 1. Session check
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            console.log('Auth failed: No user found in session')
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 2. Role check (same as your layout)
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (!profile || (profile.role !== 'system_admin' && profile.role !== 'super_admin')) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const body = await req.json()
        const usersToCreate = body.users as any[]

        if (!usersToCreate || !Array.isArray(usersToCreate)) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
        }

        const adminClient = createAdminClient()
        const results = {
            success: 0,
            failed: 0,
            errors: [] as any[]
        }

        // Process in a loop
        for (const userData of usersToCreate) {
            try {
                const { email, password, name, role, phone, awc_id, mandal_id, district_id } = userData

                // Create Auth User
                const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
                    email,
                    password: password || Math.random().toString(36).slice(-10), // Default random password if none provided
                    email_confirm: true,
                    user_metadata: { name, role }
                })

                if (authError) {
                    results.failed++
                    results.errors.push({ email, error: authError.message })
                    continue
                }

                if (authData.user) {
                    // Create Profile
                    const { error: profileError } = await adminClient
                        .from('profiles')
                        .insert({
                            id: authData.user.id,
                            name,
                            email,
                            phone: phone || null,
                            role: role || 'aww',
                            awc_id: awc_id || null,
                            mandal_id: mandal_id || null,
                            district_id: district_id || null,
                            is_active: true
                        })

                    if (profileError) {
                        results.failed++
                        results.errors.push({ email, error: `Auth created but profile failed: ${profileError.message}` })
                    } else {
                        results.success++
                    }
                }
            } catch (err: any) {
                results.failed++
                results.errors.push({ email: userData.email, error: err.message })
            }
        }

        return NextResponse.json({ results })
    } catch (error: any) {
        console.error('Bulk upload error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
