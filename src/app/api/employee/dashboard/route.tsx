import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Group products by day of week (Mon, Tue, etc.)
    const productStats = await Product.aggregate([
      {
        $project: {
          day: { $dayOfWeek: "$createdAt" }, // 1 (Sun) to 7 (Sat)
        },
      },
      {
        $group: {
          _id: "$day",
          products: { $sum: 1 },
        },
      },
    ]);

    // Convert numeric day to string (Mon, Tue, ...)
    const daysMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const formattedData = productStats.map((item) => ({
      name: daysMap[item._id - 1],
      pro: item.products,
    }));

    return NextResponse.json({
      totalProducts,
      totalOrders,
      data: formattedData,
    });
  } catch (error) {
    console.error("Stats fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
