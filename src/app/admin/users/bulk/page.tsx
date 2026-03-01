import BulkOps from '@/components/admin/BulkOps';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function BulkUsersPage() {
    const supabase = createAdminClient();

    const [
        { data: users },
        { data: authData },
        { data: districts }
    ] = await Promise.all([
        supabase
            .from('profiles')
            .select(`
                *,
                awcs(name),
                mandals(name),
                districts(name)
            `),
        supabase.auth.admin.listUsers(),
        supabase.from('districts').select('id, name').order('name')
    ]);

    const authUserMap = new Map();
    authData?.users.forEach(u => {
        authUserMap.set(u.id, { last_sign_in_at: u.last_sign_in_at });
    });

    const enrichedUsers = users?.map(u => ({
        ...u,
        last_active: authUserMap.get(u.id)?.last_sign_in_at || null
    })) || [];

    return <BulkOps users={enrichedUsers} districts={districts || []} />;
}
