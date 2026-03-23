const fs = require('fs');
let code = fs.readFileSync('src/lib/dpo/actions.ts', 'utf8');

const targetIndex = code.indexOf(`    return {
        id: child.id, name: child.name, dob: child.dob, age: '2y 4m', gender: (child.gender || '').toUpperCase()`);

if(targetIndex > -1){
    const start = code.substring(0, targetIndex);
    const endChunkIndex = code.indexOf('}\n\n', targetIndex);
    const end = code.substring(endChunkIndex);

    const insertion = `    const userIds = new Set<string>();
    (screenings.data || []).forEach(s => { if (s.conducted_by) userIds.add(s.conducted_by) });
    (flags.data || []).forEach(f => { if (f.raised_by) userIds.add(f.raised_by) });
    (referrals.data || []).forEach(r => { if (r.referred_by) userIds.add(r.referred_by) });

    const { data: usersData } = await supabase.from('profiles').select('id, name').in('id', Array.from(userIds));
    const userMap: Record<string, string> = (usersData || []).reduce((acc: Record<string, string>, u: any) => { acc[u.id] = u.name || 'Staff'; return acc }, {});

    return {
        id: child.id, name: child.name, dob: child.dob, age: '2y 4m', gender: (child.gender || '').toUpperCase(), guardianName: child.mother_name || 'N/A', contactNo: child.phone || 'N/A', mandalName: child.awcs?.mandals?.name || 'Mandal', awcName: child.awcs?.name || 'AWC', currentRisk: (child.current_risk_level || 'low').toUpperCase(),
        vitals: vitals.data?.[0] ? { height: vitals.data[0].height_cm, weight: vitals.data[0].weight_kg, muac: vitals.data[0].muac_cm, status: 'Normal' } : undefined,
        screenings: (screenings.data || []).map(s => ({ id: s.id, date: s.completed_at, level: s.screening_level, by: userMap[s.conducted_by] || 'Worker', status: s.status, scores: s.domain_scores })),
        flags: (flags.data || []).map(f => ({ id: f.id, title: f.title, status: f.status, priority: f.priority, date: f.created_at, raisedBy: userMap[f.raised_by] || 'Staff' })),
        referrals: (referrals.data || []).map(r => ({ id: r.id, type: r.referral_type, status: r.status, date: r.created_at, referredBy: userMap[r.referred_by] || 'Staff' }))
    }`;

    fs.writeFileSync('src/lib/dpo/actions.ts', start + insertion + end);
    console.log('Script injection fixed file 100%');
} else {
    console.log('Target block not found in exact string.');
}
