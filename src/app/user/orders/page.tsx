"use client";
import Loader from "@/components/Loader";
import { useGetPostQuery } from "@/redux/apiSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiChevronRight,
  FiSearch,
} from "react-icons/fi";
import { useSelector } from "react-redux";

type OrderStatus = "success" | "processing" | "cancelled";

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  total: number;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
}

const OrderScreen: React.FC = () => {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { data: ordersData, isLoading, error } = useGetPostQuery();
  const [activeTab, setActiveTab] = useState<OrderStatus>("processing");
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const tabLabels: Record<
    OrderStatus,
    { label: string; icon: React.ReactNode }
  > = {
    processing: { label: "Processing", icon: <FiClock className="mr-2" /> },
    success: { label: "Completed", icon: <FiCheckCircle className="mr-2" /> },
    cancelled: { label: "Cancelled", icon: <FiXCircle className="mr-2" /> },
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">Failed to load orders</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  const filteredOrders =
    ordersData?.orders?.[activeTab]?.filter((order: Order) =>
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header with search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <FiShoppingBag className="text-2xl text-green-600 mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold">My Orders</h1>
          </div>

          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(Object.keys(tabLabels) as OrderStatus[]).map((tab) => (
            <button
              key={tab}
              className={`flex items-center px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-black text-white font-medium"
                  : "bg-white text-gray-700 hover:bg-gray-100 border"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tabLabels[tab].icon}
              {tabLabels[tab].label}
              <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {ordersData?.counts?.[tab] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className=" overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No {activeTab} orders found</p>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4 ">
              {filteredOrders.map((order: Order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OrderCard = ({
  order,
  formatDate,
  getStatusColor,
}: {
  order: Order;
  formatDate: (date: string) => string;
  getStatusColor: (status: OrderStatus) => string;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4  transition-colors  ">
      <div className="flex flex-col gap-4">
        {/* Order Header */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
              Order #{order.id.slice(0, 8)}
            </p>
            <p className="text-sm font-medium">{formatDate(order.date)}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              order.status
            )}`}
          >
            {order.status}
          </span>
        </div>

        {order.items.map((item, index) => (
          <div key={index} className="flex gap-4 mb-2">
            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              <p className="text-sm font-medium">
                {(item.price * item.quantity).toFixed(2)} PKR
              </p>
            </div>
          </div>
        ))}

        {/* Order Footer */}
        <div className="flex justify-between items-center pt-2">
          <p className="font-medium">Total: {order.total.toFixed(2)} PKR</p>
          {/* <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center">
            View Details <FiChevronRight className="ml-1" />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
