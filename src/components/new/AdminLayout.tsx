"use client";
import SideBar from "@/components/SideBar";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSideBar";
import Header from "../header";
import AdminHeader from "../AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false); // ✅ only render after mount

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isadminLoginIn
  );
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    if (!isLoggedIn && !isLoginPage) {
      router.push("/admin/login");
    } else if (isLoggedIn && isLoginPage) {
      router.push("/admin");
    }
  }, [isLoggedIn, isLoginPage, hasMounted, router]);

  if (!hasMounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="w-full flex bg-gray-100">
      {isLoggedIn && <AdminSidebar />}
      <div className="w-full flex flex-col h-screen">
        {/* {isLoggedIn && <Head />} */}
        <main className="flex-1 bg-transparent overflow-y-auto md:p-6">
          <AdminHeader />
          <div className="w-[90%] md:w-[99%] mx-auto pt-12 md:p-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
