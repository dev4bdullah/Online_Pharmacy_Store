import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getSessionExpiredHtml } from "@/utils/emailTemplates/getSessionExpiredHtml";
import { clientPromise } from "@/lib/db";
import { getEmailVerifiedHtml } from "@/utils/emailTemplates/getEmailVerifiedHtml";
import { getForgotPasswordEmailHtml } from "@/utils/emailTemplates/getForgotPasswordEmailHtml";
import { getNewPassword } from "@/utils/emailTemplates/getNewPassword";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token");
    console.log(token);
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is missing" },
        { status: 400 }
      );
    }
    const client = await clientPromise;

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const email = decoded?.email;
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 400 }
      );
    }
    const url = `http://localhost:3000/api/user/change?token=${token}`;

    return new NextResponse(getNewPassword(url), {
        status: 200,
        headers: { "Content-Type": "text/html" },
      });
    
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return new NextResponse(getSessionExpiredHtml(), {
        status: 401,
        headers: { "Content-Type": "text/html" },
      });
    }
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 403 }
    );
  }
}
