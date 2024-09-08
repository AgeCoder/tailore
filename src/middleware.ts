import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req: any) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/'
  ],
};
