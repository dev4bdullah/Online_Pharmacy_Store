import React from "react";

function DropDown({
  title,
  value,
  flag,
  onChange,
  name="Muhammad",
  data = ["Smartwatch E2", "Smartphone X", "Smartphone X"],
}) {
  
  return (
    <div className="w-full flex flex-col  mb-2.5 gap-2">
      <strong>{title}</strong>
      {flag ? (
        <select className="bg-[#f7f7f7] border border-[#b1b1b1] box-border rounded-xl px-3 outline-none w-full h-12 appearance-none bg-[url('https://www.svgrepo.com/show/80156/down-arrow.svg')] bg-no-repeat bg-[length:14px_14px] bg-[position:calc(100%-16px)]"
        onChange={onChange}
        value={value}
        >
          <option value={-1} disabled>Select Service</option>
          {data.map((e) => (
            <option value={e?._id}>{e?.name}</option>
          ))}
        </select>
      ) : (
        <div className="bg-[#e0e0e0] border border-[#b1b1b1] box-border rounded-xl px-3 outline-none h-12 flex items-center w-full opacity-70 cursor-not-allowed">
          <span className="text-gray-500">{name}</span>
        </div>
      )}
    </div>
  );
}

export default DropDown;
