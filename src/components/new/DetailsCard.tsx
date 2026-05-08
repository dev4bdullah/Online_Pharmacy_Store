"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";
import ProductCard from "../productcard";
import AuthModal from "../AuthModal";
import FeedbackComponent from "./FeedbackComponent";
import TestimonialSlider from "./TestimonialSlider";
import Loader from "../Loader";
import FloatingLabelInput from "./FloatingLabelInput";
import StarRating from "./StarRating";
import Btn from "../Btn";
import {
  useAddToCartMutation,
  usePostTestimonialMutation,
} from "@/redux/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const DetailsCard = ({ product, suggestedProducts }: any) => {
  const [addToCart, { isLoading: cartloader }] = useAddToCartMutation();

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || product.image
  );
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const [postTestimonial, { isLoading }] = usePostTestimonialMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log({ name, stars: rating, review });
    if (!name || !review || rating === 0) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await postTestimonial({ name, stars: rating, review }).unwrap();
      alert("Review submitted successfully!");
      setName("");
      setReview("");
      setRating(0);
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-6xl mx-auto p-4 md:py-12 grid md:grid-cols-2 gap-10"
      >
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {(product.images || [product.image]).map(
              (img: string, i: number) => (
                <Image
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  width={80}
                  height={80}
                  onClick={() => setSelectedImage(img)}
                  className={`cursor-pointer rounded-lg border ${
                    selectedImage === img
                      ? "border-green-600"
                      : "border-gray-200"
                  }`}
                />
              )
            )}
          </div>

          <div className=" overflow-hidden flex flex-col hadow-md">
            <Image
              src={selectedImage}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-[300px] object-cover rounded-xl "
              priority
            />
            <button
              className="mt-5 w-full bg-[#7CCCBB] text-white text-lg font-semibold py-3 rounded transition-all"
              onClick={async () => {
                if (!isLoggedIn) return setShowModal(true);
                try {
                  const res = await addToCart({
                    productId: product._id,
                  }).unwrap();
                  // if (res?.success) toast.success("Added to cart!");
                } catch {
                  // toast.error("Failed to add item.");
                }
              }}
            >
              {cartloader ? "Adding" : "Add to Cart"}
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-4xl font-bold text-gray-800 ">{product.name}</h1>
          <div className="text-xl font-bold text-black ">${product.price}</div>
          {/* <div className="flex items-center gap-2 text-gray-600">
            <Rating />
            (150 Reviews)
          </div> */}
          <p className="text-gray-600 text-base mb-6">
            {product.shortDescription ||
              "Detailed product description goes here."}
          </p>
        </div>
      </motion.section>

      <div className="w-[95%] mx-auto mt-12 mb-12">
        <p className="text-gray-600 text-lg mb-8">
          {product.description + product.description}
        </p>

        <TestimonialSlider />

        <AuthModal
          showLogin={showModal}
          SetshowLogin={() => setShowModal(!showModal)}
        />
      </div>
    </>
  );
};

export default DetailsCard;

const Rating = ({ value = 4 }) => (
  <div className="flex space-x-1 text-yellow-400 text-lg">
    {[...Array(5)].map((_, i) =>
      i < value ? (
        <FaStar key={i} />
      ) : (
        <FaRegStar key={i} className="text-gray-300" />
      )
    )}
  </div>
);
