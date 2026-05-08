'use client'
import { useState } from "react";
function AddImage({ title = "Add Images", handleImageChange, image = [], id = "fileInput" }) {
  return (
    <div className="w-full flex flex-col gap-4 p-4 border rounded-md shadow-md">
      <strong className="text-xl font-bold">{title}</strong>
      <label htmlFor={id} className="text-blue-600 underline cursor-pointer">
        Click to upload multiple images
      </label>
      <input
        id={id}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      <div className="flex flex-wrap gap-4 mt-2">
        {image?.length > 0 ? (
          image?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`preview-${i}`}
              className="w-32 h-32 object-cover rounded-md border"
            />
          ))
        ) : (
          <p className="text-gray-500">No images selected</p>
        )}
      </div>
    </div>
  );
}


export default AddImage;
