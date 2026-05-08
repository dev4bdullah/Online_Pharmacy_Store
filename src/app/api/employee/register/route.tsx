import { NextResponse } from "next/server";
import { clientPromise } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();
    if (!email || !name || !password) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const Employer = client.db().collection("Employer");

    if (await Employer.findOne({ email })) {
      return NextResponse.json(
        { success: false, error: "Email in use" },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 10);
    const result = await Employer.insertOne({
      email,
      name,
      password: hash,
      isVerified: false,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        user: { id: result.insertedId, email, name },
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
