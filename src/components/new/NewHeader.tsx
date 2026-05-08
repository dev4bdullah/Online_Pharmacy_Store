"use client";
import Image from "next/image";
import { useState } from "react";
import AuthModal from "../AuthModal";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CartDrawer from "../CartDrawer";
import { useGetCategoriesQuery } from "@/redux/apiSlice";
import Loader from "../Loader";
import Btn from "../Btn";
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { logout } from "@/redux/authSlice";
const NewHeader = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isLoading } = useGetCategoriesQuery();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  let dispatch = useDispatch();

  return (
    <>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-white w-full fixed top-0 z-50 bg-[#147C6B] shadow-md flex items-center justify-between px-6 py-3"
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          {/* <Link href={"/user"} className="text-gray-600 font-semibold">
            Logo
          </Link> */}
          <Image
            src="/assets/PharmacyLogo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="w-[50px] rounded-md"
          />
          {/* <div classNambordere="text-green-600 font-bold text-lg">
            Medico <span className="font-normal">Store</span>
          </div> */}
        </div>

        {/* Center: Navigation */}
        <div className="hidden md:flex gap-8 justify-center flex-1">
          {isLoading && <Loader />}
          <Link href="/user" className="text-xl font-semibold hover:text-black">
            Home
          </Link>
          <Link
            href="/user/products"
            className="text-xl font-semibold hover:text-black"
          >
            Products
          </Link>
          {isLoggedIn && (
            <Link
              href="/user/orders"
              className="text-xl font-semibold hover:text-black"
            >
              Orders
            </Link>
          )}
          <Link
            href="/user/contact"
            className="text-xl font-semibold hover:text-black"
          >
            Contact
          </Link>
        </div>

        {/* Right: Auth/Cart */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* <div className="border p-3 border-gray-600 rounded-full hover:scale-105">
                <FaSearch />
              </div> */}
              <Link
                href={"/user/cart"}
                className="border p-4 border-gray-600 rounded-full hover:scale-130 hover:text-black"
              >
                <FaCartPlus />
              </Link>
              <div
                onClick={() => {
                  dispatch(logout());
                }}
                className="border p-4 border-gray-600 rounded-full hover:scale-130 hover:text-black"
              >
                <IoMdLogOut />
              </div>
              {/* <button
                onClick={() => setShowCart(true)}
                className="text-black font-semibold hover:text-green-700"
              >
                Cart
              </button> */}
              {/* <Image
                src="https://picsum.photos/id/237/200"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              /> */}
            </>
          ) : (
            <Btn
              btnName="Log In"
              onPress={() => {
                setShowLogin(true);
              }}
            />
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={() => setShowMobileMenu(true)}>
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      {showMobileMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.5)]"
          onClick={() => setShowMobileMenu(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMobileMenu(false)}
              className="mb-4 text-black text-right w-full"
            >
              ✕ Close
            </button>
            <Link
              href="/user"
              className="block text-lg font-medium hover:text-green-600"
            >
              Home
            </Link>
            <Link
              href="/user/products"
              className="block text-lg font-medium hover:text-green-600"
            >
              Products
            </Link>
            <Link
              href="/user/blogs"
              className="block text-lg font-medium hover:text-green-600"
            >
              Blogs
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  setShowCart(true);
                }}
                className="block text-lg font-medium hover:text-green-600"
              >
                Cart
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="block text-lg font-medium hover:text-green-600"
              >
                Login
              </button>
            )}
          </motion.div>
        </motion.div>
      )}

      <AuthModal
        showLogin={showLogin}
        SetshowLogin={() => setShowLogin(!showLogin)}
      />
      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </>
  );
};

export default NewHeader;
