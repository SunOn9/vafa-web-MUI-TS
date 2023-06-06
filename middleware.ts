import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
export function middleware(request: NextRequest) {
    const id = request.cookies.get('userId');
    if(!id){
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