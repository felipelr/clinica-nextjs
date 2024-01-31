import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get(`${process.env.NEXT_PUBLIC_AUTH_TOKEN}`)?.value
  const pathname = request.nextUrl.pathname;

  if (pathname !== "/login" && !currentUser) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (pathname === "/login" && currentUser) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}