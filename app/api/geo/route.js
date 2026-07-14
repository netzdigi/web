import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Vercel injects the visitor's country into this header on every request.
export function GET(request) {
  return NextResponse.json(
    { country: request.headers.get('x-vercel-ip-country') || '' },
    { headers: { 'cache-control': 'no-store' } }
  );
}
