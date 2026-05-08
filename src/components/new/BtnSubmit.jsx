import React from 'react';

function BtnSubmit({ S_BtnText, extra = "", textstyle = "text-white", onpress, type = "button" }) {
  return (
    <button
      type={type} // This can be "button", "submit", or "reset"
      className={`bg-gray-500  pointer-events-none rounded-[35px] cursor-pointer group hover:scale-105 ${extra}`}
      onClick={onpress} // This will be triggered if there's a custom onClick handler
    >
      <p className={`font-inter text-xs font-semibold md:text-[18px] lmd:eading-[18px] tracking-[0%] cursor-pointer ${textstyle}`}>
        {S_BtnText}
      </p>
    </button>
  );
}

export default BtnSubmit;
