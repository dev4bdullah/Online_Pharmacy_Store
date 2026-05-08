"use client";

import { IoIosArrowRoundForward } from "react-icons/io";

interface TitleCardProps {
  title: string;
  onpress: () => void;
}

const TitleCard: React.FC<TitleCardProps> = ({ title, onpress }) => {
  return (
    <div className="w-full py-5 flex items-center justify-between">
      <span className="text-xl font-semibold">{title}</span>
      <div
        onClick={onpress}
        className="flex items-center text-[rgba(40,167,69)] font-semibold font-serif cursor-pointer"
        aria-label={`View all ${title}`}
      >
        <span>View all</span>
        <IoIosArrowRoundForward
          className="font-serif font-semibold"
          size={30}
        />
      </div>
    </div>
  );
};

export default TitleCard;
