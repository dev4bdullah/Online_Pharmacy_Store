import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import Product from "@/models/Product";

const SUCCESS_STATUSES = ["delivered", "completed", "success"];
const PROCESSING_STATUSES = ["processing", "shipped", "pending"];
const CANCELLED_STATUS = "cancelled";
export async function GET(request: NextRequest) {
  console.log("testing");

  await connectDB();

  const { page = 1, limit = 10 } = request.nextUrl.searchParams;

  try {
    const skip = (Number(page) - 1) * Number(limit);
    const allOrders = await Order.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    return NextResponse.json({
      success: true,
      orders: allOrders,
    });
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}
