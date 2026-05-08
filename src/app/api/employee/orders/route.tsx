import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import Users from "@/models/Users";
import nodemailer from "nodemailer";
import { ChangeOrderStatus } from "@/utils/emailTemplates/OrderStatus";

const SUCCESS_STATUSES = ["delivered", "completed", "success"];
const PROCESSING_STATUSES = ["processing", "shipped", "pending"];
const CANCELLED_STATUS = "cancelled";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});
export async function GET(request: NextRequest) {
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

export async function PATCH(request: Request) {
  await connectDB();

  try {
    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: "Missing orderId or status" },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    ).lean();

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }
    let user = await Users.findById(updatedOrder.userId);
    await transporter.sendMail({
      from: `"Zahid Pharmacy"`,
      to: user.email,
      subject: "",
      html: ChangeOrderStatus(updatedOrder),
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
