import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Check if the user is an Admin before accessing dashboard routes
export function middleware(request: NextRequest) {
  const userTypeCookie = request.cookies.get('user_type');  // This will return 'RequestCookie | undefined'

  // Check if the cookie exists and if its value is 'ADMIN'
  if (userTypeCookie && userTypeCookie.value === 'ADMIN') {
    return NextResponse.next();  // Allow access if the user is an Admin
  }

  // If not an Admin, redirect to the home page
  return NextResponse.redirect(new URL('/', request.url));
}

// Apply middleware to the dashboard routes only
export const config = {
  matcher: ['/dashboard/*'],
};


// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // This will check if the user is an Admin before accessing dashboard routes
// export function middleware(request: NextRequest) {
//   const userTypeCookie = request.cookies.get('user_type');  // This will return 'RequestCookie | undefined'

//   // Check if the cookie exists and if its value is 'ADMIN'
//   if (userTypeCookie && userTypeCookie.value === 'ADMIN') {
//     return NextResponse.next();  // Allow access if the user is an Admin
//   }

//   // If not an Admin, redirect to the home page
//   return NextResponse.redirect(new URL('/', request.url));
// }

// // Apply middleware to the dashboard routes only
// export const config = {
//   matcher: ['/dashboard/*'],
// };


// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//   // Retrieve the user_info cookie
//   const userInfo = request.cookies.get('user_info')?.value;

//   console.log('User info cookie in middleware:', userInfo);

//   // Redirect to /auth if no user_info cookie is found
//   if (!userInfo) {
//     console.log('No user_info cookie found. Redirecting to /auth...');
//     return NextResponse.redirect(new URL('/auth', request.url));
//   }

//   try {
//     const user = JSON.parse(userInfo);

//     console.log('Parsed user data:', user);

//     // Check if the user_type exists and if the user is an ADMIN
//     if (!user.user_type || user.user_type !== 'ADMIN') {
//       console.log('User is not an ADMIN. Redirecting to the home page...');
//       return NextResponse.redirect(new URL('/', request.url));
//     }

//     console.log('User is an ADMIN. Access granted to dashboard.');
//   } catch (error) {
//     console.error('Error parsing user_info cookie:', error);
//     return NextResponse.redirect(new URL('/auth', request.url));
//   }

//   // Allow access to the requested route
//   return NextResponse.next();
// }

// // Configure the middleware to apply only to dashboard routes
// export const config = {
//   matcher: ['/dashboard/:path*'], // Apply middleware to all dashboard subroutes
// };
