import { NextResponse } from 'next/server';

export function middleware(request) {
  let response;

  if (request.method === 'OPTIONS') {
    // Handle CORS preflight
    response = new NextResponse(null, { status: 204 });
  } else {
    // Pass through to actual request handler
    response = NextResponse.next();
  }

  // ✅ Add CORS headers to all responses
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}
