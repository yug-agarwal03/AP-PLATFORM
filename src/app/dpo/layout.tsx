import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DpoShell from '@/components/dpo/DpoShell'

export default async function DPOLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile || profile.role !== 'district_officer') {
        redirect('/login?error=Unauthorized: DPO access required')
    }

    return (
        <DpoShell
            userName={profile.name}
            userRole={profile.role}
            avatarUrl={profile.avatar_url}
        >
            {children}
        </DpoShell>
    )
}
