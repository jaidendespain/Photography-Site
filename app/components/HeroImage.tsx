"use client";
import Image from "next/image";

const PARKING_GARAGE_IMAGE = {
  src: "https://res.cloudinary.com/djyf3amae/image/upload/v1712046709/goldenroof_ahmacw.jpg",
  alt: "Parking Garage Roof",
};

export function HeroImage() {
  return (
    <div className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden shadow-md border border-[8px] sm:border-[12px] md:border-[15px] lg:border-[20px] border-white">
      <Image
        src={PARKING_GARAGE_IMAGE.src}
        alt={PARKING_GARAGE_IMAGE.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        priority
      />
    </div>
  );
} 