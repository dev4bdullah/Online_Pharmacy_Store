import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getSessionExpiredHtml } from "@/utils/emailTemplates/getSessionExpiredHtml";
import { clientPromise } from "@/lib/db";
import { getEmailVerifiedHtml } from "@/utils/emailTemplates/getEmailVerifiedHtml";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token");

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
    const user = await client.db().collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const updateResult = await client
      .db()
      .collection("users")
      .updateOne({ email }, { $set: { isVerified: true } });

    if (updateResult.modifiedCount === 1) {
      return new NextResponse(getEmailVerifiedHtml(), {
        status: 200,
        headers: { "Content-Type": "text/html" },
      });
    } else {
        return new NextResponse(getSessionExpiredHtml(), {
            status: 401,
            headers: { "Content-Type": "text/html" },
          });
    }
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
