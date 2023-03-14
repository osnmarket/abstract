import { NextResponse } from 'next/server';

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: '/api/:function*',
};

export async function middleware(req) {
  const url = req.nextUrl.clone();

  // Additionnal verifications
  if (!req.headers.get('content-source')) {
    url.pathname = '/404';
    return NextResponse.redirect(url);
  }
  // End of verifications
}
