"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { adminLogoout } from "@/redux/authSlice";
const AdminHeader = () => {
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  let dispatch = useDispatch();

  const handleLogout = () => {
    // Add your logout logic here
    sessionStorage.removeItem("admin");
    dispatch(adminLogoout());

    console.log("Logging out...");
  };
  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex w-full fixed top-0 z-50 xl:hidden items-center justify-between p-4 shadow-md bg-white"
      >
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
                href="/admin"
                onClick={() => setShowMobileMenu(false)}
                className="block text-lg font-medium hover:text-green-600"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/orders"
                onClick={() => setShowMobileMenu(false)}
                className="block text-lg font-medium hover:text-green-600"
              >
                Employes Management
              </Link>
              <Link
                href="/admin/users"
                onClick={() => setShowMobileMenu(false)}
                className="block text-lg font-medium hover:text-green-600"
              >
                User Management
              </Link>
              <div
                onClick={handleLogout}
                className="block text-lg font-medium hover:text-green-600"
              >
                Logout
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
};

export default AdminHeader;
