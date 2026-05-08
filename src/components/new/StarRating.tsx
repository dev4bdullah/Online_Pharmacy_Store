"use client";
import { useState } from "react";

interface StarRatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  editable?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({
  initialRating = 0,
  onRatingChange,
  editable = true,
  size = "md",
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            className={`${sizeClasses[size]} ${
              editable ? "cursor-pointer" : "cursor-default"
            }`}
            onClick={() => {
              if (editable) {
                setRating(ratingValue);
                onRatingChange?.(ratingValue);
              }
            }}
            onMouseEnter={() => editable && setHover(ratingValue)}
            onMouseLeave={() => editable && setHover(0)}
            aria-label={`Rate ${ratingValue} stars`}
          >
            {ratingValue <= (hover || rating) ? "★" : "☆"}
          </button>
        );
      })}
    </div>
  );
}
