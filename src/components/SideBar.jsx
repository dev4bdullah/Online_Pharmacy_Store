"use client";

import { usePathname } from "next/navigation";
import { sidebarItems } from "../../data";
import { useDispatch } from "react-redux";
import { employLogOut } from "@/redux/authSlice";

export default function SideBar() {
  const pathname = usePathname(); 
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem("employee");
    dispatch(employLogOut());
    console.log("Logging out...");
  };

  return (
    <aside className="w-[266px] bg-black text-white h-screen p-4 flex flex-col justify-between items-center py-5">
      {/* Top Logo or Header Section */}
      {/* <img className="h-10" src="/admin_logo.svg" alt="Logo" /> */}

      {/* Sidebar Items */}
      <ul className="w-full flex flex-col gap-5">
        {sidebarItems.map((item, index) => {
          const isActive = item.link === "/employee"
            ? pathname === "/employee"
            : pathname.startsWith(item.link);

          return (
            <li key={index}>
              <a
                href={item.link}
                className={`w-full flex items-center py-3 rounded-lg px-4 gap-2
                ${isActive ? "bg-[#340831]" : " hover:bg-gray-700"}`}
              >
                <img className="w-[20px] h-[20px]" src={item.icon} alt={`${item.title} Icon`} />
                <span className="text-white text-sm font-poppine font-bold">
                  {item.title}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full py-3 rounded-lg px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-bold mt-5"
      >
        Logout
      </button>
    </aside>
  );
}
