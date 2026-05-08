"use client";
import { useDeleteProductByIdMutation } from "@/redux/employSlice";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";  // Assuming you have a loader component.
import { useRouter } from "next/navigation";

function EmployeeProductCard({ item }) {
  let router=useRouter()
  const [createdAt, setCreatedAt] = useState("");
  const [deleteProduct, { isLoading, isError, isSuccess }] = useDeleteProductByIdMutation();

  useEffect(() => {
    if (item?.createdAt) {
      const date = new Date(item.createdAt);
      setCreatedAt(date.toLocaleDateString());
    }
  }, [item]);

  const handleDelete = async () => {
    try {
      await deleteProduct(item._id).unwrap();
      alert("Product deleted successfully");
    } catch (err) {
      alert("Error deleting product");
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg border border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={item?.images[0]}
          alt="Category Image"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-gray-600 text-sm">Category</p>
          <p className="text-black font-semibold">{item?.category}</p>
        </div>
      </div>

      <div className="w-28 text-left">
        <p className="text-gray-600 text-sm">Date</p>
        <p className="text-black font-semibold">{createdAt}</p>
      </div>

      <div className="w-32 text-center">
        <p className="text-gray-600 text-sm">Stock</p>
        <p className="text-black font-semibold truncate">{item?.stock}</p>
      </div>

      <div className="w-64 truncate">
        <p className="text-gray-600 text-sm">Product Title</p>
        <p className="text-black font-semibold truncate">{item?.name}</p>
      </div>

      <div className="flex space-x-2">
        <button className="bg-purple-900 text-white px-4 py-2 rounded-md"
        onClick={()=>{
          router.push(`/employee/product/write?id=${item?._id}`);


        }}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? (
            <Loader /> 
          ) : (
            "Remove"
          )}
        </button>
      </div>
    </div>
  );
}

export default EmployeeProductCard;