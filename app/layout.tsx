import "./globals.css";
import Cursor from "../app/components/cursor"; // or correct path

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
        <main className="relative z-10 mx-auto w-[85%] px-4">{children}</main>
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
