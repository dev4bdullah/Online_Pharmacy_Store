import React from "react";

function Textinput({  maxLength=undefined,title,value,type="text" ,onChange ,placeholder="Add Blog Title"}) {
  return (
    <div className="w-full flex flex-col   mb-2.5 gap-2">
      <strong>{title}</strong>

      <div className="bg-[#f7f7f7] border border-[#b1b1b1] box-border rounded-xl px-3 outline-none h-14 flex items-center w-full ">
        
        <input
        maxLength={maxLength}
        value={value}
        type={type} className="w-full outline-none bg-transparent flex" placeholder={placeholder}
        onChange={onChange}
        />
      </div>
    </div>
  );
}

export default Textinput;
