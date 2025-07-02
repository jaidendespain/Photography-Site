"use client";
import { useState } from "react";
import { AuthProvider, useAuth } from "../AuthContext";

// Example project list (replace with import if needed)
const PROJECTS = [
  { slug: "mountain-escape", title: "Mountain Escape" },
  { slug: "urban-nights", title: "Urban Nights" },
];

const initialImages = [
  {
    src: "https://res.cloudinary.com/djyf3amae/image/upload/v1712046709/goldenroof_ahmacw.jpg",
    alt: "Parking Garage Roof",
    aspect: "aspect-[4/3]",
    project: "mountain-escape",
  },
];

function AdminImagesContent() {
  // Projects state
  const [projects, setProjects] = useState([
    { slug: "mountain-escape", title: "Mountain Escape" },
    { slug: "urban-nights", title: "Urban Nights" },
  ]);
  const [projectForm, setProjectForm] = useState({ slug: "", title: "" });

  // Images state
  const [images, setImages] = useState([
    {
      src: "https://res.cloudinary.com/djyf3amae/image/upload/v1712046709/goldenroof_ahmacw.jpg",
      alt: "Parking Garage Roof",
      aspect: "aspect-[4/3]",
      project: "mountain-escape",
    },
  ]);
  const [form, setForm] = useState({
    src: "",
    alt: "",
    aspect: "aspect-[4/3]",
    project: projects[0]?.slug || "",
  });

  // Add project
  function handleAddProject(e: React.FormEvent) {
    e.preventDefault();
    if (!projectForm.slug || !projectForm.title) return;
    setProjects([...projects, projectForm]);
    setProjectForm({ slug: "", title: "" });
    // If this is the first project, set as default for image form
    if (projects.length === 0) setForm(f => ({ ...f, project: projectForm.slug }));
  }

  // Remove project
  function handleDeleteProject(slug: string) {
    setProjects(projects.filter(p => p.slug !== slug));
    // Remove project from images as well
    setImages(images.map(img => img.project === slug ? { ...img, project: "" } : img));
  }

  // Add image
  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setImages([...images, form]);
    setForm({
      src: "",
      alt: "",
      aspect: "aspect-[4/3]",
      project: projects[0]?.slug || "",
    });
  }

  // Remove image
  function handleDelete(idx: number) {
    setImages(images.filter((_, i) => i !== idx));
  }

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Image Admin</h1>

      {/* Project Admin */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Projects</h2>
        <form onSubmit={handleAddProject} className="flex gap-2 mb-2">
          <input
            className="border p-2 rounded"
            placeholder="Slug (e.g. mountain-escape)"
            value={projectForm.slug}
            onChange={e => setProjectForm(f => ({ ...f, slug: e.target.value }))}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={projectForm.title}
            onChange={e => setProjectForm(f => ({ ...f, title: e.target.value }))}
            required
          />
          <button className="bg-black text-white px-4 py-2 rounded cursor-pointer" type="submit">
            Add Project
          </button>
        </form>
        <ul className="mb-4">
          {projects.map((p) => (
            <li key={p.slug} className="flex items-center gap-2">
              <span className="font-mono text-xs">{p.slug}</span>
              <span className="text-sm">{p.title}</span>
              <button
                className="text-red-600 font-bold px-1 cursor-pointer"
                onClick={() => handleDeleteProject(p.slug)}
                disabled={images.some(img => img.project === p.slug)}
                title={
                  images.some(img => img.project === p.slug)
                    ? "Remove or reassign images first"
                    : "Delete project"
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Image Admin */}
      <form onSubmit={handleAdd} className="flex flex-col gap-2 mb-8">
        <input
          className="border p-2 rounded"
          placeholder="Image URL"
          value={form.src}
          onChange={e => setForm(f => ({ ...f, src: e.target.value }))}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Alt text"
          value={form.alt}
          onChange={e => setForm(f => ({ ...f, alt: e.target.value }))}
          required
        />
        <select
          className="border p-2 rounded"
          value={form.aspect}
          onChange={e => setForm(f => ({ ...f, aspect: e.target.value }))}
        >
          <option value="aspect-[4/3]">4:3</option>
          <option value="aspect-square">1:1 (Square)</option>
          <option value="aspect-[16/9]">16:9</option>
          <option value="aspect-[3/4]">3:4</option>
        </select>
        <select
          className="border p-2 rounded"
          value={form.project}
          onChange={e => setForm(f => ({ ...f, project: e.target.value }))}
        >
          {projects.map(p => (
            <option key={p.slug} value={p.slug}>{p.title}</option>
          ))}
        </select>
        <button className="bg-black text-white px-4 py-2 rounded cursor-pointer" type="submit">
          Add Image
        </button>
      </form>
      <ul className="space-y-4">
        {images.map((img, idx) => (
          <li key={img.src + idx} className="flex items-center gap-4">
            <div className={`relative w-32 h-24 ${img.aspect} border`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} className="object-cover w-full h-full" />
            </div>
            <div className="flex-1">
              <div className="font-mono text-xs break-all">{img.src}</div>
              <div className="text-sm text-gray-600">{img.alt}</div>
              <div className="text-xs text-gray-400">{img.aspect}</div>
              <div className="text-xs text-blue-600 flex items-center gap-1">
                Project:
                <select
                  className="cursor-pointer"
                  value={img.project}
                  onChange={e => {
                    const newProject = e.target.value;
                    setImages(images =>
                      images.map((image, i) =>
                        i === idx ? { ...image, project: newProject } : image
                      )
                    );
                  }}
                >
                  {projects.map(p => (
                    <option key={p.slug} value={p.slug}>{p.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="text-red-600 font-bold px-1 cursor-pointer"
              onClick={() => handleDelete(idx)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

function AdminImagesPage() {
  const { authed, login } = useAuth();
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  if (!authed) {
    return (
      <main className="max-w-xs mx-auto py-24">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!login(pw)) setError("Incorrect password");
          }}
          className="flex flex-col gap-2"
        >
          <input
            type="password"
            className="border p-2 rounded"
            placeholder="Password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(""); }}
          />
          <button className="bg-black text-white px-4 py-2 rounded" type="submit">
            Login
          </button>
          {error && <div className="text-red-600 text-sm">{error}</div>}
        </form>
      </main>
    );
  }

  return <AdminImagesContent />;
}

export default function AdminImagesPageWithProvider() {
  return (
    <AuthProvider>
      <AdminImagesPage />
    </AuthProvider>
  );
} 