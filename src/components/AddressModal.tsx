"use client";
import { usePostOrderMutation } from "@/redux/apiSlice";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddressModalProps {
  showLogin: boolean;
  SetshowLogin: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
  showLogin,
  SetshowLogin,
}) => {
  const [step, setStep] = useState<"address" | "payment">("address");
  const [postOrder, { isLoading, error }] = usePostOrderMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    if (showLogin) {
      setStep("address");
    }
  }, [showLogin]);

  useEffect(() => {
    if (error) {
      if (error?.data?.message) {
        toast.error(error.data.message);
        return;
      } else {
        toast.error("Failed to place order. Please try again.");
      }
      setIsSubmitting(false);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const order = await postOrder({
        shippingAddress: {
          street: address.street,
          city: address.city,
          state: address.state,
          postalCode: address.zip,
          country: address.country,
        },
        paymentMethod: "paypal",
      }).unwrap();

      toast.success("Order placed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("Order created:", order);

      SetshowLogin();
    } catch (err) {
      console.error("Order failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSubmit = async () => {
    await handleSubmit();
  };

  if (!showLogin) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={SetshowLogin}
    >
      <ToastContainer position="top-center" autoClose={3000} />
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-lg relative overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "90vh" }}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {step === "address" ? "Shipping Information" : "Payment Details"}
          </h2>
          <button
            onClick={SetshowLogin}
            disabled={isSubmitting}
            className="text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors p-2 -mt-1 -mr-1 disabled:opacity-50"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="w-full relative">
          {/* Address Form */}
          <div
            className={`transition-all duration-300 ${
              step === "address" ? "block" : "hidden"
            }`}
          >
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              {[
                { field: "street", label: "Street Address" },
                { field: "city", label: "City" },
                { field: "state", label: "State/Province" },
                { field: "zip", label: "ZIP/Postal Code" },
                { field: "country", label: "Country" },
              ].map(({ field, label }) => (
                <div key={field} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    name={field}
                    type="text"
                    value={(address as any)[field]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-black hover:bg-green-700 text-white py-3 rounded-lg mt-4 font-medium transition-colors flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Continue to Payment"
                )}
              </button>
            </form>
          </div>

          {/* Payment Form */}
          <div
            className={`transition-all duration-300 ${
              step === "payment" ? "block" : "hidden"
            }`}
          >
            <div className="space-y-4">
              {[
                {
                  field: "cardNumber",
                  label: "Card Number",
                  placeholder: "1234 5678 9012 3456",
                },
                { field: "expiry", label: "Expiry Date", placeholder: "MM/YY" },
                { field: "cvv", label: "CVV", placeholder: "123" },
              ].map(({ field, label, placeholder }) => (
                <div key={field} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isSubmitting}
                  />
                </div>
              ))}
              <button
                onClick={handlePaymentSubmit}
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-green-700 text-white py-3 rounded-lg mt-4 font-medium transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing Order...
                  </>
                ) : (
                  "Complete Purchase"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
