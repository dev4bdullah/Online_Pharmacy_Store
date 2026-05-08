import React from "react";

const FloatingLabelInput = ({ id, label, type = "text",onchange,name }) => {
  return (
    <div className="w-full relative mt-4">
      <input
        type={type}
        id={id}
        required
        className="block px-2.5 pb-2.5 md:pb-6 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        name={name}

        onChange={(e)=>onchange(e)}
      />
      <label
        htmlFor={id}
        className="absolute  font-bold text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;