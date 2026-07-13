import { next, redirect } from '@vercel/edge';

// German-speaking countries we route to the /de/ version by default.
const GERMAN_SPEAKING = new Set(['DE', 'AT', 'CH', 'LI']);

export default function middleware(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const hasLangCookie = /(?:^|;\s*)lang=(bg|de)/.test(cookieHeader);

  // Respect an explicit or previously-detected choice — never re-guess.
  if (hasLangCookie) {
    return next();
  }

  const country = request.headers.get('x-vercel-ip-country') || '';

  if (GERMAN_SPEAKING.has(country)) {
    const url = new URL(request.url);
    url.pathname = '/de/';
    const response = redirect(url, 307);
    response.headers.append('Set-Cookie', 'lang=de; Path=/; Max-Age=31536000; SameSite=Lax');
    return response;
  }

  const response = next();
  response.headers.append('Set-Cookie', 'lang=bg; Path=/; Max-Age=31536000; SameSite=Lax');
  return response;
}

export const config = {
  matcher: '/',
};
