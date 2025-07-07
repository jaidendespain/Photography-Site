import { ImageCarousel } from "../components/ImageCarousel";

const ANGELICA_IMAGES = [
  {
    src: "https://res.cloudinary.com/djyf3amae/image/upload/v1712046711/icaramen_oipr8n.jpg",
    alt: "Angelica 1",
  },
  {
    src: "https://res.cloudinary.com/djyf3amae/image/upload/v1712046704/bench_qmmghr.jpg",
    alt: "Angelica 2",
  },
];

export default function IcaPage() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4 relative" style={{ backgroundColor: 'var(--ica-bg)', color: 'var(--color-text)' }}>
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/djyf3amae/image/upload/v1751877470/leopard-pattern_bskxvp.png')] bg-cover bg-center opacity-10 pointer-events-none z-0" />
      <div className="prose prose-lg max-w-none text-center relative z-10">
        <ImageCarousel images={ANGELICA_IMAGES} color="var(--night-title)" />
      </div>
    </section>
  );
} 