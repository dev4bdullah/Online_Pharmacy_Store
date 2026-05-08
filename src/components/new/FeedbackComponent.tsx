"use client";
import React from "react";

interface RatingBreakdown {
  fiveStar: number;
  fourStar: number;
  threeStar: number;
  twoStar: number;
  oneStar: number;
}

interface FeedbackProps {
  averageRating: number;
  ratingBreakdown: RatingBreakdown;
}

const FeedbackComponent: React.FC<FeedbackProps> = ({
  averageRating = 4.8,
  ratingBreakdown = {
    fiveStar: 70,
    fourStar: 15,
    threeStar: 10,
    twoStar: 3,
    oneStar: 2,
  },
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mb-10">
      <>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Customers Feedback
        </h3>

        <div className="flex flex-col items-center mb-6">
          <span className="text-4xl font-bold text-gray-900 mb-1">
            {averageRating}
          </span>
          <div className="flex mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </>

      <div className="space-y-3">
        {/* 5 Star */}
        <div className="flex items-center">
          <span className="w-10 text-sm font-medium text-gray-600">5★</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
            <div
              className="bg-yellow-400 h-2.5 rounded-full"
              style={{ width: `${ratingBreakdown.fiveStar}%` }}
            ></div>
          </div>
          <span className="w-10 text-sm text-gray-600">
            {ratingBreakdown.fiveStar}%
          </span>
        </div>

        {/* 4 Star */}
        <div className="flex items-center">
          <span className="w-10 text-sm font-medium text-gray-600">4★</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
            <div
              className="bg-yellow-400 h-2.5 rounded-full"
              style={{ width: `${ratingBreakdown.fourStar}%` }}
            ></div>
          </div>
          <span className="w-10 text-sm text-gray-600">
            {ratingBreakdown.fourStar}%
          </span>
        </div>

        {/* 3 Star */}
        <div className="flex items-center">
          <span className="w-10 text-sm font-medium text-gray-600">3★</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
            <div
              className="bg-yellow-400 h-2.5 rounded-full"
              style={{ width: `${ratingBreakdown.threeStar}%` }}
            ></div>
          </div>
          <span className="w-10 text-sm text-gray-600">
            {ratingBreakdown.threeStar}%
          </span>
        </div>

        {/* 2 Star */}
        <div className="flex items-center">
          <span className="w-10 text-sm font-medium text-gray-600">2★</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
            <div
              className="bg-yellow-400 h-2.5 rounded-full"
              style={{ width: `${ratingBreakdown.twoStar}%` }}
            ></div>
          </div>
          <span className="w-10 text-sm text-gray-600">
            {ratingBreakdown.twoStar}%
          </span>
        </div>

        {/* 1 Star */}
        <div className="flex items-center">
          <span className="w-10 text-sm font-medium text-gray-600">1★</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
            <div
              className="bg-yellow-400 h-2.5 rounded-full"
              style={{ width: `${ratingBreakdown.oneStar}%` }}
            ></div>
          </div>
          <span className="w-10 text-sm text-gray-600">
            {ratingBreakdown.oneStar}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackComponent;
