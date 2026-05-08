// src/app/api/cart/add/route.ts
import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { headers } from "next/headers";

// Type augmentation for NextRequest with user data
declare global {
  interface NextRequest {
    userId?: string;
    user?: any;
  }
}

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const userId = headers().get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Now accepting action type: 'increment' | 'decrement' | 'add'
    const { productId, action = "add" } = await request.json();
    console.log(productId);

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    let cart =
      (await Cart.findOne({ userId })) || new Cart({ userId, items: [] });
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      // Handle increment/decrement
      if (action === "increment") {
        existingItem.quantity += 1;
      } else if (action === "decrement") {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // Remove item if quantity would go to 0
          cart.items = cart.items.filter(
            (item) => item.productId.toString() !== productId
          );
        }
      } else if (action === "add") {
        existingItem.quantity += 1;
      }
    } else if (action !== "decrement") {
      // Only add new item if not decrementing
      cart.items.push({
        productId,
        quantity: 1,
        price: product.price,
        name: product.name,
        image: product.images[0] || "",
      });
    }

    // Recalculate totals
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();

    return NextResponse.json({
      success: true,
      cart: {
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalItems: cart.totalItems,
      },
    });
  } catch (error: any) {
    console.error("Cart API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
// Add this to the same route.ts file
export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const userId = headers().get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - user id not found" },
        { status: 401 }
      );
    }

    const cart = (await Cart.findOne({ userId })) || {
      items: [],
      totalPrice: 0,
      totalItems: 0,
    };

    return NextResponse.json({
      success: true,
      cart: {
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalItems: cart.totalItems,
      },
    });
  } catch (error: any) {
    console.error("Get Cart Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
