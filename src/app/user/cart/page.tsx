"use client";
import React, { useEffect, useState } from "react";
import Btn from "@/components/Btn";
import HeroBlog from "@/components/HeroBlog";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  useDecrementCartItemMutation,
  useGetCartQuery,
  useIncrementCartItemMutation,
} from "@/redux/apiSlice";
import Loader from "@/components/Loader";
import AddressModal from "@/components/AddressModal";

function Page() {
  const { data, isLoading, refetch } = useGetCartQuery();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const cartItems = data?.cart?.items || [];
  const totalPrice = data?.cart?.totalPrice?.toFixed(2) || "0.00";
  const totalItems = data?.cart?.totalItems || 0;

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-5 bg-[#F5F5F5]">
      <HeroBlog
        H_Text={<>Your Cart</>}
        M_Text="You're almost there! Review your selected items and proceed to checkout for a quick and secure purchase. Zahid Pharmacy is ready to deliver your health essentials right to your door.
"
        isSBtnShow={true}
        S_BtnText="Contact Us"
      />
      <div className="w-[90%] mx-auto p-4">
        <h1 className="font-semibold text-[36px] mt-10 mb-10">
          Total Selected Products
        </h1>
        {cartItems.length > 0 && (
          <div className="flex items-center justify-between font-semibold text-gray-700 px-4 mb-2">
            <span className="w-14 text-center">Image</span>
            <span className="w-32 text-center">Name</span>
            <span className="w-24 text-center">Quantity</span>
            <span className="w-16 text-center">Price</span>
            <span className="w-20 text-center">Subtotal</span>
          </div>
        )}
        <div className="mt-10 w-full flex flex-col gap-5 h-max-[500px] ">
          {cartItems.length > 0 ? (
            cartItems.map((item: any, i: number) => (
              <CartCard key={i} item={item} refetch={refetch} />
            ))
          ) : (
            <p className="w-full mx-auto items-center text-center">
              No items in cart.
            </p>
          )}
        </div>
      </div>

      {cartItems.length > 0 && (
        <div className="w-[90%] mx-auto flex flex-col items-start mb-10 gap-2">
          <h1 className="font-semibold text-[26px] mt-10 ">Cart Total</h1>
          <PriceCard label="Subtotal" value={`${totalPrice} PKR`} />
          <PriceCard label="Total Items" value={totalItems} />
          <div className="mt-2">
            <Btn
              btnName="Proceed to Checkout"
              onPress={() => setShowModal(true)}
              // onPress={() => (window.location.href = "/user/checkout")}
            />
          </div>
        </div>
      )}
      <AddressModal
        showLogin={showModal}
        SetshowLogin={() => {
          setShowModal(!showModal);
        }}
      />
    </div>
  );
}

export default Page;

const CartCard = ({ item, refetch }: any) => {
  const [incrementItem, { isLoading: isIncrementing }] =
    useIncrementCartItemMutation();
  const [decrementItem, { isLoading: isDecrementing }] =
    useDecrementCartItemMutation();

  const handleIncrement = async () => {
    await incrementItem(item.productId);
    refetch();
  };

  const handleDecrement = async () => {
    await decrementItem(item.productId);
    refetch();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
        <img
          src={item.image}
          alt={item.name}
          className="w-14 h-14 rounded-xl object-cover"
        />
        <span className="text-lg font-medium w-32 text-center">
          {item.name}
        </span>

        {isIncrementing || isDecrementing ? (
          <div className="w-24 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              disabled={isDecrementing}
              onClick={handleDecrement}
              className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              <FaMinus size={14} />
            </button>
            <input
              type="number"
              readOnly
              value={item.quantity}
              className="w-12 text-center"
            />
            <button
              disabled={isIncrementing}
              onClick={handleIncrement}
              className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              <FaPlus size={14} />
            </button>
          </div>
        )}

        <span className="w-auto text-center">{item.price.toFixed(2)} PKR</span>
        <span className="w-auto text-center font-semibold">
          {(item.price * item.quantity).toFixed(2)} PKR
        </span>
      </div>
    </div>
  );
};

const PriceCard = ({ label, value }: { label: string; value: any }) => (
  <div className="flex justify-between items-center border rounded-lg px-4 py-3 w-full max-w-md shadow-sm">
    <span className="text-black text-md font-medium">{label}</span>
    <span className="text-black font-semibold">{value}</span>
  </div>
);
