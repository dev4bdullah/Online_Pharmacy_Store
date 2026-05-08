import React from "react";
import Btn from "../Btn";

function HomeSecction() {
  return (
    <div className="w-full mx-auto">
      <div className="w-full flex justify-center items-center pt-[100px] lg:pt-[105px] pb-[100px] lg:pb-[105px]">
        <div className="w-[90%] mx-auto flex flex-col lg:flex-row justify-between items-center gap-10 md:gap-16">
          <img src="/assets/SecondSec_Image.svg" alt="Section Image" />
          <div className="flex flex-col justify-center items-start gap-4 md:gap-7">
            <p className="font-inter font-semibold text-[1.5rem] md:text-[56px] md:leading-[60px] tracking-[0%] align-centre">
              Why Choose Us?
            </p>
            <p className="font-inter font-normal text-sm md:text-[18px] md:leading-[28px] tracking-[0%] align-center">
            At Zahid Pharmacy, we are dedicated to providing affordable, high-quality health care solutions. Our experienced team offers a wide range of medications, medical supplies, and health services to meet your needs
            </p>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-[50px]">
              <div className="flex flex-col gap-[15px] font-inter font-medium text-[20px] leading-[28px] tracking-[0%] lg:w-[45%]">
                <div className="flex justify-start items-center gap-[10px]">
                  <img
                    src="/assets/TickIcone.svg"
                    alt="tick"
                    className="w-6 h-6"
                  />
                  Experienced Team
                </div>
                <div className="flex justify-start items-center gap-[10px]">
                  <img
                    src="/assets/TickIcone.svg"
                    alt="tick"
                    className="w-6 h-6"
                  />
                  Convenient Services
                </div>
                <div className="flex justify-start items-center gap-[10px]">
                  <img
                    src="/assets/TickIcone.svg"
                    alt="tick"
                    className="w-6 h-6"
                  />
                  Affordable Prices
                </div>
                <div className="flex justify-start items-center gap-[10px]">
                  <img
                    src="/assets/TickIcone.svg"
                    alt="tick"
                    className="w-6 h-6"
                  />
                 Fast and Secure Delivery
                </div>
              </div>

              <div className="flex flex-col gap-[15px] font-inter font-medium text-[20px] leading-[28px] tracking-[0%] lg:w-[45%]">
                <div className="flex justify-start items-center gap-[10px]">
                  <img
                    src="/assets/TickIcone.svg"
                    alt="tick"
                    className="w-6 h-6"
                  />
                  24/7 Availablitity
                </div>
                <div className="flex justify-start items-center gap-[10px]">
                  <img
                    src="/assets/TickIcone.svg"
                    alt="tick"
                    className="w-6 h-6"
                  />
                  Certified Medicines
                </div>
                <div className="flex justify-start items-center gap-[10px]">
                  <img
                    src="/assets/TickIcone.svg"
                    alt="tick"
                    className="w-6 h-6"
                  />
                  Easy return & exchange
                </div>
                <div className="flex justify-start items-center gap-[10px]">
                  <img
                    src="/assets/TickIcone.svg"
                    alt="tick"
                    className="w-6 h-6"
                  />
                  Wide Range of Offerings
                </div>
              </div>
            </div>

            <Btn
              btnName={"Explore More"}
              onPress={() => {
                window.location.href = "/user/products";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSecction;
