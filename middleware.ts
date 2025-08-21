// middleware.ts (in your root directory)
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Public routes that don't require authentication
    const publicRoutes = ['/new/login', '/new/signup', '/']
    
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next()
    }

    // If user is not authenticated, redirect to login
    if (!token) {
      const loginUrl = new URL('/new/login', req.url)
      loginUrl.searchParams.set('callbackUrl', req.url)
      return NextResponse.redirect(loginUrl)
    }

    // If user is authenticated but hasn't completed onboarding
    if (!token.isOnboardingComplete) {
      // Allow access to onboarding page
      if (pathname.startsWith('/onboarding')) {
        return NextResponse.next()
      }
      // Redirect to onboarding for any other protected route
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }

    // If user has completed onboarding but tries to access onboarding page
    if (token.isOnboardingComplete && pathname.startsWith('/onboarding')) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Allow access to protected routes for authenticated users with completed onboarding
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Always allow access to public routes
        const publicRoutes = ['/new/login', '/new/register', '/']
        if (publicRoutes.includes(req.nextUrl.pathname)) {
          return true
        }
        // For protected routes, check if user has a token
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
}