"use client";
import Category from "@/components/category";
import Header from "@/components/header";
import OfferCards from "@/components/offerscard";
import PrescriptionSlider from "@/components/PrescriptionSlider";
import ProductCard from "@/components/productcard";
import ServiceCards from "@/components/servicecards";
import TitleCard from "@/components/titlecard";
import React, { useState } from "react";
import PromoBanner from "@/components/PromoBanner";
import NewsBlogsSection from "@/components/NewsBlogsSection";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/redux/apiSlice";
import Loader from "@/components/Loader";
import AuthModal from "@/components/AuthModal";
import { motion } from "framer-motion";
function page() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const { data: recently_product, isLoading: recently_loader } =
    useGetProductsQuery({
      page: 1,
      limit: 4,
      isRecently: true,
    });
  const {
    data: popular_product,

    isLoading: popular_loader,
  } = useGetProductsQuery({
    page: 1,
    limit: 4,
    isTrending: true,
  });
  const {
    data: top_product,

    isLoading: top_loader,
  } = useGetProductsQuery({
    page: 1,
    limit: 4,
    isTop: true,
  });
  return (
    <>
      <Category />
      <div className="w-full mx-auto">
        <PrescriptionSlider />
      </div>
      <ServiceCards />
      <div className="w-[95%] mx-auto">
        <TitleCard
          title={"New Products"}
          onpress={() => {
            router.push("/user/products?new_products=true");
          }}
        />
        {recently_loader ? (
          <div className="w-full mx-auto flex items-center justify-center">
            <Loader />
          </div>
        ) : recently_product?.products?.length >= 1 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recently_product?.products?.map((product: any) => (
              <ProductCard
                key={product._id}
                item={product}
                Show={() => {
                  setShowModal(true);
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-sm mt-4">
            No products available at the moment.
          </p>
        )}
      </div>
      <div className="w-[95%] mx-auto">
        <TitleCard
          title={"Popular Products"}
          onpress={() => {
            router.push("/user/products?popular_products=true");
          }}
        />
        {popular_loader ? (
          <div className="w-full mx-auto flex items-center justify-center">
            <Loader />
          </div>
        ) : popular_product?.products?.length >= 1 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popular_product?.products?.map((product: any) => (
              <ProductCard
                key={product._id}
                item={product}
                Show={() => {
                  setShowModal(true);
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-sm mt-4">
            No products available at the moment.
          </p>
        )}
      </div>

      <OfferCards />
      <div className="w-[95%] mx-auto">
        <TitleCard
          title={"Top Products"}
          onpress={() => {
            router.push("/user/products?top=true");
          }}
        />
        {top_loader ? (
          <div className="w-full mx-auto flex items-center justify-center">
            <Loader />
          </div>
        ) : top_product?.products?.length >= 1 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {top_product?.products?.map((product: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <ProductCard
                  key={product._id}
                  item={product}
                  Show={() => {
                    setShowModal(true);
                  }}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-sm mt-4">
            No products available at the moment.
          </p>
        )}
      </div>

      {/* <div className="w-[95%] mx-auto">
        <TitleCard title={"UpComming Products"} />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           <ProductCard
              key={product._id}
              item={product}
              Show={() => {
                setShowModal(false);
              }}
            />
           <ProductCard
              key={product._id}
              item={product}
              Show={() => {
                setShowModal(false);
              }}
            />
           <ProductCard
              key={product._id}
              item={product}
              Show={() => {
                setShowModal(false);
              }}
            />
           <ProductCard
              key={product._id}
              item={product}
              Show={() => {
                setShowModal(false);
              }}
            />
        </div>
      </div> */}
      <PromoBanner />
      <NewsBlogsSection />
      <AuthModal
        showLogin={showModal}
        SetshowLogin={() => setShowModal(!showModal)}
      />
    </>
  );
}

export default page;
