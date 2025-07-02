"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full bg-white/80 absolute top-0 left-0 z-30">
      <nav className="flex items-center justify-between w-full px-14 pt-8 pb-4">
        <Link href="/" className="font-serif italic text-2xl font-bold tracking-tight">
          Jaiden Despain
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium transition-colors ${
                pathname === link.href
                  ? "underline underline-offset-6 decoration-1"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-black mb-1" />
          <span className="block w-6 h-0.5 bg-black mb-1" />
          <span className="block w-6 h-0.5 bg-black" />
        </button>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium hover:underline underline-offset-4 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
} 