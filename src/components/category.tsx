"use client";
import React from "react";
import { category_data } from "../../data";
import { useGetCategoriesQuery } from "@/redux/apiSlice";
import Loader from "./Loader";

const Category = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  return isLoading ? (
    <div>
      <Loader />
    </div>
  ) : data?.categories.length >= 1 ? (
    <div className="w-full bg-[rgba(255,255,255,0.8)] py-4 px-2 flex items-center justify-center gap-8 overflow-x-auto rounded-lg whitespace-nowrap hide-scroller">
      {data?.categories.map(
        (e: { name: string }, index: React.Key | null | undefined) => (
          <span
            key={index}
            className="text-lg font-semibold text-[#333333] transition duration-300 ease-in-out transform hover:scale-105 hover:text-green-600 cursor-pointer"
          >
            {e.name}
          </span>
        )
      )}
    </div>
  ) : (
    <p className="text-center text-gray-500 text-sm mt-4 mb-4">
      No Category available at the moment.
    </p>
  );
};

export default Category;
