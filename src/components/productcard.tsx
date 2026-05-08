"use client";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useAddToCartMutation } from "@/redux/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductCard: React.FC<{ item: any; Show: () => void }> = ({
  item,
  Show,
}) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [addToCartApi, { isLoading }] = useAddToCartMutation();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log(isLoggedIn);
    if (isLoggedIn) {
      // alert("Testing");
      try {
        // 1. Call API
        const response = await addToCartApi({
          productId: item._id,
        }).unwrap();

        // 2. Update Redux store
        // console.log(response);
        if (response?.success) {
          // toast.success("Item are added in Cart");
        }
      } catch (error) {
        console.log("Add to cart failed:", error);
        throw error;
      }
      return;
    }
    Show();
  };

  return (
    <>
      <Link
        href={`/user/products/${item?._id}`}
        className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-xl group"
      >
        <div className="h-64 w-full overflow-hidden relative">
          {item?.images[0] && (
            <Image
              src={item?.images[0]}
              alt={item?.name || "Product image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          )}
        </div>

        <div className="p-4">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
              {item?.name}
            </h3>
            <p className="text-xl font-bold text-green-600 mt-1">
              ${item?.price?.toFixed(2)}
            </p>
          </div>

          <button
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-black hover:bg-green-700 text-white py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105"
            onClick={handleAddToCart}
          >
            <FaShoppingCart />
            <span>{isLoading ? "Loading..." : "Add to Cart"}</span>
          </button>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
