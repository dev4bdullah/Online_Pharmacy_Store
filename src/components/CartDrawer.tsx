"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useGetCartQuery } from "@/redux/apiSlice";
import Loader from "./Loader";
import {
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
} from "@/redux/apiSlice";
import AddressModal from "./AddressModal";

const CartDrawer = ({ isOpen, onClose, cartItems, setCartItems }: any) => {
  const { data, isLoading, refetch } = useGetCartQuery();
  const [showModal, setShowModal] = useState(false);

  const [updating, setUpdating] = useState<{
    id: string;
    type: "inc" | "dec";
  } | null>(null);

  const [incrementItem, { isLoading: isIncrementing }] =
    useIncrementCartItemMutation();
  const [decrementItem, { isLoading: isDecrementing }] =
    useDecrementCartItemMutation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      refetch();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col"
    >
      <div className="flex justify-between items-center px-4 py-3">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-xl">
          ✖
        </button>
      </div>

      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {data?.cart?.items?.length >= 1 ? (
              data?.cart?.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b py-4 px-2 gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={async () => {
                        setUpdating({ id: item.productId, type: "dec" });
                        await decrementItem(item.productId);
                        await refetch();
                        setUpdating(null);
                      }}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                      disabled={
                        updating?.id === item.productId &&
                        updating?.type === "dec"
                      }
                    >
                      {updating?.id === item.productId &&
                      updating?.type === "dec" ? (
                        <span className="loader w-4 h-4 border-2 border-t-transparent border-gray-600 rounded-full animate-spin" />
                      ) : (
                        <AiOutlineMinus size={16} />
                      )}
                    </button>

                    <span className="min-w-[20px] text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={async () => {
                        setUpdating({ id: item.productId, type: "inc" });
                        await incrementItem(item.productId);
                        await refetch();
                        setUpdating(null);
                      }}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                      disabled={
                        updating?.id === item.productId &&
                        updating?.type === "inc"
                      }
                    >
                      {updating?.id === item.productId &&
                      updating?.type === "inc" ? (
                        <span className="loader w-4 h-4 border-2 border-t-transparent border-gray-600 rounded-full animate-spin" />
                      ) : (
                        <AiOutlinePlus size={16} />
                      )}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center">
                <p>No Data are available</p>
              </div>
            )}
          </div>
          <div className="px-4 py-3 border-t gap-5">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Total:</span>
              <span className="font-bold text-xl text-green-600">
                ${data?.cart?.totalPrice?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className=" text-sm">Qty:</span>
              <span className="font-bold text-md text-gray-500">
                {data?.cart?.totalItems}
              </span>
            </div>

            <button
              className="w-full bg-black text-white p-2 rounded hover:bg-green-700 mt-4"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Purchase
            </button>
          </div>
        </>
      )}
      <AddressModal
        showLogin={showModal}
        SetshowLogin={() => {
          setShowModal(!showModal);
          onClose();
        }}
      />
    </motion.div>
  );
};

export default CartDrawer;
