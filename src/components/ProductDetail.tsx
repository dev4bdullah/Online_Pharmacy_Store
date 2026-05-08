"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "./productcard";
import AuthModal from "./AuthModal";

const ProductDetail = ({ product, suggestedProducts }: any) => {
  const [qty, setQty] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || product.image
  );

  const increaseQty = () => setQty(qty + 1);
  const decreaseQty = () => qty > 1 && setQty(qty - 1);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-6xl mx-auto p-4 md:py-12 grid md:grid-cols-2 gap-10"
      >
        <div className="flex gap-4">
          {/* Thumbnails */}
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

          {/* Main Image */}
          <div className="rounded-xl overflow-hidden shadow-md">
            <Image
              src={selectedImage}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          {/* Short Description */}
          <p className="text-gray-600 text-base mb-6">
            {product.shortDescription}
          </p>

          {/* Price */}
          <div className="text-3xl font-bold text-green-600 mb-6">
            ${product.price}
          </div>

          {/* Quantity Selection */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={decreaseQty}
              className="w-9 h-9 text-lg rounded bg-gray-200 hover:bg-gray-300"
            >
              −
            </button>
            <span className="text-lg font-medium">{qty}</span>
            <button
              onClick={increaseQty}
              className="w-9 h-9 text-lg rounded bg-gray-200 hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-black hover:bg-green-700 text-white text-lg font-semibold py-3 rounded transition-all">
            Add {qty} to Cart
          </button>

          {/* Full Product Description */}
        </div>

        {/* Suggested Products Section */}
      </motion.section>
      <div className="w-[95%] mx-auto mt-12 mb-12">
        <p className="text-gray-600 text-lg mb-8">
          {product.description + product.description}
        </p>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          You Might Also Like
        </h2>
        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4  gap-6">
          {suggestedProducts?.length > 0 ? (
            suggestedProducts.map((product: any, i: number) => (
              <ProductCard
                key={product._id}
                item={product}
                Show={() => {
                  setShowModal(true);
                }}
              />
            ))
          ) : (
            <p className="text-gray-500">No suggested products available.</p>
          )}
        </div>
        <AuthModal
          showLogin={showModal}
          SetshowLogin={() => setShowModal(!showModal)}
        />
      </div>
    </>
  );
};

export default ProductDetail;
