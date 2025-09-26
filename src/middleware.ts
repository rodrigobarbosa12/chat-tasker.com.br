import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { nextIntl } from 'src/infrastructure/providers'

function redirectToHome(request: NextRequest, locale: string) {
  return NextResponse.redirect(`${request.nextUrl.origin}/${locale}`)
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  if (request.nextUrl.pathname === '/') {
    return redirectToHome(request, 'pt-BR')
  }

  return response
}

export default createMiddleware(nextIntl)

// const patchAuth = langs.map((lang) => `${lang}/auth`).join('|')
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
  // matcher: [`/((?!api|_next|${patchAuth}|.*\\..*).*)`],
}
