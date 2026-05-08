import { connectDB } from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const { name, stars, review } = await request.json();
    if (!name || !stars || !review) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const newTestimonial = await Testimonial.create({ name, stars, review });
    return NextResponse.json({ success: true, testimonial: newTestimonial }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, testimonials });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
