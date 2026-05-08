"use client";
import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import dynamic from "next/dynamic";
const SocialMedia = dynamic(() => import("./new/SocialMedia"), { ssr: false });
const Footer = () => {
  return (
    <footer className="bg-[#167B70] text-white pt-10 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 border-b border-white/20 pb-8 flex justify-between">
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm break-words">
            <li className="flex items-start">
              <MdLocationOn className="text-lg mr-2 mt-0.5" />
              <span>Near Zahoor Palace, Gujrat</span>
            </li>
            <li className="flex items-center">
              <MdPhone className="text-lg mr-2" />
              <span>0533535870</span>
            </li>
            <li className="flex items-center">
              <MdEmail className="text-lg mr-2" />
              <span>ZahidPharmacy7@gmail.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li
              className="cursor-pointer hover:text-black"
              onClick={() => {
                window.location.href = "/user";
              }}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:text-black"
              onClick={() => {
                window.location.href = "/user/products";
              }}
            >
              Products
            </li>
            <li
              className="cursor-pointer hover:text-black"
              onClick={() => {
                window.location.href = "/user/contact";
              }}
            >
              Contact
            </li>
          </ul>
        </div>

      <div>
      <h4 className="font-semibold mb-2">Social Media</h4>
      <div className="flex flex-col gap-5 space-x-4 text-white text-xl mb-3">
      <ul className="space-y-2 text-sm">
      <li><a href="https://www.facebook.com" target="_blank" className="hover:text-black">Facebook</a></li>
      <li><a href="https://www.instagram.com" target="_blank" className="hover:text-black">Instagram</a></li>
      <li><a href="https://www.linkedin.com" target="_blank" className="hover:text-black">Linkedin</a></li>
      <li><a href="https://www.twitter.com" target="_blank" className="hover:text-black">Twitter</a></li>
      </ul>
       </div>
      </div>


        <SocialMedia />
      </div>

      <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row justify-between items-center text-xs text-white/80 px-2 gap-2">
        <p>©2025 Zahid Pharmacy, All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
