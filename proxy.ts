import { NextRequest, NextResponse } from 'next/server'
import { checkSession } from '@/lib/api/serverApi'

const privateRoutes = ['/profile', '/notes']
const publicRoutes = ['/sign-in', '/sign-up']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookieStore = request.cookies

  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  )
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  if (!accessToken) {
    if (refreshToken) {
      try {
        const response = await checkSession()
        const setCookie = response.headers['set-cookie']

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie]

          const nextResponse = isPrivateRoute
            ? NextResponse.next()
            : NextResponse.redirect(new URL('/profile', request.url))

          cookieArray.forEach((cookieStr) => {
            nextResponse.headers.append('Set-Cookie', cookieStr)
          })

          if (isPublicRoute) {
            return NextResponse.redirect(new URL('/profile', request.url), {
              headers: nextResponse.headers,
            })
          }

          return nextResponse
        }
      } catch {
        if (isPrivateRoute) {
          return NextResponse.redirect(new URL('/sign-in', request.url))
        }
        return NextResponse.next()
      }
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    return NextResponse.next()
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
}
