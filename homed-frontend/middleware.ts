import { NextRequest, NextResponse } from "next/server";

async function fetchState() {
  const res = await fetch("http://localhost:8080/api/v1/status", {
    cache: "no-store",
  });
  if (res.ok) {
    console.log("is ok");
    return res.json();
  }
  const date = new Date();
  console.log("oh noooo", date.toUTCString());
}

interface User {
  name: string;
  email: string;
  picture: string;
  emailVerified: boolean;
  isAuthenticated: boolean;
}

export async function middleware(request: NextRequest) {
  let user: User | undefined;
  try {
    user = await fetchState();
    console.log(user);
  } catch (error) {
    console.error(error);
  }
  if (user?.isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    console.log("user112");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/device/:path*"],
};
