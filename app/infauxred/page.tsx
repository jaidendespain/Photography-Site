import { ImageCarousel } from "../components/ImageCarousel";

const INFAUXRED_IMAGES = [
  {
    src: "https://res.cloudinary.com/djyf3amae/image/upload/v1751843718/JCAM1547_xtpcyn.jpg",
    alt: "Infrared Photography 1",
  },
  {
    src: "https://res.cloudinary.com/djyf3amae/image/upload/v1751843717/JCAM1538_vlxuaz.jpg",
    alt: "Infrared Photography 2",
  },
];

export default function InfauxredPage() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl">
        <ImageCarousel images={INFAUXRED_IMAGES} />
      </div>
    </section>
  );
} 