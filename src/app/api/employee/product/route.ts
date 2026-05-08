import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import  Product  from "@/models/Product";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const isTrending = searchParams.get("isTrending") === "true";
    const isRecently = searchParams.get("isRecently") === "true";
    const isTop = searchParams.get("isTop") === "true";

    // Prioritize filters in this order
    let sortStage: any = {};

    if (isTrending) {
      sortStage = { viewCount: -1 };
    } else if (isRecently) {
      sortStage = { createdAt: -1 };
    } else if (isTop) {
      sortStage = { stock: -1 };
    }

    const totalProducts = await Product.countDocuments();

    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" },
      {
        $project: {
          name: 1,
          price: 1,
          description: 1,
          images: 1,
          stock: 1,
          viewCount: 1,
          category: "$categoryDetails.name",
          createdAt: 1,
        },
      },
      ...(Object.keys(sortStage).length ? [{ $sort: sortStage }] : []),
      { $skip: skip },
      { $limit: limit },
    ]);

    return NextResponse.json({
      success: true,
      page,
      limit,
      total: totalProducts,
      pages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (err) {
    console.error("Aggregation pagination error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products", error: err },
      { status: 500 }
    );
  }
}
