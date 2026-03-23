import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://dctmteonvmnslqzzlnpr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdG10ZW9udm1uc2xxenpsbnByIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM4NDA3MCwiZXhwIjoyMDg3OTYwMDcwfQ.nU2M3qX1m5XrpNFIN-mOi3c0-JcwygzQrH6rfrCtVWY'
)

async function verify() {
  const districtId = '54c2d0a5-61de-459b-9214-54ce63edafcb' // Nellore
  const districtName = 'Nellore'

  console.log(`\n--- District Context: ${districtName} (${districtId}) ---`)

  // 1. Mandals
  const { data: mandals } = await supabase.from('mandals').select('id, name').eq('district_id', districtId).limit(100)
  const mandalIds = mandals.map(m => m.id)
  console.log(`\n1. Mandals Found: ${mandals.length}`)
  console.log(`Sample Mandals: ${mandals.slice(0, 5).map(m => m.name).join(', ')}`)

  // 2. AWCs (using 10,000 limit as per implemented logic)
  const { data: awcs } = await supabase.from('awcs').select('id, name, mandal_id').in('mandal_id', mandalIds).limit(10000)
  const awcIds = awcs?.map(a => a.id) || []
  console.log(`\n2. AWCs identified district-wide: ${awcIds.length}`)
  console.log(`Sample AWCs: ${awcs.slice(0, 3).map(a => a.name).join(', ')}`)

  // 3. Children (using 30,000 limit as per implemented logic)
  const { data: children } = await supabase.from('children')
    .select('id, name, current_risk_level, last_screening_date, awc_id')
    .in('awc_id', awcIds)
    .eq('is_active', true)
    .limit(30000)
    
  console.log(`\n3. Total Active Children: ${children?.length || 0}`)

  // 4. Aggregations (Verify no truncation)
  const risks = (children || []).reduce((acc, curr) => {
    const l = (curr.current_risk_level || 'low').toLowerCase()
    acc[l] = (acc[l] || 0) + 1
    return acc
  }, { low: 0, medium: 0, high: 0, critical: 0 })
  
  const screenedCount = (children || []).filter(c => c.last_screening_date).length

  console.log('\n--- Real-time Analytics ---\n')
  console.log('Risk Distribution:', JSON.stringify(risks, null, 2))
  console.log(`Screened Total: ${screenedCount}`)
  console.log(`Coverage Achievement: ${children?.length ? Math.round((screenedCount / children.length) * 100) : 0}%`)

  // 5. Hierarchy Check (Sectors / Panchayats)
  const { count: sectorCount } = await supabase.from('sectors').select('id', { count: 'exact', head: true }).in('mandal_id', mandalIds)
  const { count: panchayatCount } = await supabase.from('panchayats').select('id', { count: 'exact', head: true }).in('sector_id', (await supabase.from('sectors').select('id').in('mandal_id', mandalIds)).data?.map(s => s.id) || [])
  
  console.log(`\n--- Administrative Scale ---`)
  console.log(`Sectors: ${sectorCount}`)
  console.log(`Panchayats: ${panchayatCount}`)
}

verify().catch(console.error)
