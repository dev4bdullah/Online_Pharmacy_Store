"use client";

import { usePathname } from "next/navigation";
import { AdminItems } from "../../../data";
import { useDispatch } from "react-redux";
import { adminLogoout } from "@/redux/authSlice";

export default function AdminSidebar() {
  const pathname = usePathname();
  let dispatch = useDispatch();

  const handleLogout = () => {
    // Add your logout logic here
    sessionStorage.removeItem("admin");
    dispatch(adminLogoout());

    console.log("Logging out...");
  };

  return (
    <aside className="hidden w-[266px] bg-black text-white h-screen p-4 flex-shrink-0 xl:flex flex-col justify-between">
      <div className="flex flex-col items-center gap-5">
        <ul className="w-full flex flex-col gap-5">
          {AdminItems.map((item, index) => {
            const isActive =
              item.link === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.link);

            return (
              <li key={index}>
                <a
                  href={item.link}
                  className={`w-full flex items-center py-3 rounded-lg px-4 gap-2
                  ${isActive ? "bg-[#340831]" : "hover:bg-gray-700"}`}
                >
                  <img
                    className="w-[20px] h-[20px]"
                    src={item.icon}
                    alt={`${item.title} Icon`}
                  />
                  <span className="text-white text-sm font-bold">
                    {item.title}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="w-full py-3 rounded-lg px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-bold mt-5"
      >
        Logout
      </button>
    </aside>
  );
}
