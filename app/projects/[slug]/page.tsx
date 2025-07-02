import { notFound } from "next/navigation";
import { projects } from "../../data/projects";
import { Carousel } from "../../components/Carousel";

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
      <p className="mb-8 text-lg text-gray-600">{project.description}</p>
      <Carousel images={project.images} />
    </section>
  );
} 