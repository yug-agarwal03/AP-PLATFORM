import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://dctmteonvmnslqzzlnpr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdG10ZW9udm1uc2xxenpsbnByIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM4NDA3MCwiZXhwIjoyMDg3OTYwMDcwfQ.nU2M3qX1m5XrpNFIN-mOi3c0-JcwygzQrH6rfrCtVWY'
)

async function checkCDPOs() {
  const { data: cdpos } = await supabase.from('profiles').select('id, district_id, mandal_id').eq('role', 'cdpo')
  console.log('CDPOs found:', cdpos?.length || 0)
  console.log('Sample CDPOs:', cdpos?.slice(0, 10))
  const missingDistrict = cdpos?.filter(c => !c.district_id && c.mandal_id)
  console.log('CDPOs with mandal but NO district:', missingDistrict?.length || 0)
}

checkCDPOs().catch(console.error)
