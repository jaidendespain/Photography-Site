export interface ProjectImage {
  src: string;
  alt: string;
  aspect: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  images: ProjectImage[];
}

export const projects: Project[] = [
  {
    slug: "mountain-escape",
    title: "Mountain Escape",
    description: "A journey through the mountains.",
    images: [
      { src: "https://res.cloudinary.com/djyf3amae/image/upload/v1712046709/goldenroof_ahmacw.jpg", alt: "Parking Garage Roof", aspect: "aspect-[4/3]" },
      { src: "https://res.cloudinary.com/djyf3amae/image/upload/v1724055844/JCAM0210_d9h7ol.jpg", alt: "Parking Garage Interior", aspect: "aspect-[4/3]" },
      { src: "https://res.cloudinary.com/djyf3amae/image/upload/v1712046711/industrypioneer_yifqho.jpg", alt: "Pioneer Flour Mill", aspect: "aspect-[3/4]" },
    ],
  },
  {
    slug: "urban-nights",
    title: "Urban Nights",
    description: "City lights and late night adventures.",
    images: [
      { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=500&q=80", alt: "City skyline", aspect: "aspect-square" },
      { src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", alt: "Forest path 2", aspect: "aspect-[3/2]" },
      { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80", alt: "Lake at dusk", aspect: "aspect-[5/4]" },
    ],
  },
]; 