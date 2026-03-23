import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://dctmteonvmnslqzzlnpr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdG10ZW9udm1uc2xxenpsbnByIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM4NDA3MCwiZXhwIjoyMDg3OTYwMDcwfQ.nU2M3qX1m5XrpNFIN-mOi3c0-JcwygzQrH6rfrCtVWY'
)

async function checkCDPO() {
  const cdpoId = 'c6cee5ca-3eae-48c5-9535-9d8e8a549faf'
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', cdpoId).single()
  console.log('--- CDPO Profile ---')
  console.log(profile)
}

checkCDPO().catch(console.error)
