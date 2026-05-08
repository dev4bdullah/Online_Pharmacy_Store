"use client";
import Btn from "@/components/Btn";
import Loader from "@/components/Loader";
import EmployeeProductCard from "@/components/EmployproductCard";
import Title from "@/components/Title";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/redux/employSlice";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetCartQuery } from "@/redux/apiSlice";
import CategoryCard from "@/components/new/CategoryCard";

function Page() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 3;
  const [products, setProducts] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const { isLoading, data, isError, error } = useGetCategoriesQuery();
  console.log(data?.categories);

  return (
    <div className="w-full h-full flex flex-col  ">
      <Title
        title={"Category Management"}
        btnName={"Add Category"}
        onPress={() => {
          // navigate("/blogs/writeblog");
          router.push("/employee/blog/write");
        }}
      />
      <div className="w-full h-3/4 overflow-y-auto">
        {isLoading ? (
          <div className="w-full h-1/2 flex items-center justify-center">
            <Loader />
          </div>
        ) : data?.categories?.length > 0 ? (
          <div className="h-full flex-1 flex flex-col gap-5 ">
            {data?.categories?.map((_, index) => (
              <CategoryCard item={_} key={index} />
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
