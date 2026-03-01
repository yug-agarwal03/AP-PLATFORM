import { createAdminClient } from '@/lib/supabase/admin'
import { UserTable } from '@/components/admin/UserTable'

export default async function UsersPage() {
    const supabase = createAdminClient()

    const [{ data: users }, { data: authData }] = await Promise.all([
        supabase
            .from('profiles')
            .select(`
      *,
      awcs(name),
      mandals(name),
      districts(name)
    `)
            .order('created_at', { ascending: false }),
        supabase.auth.admin.listUsers(),
    ])

    // Build a map of auth user emails and last login by ID
    const authUserMap = new Map<string, { email?: string, last_login?: string }>()
    if (authData?.users) {
        for (const au of authData.users) {
            authUserMap.set(au.id, {
                email: au.email,
                last_login: au.last_sign_in_at
            })
        }
    }

    // Merge auth data into profiles
    const enrichedUsers = users?.map((u) => {
        const auth = authUserMap.get(u.id)
        return {
            ...u,
            email: u.email || auth?.email || null,
            last_active: auth?.last_login || null
        }
    }) || []

    return <UserTable users={enrichedUsers} />
}

