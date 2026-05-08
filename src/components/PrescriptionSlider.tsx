"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
export default function PrescriptionSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      onSelect();
    };

    handleSelect();
    emblaApi.on("select", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi, onSelect]);

  const slides = [
    {
      title: "Your Prescription for",
      subtitle: "Affordable Health Solutions!",
      description:
        "Elevate your health journey with exclusive discounts and unparalleled convenience. Your path to well-being starts here, where every purchase is a prescription for savings.",
      cta: "Start Shopping",
      image: "https://picsum.photos/1600/900?random=1",
    },
    {
      title: "Premium Healthcare",
      subtitle: "Without the Premium Price",
      description:
        "Access top-quality healthcare products at prices that won't break the bank. We believe everyone deserves affordable wellness solutions.",
      cta: "View Products",
      image: "https://picsum.photos/1600/900?random=2",
    },
    {
      title: "Health & Wellness",
      subtitle: "Delivered to Your Door",
      description:
        "Skip the pharmacy lines. Get your health essentials delivered quickly and discreetly to your home.",
      cta: "Shop Now",
      image: "https://picsum.photos/1600/900?random=3",
    },
  ];

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-video group">
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative h-full"
            >
              {/* Responsive image with optimized mask */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image}
                  alt={`${slide.title} - ${slide.subtitle}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1600px"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent md:bg-gradient-to-t md:from-black/70 md:via-black/40 md:to-transparent"></div>
              </div>

              {/* Responsive content */}
              <div className="relative z-10 h-full px-4 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 text-white flex items-center">
                <div className="w-full max-w-4xl mx-auto text-center px-4 sm:px-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 drop-shadow-lg ">
                    {slide.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto drop-shadow-md px-2 sm:px-0">
                    {slide.description}
                  </p>
                  <button className="bg-white text-green-600  px-4 sm:px-5 md:px-6 py-1 sm:py-1.5 md:py-2 text-sm sm:text-base md:text-medium rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 shadow-lg transform hover:scale-105 transition-transform">
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons - Responsive sizing */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-1 sm:p-1.5 md:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-1 sm:p-1.5 md:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Responsive dots indicator */}
      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
              index === selectedIndex ? "bg-white w-4 sm:w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
