"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CarouselProps {
  images: { src: string; alt: string; aspect: string }[];
  initialIndex?: number;
  onIndexChange?: (idx: number) => void;
}

export function Carousel({ images, initialIndex = 0, onIndexChange }: CarouselProps) {
  // All hooks must be called first
  const [idx, setIdx] = useState(initialIndex);
  const prevIdx = useRef(idx);
  const direction = idx > prevIdx.current ? 1 : -1;

  useEffect(() => {
    prevIdx.current = idx;
    onIndexChange?.(idx);
  }, [idx, onIndexChange]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length]);

  const startX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 50) setIdx((i) => (i - 1 + images.length) % images.length);
    if (dx < -50) setIdx((i) => (i + 1) % images.length);
    startX.current = null;
  };

  // Now do the early return
  if (!images || images.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-12">
        No images available for this project.
      </div>
    );
  }

  return (
    <section
      role="region"
      aria-label="Project image carousel"
      className="relative w-full max-w-2xl mx-auto"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={idx}
          className="relative w-full h-80 sm:h-96 md:h-[32rem] flex items-center justify-center"
          custom={direction}
          initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={images[idx].src}
            alt={images[idx].alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain rounded shadow-lg"
            priority
          />
        </motion.div>
      </AnimatePresence>
      {/* Arrow controls */}
      <button
        onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white z-10"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        onClick={() => setIdx((i) => (i + 1) % images.length)}
        aria-label="Next image"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white z-10"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
      </button>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full ${i === idx ? "bg-black" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </section>
  );
} 