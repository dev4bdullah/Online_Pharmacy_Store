import React, { useState } from "react";

const DidYouKnow = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-5 flex flex-col md:flex-row items-center md:items-start gap-8 font-sans">
      <div className="w-full md:w-1/2">
        <img
          src="/path-to-your-image.png" // Replace with your actual image path
          alt="Maximum absorption micro-sized nutrient particles"
          className="w-full max-w-[416.5px] h-auto rounded-lg"
        />
      </div>

      <div className="w-full md:w-1/2">
        <div className="flex items-center gap-2 mb-4 relative">
          <h2 className="text-2xl font-bold text-gray-800">Did You Know?</h2>
          <button
            className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
            onClick={() => setShowInfo(!showInfo)}
          >
            i
          </button>

          {/* Tooltip */}
          {showInfo && (
            <div className="absolute left-1/2 md:left-auto md:right-0 top-full mt-2 w-64 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-10 transform md:translate-x-0 -translate-x-1/2">
              <p className="text-sm text-gray-700">
                Our micro-sized nutrient particles are 100% bioavailable and
                small enough to fully absorb and reach your cells.
              </p>
              <div className="absolute -top-2 left-1/2 md:left-auto md:right-4 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200"></div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <p className="mb-3 text-gray-700">
            Our advanced formulation uses micro-sized nutrient particles that
            are:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>100% bioavailable</li>
            <li>Small enough for full absorption</li>
            <li>Designed to effectively reach your cells</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DidYouKnow;
