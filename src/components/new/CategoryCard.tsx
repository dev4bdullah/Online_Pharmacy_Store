"use client";
import { useDeleteCategoryMutation } from "@/redux/employSlice";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader"; // Assuming you have a loader component.
import { useRouter } from "next/navigation";

function CategoryCard({ item }) {
  let router = useRouter();
  const [createdAt, setCreatedAt] = useState("");
  const [deleteCategory, { isLoading, isError, isSuccess }] =
    useDeleteCategoryMutation();

  useEffect(() => {
    if (item?.createdAt) {
      const date = new Date(item.createdAt);
      setCreatedAt(date.toLocaleDateString());
    }
  }, [item]);

  const handleDelete = async () => {
    try {
      await deleteCategory(item._id).unwrap();
      alert("Category deleted successfully");
    } catch (err) {
      alert("Error deleting product");
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg border border-gray-200">
      <div className="flex items-center space-x-4">
        <div>
          <p className="text-gray-600 text-sm">Category</p>
          <p className="text-black font-semibold">{item?.name}</p>
        </div>
      </div>

      <div className=" w-28 text-left">
        <p className="text-gray-600 text-sm">Date</p>
        <p className="text-black font-semibold">{createdAt}</p>
      </div>

      <div className="hidden xl:block  w-32 text-center">
        <p className="text-gray-600 text-sm">Slug</p>
        <p className="text-black font-semibold truncate">{item?.slug}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? <Loader /> : "Remove"}
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;
