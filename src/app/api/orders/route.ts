import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import  Product  from "@/models/Product";

const SUCCESS_STATUSES = ['delivered', 'completed','success'];
const PROCESSING_STATUSES = ['processing', 'shipped', 'pending'];
const CANCELLED_STATUS = 'cancelled';
export async function POST(req: Request) {
  await connectDB();
  
  try {
    const { shippingAddress, paymentMethod } = await req.json();
    
    const userId = req.headers.get('x-user-id');
  
    
    
    const cart = await Cart.findOne({ userId });
    if (!cart?.items?.length) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 }
      );
    }

    // 3. Verify stock
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return NextResponse.json(
          { 
            success: false, 
            message: `${item.name} is out of stock` 
          },
          { status: 400 }
        );
      }
    }

    // 4. Create order
    const order = new Order({
      userId,
      items: cart.items,
      totalAmount: cart.totalPrice,
      shippingAddress,
      paymentMethod,
    });

    // 5. Reduce stock
    await Promise.all(cart.items.map(async (item: { productId: any; quantity: number; }) => {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }));

    await Cart.deleteOne({ userId });

    await order.save();

    return NextResponse.json({
      success: true,
      orderId: order._id,
      totalAmount: order.totalAmount
    });

  } catch (error) {
    console.log("This is Error",error);
    
    return NextResponse.json(
      { success: false, message: "Order failed" },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const allOrders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    const categorizedOrders = {
      success: allOrders.filter(order => 
        SUCCESS_STATUSES.includes(order.orderStatus)
      ),
      processing: allOrders.filter(order => 
        PROCESSING_STATUSES.includes(order.orderStatus)
      ),
      cancelled: allOrders.filter(order => 
        order.orderStatus === CANCELLED_STATUS
      )
    };

    // Format order data consistently
    const formatOrder = (order: any) => ({
      id: order._id.toString(),
      total: order.totalAmount,
      date: order.createdAt,
      status: order.orderStatus,
      items: order.items.map((item: any) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image || null
      }))
    });
    
     
    return NextResponse.json({
      success: true,
      orders: {
        success: categorizedOrders.success.map(formatOrder),
        processing: categorizedOrders.processing.map(formatOrder),
        cancelled: categorizedOrders.cancelled.map(formatOrder)
      },
      counts: {
        success: categorizedOrders.success.length,
        processing: categorizedOrders.processing.length,
        cancelled: categorizedOrders.cancelled.length
      }
    });

  } catch (error) {
    console.error('Order fetch error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch orders',
        orders: {
          success: [],
          processing: [],
          cancelled: []
        },
        counts: {
          success: 0,
          processing: 0,
          cancelled: 0
        }
      },
      { status: 500 }
    );
  }
}