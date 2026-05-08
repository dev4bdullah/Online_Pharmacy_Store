"use client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "@/redux/authSlice";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InitUser />
      {children}
    </Provider>
  );
}
function InitUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = sessionStorage.getItem("user");

    if (userData) {
      try {
        const user = JSON.parse(userData);
        dispatch(login(user));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, [dispatch]);

  return null;
}
