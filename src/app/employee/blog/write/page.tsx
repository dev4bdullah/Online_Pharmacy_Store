"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Btn from "@/components/Btn";
import Loader from "@/components/Loader";
import { useAddCategoryMutation } from "@/redux/employSlice";
function CreateCategoryPage() {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useRouter();

  // Use the mutation hook
  const [addCategory, { isLoading, isError, error: mutationError }] =
    useAddCategoryMutation();

  const handleCategorySubmit = async () => {
    if (!categoryName) {
      setError("Category name is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call the mutation here
      const result = await addCategory({ name: categoryName });

      // Check for success or failure
      if (isError) {
        setError(mutationError?.message || "Something went wrong");
        setLoading(false);
        return;
      }

      // On success, navigate back or show a success message
      alert("Category created successfully!");
      navigation.back(); // Navigate to the categories page or any page you want
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while creating the category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 pt-10 xl:p-0">
      <div className="w-[90%]  mx-auto">
        <label
          htmlFor="categoryName"
          className="block text-lg font-semibold mb-2"
        >
          Category Name
        </label>
        <input
          type="text"
          id="categoryName"
          className="w-full p-2 border rounded-md"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="w-[95%] inline-flex justify-end gap-5">
        <Btn
          btnName="Cancel"
          flag="bg-gray-500 text-white"
          onPress={() => navigation.back()}
        />
        {isLoading || loading ? (
          <Loader />
        ) : (
          <Btn btnName="Create Category" onPress={handleCategorySubmit} />
        )}
      </div>
    </div>
  );
}

export default CreateCategoryPage;
