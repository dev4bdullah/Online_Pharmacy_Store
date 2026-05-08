"use client";
import HeroBlog from "@/components/HeroBlog";
import ProductCard from "@/components/new/ProductCard";
import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "@/redux/apiSlice";
import Loader from "@/components/Loader";
import AuthModal from "@/components/AuthModal";

function Page() {
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const limit = 12;
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading } = useGetProductsQuery({
    page: currentPage,
    limit,
  });

  const handleNextPage = () => {
    if (currentPage < data?.pages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handle previous page button click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
  return (
    <div className="flex flex-col items-center gap-5 bg-[#F5F5F5]">
      <HeroBlog
        H_Text={<>Our Products</>}
        M_Text="At Zahid Pharmacy, we offer a wide range of high-quality medications, health supplements and medical supplies to support your well-being. Our products are carefully selected to meet your health needs, with a focus on quality, safety and effectiveness
"
        isSBtnShow={true}
        S_BtnText="Contact Us"
      />

      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-[95%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10 mt-5">
          {products?.length > 0 ? (
            products.map((item: any) => (
              <ProductCard
                key={item._id}
                item={item}
                Show={() => {
                  setShowModal(true);
                }}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found.
            </p>
          )}
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex justify-center gap-5 mb-10 items-center">
        {currentPage >= 2 && (
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-teal-600 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
        )}

        <span>
          Page {currentPage} of {data?.pages}
        </span>

        {currentPage < data?.pages && (
          <button
            onClick={handleNextPage}
            disabled={currentPage === data?.pages}
            className="px-4 py-2 bg-teal-600 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        )}
      </div>
      <AuthModal
        showLogin={showModal}
        SetshowLogin={() => setShowModal(!showModal)}
      />
    </div>
  );
}

export default Page;
