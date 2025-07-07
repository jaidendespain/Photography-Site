import { ImageCarousel } from "../components/ImageCarousel";

const NIGHT_LIGHTS_IMAGES = [
  {
    src: "https://res.cloudinary.com/djyf3amae/image/upload/v1724058349/20220816-2_hrgrwj.jpg",
    alt: "Night Lights 1",
  },
  {
    src: "https://res.cloudinary.com/djyf3amae/image/upload/v1724055844/JCAM0210_d9h7ol.jpg",
    alt: "Night Lights 2",
  },
  {
    src: "https://res.cloudinary.com/djyf3amae/image/upload/v1724055841/20240516-2_05-positive_er3tgn.jpg",
    alt: "Night Lights 3",
  },
];

export default function NightLightsPage() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--night-bg)', color: 'var(--night-text)' }}>
      <div className="prose prose-lg max-w-none text-center">
        <ImageCarousel images={NIGHT_LIGHTS_IMAGES} color="var(--night-text)" borderColor="border-black" />
      </div>
    </section>
  );
} 