import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kriti Gupta — Senior UI/UX Designer",
  description:
    "Portfolio of Kriti Gupta, a Senior UI/UX Designer crafting digital experiences that blend aesthetics with functionality. 7+ years of experience designing for top brands.",
  keywords: [
    "UI/UX Designer",
    "Product Design",
    "User Experience",
    "Kriti Gupta",
    "Portfolio",
  ],
  openGraph: {
    title: "Kriti Gupta — Senior UI/UX Designer",
    description:
      "Crafting digital experiences that blend aesthetics with functionality.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col grain">{children}</body>
    </html>
  );
}
