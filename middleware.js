import { NextResponse } from 'next/server';

// German-speaking countries we route to the /de/ version by default.
const GERMAN_SPEAKING = new Set(['DE', 'AT', 'CH', 'LI']);

export function middleware(request) {
  try {
    const hasLangCookie = /(?:^|;\s*)lang=(bg|de)/.test(request.headers.get('cookie') || '');

    // Respect an explicit or previously-detected choice — never re-guess.
    if (hasLangCookie) {
      return NextResponse.next();
    }

    const country = request.headers.get('x-vercel-ip-country') || '';

    if (GERMAN_SPEAKING.has(country)) {
      const url = request.nextUrl.clone();
      url.pathname = '/de';
      const response = NextResponse.redirect(url, 307);
      response.cookies.set('lang', 'de', { path: '/', maxAge: 31536000, sameSite: 'lax' });
      return response;
    }

    const response = NextResponse.next();
    response.cookies.set('lang', 'bg', { path: '/', maxAge: 31536000, sameSite: 'lax' });
    return response;
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: '/',
};
