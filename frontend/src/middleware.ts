import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const url = request.nextUrl.clone();

  if (!session && url.pathname !== "/auth/login" && url.pathname !== "/auth/register") {
    url.pathname = "/auth/login";
    url.searchParams.set("redirect", request.nextUrl.pathname); // Store the originally requested URL
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ "/logout" ] // todo добавить реальные пути для авторизованного доступа
};
