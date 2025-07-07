"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isNightLightsPage = pathname === "/night-lights";
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Find current page index
  const currentIndex = NAV_LINKS.findIndex(link => link.href === pathname);

  // Update underline position
  useEffect(() => {
    // Only show hovered index if we're hovering over the nav area
    const targetIndex = (isNavHovered && hoveredIndex !== null) ? hoveredIndex : currentIndex;
    const targetLink = linkRefs.current[targetIndex];
    const navElement = navRef.current;

    if (targetLink && navElement) {
      const navRect = navElement.getBoundingClientRect();
      const linkRect = targetLink.getBoundingClientRect();
      
      // Account for the padding (12px on each side, 8px top/bottom)
      const paddingLeft = 12;
      const paddingRight = 12;
      
      setUnderlineStyle({
        left: (linkRect.left - navRect.left) + paddingLeft,
        width: linkRect.width - (paddingLeft + paddingRight),
      });
    }
  }, [hoveredIndex, isNavHovered, currentIndex, pathname]);

  // Close menu after route transition completes
  useEffect(() => {
    if (isNavigating) {
      setMenuOpen(false);
      setIsNavigating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      setIsOverlayVisible(false);
      // Next tick, set to true to trigger fade-in
      const timeout = setTimeout(() => setIsOverlayVisible(true), 10);
      return () => clearTimeout(timeout);
    } else {
      setIsOverlayVisible(false);
    }
  }, [menuOpen]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      {/* Name in top left */}
      <header className="w-full absolute top-0 left-0 z-30">
        <div className="px-6 sm:px-8 md:px-14 pt-6 md:pt-8">
          <Link 
            href="/" 
            className="title-font text-2xl tracking-tight"
            style={{ color: hasMounted ? (isNightLightsPage ? 'var(--night-title)' : 'var(--color-title)') : 'var(--color-title)' }}
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
              className="absolute h-0.5 transition-all duration-300 ease-in-out"
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
                bottom: '5px',
                backgroundColor: hasMounted ? (isNightLightsPage ? 'var(--night-title)' : 'var(--color-title)') : 'var(--color-title)',
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
                  className="navbar-font text-base font-medium transition-colors relative block"
                  style={{ 
                    color: hasMounted ? (isNightLightsPage ? 'var(--night-title)' : 'var(--color-title)') : 'var(--color-title)',
                    padding: '8px 12px',
                    margin: '-8px -12px',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  {link.label}
                </Link>
              </m.div>
            ))}
          </div>
        </nav>
      </header>
      {/* Hamburger menu button */}
      <button
        className="md:hidden p-2 rounded fixed bottom-6 right-6 z-[100]"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((v) => !v)}
        type="button"
      >
        {hasMounted ? (
          <div className="relative size-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="absolute inset-0 size-6 transition-all duration-200"
              style={{
                color: isNightLightsPage ? 'var(--night-text)' : 'var(--color-text)',
                transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                opacity: menuOpen ? 0 : 1,
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="absolute inset-0 size-6 transition-all duration-200"
              style={{
                color: isNightLightsPage ? 'var(--night-text)' : 'var(--color-text)',
                transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
            style={{
              color: hasMounted ? (isNightLightsPage ? 'var(--night-text)' : 'var(--color-text)') : 'var(--color-text)',
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
        )}
      </button>
      {/* Mobile fullscreen menu overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-end md:hidden pb-16 backdrop-blur ${isNightLightsPage ? 'bg-[var(--night-bg)]/10' : 'bg-white/10'} transition-opacity duration-200 ${isOverlayVisible ? 'opacity-100' : 'opacity-0'}`}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setMenuOpen(false);
          }}
        >
          <nav className="flex flex-col items-center gap-10 w-full">
            {NAV_LINKS.map((link, index) => (
              <m.div
                key={link.href}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * index }}
                className="w-full flex justify-center"
              >
                <Link
                  href={link.href}
                  className={`navbar-font text-2xl sm:text-5xl font-normal tracking-tight transition-colors ${pathname === link.href ? 'underline' : ''}`}
                  style={{ 
                    color: hasMounted ? (isNightLightsPage ? 'var(--night-title)' : 'var(--color-title)') : 'var(--color-title)',
                    ...(pathname === link.href ? {
                      textDecorationThickness: '2px',
                      textUnderlineOffset: '10px',
                    } : {})
                  }}
                  onClick={e => {
                    e.preventDefault();
                    if (pathname !== link.href) {
                      setIsNavigating(true);
                      router.push(link.href);
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                  tabIndex={0}
                >
                  {link.label}
                </Link>
              </m.div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
} 