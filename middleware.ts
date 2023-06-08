import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    if(!token) {
        return NextResponse.next()
    } else {
        const url = request.nextUrl.clone()
        url.pathname = '/chat'
        return NextResponse.rewrite(url)
    }
}
 
export const config = {
  matcher: ['/', '/login', '/signin'],
};