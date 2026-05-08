"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLoginUserMutation } from "@/redux/employSlice";
import Loader from "@/components/Loader";
import { useDispatch } from "react-redux";
import { employlogin } from "@/redux/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const [
    loginUser,
    { isLoading: loginLoader, isSuccess: loginSuccess, error: loginError },
  ] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (showForgot) setForgotEmail(value);
    else setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (showForgot) {
      // Handle forgot password submission here (e.g., send reset email)
      alert(`Reset link sent to ${forgotEmail}`);
      setShowForgot(false);
      setForgotEmail("");
      return;
    }
    try {
      const response = await loginUser(formData).unwrap();
      const dat = {
        access: response.accessToken,
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        expiresAt: Date.now() + 172800000,
      };
      sessionStorage.setItem("employee", JSON.stringify(dat));
      dispatch(employlogin(dat));
      router.push("/employee");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-black text-center mb-6">
          {showForgot ? "Reset Password" : "Welcome Back"}
        </h2>

        {!showForgot && loginError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {"data" in loginError
              ? (loginError.data as { message?: string })?.message ||
                "Login failed"
              : "Login failed"}
          </div>
        )}

        {!showForgot && loginSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
            Login successful! Redirecting...
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!showForgot ? (
            <>
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

              <div className="text-right text-sm">
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot Password?
                </button>
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
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="forgotEmail"
                  value={forgotEmail}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="text-gray-600 hover:underline"
                  onClick={() => setShowForgot(false)}
                >
                  Back to Login
                </button>
                <button
                  type="submit"
                  className="bg-black text-white py-2 px-6 rounded-xl hover:opacity-90 transition"
                >
                  Send Reset Link
                </button>
              </div>
            </>
          )}
        </form>
      </motion.div>
    </div>
  );
}
