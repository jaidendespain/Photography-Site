"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Check if we're on the night-lights page
    const isNightPage = pathname === "/night-lights";
    
    // Apply or remove the night-theme class
    if (isNightPage) {
      document.body.classList.add("night-theme");
    } else {
      document.body.classList.remove("night-theme");
    }
  }, [pathname]);

  return <>{children}</>;
} 