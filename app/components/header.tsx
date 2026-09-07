"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const mainNavItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const moreItems = [
  { href: "/blog", label: "Blog" },
  { href: "/bgremove", label: "BG Remove" },
];

const allNavItems = [...mainNavItems, ...moreItems];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-white/10"
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
          {mainNavItems.map((item) => {
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

          {/* Desktop more hamburger */}
          <li ref={moreRef} className="relative">
            <button
              aria-label="More pages"
              onClick={() => setMoreOpen((v) => !v)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                moreOpen
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="flex flex-col gap-[4px]">
                <span className="block w-4 h-[2px] bg-current rounded-full" />
                <span className="block w-4 h-[2px] bg-current rounded-full" />
                <span className="block w-4 h-[2px] bg-current rounded-full" />
              </span>
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 min-w-[140px] rounded-xl border border-white/10 bg-black/80 backdrop-blur p-1.5 shadow-xl"
                >
                  {moreItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
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
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-white/10 bg-black/50 backdrop-blur"
          >
            <ul className="px-4 py-2 space-y-1">
              {allNavItems.map((item) => {
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
