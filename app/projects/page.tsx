import Link from "next/link";
import { projects } from "../data/projects";

export default function ProjectsPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid gap-6 md:grid-cols-2">
        {projects
          .sort((a, b) => a.order - b.order)
          .map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600">{project.description}</p>
              {project.featured && (
                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                  Featured
                </span>
              )}
            </Link>
          ))}
      </div>
    </section>
  );
} 