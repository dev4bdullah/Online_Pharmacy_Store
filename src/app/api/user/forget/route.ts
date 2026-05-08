import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { clientPromise } from "@/lib/db";
import nodemailer from "nodemailer";
import { getForgotPasswordEmailHtml } from "@/utils/emailTemplates/getForgotPasswordEmailHtml";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const client = await clientPromise;
    const user = await client.db().collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

       const accessToken = jwt.sign(
            { id: user._id, email: user.email },
            ACCESS_TOKEN_SECRET,
            {
              expiresIn: "10m",
            }
          );
    const url = `http://localhost:3000/api/user/reset-password?token=${accessToken}`;

    await transporter.sendMail({
      from: `"Zahid Pharmacy" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "Reset Your Password",
      html: getForgotPasswordEmailHtml(url),
    });

    return NextResponse.json(
      { success: true, message: "Password reset email sent" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
