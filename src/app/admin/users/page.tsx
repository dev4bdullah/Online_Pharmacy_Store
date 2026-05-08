"use client";
import Btn from "@/components/Btn";
import Loader from "@/components/Loader";
import EmployeeProductCard from "@/components/EmployproductCard";
import Title from "@/components/Title";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetOrdersQuery,
  useGetUsersQuery,
  useGetUserssQuery,
} from "@/redux/adminSlice";
import OrderCard from "@/components/new/OrderCard";
import EmployerCard from "@/components/new/EmployerCard";
import UsersCard from "@/components/new/UsersCard";

function Page() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 3;
  const [orders, setOrders] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, isLoading, isError, error } = useGetUserssQuery();

  useEffect(() => {
    if (data?.employers) {
      setOrders((prev) => {
        const newOrders =
          page === 1 ? data.employers : [...prev, ...data.employers];
        const uniqueOrders = newOrders.filter(
          (order, index, self) =>
            index === self.findIndex((o) => o._id === order._id)
        );
        return uniqueOrders;
      });
      setLoadingMore(false);
    }
  }, [data, page]);
  console.log(data);

  return (
    <div className="w-full h-full flex flex-col">
      <Title
        title={"Orders"}
        shown={false}
        btnName={"Add Product"}
        onPress={() => router.push("/employee/product/write")}
      />
      <div className="w-full h-3/4 overflow-y-auto">
        {isLoading ? (
          <div className="w-full h-1/2 flex items-center justify-center">
            <Loader />
          </div>
        ) : orders.length > 0 ? (
          <div className="h-full flex-1 flex flex-col gap-5">
            {orders.map((order, index) => (
              <UsersCard item={order} key={index} />
            ))}
          </div>
        ) : (
          <p>No Employer Available</p>
        )}
      </div>
      {!isLoading && page < data?.pages && (
        <div className="w-full py-2 inline-flex items-center justify-end">
          {loadingMore ? (
            <div className="w-full flex items-center justify-center">
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
