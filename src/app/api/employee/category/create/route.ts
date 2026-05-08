import { NextResponse } from "next/server";
import { Category } from "@/models/Category";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB(); // Ensure the DB is connected

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
    }

    // Generate the slug if not provided
    const categorySlug = generateSlug(name);

    const existingCategory = await Category.findOne({
      $or: [{ name }, { slug: categorySlug }],
    });

    if (existingCategory) {
      return NextResponse.json({ success: false, message: "Category already exists" }, { status: 409 });
    }

    const newCategory = new Category({ name, slug: categorySlug });
    await newCategory.save();

    return NextResponse.json({ success: true, message: "Category created successfully", category: newCategory }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error", error: err }, { status: 500 });
  }
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")      // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "")   // Remove all non-word characters (except hyphens)
    .replace(/\-\-+/g, "-")     // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, "")         // Remove hyphen from the start
    .replace(/-+$/, "");        // Remove hyphen from the end
}
