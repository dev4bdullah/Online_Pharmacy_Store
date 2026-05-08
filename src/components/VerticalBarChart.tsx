"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const VerticalBarChart = ({ data }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  return data ? (
    <div className="w-full h-60 sm:h-64 md:h-72 mx-auto rounded-lg z-10 overflow-auto md:overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis
            ticks={[50, 100, 150, 200]}
            // tick={{ fill: "#9CA3AF", fontSize: 12 }}
            tickFormatter={(value) => `${value}`}
            axisLine={false}
            tickLine={false}
            padding={{ bottom: 10 }}
          />
          <Tooltip />
          <Bar
            dataKey="pro"
            className="z-10"
            fill="#5D4394"
            barSize={40}
            radius={[10, 10, 10, 10]}
            onClick={(_, index) => setSelectedIndex(index)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={selectedIndex === index ? "#5D4394" : "#EAE0FE"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <div>
      <text>no Data</text>
    </div>
  );
};

export default VerticalBarChart;
