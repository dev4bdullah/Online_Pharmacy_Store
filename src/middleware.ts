import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(
  process.env.ACCESS_TOKEN_SECRET!
);

export async function middleware(request: NextRequest) {
  if (
    request.url.includes("/api/employee/register") ||
    request.url.includes("/api/employee/login") ||
    request.url.includes("/api/employee/orders")||
    request.url.includes("/api/employee/verify")||
    (request.url.includes("/api/employee/product") &&
      !request.url.includes("/create")) ||
    (request.url.includes("/api/employee/category") &&
      !request.url.includes("/create"))
  ) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No Beare Token");

    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];
  try {
    const { payload } = await jwtVerify(token, ACCESS_TOKEN_SECRET);

    console.log("This is Payload",payload);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", String(payload.id));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 403 }
    );
  }
}

export const config = {
  matcher: ["/api/employee/:path*", "/api/cart/:path*","/api/orders/:path*"],
};
