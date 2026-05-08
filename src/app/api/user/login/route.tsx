import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { clientPromise } from "@/lib/db";
import nodemailer from "nodemailer";
import { getVerificationEmailHtml } from "@/utils/emailTemplates/verificationEmail";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const client = await clientPromise;
    const user = await client.db().collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    if (!user.isVerified) {
      const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: "10m",
        }
      );
      const url = `http://localhost:3000/api/user/verify?token=${accessToken}`;
      await transporter.sendMail({
        from: `"Your App" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: "Verify Your Account",
        html: getVerificationEmailHtml(url),
      });

      return NextResponse.json(
        { success: false, message: "User is not verified" },
        { status: 403 }
      );
    }
    if (user?.status == "block") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your Account has been Blocked Please contact on syedabdullahayaz175@gmail.com",
        },
        { status: 409 }
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    const payload = { id: user._id, email: user.email };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    const { password: _p, isVerified: _v, ...userWithoutSensitive } = user;

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        accessToken,
        refreshToken,
        user: userWithoutSensitive,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err },
      { status: 500 }
    );
  }
}
