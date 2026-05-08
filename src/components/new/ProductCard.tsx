"use client";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useAddToCartMutation } from "@/redux/apiSlice";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ProductCard({
  item,
  Show,
}: {
  item: any;
  Show: () => void;
}) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const randomNu = Math.floor(Math.random() * 101);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isLoggedIn) return Show();
    try {
      const res = await addToCart({ productId: item._id }).unwrap();
      if (res?.success) toast.success("Added to cart!");
    } catch {
      toast.error("Failed to add item.");
    }
  };

  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-lg bg-white">
      <Link href={`/user/products/${item?._id}`}>
        <div className="w-full relative cursor-pointer">
          <Image
            src={item?.images?.[0] || "/default.jpg"}
            alt={item?.name || "Product"}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="w-full h-8 bg-teal-700 rounded-b-full absolute -top-5 z-10"></div>
          {/* <span className="mt-4 absolute top-2 left-1 bg-black font-bold text-white text-xs px-2 py-1 rounded">
            -40%
          </span> */}
        </div>
      </Link>
      <div className="w-full p-4">
        {/* <div className="flex items-center text-sm text-gray-600 ">
          <FaStar className="text-yellow-500 mr-1" />
          <span>{item?.rating || "4.5"}</span>
          <span className="ml-1 text-gray-400">(6.7k)</span>
        </div> */}
        <h2 className="text-base font-semibold ">
          <Link href={`/user/products/${item?._id}`}>{item?.name}</Link>
        </h2>
        <div className="flex items-center space-x-2 ">
          {/* <span className="line-through text-gray-400">
            ${item?.originalPrice || 160}
          </span> */}
          <span className="text-green-500 font-bold">
            {item?.price ?? 120} PKR
          </span>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-sm text-gray-500 flex items-center">
            <FaShoppingCart className="mr-1" />
            {randomNu}+ Sold recently
          </p>
        </div>
        <div className="w-full flex items-end justify-end mt-2">
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="bg-gradient-to-r from-[#6AB8B0] via-[#6AB8B0] to-[#7AB5AD] hover:bg-teal-500 text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            {isLoading ? "Adding..." : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
