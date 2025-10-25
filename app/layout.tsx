import "./globals.css";
import type { Metadata } from "next";
import Header from "../app/components/header"; // 👈 simple client header
import Footer from "../app/components/footer"; // optional small footer if you want

export const metadata: Metadata = {
  title: "theokcompany — Om Khorwal",
  description: "Modern web experiences and cinematic edits. theokcompany.in by Om Khorwal.",
  icons: {
    icon: [{ url: "/theokcompanylogo.png", rel: "icon", type: "image/png" }],
  },
  metadataBase: new URL("https://theokcompany.in"),
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-black text-slate-100 antialiased">
        <Header /> {/* ✅ all framer-motion + nav logic lives there */}
        <main className="relative z-10 mx-auto max-w-6xl px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
