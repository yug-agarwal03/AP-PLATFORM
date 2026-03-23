import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://dctmteonvmnslqzzlnpr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdG10ZW9udm1uc2xxenpsbnByIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM4NDA3MCwiZXhwIjoyMDg3OTYwMDcwfQ.nU2M3qX1m5XrpNFIN-mOi3c0-JcwygzQrH6rfrCtVWY'
)

async function applyFix() {
  const sql = `
    -- Enable RLS
    ALTER TABLE states ENABLE ROW LEVEL SECURITY;
    ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
    ALTER TABLE mandals ENABLE ROW LEVEL SECURITY;
    ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;
    ALTER TABLE panchayats ENABLE ROW LEVEL SECURITY;
    ALTER TABLE awcs ENABLE ROW LEVEL SECURITY;

    -- Add Policies
    DROP POLICY IF EXISTS "All read states" ON states;
    CREATE POLICY "All read states" ON states FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "All read districts" ON districts;
    CREATE POLICY "All read districts" ON districts FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "All read mandals" ON mandals;
    CREATE POLICY "All read mandals" ON mandals FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "All read sectors" ON sectors;
    CREATE POLICY "All read sectors" ON sectors FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "All read panchayats" ON panchayats;
    CREATE POLICY "All read panchayats" ON panchayats FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "All read awcs" ON awcs;
    CREATE POLICY "All read awcs" ON awcs FOR SELECT USING (true);
    
    -- Admin access
    DO $$ DECLARE t TEXT;
    BEGIN
      FOREACH t IN ARRAY ARRAY['states', 'districts', 'mandals', 'sectors', 'panchayats', 'awcs'] LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Super admin full access %%1$s" ON %%1$s', t);
        EXECUTE format('CREATE POLICY "Super admin full access %%1$s" ON %%1$s FOR ALL USING (auth_role() IN (''super_admin'', ''system_admin''));', t);
      END LOOP;
    END $$;
  `;

  // We use the postgres connection string or try to run via RPC if any exists that runs SQL
  // Since we don't have an RPC for SQL, and we can't use node-postgres easily here without installing it,
  // we'll hope the user can copy-paste this into their Supabase SQL editor if this fails.
  // OR we can try to use npx supabase db execute
  console.log("Please run the following SQL in your Supabase SQL Editor to fix the DPO Dashboard data visibility issues:\n\n" + sql);
}

applyFix().catch(console.error)
