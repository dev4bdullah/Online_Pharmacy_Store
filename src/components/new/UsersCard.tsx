"use client";
import React, { useEffect, useState } from "react";
import { useUpdateOrderStatusMutation } from "@/redux/employSlice";
import Loader from "@/components/Loader"; // Make sure this is a spinner/loading component
import {
  usePatchStatusMutation,
  useUserpatchStatusMutation,
} from "@/redux/adminSlice";

const SUCCESS_STATUSES = ["delivered", "completed", "success"];

function UsersCard({ item }) {
  const [status, setStatus] = useState(item?.status || "active");
  const [createdAt, setCreatedAt] = useState("");
  const [userpatchStatus, { isLoading, isSuccess, isError }] =
    useUserpatchStatusMutation();

  useEffect(() => {
    if (item?.createdAt) {
      const date = new Date(item.createdAt);
      setCreatedAt(date.toLocaleDateString());
    }
  }, [item]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    await userpatchStatus({ id: item._id, status: newStatus });
  };

  const statusColor = SUCCESS_STATUSES.includes(status.toLowerCase())
    ? "text-green-600"
    : status === "cancelled"
    ? "text-red-600"
    : "text-yellow-600";

  return (
    <div className="relative flex items-center justify-between bg-white p-4 shadow-md rounded-xl border border-gray-200">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-xl">
          <Loader />
        </div>
      )}

      <div className="hidden md:block">
        <p className=" text-xs text-gray-500">User ID</p>
        <p className="font-medium">{item?._id}</p>
      </div>

      <div className="hidden md:block">
        <p className="text-xs text-gray-500">Date</p>
        <p className="font-medium">{createdAt}</p>
      </div>

      <div>
        <p className="text-xs text-gray-500">Email</p>
        <p className="font-medium">{item?.email}</p>
      </div>

      <div className="hidden md:block">
        <p className="text-xs text-gray-500">Verified</p>
        <p className="font-medium">{String(item?.isVerified)}</p>
      </div>

      <div>
        <p className="text-xs text-gray-500">Status</p>
        <select
          value={status}
          onChange={handleStatusChange}
          className={`border rounded px-2 py-1 text-sm ${statusColor}`}
          disabled={isLoading}
        >
          <option value="active">active</option>
          <option value="block">block</option>
        </select>
      </div>
    </div>
  );
}

export default UsersCard;
