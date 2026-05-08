import React from "react";

function CounterCard({ value, title }: any) {
  return (
    <div className="flex items-center justify-center text-white gap-2">
      <div className="flex flex-col gap-1">
        <h1 className="text-[2rem] font-bold text-white leading-none">
          {value}
        </h1>
        <span className="text-[1rem] text-white">{title}</span>
      </div>
    </div>
  );
}

export default CounterCard;
