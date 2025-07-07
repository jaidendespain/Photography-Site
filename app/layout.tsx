import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";
import { MotionProvider } from "./components/MotionProvider";

export const metadata: Metadata = {
  title: {
    default: "Jaiden Despain",
    template: "%s | Jaiden Despain"
  },
  description: "photo gallery",
  keywords: ["photography", "infrared", "night photography", "Jaiden Despain"],
  authors: [{ name: "Jaiden Despain" }],
  creator: "Jaiden Despain",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jaidendespa.in",
    title: "Jaiden Despain",
    description: "photo gallery",
    siteName: "Jaiden Despain",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaiden Despain",
    description: "photo gallery",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <MotionProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
        </MotionProvider>
      </body>
    </html>
  );
}
