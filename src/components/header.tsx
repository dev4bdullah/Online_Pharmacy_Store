"use client";
import Image from "next/image";
import { useState } from "react";
import AuthModal from "./AuthModal";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CartDrawer from "./CartDrawer";
import { useGetCategoriesQuery } from "@/redux/apiSlice";
import Loader from "./Loader";
const Header = () => {
  const [cartItems, setCartItems] = useState([
    {
      name: "Panadol",
      qty: 1,
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      name: "Panadol",
      qty: 1,
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      name: "Panadol",
      qty: 1,
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      name: "Panadol",
      qty: 1,
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      name: "Panadol",
      qty: 1,
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      name: "Panadol",
      qty: 1,
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      name: "Panadol",
      qty: 1,
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      name: "Panadol",
      qty: 1,
      image: "https://picsum.photos/600/400?random=2",
    },
  ]);
  const [showCart, setShowCart] = useState(false);
  const [category, setCategory] = useState("All Categories");
  const [showLogin, setShowLogin] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { data, isLoading } = useGetCategoriesQuery();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full fixed top-0 z-50 flex items-center justify-between p-4 shadow-md bg-white"
      >
        <div className="flex items-center space-x-2">
          <Image
            src="https://picsum.photos/id/237/200"
            alt="Medico Store Logo"
            width={32}
            height={32}
          />
          <div className="text-green-600 font-bold text-lg">
            Medico <span className="font-normal">Store</span>
          </div>
        </div>

        <div className="hidden md:flex flex-1 mx-6 max-w-xl">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex items-center w-full bg-gray-100 rounded-md overflow-hidden">
              <div className="flex items-center">
                <select
                  className="h-full w-auto bg-transparent border-none pl-2 pr-1 text-sm text-gray-700 focus:outline-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  {data?.categories.map((e: any, i: any) => (
                    <option key={i.toString()} value={e.slug}>
                      {e.name}
                    </option>
                  ))}
                </select>
                <div className="h-6 w-px bg-gray-400 opacity-50 mx-2" />
              </div>

              <input
                type="text"
                placeholder="Search medicine, medical products"
                className="flex-1 bg-transparent p-2 py-3 focus:outline-none text-gray-700"
              />

              <button className="h-full bg-green-500 p-3">
                <svg
                  className="w-5 h-5 text-white font-bold"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setShowMobileMenu(true)} // You can toggle a menu instead
            className="text-black"
          >
            <svg
              className="w-6 h-6"
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
        <div className="hidden md:flex items-center ">
          <Link
            href={"/user/products"}
            className="px-4 py-2 text-lg text-black font-semibold transition-transform duration-300 transform hover:scale-105 hover:text-green-700"
          >
            Products
          </Link>

          <Link
            href={"/user/blogs"}
            className="px-4 py-2 text-lg text-black font-semibold transition-transform duration-300 transform hover:scale-105 hover:text-green-700"
          >
            Blogs
          </Link>

          {/* Profile */}
          {isLoggedIn ? (
            <>
              <Link
                href={"/user/orders"}
                className="px-4 py-2 text-lg text-black font-semibold transition-transform duration-300 transform hover:scale-105 hover:text-green-700"
              >
                Orders
              </Link>
              <button
                onClick={() => setShowCart(true)}
                className="px-4 pr-8 py-2 text-lg text-black font-semibold transition-transform duration-300 transform hover:scale-105 hover:text-green-700"
              >
                Cart
              </button>
              <div className="flex items-center gap-1.5">
                <Image
                  src="https://picsum.photos/id/237/200"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <button className="text-black">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 text-lg text-black font-semibold transition-transform duration-300 transform hover:scale-105 hover:text-green-700"
            >
              Login
            </button>
          )}
        </div>
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
                onClick={() => setShowMobileMenu(false)}
                className="block text-lg font-medium hover:text-green-600"
              >
                Home
              </Link>
              <Link
                href="/user/products"
                onClick={() => setShowMobileMenu(false)}
                className="block text-lg font-medium hover:text-green-600"
              >
                Products
              </Link>
              <Link
                href="/user/blogs"
                onClick={() => setShowMobileMenu(false)}
                className="block text-lg font-medium hover:text-green-600"
              >
                Blogs
              </Link>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowCart(true);
                    }}
                    className="block text-lg font-medium hover:text-green-600"
                  >
                    Cart
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-4 py-2 text-lg text-black font-semibold transition-transform duration-300 transform hover:scale-105 hover:text-green-700"
                >
                  Login
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </motion.header>

      <AuthModal
        showLogin={showLogin}
        SetshowLogin={() => {
          setShowLogin(!showLogin);
        }}
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

export default Header;
