import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegisterEmployeerMutation } from "@/redux/employSlice";

const EmployeeModal: React.FC<{
  showLogin: boolean;
  SetshowLogin: () => void;
}> = ({ showLogin, SetshowLogin }) => {
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);
  const [registerUser, { isLoading }] = useRegisterEmployeerMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return toast.error("Name is required");
    if (formData.name.length < 3) return toast.error("Name too short");

    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return toast.error("Invalid email format");

    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password too short");

    if (!formData.confirm_password)
      return toast.error("Please confirm your password");
    if (formData.password !== formData.confirm_password)
      return toast.error("Passwords don't match");

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (response.success && response.user) {
        toast.success("Signup Successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
        });
        SetshowLogin();
      }
    } catch (error) {
      toast.error(error?.data?.error || "Signup failed, try again later.");
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
            <h2 className="text-2xl font-bold text-center mb-6">
              Create your Employee
            </h2>
            <form className="space-y-4" onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg py-3 px-4"
                value={formData.name}
                onChange={(e) =>
                  setFormData((pre) => ({ ...pre, name: e.target.value }))
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-lg py-3 px-4"
                value={formData.email}
                onChange={(e) =>
                  setFormData((pre) => ({ ...pre, email: e.target.value }))
                }
              />
              <div className="relative">
                <input
                  type={showPasswordSignup ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border rounded-lg py-3 px-4 pr-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((pre) => ({
                      ...pre,
                      password: e.target.value,
                    }))
                  }
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
                  onChange={(e) =>
                    setFormData((pre) => ({
                      ...pre,
                      confirm_password: e.target.value,
                    }))
                  }
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

export default EmployeeModal;
