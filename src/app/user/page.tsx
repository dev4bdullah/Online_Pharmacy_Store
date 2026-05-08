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
import Btn from "@/components/Btn";
import HomeSecction from "@/components/new/HomeSecction";
import HeroBlog from "@/components/new/HomeHero";
import StatisticsCards from "@/components/StatisticsCards";
import CounterCard from "@/components/CounterCard";
import DidYouKnow from "@/components/DidYouKnow";
import BestProductSection from "@/components/BestProductSection";
import TestimonialSlider from "@/components/new/TestimonialSlider";
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
      {/* <Category /> */}

      <HeroBlog
        H_Text={<>Your Cart</>}
        M_Text="We committed to providing quality medications and health care products at competitive prices"
        isSBtnShow={true}
        S_BtnText="Contact Us"
      />
      <HomeSecction />
      {/* <StatisticsCards /> */}
      <div className="hidden xl:flex mb-16  bg-transparent">
        <div className=" w-[95%] h-[210px] px-10 flex items-center justify-evenly rounded-full bg-[#167B70] bg-cover bg-center mx-auto border-[20px] border-[#A2F7D5] box-border border-t-[0px] border-b-[0px] ">
          <CounterCard value={"20+"} title={"Year experiences"} />
          <CounterCard value={"12+"} title={"Satisfied clients"} />
          <CounterCard value={"50+"} title={"Medical Categories"} />
        </div>
      </div>

      <div className="w-[95%] mx-auto flex md:flex-row gap-10 mb-10">
        <Card
          title={"Maximum Absorption"}
          des={
            "Our products are designed with 100% bioavailable, micro-sized nutrient particles, small enough to fully absorb and reach your cells for maximum effectiveness."
          }
        />
        <Card
          title={"Quality Ingredient"}
          des={
            "Zahid Pharmacy offers carefully selected ingredients in every product, ensuring that you get the highest quality for your health needs."
          }
        />
        <Card
          title={"Health Support"}
          des={
            "Our products support a wide range of health benefits, from immune support to digestive health and more, tailored to meet individual health requirements."
          }
        />
      </div>
      <div className="w-full overflow-hidden">
        <BestProductSection />
      </div>
      <TestimonialSlider />

      <AuthModal
        showLogin={showModal}
        SetshowLogin={() => setShowModal(!showModal)}
      />
    </>
  );
}

export default page;
const Card = ({ title, des }: any) => (
  <div className="w-[100%] md:w-fit p-6 bg-white rounded-3xl shadow-lg relative">
    <div className="absolute -top-6 right-6 w-14 h-14 bg-teal-700 rounded-full flex items-center justify-center">
      <div className="grid grid-cols-3 gap-1 w-6 h-6">
        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
      </div>
    </div>
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600 text-sm">{des}</p>
  </div>
);
