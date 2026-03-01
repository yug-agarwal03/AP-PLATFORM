import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
    const envFileContent = fs.readFileSync(envPath, 'utf8')
    envFileContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=')
        if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim()
            process.env[key.trim()] = value.replace(/^["']|["']$/g, '')
        }
    })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables in .env')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

const adminsToSeed = [
    {
        email: 'admin@jiveesha.com',
        password: 'password123',
        name: 'Super Admin',
        role: 'super_admin'
    },
    {
        email: 'system@jiveesha.com',
        password: 'password123',
        name: 'System Admin',
        role: 'system_admin'
    }
]

async function seedAdmins() {
    console.log('--- Diagnosing Admin Seeding ---')

    for (const admin of adminsToSeed) {
        console.log(`\nAttempting: ${admin.email}`)

        // Try with NO metadata first to see if it's a metadata access issue in trigger
        const { data: userData, error: userError } = await supabase.auth.admin.createUser({
            email: admin.email,
            password: admin.password,
            email_confirm: true,
            user_metadata: {
                role: admin.role,
                name: admin.name
            }
        })


        if (userError) {
            console.error(`Status: ${userError.status}, Message: ${userError.message}`)

            // Re-listing to see if user was created anyway
            const { data } = await supabase.auth.admin.listUsers()
            const found = data?.users.find(u => u.email === admin.email)
            if (found) {
                console.log(`User was actually created with ID: ${found.id}. Syncing profile manually...`)
                await updateProfile(found.id, admin.name, admin.role)
            } else {
                console.log('User was NOT created.')
            }
        } else if (userData.user) {
            console.log(`User created successfully: ${userData.user.id}`)
            await updateProfile(userData.user.id, admin.name, admin.role)
        }
    }
}

async function updateProfile(userId: string, name: string, role: string) {
    const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
            id: userId,
            name: name,
            role: role,
            is_active: true
        })

    if (profileError) {
        console.error(`Profile Sync Error: ${profileError.message}`)
    } else {
        console.log(`Profile Synced.`)
    }
}



seedAdmins().catch(console.error)
