"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { adminlogin, employlogin } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InitUser />
      {children}
    </Provider>
  );
}

function InitUser() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const userData = sessionStorage.getItem("admin");

      if (userData) {
        try {
          dispatch(adminlogin(userData));
        } catch (error) {
          console.error("Failed to parse user data:", error);
          sessionStorage.removeItem("admin");
          router.push("/admin/login");
        }
      }
    };

    checkAuth();
  }, [dispatch, router]);

  return null;
}
