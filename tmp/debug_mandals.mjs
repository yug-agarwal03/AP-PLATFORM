import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://dctmteonvmnslqzzlnpr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdG10ZW9udm1uc2xxenpsbnByIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM4NDA3MCwiZXhwIjoyMDg3OTYwMDcwfQ.nU2M3qX1m5XrpNFIN-mOi3c0-JcwygzQrH6rfrCtVWY'
)

async function debugMandals() {
  const nelloreId = '54c2d0a5-61de-459b-9214-54ce63edafcb'
  const { data: mandals } = await supabase.from('mandals').select('*').eq('district_id', nelloreId)
  console.log(`Nellore (${nelloreId}) Mandals:`, mandals?.length || 0)
  if (mandals?.length > 0) {
    console.log('Sample:', mandals[0])
  } else {
    const { data: all } = await supabase.from('mandals').select('district_id, name').limit(10)
    console.log('All Mandals (Sample):', all)
  }
}

debugMandals().catch(console.error)
