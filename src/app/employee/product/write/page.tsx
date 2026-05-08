"use client";
import React, { useEffect, useState } from "react";
import AddImage from "@/components/AddImage";
import DropDown from "@/components/Dropdown";
import Textinput from "@/components/TextInput";
import TagsInput from "@/components/TagsInput";
import Desinput from "@/components/Desinputs";
import Loader from "@/components/Loader";
import Btn from "@/components/Btn";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCategoriesQuery,
  useGetProductByIdQuery,
} from "@/redux/apiSlice";
import {
  useAddProductMutation,
  useLoginUserMutation,
  useUpdateProductByIdMutation,
} from "@/redux/employSlice";
import { RootState } from "@/redux/store";

function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [image, setImage] = useState(null);
  const {
    data,
    isLoading: getLoader,
    error,
    isError,
  } = useGetProductByIdQuery(id);
  console.log(data);

  const [Preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const navigation = useRouter();
  const [content, setContent] = useState("");
  const [tags, settags] = useState([]);
  const [Text, setText] = useState("");
  const dispatch = useDispatch();
  const employUser = useSelector((state: RootState) => state.auth.employUser);

  const [input, setInput] = useState({
    category_id: -1,
    title: "",
    content: "",
    price: 0,
    stock: 0,
  });

  const { isLoading: cateLoader, data: CategoryData } = useGetCategoriesQuery();

  const [addProduct, { isLoading }] = useAddProductMutation();
  const [updateProductById, { isLoading: updateloader }] =
    useUpdateProductByIdMutation();
  useEffect(() => {
    if (id && data) {
      // Pre-fill the form fields with existing product data if it's an update
      setInput({
        category_id: data.product.category._id,
        title: data.product.name,
        content: data.product.description,
        price: data.product.price,
        stock: data.product.stock,
      });
      setImages(data.product.images);
      setPreviews(data.product.images.map((image) => image));
    }
  }, [id, data]);

  const handleSubmit = async () => {
    if (input.category_id === -1 || !input.title || !input.content) {
      alert("All fields are required!");
      return;
    }
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image); // The "images[]" will allow you to send multiple files with the same key
      });
      formData.append("category", input.category_id);
      formData.append("name", input.title);
      formData.append("description", input.content);
      formData.append("price", input.price);
      formData.append("stock", input.stock);
      let res = {};

      if (id) {
        res = await updateProductById({ id, formData });
      } else {
        res = await addProduct(formData);
      }
      console.log(res);

      if (res?.error?.data?.message) {
        alert(res.error.data.message);
      } else if (res?.data?.message) {
        alert("Product posted successfully");
        setImages([]);
        setPreview([]);
        setInput({
          category_id: -1,
          title: "",
          content: "",
          price: 0,
          stock: 0,
        });
      } else if (res?.data?.data?.message) {
        alert("Product update successfully");
        setImages([]);
        setPreview([]);
        setInput({
          category_id: -1,
          title: "",
          content: "",
          price: 0,
          stock: 0,
        });
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleImageChange = (event: any) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 1024 * 1024
    );

    if (validFiles.length === 0) {
      alert("Please upload images under 1MB only.");
      return;
    }

    setImages(validFiles);
    setPreviews(validFiles.map((file) => URL.createObjectURL(file)));
  };

  return (
    <div>
      <div className="w-full flex flex-col gap-10 ">
        <AddImage
          id="productImage"
          handleImageChange={handleImageChange}
          image={previews}
        />
        <div className="w-[90%] flex items-center gap-10 justify-between">
          <div className="w-[48%]">
            {cateLoader ? (
              <Loader />
            ) : (
              <DropDown
                title={"Add Product Category"}
                flag={true}
                value={input.category_id}
                data={CategoryData?.categories}
                onChange={(e) => {
                  setInput((pre) => ({
                    ...pre,
                    category_id: e.target.value,
                  }));
                }}
              />
            )}
          </div>
          <div className="w-[48%]">
            <DropDown title={"Written By"} name={employUser?.name} />
          </div>
        </div>

        <div className="w-[90%]">
          <Textinput
            title={"Add Product Title"}
            value={input.title}
            placeholder="Enter Product Title"
            onChange={(e) =>
              setInput((pre) => ({ ...pre, title: e.target.value }))
            }
          />
        </div>
        <div className="w-[90%] flex items-center gap-10 justify-between">
          <Textinput
            title={"Product Price"}
            value={input.price}
            type="number"
            placeholder="Write Product Price"
            onChange={(e) =>
              setInput((pre) => ({ ...pre, price: e.target.value }))
            }
          />
          <Textinput
            title={"Stock"}
            value={input.stock}
            placeholder="Stock Details"
            onChange={(e) =>
              setInput((pre) => ({ ...pre, stock: e.target.value }))
            }
          />
        </div>

        {/* <div className="w-[90%]">
          <TagsInput
            title={"Add Tags"}
            tags={tags}
            settags={(val) => settags((pre) => [...pre, val])}
            Text={Text}
            removeTag={(val) => settags((pre) => pre.filter((e) => e !== val))}
            setText={setText}
          />
        </div> */}

        <div className="w-[90%]">
          <Desinput
            title={"Add Description"}
            content={input.content}
            setContent={(val) => setInput((pre) => ({ ...pre, content: val }))}
          />
        </div>

        <div className="w-[90%] inline-flex justify-end gap-5">
          <Btn
            btnName={"Cancel"}
            flag="bg-gray-500 text-white"
            onPress={() => navigation.back()}
          />
          {isLoading || updateloader ? (
            <Loader />
          ) : (
            <Btn btnName={id ? "Update" : "upload"} onPress={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
