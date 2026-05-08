import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { uploadImageToS3 } from "@/lib/s3";
import formidable, { IncomingForm } from "formidable";
import { promises as fs } from "fs";

function toNodeRequest(req: Request): Promise<IncomingMessage> {
  const { Readable } = require("stream");
  const readable = Readable.fromWeb(req.body as any) as any;
  readable.headers = Object.fromEntries(req.headers.entries());
  readable.method = req.method;
  readable.url = req.url;
  return Promise.resolve(readable);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid Product ID format" },
      { status: 400 }
    );
  }

  try {
    const nodeReq = await toNodeRequest(req);
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
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const price = parseFloat(Array.isArray(fields.price) ? fields.price[0] : fields.price);
    const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
    const stock = parseInt(Array.isArray(fields.stock) ? fields.stock[0] : fields.stock);
    const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;

    let imageUrls: string[] = [];

    // Only handle image files if they exist
    if (files.images) {
      const imageFiles = Array.isArray(files.images) ? files.images : [files.images];

      // Check if the file has a filepath before processing it
      for (const file of imageFiles) {
        if (file?.filepath) {
          const buffer = await fs.readFile(file.filepath); // Read file only if filepath exists
          const uploadedUrl = await uploadImageToS3(
            buffer,
            file.originalFilename || "image.jpg",
            file.mimetype || "image/jpeg"
          );
          imageUrls.push(uploadedUrl);
        }
      }
    }

    // Prepare the update data, including images only if available
    const updateData: any = {
      name,
      price,
      description,
      stock,
      category,
    };

    if (imageUrls.length > 0) {
      updateData.images = imageUrls; // Only update images if files were provided
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      data: {
        message: "Product updated successfully",
        product: updatedProduct,
      },
    });
  } catch (err) {
    console.error("Error updating product by ID:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: String(err) },
      { status: 500 }
    );
  }
}



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid Product ID format" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id).populate("category");
    const suggestedProducts = await Product.aggregate([{ $sample: { size: 5 } }]);


    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    product.viewCount += 1;
    await product.save();

    return NextResponse.json({ success: true, product,suggestion:suggestedProducts });
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid Product ID format" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

      await Product.deleteOne({ _id: id });


    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product by ID:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: err },
      { status: 500 }
    );
  }
}
