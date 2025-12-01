import "./globals.css";
import Cursor from "../app/components/cursor"; // or correct path
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import Header from "../app/components/header";
import Footer from "../app/components/footer";

export const metadata: Metadata = {
  title: "theokcompany - Om Khorwal",
  description: "Modern web experiences and cinematic edits. theokcompany.in by Om Khorwal.",
  icons: {
    icon: [{ url: "/theokcompanylogo.png", rel: "icon", type: "image/png" }],
  },
  metadataBase: new URL("https://theokcompany.in"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen text-slate-100 antialiased relative overflow-x-hidden">
        {/* Animated colorful background (behind everything) */}
        <div aria-hidden className="aurora-wrap">
          <div className="aurora-bg" />
          <div className="aurora-blob-a" />
          <div className="aurora-blob-b" />
          <div className="aurora-dim" />
        </div>

        <Header />

        {/* Responsive container:
            - small screens: full-width with small padding
            - md: constrained width with comfortable padding
            - lg: max width (like 7xl) for very large screens
         */}
        <main className="relative z-10 mx-auto w-full px-1 pt-12 sm:px-6 md:pt-16 md:px-8 lg:pt-10 lg:max-w-5/6">
          {children}
          <Analytics />

        </main>

        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
