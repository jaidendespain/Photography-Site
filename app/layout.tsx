import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";
import { MotionProvider } from "./components/MotionProvider";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata: Metadata = {
  title: "Jaiden Despain",
  description: "a photo gallery.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black min-h-screen flex flex-col">
        <ThemeProvider>
          <MotionProvider>
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
