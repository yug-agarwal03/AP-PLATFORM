import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CdpoShell from '@/components/cdpo/CdpoShell'

export default async function CDPOLayout({
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

    if (!profile || profile.role !== 'cdpo') {
        redirect('/login?error=Unauthorized: CDPO access required')
    }

    return (
        <CdpoShell
            userName={profile.name}
            userEmail={profile.email || ''}
            avatarUrl={profile.avatar_url}
        >
            {children}
        </CdpoShell>
    )
}
