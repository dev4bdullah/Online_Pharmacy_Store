"use client";
import Image from "next/image";
import { FaTruck, FaUserMd } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

export default function ServiceCards() {
  const services = [
    {
      title: "Get 25% OFF",
      icon: <FaTruck className="text-3xl sm:text-4xl text-blue-600" />,
      bgColor: "bg-[rgba(40,167,69,0.5)]",
    },
    {
      title: "Free Home Delivery",
      icon: <FaUserMd className="text-3xl sm:text-4xl text-green-600" />,
      bgColor: "bg-[#F4D279]",
    },
    {
      title: "Doctor's Appointment",
      icon: <FaUserMd className="text-3xl sm:text-4xl text-green-600" />,
      bgColor: "bg-[rgba(40,167,69,0.8)]",
    },
    {
      title: "Health Advice",
      icon: <FaUserMd className="text-3xl sm:text-4xl text-green-600" />,
      bgColor: "bg-[#EDCFFC]",
    },
  ];

  return (
    <div className="w-full mx-auto px-4 py-5 md:py-8 ">
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-5 lg:gap-10 items-center md:justify-start lg:justify-center flex-wrap">
        {services.map((service, index) => (
          <div
            key={index}
            className={`w-full md:w-[200px] xl:w-[290px] px-2 py-5 flex items-center justify-between rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${service?.bgColor}`}
          >
            <div className="flex items-center gap-2.5">
              <Image
                src="/price-off.svg"
                alt="Special offer"
                width={30}
                height={40}
                className="w-[35px] h-[40px] transition-transform duration-300 hover:rotate-6"
              />
              <h1 className="w-[85%] md:w-[70%] text-xl font-semibold">
                {service?.title}
              </h1>
            </div>
            <IoIosArrowForward
              size={30}
              className="transition-transform duration-300 hover:translate-x-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
