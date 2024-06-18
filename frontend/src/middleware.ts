import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth-token.service";
import { AUTH_BASE, COURSES_PAGE, LOGIN_PAGE, LOGOUT_PAGE } from "./constants/pages-url.constants";

export async function middleware(request: NextRequest) {
  const { url, cookies } = request;
  const token = cookies.get(EnumTokens.ACCESS_TOKEN)?.value;
  const isAuthPage = url.includes(AUTH_BASE) && !url.includes(LOGOUT_PAGE);

  const redirect = "redirect";
  if (isAuthPage && token) {
    let nextPage = request.nextUrl.searchParams.get(redirect) ?? COURSES_PAGE;
    return NextResponse.redirect(new URL(nextPage, url));
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  let loginRedirect = request.nextUrl.clone();
  loginRedirect.pathname = LOGIN_PAGE;
  loginRedirect.searchParams.set(redirect, request.nextUrl.pathname);
  if (!token) {
    return NextResponse.redirect(loginRedirect);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ "/auth/login", "/auth/register", "/auth/logout", "/profile", "/board", "/courses" ]
};