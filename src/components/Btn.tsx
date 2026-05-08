import React from "react";

function Btn({ onPress, btnName, flag = "", disbale }: any) {
  return (
    <div
      className={`bg-[#7CCCBB] text-black py-2 px-5 rounded-full hover:scale-105 ${
        disbale
          ? "bg-gray-500 cursor-not-allowed pointer-events-none"
          : "cursor-pointer"
      } ${flag}`}
      onClick={!disbale ? onPress : undefined}
    >
      <span className="text-[1rem] font-semibold">{btnName}</span>
    </div>
  );
}

export default Btn;
