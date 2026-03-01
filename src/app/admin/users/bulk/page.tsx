import React from 'react';
import BulkOps from '@/components/admin/BulkOps';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function BulkUsersPage() {
    const supabase = createAdminClient();

    const [
        { data: users },
        { data: authData },
        { data: states }
    ] = await Promise.all([
        supabase
            .from('profiles')
            .select(`
                *,
                awcs(name),
                panchayats(name),
                sectors(name),
                mandals(name),
                districts(name),
                states(name)
            `),
        supabase.auth.admin.listUsers(),
        supabase.from('states').select('id, name').order('name')
    ]);


    const authUserMap = new Map();
    authData?.users.forEach(u => {
        authUserMap.set(u.id, { last_sign_in_at: u.last_sign_in_at });
    });

    const enrichedUsers = users?.map(u => ({
        ...u,
        last_active: authUserMap.get(u.id)?.last_sign_in_at || null
    })) || [];

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <BulkOps users={enrichedUsers} states={states || []} />
        </React.Suspense>
    );
}

