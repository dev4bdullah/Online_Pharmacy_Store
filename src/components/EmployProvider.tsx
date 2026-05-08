"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { employlogin } from "@/redux/authSlice";
import { useRouter } from "next/navigation";

export function EmployProviders({ children }: { children: React.ReactNode }) {
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
      const userData = sessionStorage.getItem("employee");

      if (userData) {
        try {
          const user = JSON.parse(userData);
          // Check if token is expired
          if (user.expiresAt && Date.now() > user.expiresAt) {
            sessionStorage.removeItem("employee");
            router.push("/employee/login");
            return;
          }
          dispatch(employlogin(user));
        } catch (error) {
          console.error("Failed to parse user data:", error);
          sessionStorage.removeItem("employee");
          router.push("/employee/login");
        }
      }
    };

    checkAuth();
  }, [dispatch, router]);

  return null;
}
