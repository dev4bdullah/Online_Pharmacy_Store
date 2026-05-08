"use client";
import { useEffect, useState } from "react";
import Btn from "./Btn";
import { useGetProductsQuery } from "@/redux/apiSlice";
import Loader from "./Loader";
import Link from "next/link";

export default function BestProductSection() {
  const items = [1, 2, 3];
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const limit = 3;
  const [products, setProducts] = useState([]);

  const { data, isLoading } = useGetProductsQuery({
    page: currentPage,
    limit,
  });
  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => {
        const newPosts =
          currentPage === 1 ? data.products : [...prev, ...data.products];
        const uniquePosts = newPosts.filter(
          (post, index, self) =>
            index === self.findIndex((p) => p._id === post._id)
        );

        return uniquePosts;
      });
      // setLoadingMore(false);
    }
  }, [data, currentPage]);

  return isLoading ? (
    <div className="h-screen flex items-center justify-center">
      <Loader />
    </div>
  ) : (
    <section className="px-4 py-10 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Our Best Product
            </h2>
            <p className="text-gray-500 max-w-md text-sm leading-relaxed">
            At Zahid Pharmacy, we offer a selection of top-quality medications to help you maintain optimal health. Here are some of our best-selling products
            </p>
          </div>
          <Btn
            btnName="View All"
            onPress={() => {
              window.location.href = "/user/products";
            }}
          />
        </div>

        {/* Product Cards */}
        <div className=" mt-8 space-y-4">
          {products?.length > 0 ? (
            products.map((item: any) => <Item index={item._id} item={item} />)
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
const Item = ({ item, index }: any) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <div
      key={index}
      onMouseEnter={() => setShowImage(true)}
      onMouseLeave={() => setShowImage(false)}
      className="relative flex items-center justify-between p-6 border rounded-2xl shadow-sm bg-white "
    >
      {/* <div
        className={`absolute top-0 right-0 h-full w-full z-10 transition-transform duration-500 ease-in-out transform ${
          showImage
            ? "translate-x-3/4 opacity-100 pointer-events-auto"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <img
          src={item?.images[0]}
          alt="Preview"
          className="h-[100px] w-[100px] rotate-45"
        />
      </div> */}

      <div className="flex items-center justify-between w-full relative z-20">
        <div className="min-w-[50px] flex justify-center">
          <img
            src={item?.images[0]}
            alt="Preview"
            className="h-[100px] w-[100px]"
          />
        </div>

        <Link
          href={`/user/products/${item?._id}`}
          className="max-w-[140px] text-lg font-semibold text-gray-800 truncate cursor-pointer"
        >
          {item?.name}
        </Link>

        <div className="w-16 h-px bg-gray-300 mx-4" />

        <div className="flex-1 text-sm text-gray-600 max-w-xl truncate">
          {item.description}
        </div>

        {/* <div className="min-w-[40px] h-8 w-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shadow ml-4 text-sm cursor-pointer">
          ⟳
        </div> */}
      </div>
    </div>
  );
};
