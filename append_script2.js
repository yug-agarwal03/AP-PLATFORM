const fs = require('fs');
let code = fs.readFileSync('src/lib/dpo/actions.ts', 'utf8');

const injection = `
export async function interveneEscalation(flagId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { error } = await supabase.from('flags')
        .update({
            acknowledged_at: new Date().toISOString(),
            acknowledged_by: user.id,
            status: 'acknowledged'
        })
        .eq('id', flagId)

    if (error) throw new Error(error.message)
    return true
}

export async function recedeToCdpo(flagId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { error } = await supabase.from('flags')
        .update({
            escalated_to: 'cdpo',
            status: 'raised'
        })
        .eq('id', flagId)

    if (error) throw new Error(error.message)
    return true
}

export async function escalateToState(flagId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { error } = await supabase.from('flags')
        .update({
            escalated_to: 'state',
            status: 'escalated'
        })
        .eq('id', flagId)

    if (error) throw new Error(error.message)
    return true
}
`;

fs.appendFileSync('src/lib/dpo/actions.ts', '\n' + injection);
console.log('Appended button actions to actions.ts!');
