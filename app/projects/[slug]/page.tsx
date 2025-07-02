import { notFound } from "next/navigation";
import { projects, getProjectImages } from "../../data/projects";
import { Carousel } from "../../components/Carousel";

export async function generateStaticParams() {
  return projects.map((project) => ({ params: { slug: project.slug } }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  const images = getProjectImages(params.slug);

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
      <p className="mb-8 text-lg text-gray-600">{project.description}</p>
      <Carousel images={images} />
    </section>
  );
} 