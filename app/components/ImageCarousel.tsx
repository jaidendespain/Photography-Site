"use client";
import { useState } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Image */}
      <div className="flex justify-center w-full">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={0}
          height={0}
          sizes="(max-width: 768px) 90vw, 50vw"
          className="w-auto h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl max-h-[400px] sm:max-h-[500px] md:max-h-[632px] object-contain border border-[8px] sm:border-[12px] md:border-[15px] lg:border-[20px] border-white shadow-md"
          priority
        />
      </div>

      {/* Previous Arrow */}
      <button
        onClick={goToPrevious}
        className="fixed bottom-25 left-1/2 transform -translate-x-1/2 -ml-16 -mb-[7px] p-2 z-30"
        aria-label="Previous image"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor" 
          className="size-6"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M15.75 19.5 8.25 12l7.5-7.5" 
          />
        </svg>
      </button>

      {/* Image Counter */}
      <div className="fixed bottom-25 left-0 right-0 flex justify-center text-black text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Next Arrow */}
      <button
        onClick={goToNext}
        className="fixed bottom-25 left-1/2 transform -translate-x-1/2 ml-15 -mb-[7px] p-2 z-30"
        aria-label="Next image"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor" 
          className="size-6"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="m8.25 4.5 7.5 7.5-7.5 7.5" 
          />
        </svg>
      </button>
    </div>
  );
} 