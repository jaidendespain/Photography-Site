"use client";
import Image from "next/image";

const PARKING_GARAGE_IMAGE = {
  src: "https://res.cloudinary.com/djyf3amae/image/upload/v1729028308/JCAM0675_ns4jey.jpg",
  alt: "Parking Garage Roof",
};

export function HeroImage() {
  return (
    <div className="flex justify-center w-full">
      <Image
        src={PARKING_GARAGE_IMAGE.src}
        alt={PARKING_GARAGE_IMAGE.alt}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="w-auto h-auto max-w-4xl max-h-[632px] object-contain border border-[8px] sm:border-[12px] md:border-[15px] lg:border-[20px] border-white shadow-md"
        priority
      />
    </div>
  );
} 