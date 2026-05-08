import { login } from "@/redux/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  useForgotPasswordMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/redux/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthModal: React.FC<{ showLogin: boolean; SetshowLogin: () => void }> = ({
  showLogin,
  SetshowLogin,
}) => {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);
  const [registerUser, { isLoading, isSuccess, error }] =
    useRegisterUserMutation();
  const [
    loginUser,
    { isLoading: loginLoader, isSuccess: loginSuccess, error: loginError },
  ] = useLoginUserMutation();
  const [
    forgotPassword,
    { isLoading: forgotLoading, isSuccess: forgotSuccess, error: forgotError },
  ] = useForgotPasswordMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const toggleMode = (newMode: "login" | "register" | "forgot") => {
    setMode(newMode);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return;
    }

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (response.success && response.user) {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
        });
        let dat = {
          access: response.accessToken,
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          expiresAt: Date.now() + 172800000,
        };
        sessionStorage.setItem("user", JSON.stringify(dat));

        toast.success(`Welcome back, ${response.user.name}!`);
        dispatch(login(dat));
        SetshowLogin();
        router.push("/");
      }
    } catch (error) {
      console.log(error);

      if (error?.data?.error) {
        toast.error(error.data.error);
        return;
      }
      if (error?.data?.message) {
        toast.error(error.data.message);
        return;
      }
      toast.error("Something went wrong please contact with your developer");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    } else if (formData.name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!formData.password) {
      toast.error("Password is required");
      return;
    } else if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!formData.confirm_password) {
      toast.error("Please confirm your password");
      return;
    } else if (formData.password !== formData.confirm_password) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (response.success && response.user) {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
        });

        toast.success("Signup Successfull please login");
        setMode("login");
      }
    } catch (error) {
      if (error?.data?.error) {
        toast.error(error.data.error);
        return;
      }
      toast.error("Something went wrong please contact with your developer");
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      const response = await forgotPassword({
        email: formData.email,
      }).unwrap();

      if (response.success) {
        toast.success("Password reset link sent to your email");
        setMode("login");
      }
    } catch (error) {
      if (error?.data?.error) {
        toast.error(error.data.error);
        return;
      }
      toast.error("Something went wrong please contact with your developer");
    }
  };

  return (
    <>
      {showLogin && (
        <div
          className="w-screen fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4"
          onClick={SetshowLogin}
        >
          <ToastContainer />
          <div
            className="w-fit bg-white rounded-lg p-8 max-w-md shadow-xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full relative overflow-hidden flex items-center justify-between">
              {/* Login Form */}
              <div
                className={`w-full transition-all duration-500 ease-in-out ${
                  mode === "login"
                    ? "translate-x-0 opacity-100 z-20"
                    : "translate-x-full opacity-0 z-10 absolute"
                }`}
              >
                <h2 className="text-2xl font-bold text-center mb-6">
                  Sign in to your account
                </h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                  <input
                    disabled={loginLoader}
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-lg py-3 px-4"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((pre) => ({ ...pre, email: e.target.value }));
                    }}
                  />
                  <div className="relative">
                    <input
                      disabled={loginLoader}
                      type={showPasswordLogin ? "text" : "password"}
                      placeholder="Password"
                      className="w-full border rounded-lg py-3 px-4 pr-10"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData((pre) => ({
                          ...pre,
                          password: e.target.value,
                        }));
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordLogin((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                    >
                      {showPasswordLogin ? "🙈" : "👁️"}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleMode("forgot")}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg"
                  >
                    {loginLoader ? "Loading..." : "Continue"}
                  </button>
                </form>
                <p className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => toggleMode("register")}
                    className="text-green-600 underline"
                  >
                    Join here
                  </button>
                </p>
              </div>

              {/* Register Form */}
              <div
                className={`w-full transition-all duration-500 ease-in-out ${
                  mode === "register"
                    ? "translate-x-0 opacity-100 z-20"
                    : "-translate-x-full opacity-0 z-10 absolute"
                }`}
              >
                <h2 className="text-2xl font-bold text-center mb-6">
                  Create your account
                </h2>
                <form className="space-y-4" onSubmit={handleRegister}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border rounded-lg py-3 px-4"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((pre) => ({ ...pre, name: e.target.value }));
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((pre) => ({ ...pre, email: e.target.value }));
                    }}
                    className="w-full border rounded-lg py-3 px-4"
                  />
                  <div className="relative">
                    <input
                      type={showPasswordSignup ? "text" : "password"}
                      placeholder="Password"
                      className="w-full border rounded-lg py-3 px-4 pr-10"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData((pre) => ({
                          ...pre,
                          password: e.target.value,
                        }));
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordSignup((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                    >
                      {showPasswordSignup ? "🙈" : "👁️"}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPasswordSignup ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full border rounded-lg py-3 px-4 pr-10"
                      value={formData.confirm_password}
                      onChange={(e) => {
                        setFormData((pre) => ({
                          ...pre,
                          confirm_password: e.target.value,
                        }));
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordSignup((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                    >
                      {showPasswordSignup ? "🙈" : "👁️"}
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>
                </form>
                <p className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <button
                    onClick={() => toggleMode("login")}
                    className="text-green-600 underline"
                  >
                    Login here
                  </button>
                </p>
              </div>

              {/* Forgot Password Form */}
              <div
                className={`w-full transition-all duration-500 ease-in-out ${
                  mode === "forgot"
                    ? "translate-x-0 opacity-100 z-20"
                    : "translate-x-full opacity-0 z-10 absolute"
                }`}
              >
                <h2 className="text-2xl font-bold text-center mb-6">
                  Reset your password
                </h2>
                <form className="space-y-4" onSubmit={handleForgotPassword}>
                  <p className="text-sm text-gray-600 mb-4">
                    Enter your email address and we'll send you a link to reset
                    your password.
                  </p>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-lg py-3 px-4"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((pre) => ({ ...pre, email: e.target.value }));
                    }}
                  />
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg"
                    disabled={forgotLoading}
                  >
                    {forgotLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
                <p className="mt-4 text-center text-sm">
                  Remember your password?{" "}
                  <button
                    onClick={() => toggleMode("login")}
                    className="text-green-600 underline"
                  >
                    Login here
                  </button>
                </p>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-4">
              <p>
                By joining you agree to the{" "}
                <a href="#" className="font-semibold underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-semibold underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
