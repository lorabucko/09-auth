import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { parseSetCookie } from 'cookie'
import { api } from '@/lib/api/api'

const privateRoutes = ['/profile', '/notes']
const publicRoutes = ['/sign-in', '/sign-up']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookieStore = await cookies()

  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  )

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  if (!accessToken && refreshToken) {
    try {
      const apiRes = await api.get('/auth/session', {
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      })

      const response = isPrivateRoute
        ? NextResponse.next()
        : NextResponse.redirect(new URL('/profile', request.url))

      const setCookie = apiRes.headers['set-cookie']

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie]

        for (const cookieStr of cookieArray) {
          const parsedCookie = parseSetCookie(cookieStr)

          if (!parsedCookie?.name || parsedCookie.value === undefined) {
            continue
          }

          response.cookies.set({
            name: parsedCookie.name,
            value: parsedCookie.value,
            path: parsedCookie.path ?? '/',
            httpOnly: parsedCookie.httpOnly ?? true,
            secure:
              parsedCookie.secure ?? process.env.NODE_ENV === 'production',
            sameSite: parsedCookie.sameSite,
            ...(parsedCookie.maxAge !== undefined && {
              maxAge: parsedCookie.maxAge,
            }),
            ...(parsedCookie.expires && {
              expires: parsedCookie.expires,
            }),
          })
        }
      }

      return response
    } catch {
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }

      return NextResponse.next()
    }
  }

  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
}
