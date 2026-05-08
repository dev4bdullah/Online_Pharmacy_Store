"use client";
import VerticalBarChart from "@/components/VerticalBarChart";
import { useGetStatisticsQuery } from "@/redux/employSlice";
import { error } from "console";
import React, { useEffect } from "react";

export default function Page() {
  const { data, isLoading, isError, refetch, error } = useGetStatisticsQuery();

  useEffect(() => {
    refetch();
  }, []);
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4 animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Products
          </h2>
          <p className="text-4xl font-extrabold text-indigo-600 mt-2">
            {data?.totalProducts}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
          <p className="text-4xl font-extrabold text-indigo-600 mt-2">
            {data?.totalOrders}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
          <h2 className="text-lg font-semibold text-gray-600">
            Weekly Activity
          </h2>
          <p className="text-4xl font-extrabold text-indigo-600 mt-2">7 Days</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Product Hosting by Day
        </h2>
        <VerticalBarChart data={data?.data} />
      </div>
    </div>
  );
}
