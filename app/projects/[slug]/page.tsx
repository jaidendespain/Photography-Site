import { notFound } from "next/navigation";
import { projects, getProjectImages } from "../../data/projects";
import { Carousel } from "../../components/Carousel";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const images = getProjectImages(slug);

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
      <p className="mb-8 text-lg text-gray-600">{project.description}</p>
      <Carousel images={images} />
    </section>
  );
} 