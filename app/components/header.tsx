"use client";

import Link from "next/link";
import Image from "next/image";
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

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/10 "
    >
      <div className="mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/theokcompanylogo.png"
            alt="theokcompany logo"
            width={28}
            height={28}
            className="rounded-md"
            priority
          />
          <span className="font-semibold tracking-tight">theokcompany</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
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
              </li>
            );
          })}
        </ul>

        {/* Mobile */}
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-white/10 bg-black/50 backdrop-blur"
          >
            <ul className="px-4 py-2 space-y-1">
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
  );
}
