import React from "react";
import Btn from "./Btn";

function Title({
  title,
  onPress,
  btnName,
  disbale = false,
  shown = true,
}: any) {
  return (
    <div className={`w-full flex items-center justify-between py-7`}>
      <span className="hidden xl:flex text-black font-bold text-[1.5rem]">
        {title}
      </span>
      {shown && <Btn disbale={disbale} btnName={btnName} onPress={onPress} />}
    </div>
  );
}

export default Title;
