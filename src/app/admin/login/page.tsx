"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLoginUserMutation } from "@/redux/employSlice";
import Loader from "@/components/Loader";
import { useDispatch } from "react-redux";
import { adminlogin, employlogin } from "@/redux/authSlice";
import { useRouter } from "next/navigation"; // Changed import

export default function LoginPage() {
  let dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [
    loginUser,
    { isLoading: loginLoader, isSuccess: loginSuccess, error: loginError },
  ] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (formData.email == "admin@gmail.com", formData.password == "admin@123")
    ) {
      dispatch(adminlogin({}));
      sessionStorage.setItem("admin", "true");

      router.push("/admin");
      return;
    }
    alert("username and password are wrong");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-black text-center mb-6">
          Welcome Back
        </h2>

        {loginError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {"data" in loginError
              ? (loginError.data as { message?: string })?.message ||
                "Login failed"
              : "Login failed"}
          </div>
        )}

        {loginSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
            Login successful! Redirecting...
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loginLoader}
            className="w-full bg-black text-white py-2 rounded-xl hover:opacity-90 transition flex items-center justify-center"
          >
            {loginLoader ? (
              <>
                <Loader className="mr-2" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
