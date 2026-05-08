"use client";
import React, { useEffect, useState } from "react";
import { useUpdateOrderStatusMutation } from "@/redux/employSlice";
import Loader from "@/components/Loader"; // Make sure this is a spinner/loading component

const SUCCESS_STATUSES = ["delivered", "completed", "success"];

function OrderCard({ item }) {
  const [status, setStatus] = useState(item?.orderStatus || "");
  const [createdAt, setCreatedAt] = useState("");
  const [updateOrderStatus, { isLoading, isSuccess, isError }] =
    useUpdateOrderStatusMutation();

  useEffect(() => {
    if (item?.createdAt) {
      const date = new Date(item.createdAt);
      setCreatedAt(date.toLocaleDateString());
    }
  }, [item]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    await updateOrderStatus({ orderId: item._id, status: newStatus });
  };

  const statusColor = SUCCESS_STATUSES.includes(status.toLowerCase())
    ? "text-green-600"
    : status === "cancelled"
    ? "text-red-600"
    : "text-yellow-600";

  return (
    <div className="relative flex flex-wrap xl:flex-nowrap items-center justify-between bg-white p-4 shadow-md rounded-xl border border-gray-200 gap-4">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-xl">
          <Loader />
        </div>
      )}

      <div className="hidden xl:block max-w-[150px] truncate">
        <p className="text-xs text-gray-500">Order ID</p>
        <p className="font-medium truncate">{item?._id}</p>
      </div>

      <div className="max-w-[100px] truncate">
        <p className="text-xs text-gray-500">Date</p>
        <p className="font-medium truncate">{createdAt}</p>
      </div>

      <div className="max-w-[80px] truncate">
        <p className="text-xs text-gray-500">Items</p>
        <p className="font-medium">{item?.items?.length}</p>
      </div>

      <div className="flex flex-col items-start max-w-[120px] min-w-[100px] truncate">
        <p className="text-xs text-gray-500 whitespace-nowrap">Total</p>
        <p className="font-medium truncate whitespace-nowrap">
          {item?.totalAmount?.toFixed(2)} PKR
        </p>
      </div>

      <div className="max-w-[140px] truncate">
        <p className="text-xs text-gray-500">Status</p>
        <select
          value={status}
          onChange={handleStatusChange}
          className={`border rounded px-2 py-1 text-sm ${statusColor} w-full`}
          disabled={isLoading}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="delivered">Delivered</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
}

export default OrderCard;
