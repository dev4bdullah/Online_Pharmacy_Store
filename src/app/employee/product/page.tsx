"use client";
import Btn from "@/components/Btn";
import Loader from "@/components/Loader";
import EmployeeProductCard from "@/components/EmployproductCard";
import Title from "@/components/Title";
import { useGetProductsQuery } from "@/redux/employSlice";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 8;
  const [products, setProducts] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const { isLoading, data, isError, error } = useGetProductsQuery({
    page,
    limit,
  });

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => {
        const newPosts =
          page === 1 ? data.products : [...prev, ...data.products];
        const uniquePosts = newPosts.filter(
          (post, index, self) =>
            index === self.findIndex((p) => p._id === post._id)
        );

        return uniquePosts;
      });
      setLoadingMore(false);
    }
  }, [data, page]);
  return (
    <div className="w-full h-full flex flex-col  ">
      <Title
        title={"Product Management"}
        btnName={"Add Product"}
        onPress={() => {
          // navigate("/blogs/writeblog");
          router.push("/employee/product/write");
        }}
      />
      <div className="w-full h-3/4 overflow-y-auto">
        {isLoading ? (
          <div className="w-full h-1/2 flex items-center justify-center">
            <Loader />
          </div>
        ) : products.length > 0 ? (
          <div className="h-full flex-1 flex flex-col gap-5 ">
            {products.map((_, index) => (
              <EmployeeProductCard item={_} key={index} />
            ))}
          </div>
        ) : (
          <p>No Product Available</p>
        )}
      </div>
      {!isLoading && page < data?.pages && (
        <div className="w-full py-2  inline-flex items-center justify-end">
          {loadingMore ? (
            <div className="w-full  flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <Btn btnName={"Next Page"} onPress={() => setPage(page + 1)} />
          )}
        </div>
      )}
    </div>
  );
}

export default Page;
