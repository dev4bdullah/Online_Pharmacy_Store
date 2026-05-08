import { NextResponse } from "next/server";
import  Product  from "@/models/Product";
import { connectDB } from "@/lib/db";
import { uploadImageToS3 } from "@/lib/s3";
import formidable, { IncomingForm } from "formidable";
import { Readable } from "stream";
import { promises as fs } from "fs"; // Node.js file system module
import { Category } from "@/models/Category";
import mongoose from "mongoose";
export const config = {
  api: {
    bodyParser: false,
  },
};

async function toNodeRequest(req: Request): Promise<any> {
  const readable = new Readable({
    read() {},
  });

  // Pipe the request body to the readable stream
  if (req.body) {
    const reader = req.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      readable.push(value);
    }
  }
  readable.push(null);

  // Add required properties for formidable
  return Object.assign(readable, {
    headers: Object.fromEntries(req.headers.entries()),
    method: req.method,
    url: req.url,
  });
}

export async function POST(req: Request) {
  try {
    await connectDB();

    // Convert Web request to a Node-style request
    const nodeReq = await toNodeRequest(req);

    // Parse form data
    const form = new IncomingForm();
    const formData = await new Promise<{
      fields: formidable.Fields;
      files: formidable.Files;
    }>((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const { fields, files } = formData;

    // Extract and validate fields
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const price = Array.isArray(fields.price) ? fields.price[0] : fields.price;
    const description = Array.isArray(fields.description)
      ? fields.description[0]
      : fields.description;
    const stock = Array.isArray(fields.stock) ? fields.stock[0] : fields.stock;
    const category = Array.isArray(fields.category)
      ? fields.category[0]
      : fields.category;
    console.log(fields);
    
    if (!name || !price || !category || !files.images) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing" },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return NextResponse.json(
        { success: false, message: "Invalid category ID format" },
        { status: 400 }
      );
    }
    console.log("Test", category);
    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category does not exist" },
        { status: 400 }
      );
    }
    // Process images
    const imageFiles = Array.isArray(files.images)
      ? files.images
      : [files.images];
    const imageUrls: string[] = [];

    for (const file of imageFiles) {
      const fileData = file as formidable.File;
      const buffer = await fs.readFile(fileData.filepath); // Using Node.js fs instead of Bun
      const uploadedUrl = await uploadImageToS3(
        buffer,
        fileData.originalFilename || "image.jpg",
        fileData.mimetype || "image/jpeg"
      );
      imageUrls.push(uploadedUrl);
    }

    // Create product
    const newProduct = new Product({
      name,
      price: parseFloat(price),
      description: description || "",
      stock: stock ? parseInt(stock) : 0,
      category,
      images: imageUrls,
      viewCount:0
    });

    console.log("Saving product:", newProduct);
    await newProduct.save();

    return NextResponse.json(
      { success: true, message: "Product created", product: newProduct },
      { status: 201 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
