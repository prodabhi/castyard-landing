import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Headings, in the style of ns.com's serif
const serif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Castyard",
  description:
    "Farcaster, on your own node. A Farcaster client backed by Snapchain, one command away.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${serif.variable} antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
