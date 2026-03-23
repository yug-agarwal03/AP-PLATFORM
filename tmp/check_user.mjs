import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://dctmteonvmnslqzzlnpr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdG10ZW9udm1uc2xxenpsbnByIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM4NDA3MCwiZXhwIjoyMDg3OTYwMDcwfQ.nU2M3qX1m5XrpNFIN-mOi3c0-JcwygzQrH6rfrCtVWY'
)

async function check() {
  const { data: profile } = await supabase.from('profiles').select('*').eq('email', 'dpo@jiveesha.com').single()
  console.log('--- Profile for dpo@jiveesha.com ---')
  console.log(profile)
  
  if (!profile) {
    const { data: allProfiles } = await supabase.from('profiles').select('email, role, district_id').limit(20)
    console.log('\n--- Sample Profiles ---')
    console.log(allProfiles)
  }
}

check().catch(console.error)
