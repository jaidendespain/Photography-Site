"use client";
import Image from "next/image";

const HERO_IMAGE = {
  src: "https://res.cloudinary.com/djyf3amae/image/upload/v1712046709/goldenroof_ahmacw.jpg",
  alt: "Parking Garage Roof",
};

export function HeroImage() {
  return (
    <div className="flex justify-center w-full">
              <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          width={0}
          height={0}
          sizes="(max-width: 768px) 90vw, 50vw"
          className="w-auto h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl max-h-[300px] sm:max-h-[400px] md:max-h-[632px] object-contain border border-[8px] sm:border-[12px] md:border-[15px] lg:border-[20px] border-white shadow-md"
          priority
        />
    </div>
  );
} 