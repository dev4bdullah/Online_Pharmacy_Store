"use client";
import React from "react";
import { FaGlobe, FaShip, FaWifi } from "react-icons/fa";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

export default function StatisticsCards() {
  const stats: StatItem[] = [
    {
      icon: <FaShip className="text-3xl" />,
      value: "80+",
      label: "Safari and Docker",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <FaGlobe className="text-3xl" />,
      value: "160+",
      label: "International Decoam",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FaWifi className="text-3xl" />,
      value: "20+",
      label: "Safarantel",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-xl p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-white bg-opacity-30">
                {stat.icon}
              </div>
              <div>
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="text-lg font-medium mt-1">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
