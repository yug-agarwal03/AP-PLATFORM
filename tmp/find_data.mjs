import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://dctmteonvmnslqzzlnpr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdG10ZW9udm1uc2xxenpsbnByIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM4NDA3MCwiZXhwIjoyMDg3OTYwMDcwfQ.nU2M3qX1m5XrpNFIN-mOi3c0-JcwygzQrH6rfrCtVWY'
)

async function findData() {
  const { data: children } = await supabase.from('children').select('awc_id').limit(10)
  if (children.length > 0) {
    const awcId = children[0].awc_id
    const { data: awc } = await supabase.from('awcs').select('mandal_id').eq('id', awcId).single()
    const { data: mandal } = await supabase.from('mandals').select('district_id, name').eq('id', awc.mandal_id).single()
    const { data: dist } = await supabase.from('districts').select('name').eq('id', mandal.district_id).single()
    console.log(`District with data: ${dist.name} (${mandal.district_id})`)
  } else {
    console.log('No children found.')
  }
}

findData().catch(console.error)
