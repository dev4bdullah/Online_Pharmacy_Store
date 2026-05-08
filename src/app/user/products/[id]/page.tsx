"use client";
import Loader from "@/components/Loader";
import DetailsCard from "@/components/new/DetailsCard";
import { useGetProductByIdQuery } from "@/redux/apiSlice";
import { useEffect, useState } from "react";

// Remove this mock function since you're using RTK Query
// const getProductById = async (id: string) => {...}

const ProductPage = ({ params }: { params: { id: string } }) => {
  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useGetProductByIdQuery(params.id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  console.log(error);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (isError || !product?.success) {
    // Option 1: Return a not found page component
    return (
      <div className="h-[80vh] pt-16 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">404 - Product Not Found</h1>
        <p>The product you're looking for doesn't exist.</p>
      </div>
    );
  }
  if (isError || !product) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <p>Error loading product or product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {isClient && (
        <DetailsCard
          product={product?.product}
          suggestedProducts={product?.suggestion}
        />
      )}
    </div>
  );
};

export default ProductPage;
