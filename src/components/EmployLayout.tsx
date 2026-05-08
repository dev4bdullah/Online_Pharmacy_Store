"use client";
import SideBar from "@/components/SideBar";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import EmployeeHeader from "./EmployerHeader";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false); // ✅ only render after mount

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isEmployLoginIn
  );
  const isLoginPage = pathname === "/employee/login";

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    if (!isLoggedIn && !isLoginPage) {
      router.push("/employee/login");
    } else if (isLoggedIn && isLoginPage) {
      router.push("/employee");
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
      <div className="hidden xl:block">{isLoggedIn && <SideBar />}</div>
      <div className="w-full flex flex-col h-screen">
        {isLoggedIn && <EmployeeHeader />}
        <main className="flex-1 bg-transparent overflow-y-auto xl:p-6">
          <EmployeeHeader />
          <div className="w-[98%] mx-auto pt-12 xl:p-0 xl:w-[99%]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
