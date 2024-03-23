import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
 //so we have public path like login and signup but the path
 //such as profile and the home is private as it shouldnt be able 
 //to go in that path if not autherisse
 
 //getting pathname
 const path=request.nextUrl.pathname
 const isPublicPath=path==='/login' ||path==='/signup'

 const token= request.cookies.get("token")?.value || ""

  if(isPublicPath && token)
  {
    return NextResponse.redirect(new URL('/',request.nextUrl))
  }

  //if it is not public path and there is no token(cookies) then first redirect to login
  if(!isPublicPath && !token)
  {
    return NextResponse.redirect(new URL('/login',request.nextUrl))
  }
}
 //two part 
 //1.logic part (above) and the 2.matching part (below)
// See "Matching Paths" below to learn more
export const config = {
  matcher:[
    '/',
    '/profile',
    '/login',
    '/signup',
  ]
}