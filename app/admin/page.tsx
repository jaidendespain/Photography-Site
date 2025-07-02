"use client";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./AuthContext";

function AdminContent() {
  const { authed, login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (authed) {
      // Load Decap CMS
      import("decap-cms-app").then((CMS) => {
        CMS.default.init({
          config: {
            backend: {
              name: "git-gateway",
              branch: "main",
            },
            local_backend: true,
            media_folder: "public/images",
            public_folder: "/images",
            collections: [
              {
                name: "projects",
                label: "Projects",
                folder: "app/data",
                create: true,
                slug: "{{slug}}",
                fields: [
                  { label: "Title", name: "title", widget: "string" },
                  { label: "Slug", name: "slug", widget: "string" },
                  { label: "Description", name: "description", widget: "text", required: false },
                  { label: "Featured", name: "featured", widget: "boolean", default: false },
                  { label: "Order", name: "order", widget: "number", default: 0 },
                ],
              },
              {
                name: "images",
                label: "Images",
                folder: "app/data/images",
                create: true,
                slug: "{{slug}}",
                fields: [
                  { label: "Title", name: "title", widget: "string" },
                  { label: "Slug", name: "slug", widget: "string" },
                  { label: "Image URL", name: "src", widget: "string" },
                  { label: "Alt Text", name: "alt", widget: "string" },
                  { 
                    label: "Aspect Ratio", 
                    name: "aspect", 
                    widget: "select", 
                    options: ["aspect-[4/3]", "aspect-square", "aspect-[16/9]", "aspect-[3/4]"], 
                    default: "aspect-[4/3]" 
                  },
                  { 
                    label: "Project", 
                    name: "project", 
                    widget: "relation", 
                    collection: "projects", 
                    search_fields: ["title", "slug"], 
                    value_field: "slug" 
                  },
                  { label: "Order", name: "order", widget: "number", default: 0 },
                ],
              },
            ],
          },
        });
      });
    }
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (login(password)) {
      setPassword("");
    } else {
      setError("Invalid password");
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div id="nc-root"></div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
} 