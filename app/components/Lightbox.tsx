"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LightboxProps {
  images: { src: string; alt: string }[];
  currentIdx: number;
  onClose: () => void;
  onNavigate: (idx: number) => void;
}

export function Lightbox({ images, currentIdx, onClose, onNavigate }: LightboxProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeOnEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") onNavigate((currentIdx + 1) % images.length);
    if (e.key === "ArrowLeft") onNavigate((currentIdx - 1 + images.length) % images.length);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEsc);
    };
  });
  // Focus trap
  useEffect(() => {
    backdropRef.current?.focus();
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        ref={backdropRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur focus:outline-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-3xl w-full max-h-[90vh] flex items-center justify-center"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <Image
            src={images[currentIdx].src}
            alt={images[currentIdx].alt}
            width={1200}
            height={800}
            className="object-contain rounded shadow-lg max-h-[80vh] w-auto h-auto"
            priority
          />
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          {/* Prev/Next arrows */}
          <button
            onClick={() => onNavigate((currentIdx - 1 + images.length) % images.length)}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button
            onClick={() => onNavigate((currentIdx + 1) % images.length)}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 