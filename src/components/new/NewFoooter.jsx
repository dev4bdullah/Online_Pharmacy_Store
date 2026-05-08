'use client'
import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="relative bg-[url('/Footer_Background.svg')] bg-cover bg-center h-[400px] flex flex-col items-center justify-center text-white pt-10 pb-6 px-4">
      <div className="hidden  xl:flex  absolute top-10 left-1/2 -translate-x-1/2 bg-[#31302F] px-6 py-10 rounded-lg shadow-2xl   items-center justify-between gap-4 w-full max-w-3xl">
        <label className="text-white font-semibold whitespace-nowrap">
          Subscribe Newsletters
        </label>

        <div className="flex bg-white rounded-md overflow-hidden">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 text-sm text-black focus:outline-none"
          />
          <button className="bg-[#147C6B]  text-white px-4 py-2 text-sm font-medium">
            Subscribe Now
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2  px-6 py-10 rounded-lg  z-50 flex items-center justify-between gap-4 w-full max-w-3xl">
        <button
          className=" text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#147C6B] transition"
          onClick={() => {
            window.location.href = "/user";
          }}
        >
          Home
        </button>
        <button
          className=" text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#0f6558] transition"
          onClick={() => {
            window.location.href = "/user/products";
          }}
        >
          Products
        </button>
        <button
          className=" text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#0f6558] transition"
          onClick={() => {
            window.location.href = "/user/products";
          }}
        >
          Contact
        </button>
      </div>
    </footer>
  );
};

export default Footer;
