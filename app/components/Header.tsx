"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Entry" },
  { href: "/infauxred", label: "Infauxred" },
  { href: "/night-lights", label: "Night Lights" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isNightLightsPage = pathname === "/night-lights";

  return (
    <>
      {/* Name in top left */}
      <header className="w-full absolute top-0 left-0 z-30">
        <div className="px-6 sm:px-8 md:px-14 pt-6 md:pt-8">
          <Link 
            href="/" 
            className="title-font text-2xl tracking-tight"
            style={{ color: isNightLightsPage ? 'var(--night-text)' : 'inherit' }}
          >
            Jaiden Despain
          </Link>
        </div>
      </header>
      
      {/* Navigation in bottom right */}
      <header className="w-full absolute bottom-0 right-0 z-30">
        <nav className="flex items-center justify-end w-full px-6 sm:px-8 md:px-14 pb-6 md:pb-8">
          <div className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar-font text-base font-medium transition-colors ${
                  pathname === link.href
                    ? "underline underline-offset-6 decoration-2"
                    : ""
                }`}
                style={{ 
                  color: isNightLightsPage ? 'var(--night-text)' : 'inherit',
                  textDecorationColor: pathname === link.href 
                    ? (isNightLightsPage ? 'var(--night-text)' : 'var(--color-underline)')
                    : undefined
                }}
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
            <span 
              className="block w-6 h-0.5 mb-1" 
              style={{ backgroundColor: isNightLightsPage ? 'var(--night-text)' : '#000' }}
            />
            <span 
              className="block w-6 h-0.5 mb-1" 
              style={{ backgroundColor: isNightLightsPage ? 'var(--night-text)' : '#000' }}
            />
            <span 
              className="block w-6 h-0.5" 
              style={{ backgroundColor: isNightLightsPage ? 'var(--night-text)' : '#000' }}
            />
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
                  className="navbar-font text-lg font-medium hover:underline underline-offset-4 transition-colors"
                  onClick={() => setMenuOpen(false)}
                  style={{ color: isNightLightsPage ? 'var(--night-text)' : 'inherit' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
} 