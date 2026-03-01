import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Refreshing the session should be done before any getUser check
    const { data: { user } } = await supabase.auth.getUser()

    // Handle API authorization
    if (!user && request.nextUrl.pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Redirect to login if accessing admin pages without a session
    if (!user && request.nextUrl.pathname.startsWith('/admin')) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        const redirectResponse = NextResponse.redirect(url)
        supabaseResponse.cookies.getAll().forEach((c) => {
            redirectResponse.cookies.set(c.name, c.value, c)
        })
        return redirectResponse
    }

    // Redirect to dashboard if logged in and trying to access login page or root
    // BUT avoid the loop: if they are on /login with an error (like Unauthorized), 
    // it means they were just kicked out of /admin, so don't send them back.
    if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/')) {
        const hasError = request.nextUrl.searchParams.has('error')

        if (!hasError) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/dashboard'
            const redirectResponse = NextResponse.redirect(url)
            supabaseResponse.cookies.getAll().forEach((c) => {
                redirectResponse.cookies.set(c.name, c.value, c)
            })
            return redirectResponse
        }
    }

    // If not logged in and on root, go to login
    if (!user && request.nextUrl.pathname === '/') {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}

export const config = {
    matcher: ['/', '/admin/:path*', '/login', '/api/:path*'],
}