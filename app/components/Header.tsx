"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Entry" },
  { href: "/infauxred", label: "Infauxred" },
  { href: "/night-lights", label: "Night Lights" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Find current page index
  const currentIndex = NAV_LINKS.findIndex(link => link.href === pathname);

  // Update underline position
  useEffect(() => {
    // Add a small delay to ensure DOM elements are ready after theme changes
    const timer = setTimeout(() => {
      // Only show hovered index if we're hovering over the nav area
      const targetIndex = (isNavHovered && hoveredIndex !== null) ? hoveredIndex : currentIndex;
      const targetLink = linkRefs.current[targetIndex];
      const navElement = navRef.current;

      if (targetLink && navElement) {
        const navRect = navElement.getBoundingClientRect();
        const linkRect = targetLink.getBoundingClientRect();
        
        setUnderlineStyle({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
        });
      }
    }, 50); // Small delay to ensure theme transition is complete

    return () => clearTimeout(timer);
  }, [hoveredIndex, isNavHovered, currentIndex, pathname]);

  return (
    <>
      {/* Name in top left */}
      <header className="w-full absolute top-0 left-0 z-30">
        <div className="px-6 sm:px-8 md:px-14 pt-6 md:pt-8">
          <Link 
            href="/" 
            className="title-font text-2xl tracking-tight title-text"
          >
            Jaiden Despain
          </Link>
        </div>
      </header>
      
      {/* Navigation in bottom right */}
      <header className="w-full absolute bottom-0 right-0 z-30">
        <nav className="flex items-center justify-end w-full px-6 sm:px-8 md:px-14 pb-6 md:pb-8">
          <div 
            ref={navRef}
            className="hidden md:flex gap-8 items-center relative px-4 py-2 -mx-4 -my-2"
            onMouseEnter={() => setIsNavHovered(true)}
            onMouseLeave={() => {
              setIsNavHovered(false);
              setHoveredIndex(null);
            }}
          >
            {/* Sliding underline */}
            <div
              className="absolute bottom-0 h-0.5 transition-all duration-300 ease-in-out navbar-underline"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
              }}
            />
            
            {NAV_LINKS.map((link, index) => (
              <m.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  ref={(el) => {
                    linkRefs.current[index] = el;
                  }}
                  className="navbar-font text-base font-medium transition-colors relative navbar-text"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  {link.label}
                </Link>
              </m.div>
            ))}
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="block w-6 h-0.5 mb-1 mobile-menu-button" />
            <span className="block w-6 h-0.5 mb-1 mobile-menu-button" />
            <span className="block w-6 h-0.5 mobile-menu-button" />
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
                  className="navbar-font text-lg font-medium hover:underline underline-offset-4 transition-colors navbar-text"
                  onClick={() => setMenuOpen(false)}
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