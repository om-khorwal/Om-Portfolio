// app/layout.tsx
"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

const headerVariants = {
  hidden: { y: -24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const navListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.15, staggerChildren: 0.05 },
  },
};

const navItemVariants = {
  hidden: { y: -8, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.25 } },
};

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-black text-slate-100 antialiased">
        {/* Background mesh layer if you have .bg-mesh in globals, else remove */}
        <div className="pointer-events-none fixed inset-0 opacity-25 bg-mesh" />

        {/* Header */}
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/10"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="font-semibold tracking-tight">
                Om<span className="opacity-70">'s Portfolio</span>
              </Link>

              {/* Desktop nav */}
              <motion.nav
                variants={navListVariants}
                initial="hidden"
                animate="visible"
                className="hidden md:block"
              >
                <ul className="flex items-center gap-1">
                  {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <motion.li key={item.href} variants={navItemVariants}>
                        <Link
                          href={item.href}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            active
                              ? "bg-white/10 text-white"
                              : "text-slate-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.nav>

              {/* Mobile menu button */}
              <button
                aria-label="Toggle navigation"
                className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? "Close" : "Menu"}
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden border-t border-white/10 bg-black/50 backdrop-blur"
              >
                <ul className="mx-auto max-w-6xl px-4 py-2 space-y-1">
                  {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block px-3 py-2 rounded-lg ${
                            active
                              ? "bg-white/10 text-white"
                              : "text-slate-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* Page transitions */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 mx-auto max-w-6xl px-4 py-10"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 text-sm">
          <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="opacity-70">© {new Date().getFullYear()} Om. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <a className="hover:underline opacity-80 hover:opacity-100" href="/contact">
                Contact
              </a>
              <a className="hover:underline opacity-80 hover:opacity-100" href="/services">
                Services
              </a>
              <a
                className="hover:underline opacity-80 hover:opacity-100"
                href="mailto:hello@example.com"
              >
                hello@example.com
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
