import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth-token.service";
import { AUTH_BASE } from "./constants/pages-url.constants";

export async function middleware(request: NextRequest) {
  const { url, cookies } = request;
  let loginRedirect = request.nextUrl.clone();
  loginRedirect.pathname = "/auth/login";
  loginRedirect.searchParams.set("redirect", request.nextUrl.pathname);

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const isAuthPage = url.includes(AUTH_BASE);

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(request.nextUrl.pathname);
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    return NextResponse.redirect(loginRedirect);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ "/auth/logout", "/profile", "/board", "/courses" ]
};