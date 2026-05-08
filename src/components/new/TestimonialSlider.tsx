"use client";
import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ayesha Khan",
    role: "Pharmacist",
    rating: 5,
    content:
      "Zahid Pharmacy has always provided excellent service. The team is professional, knowledgeable, and always ready to assist with any health concerns. I am always confident in the products they provide, and I trust them completely for all my health needs",
  },
  {
    id: 2,
    name: "Ahmed Shah",
    role: "Customer",
    rating: 4,
    content:
      "I’ve been a regular customer at Zahid Pharmacy, and I’ve always received top-notch advice and products. Their friendly staff helped me find the right solutions for my health issues, and I am truly grateful for their expertise and care.",
  },
  {
    id: 3,
    name: "Ali ",
    role: "Customer",
    rating: 5,
    content:
      "I’ve been purchasing from Zahid Pharmacy for years, and they never disappoint. The team’s attention to detail and friendly service have made me a loyal customer. I always feel well cared for, and the quality of the products is unmatched.",
  },
  {
    id: 4,
    name: "Faisal Rahman",
    role: "Customer",
    rating: 3,
    content:
      "The staff at Zahid Pharmacy is incredibly helpful and knowledgeable. They always take the time to explain everything clearly and help me make informed decisions about my health. I recommend them to anyone looking for quality care and service.",
  },
];
const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );

  const nextSlide = () => {
    setSlideDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex + 2 >= testimonials.length ? 0 : prevIndex + 2
    );
  };

  const prevSlide = () => {
    setSlideDirection("left");
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 2;
      return newIndex < 0
        ? testimonials.length % 2 === 0
          ? testimonials.length - 2
          : testimonials.length - 1
        : newIndex;
    });
  };

  const visibleTestimonials =
    testimonials.length > 1
      ? testimonials.slice(currentIndex, currentIndex + 2)
      : testimonials;

  return (
    <div className="w-full mx-auto px-4 py-12 overflow-hidden">
      <h1 className="text-3xl font-bold text-center mb-8">
        What Our Clients Say
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum
        elementum velit vel vulputate.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {visibleTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`bg-white p-8 rounded-lg shadow-md min-w-full animate-${
              slideDirection === "right" ? "slide-in-right" : "slide-in-left"
            }`}
          >
            <div className="flex items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                {/* <p className="text-gray-600">{testimonial.role}</p> */}
              </div>
              <div className="ml-auto flex text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-700">{testimonial.content}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-8 gap-4">
        <button
          onClick={prevSlide}
          className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full transition-colors"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full transition-colors"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
