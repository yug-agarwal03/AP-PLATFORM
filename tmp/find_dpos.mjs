import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://dctmteonvmnslqzzlnpr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdG10ZW9udm1uc2xxenpsbnByIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM4NDA3MCwiZXhwIjoyMDg3OTYwMDcwfQ.nU2M3qX1m5XrpNFIN-mOi3c0-JcwygzQrH6rfrCtVWY'
)

async function findDPOs() {
  const { data: dpos } = await supabase.from('profiles').select('email, role, district_id, name').eq('role', 'district_officer')
  console.log('--- District Officers (DPOs) ---')
  console.log(dpos)
}

findDPOs().catch(console.error)
