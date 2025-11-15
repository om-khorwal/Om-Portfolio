"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const offerings = [
  {
    id: "product",
    title: "Product & Engineering",
    tag: "Reliable product outcomes",
    short: "From brief → preview → launch",
    icon: "code",
  },
  {
    id: "ops",
    title: "Deploy & Operate",
    tag: "Keep it healthy",
    short: "Previews, monitoring, rollbacks",
    icon: "cloud",
  },
  {
    id: "brand",
    title: "Design & Brand",
    tag: "Clarity-first visuals",
    short: "Reusable UI & marketing assets",
    icon: "pen",
  },
  {
    id: "video",
    title: "Creative Edits",
    tag: "Story-led edits",
    short: "Reels, promos, platform-ready",
    icon: "play",
  },
];

function Icon({ name }: { name: string }) {
  const base = "w-12 h-12 md:w-14 md:h-14 flex-shrink-0";
  switch (name) {
    case "code":
      return (
        <div className={`${base} flex items-center justify-center rounded-lg bg-white/5`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
            <path d="M16 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-300"/>
            <path d="M8 6L2 12l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-300"/>
            <path d="M14 4l-4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/70"/>
          </svg>
        </div>
      );
    case "cloud":
      return (
        <div className={`${base} flex items-center justify-center rounded-lg bg-white/5`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
            <path d="M20 17.5A4.5 4.5 0 0015.5 13H14a4 4 0 10-7.874 1.333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-300"/>
            <path d="M3 19h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-white/70"/>
          </svg>
        </div>
      );
    case "pen":
      return (
        <div className={`${base} flex items-center justify-center rounded-lg bg-white/5`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
            <path d="M3 21l3-1 11-11 1-3-3 1L4 20z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-300"/>
            <path d="M14 7l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70"/>
          </svg>
        </div>
      );
    case "play":
      return (
        <div className={`${base} flex items-center justify-center rounded-lg bg-white/5`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
            <path d="M5 3v18l15-9L5 3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-300"/>
          </svg>
        </div>
      );
    default:
      return (
        <div className={`${base} flex items-center justify-center rounded-lg bg-white/5`}>
          <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden>
            <circle cx="12" cy="12" r="8" className="text-fuchsia-300" />
          </svg>
        </div>
      );
  }
}

export default function ServicesPage() {
  return (
    <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-16 lg:py-20">
      {/* HERO (short & visual) */}
      <section className="text-center mb-10 md:mb-14">
        <motion.h1 {...fade} className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
          Services — Build, Polish, Launch
        </motion.h1>
        <motion.p {...fade} transition={{ delay: 0.06 }} className="mt-4 max-w-2xl mx-auto opacity-80 text-sm md:text-base">
          I help teams turn ideas into impact — product, operations, brand and short-form edits.
        </motion.p>
      </section>

      {/* INFOGRAPHIC ROW */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <motion.div {...fade} className="glass rounded-2xl p-6 text-center">
          <div className="text-3xl font-semibold">2+</div>
          <div className="text-xs opacity-80 mt-1">Years of Experience</div>
        </motion.div>

        <motion.div {...fade} transition={{ delay: 0.03 }} className="glass rounded-2xl p-6 text-center">
          <div className="text-3xl font-semibold">50+</div>
          <div className="text-xs opacity-80 mt-1">Projects shipped</div>
        </motion.div>

        <motion.div {...fade} transition={{ delay: 0.06 }} className="glass rounded-2xl p-6 text-center">
          <div className="text-3xl font-semibold">Fast</div>
          <div className="text-xs opacity-80 mt-1">Preview-driven iterations</div>
        </motion.div>
      </section>

      {/* OFFERINGS — responsive visual tiles */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
        {offerings.map((o, i) => (
          <motion.article
            key={o.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="glass rounded-2xl p-5 md:p-6 flex items-center gap-4 md:gap-5"
          >
            <Icon name={o.icon} />
            <div className="flex-1">
              <div className="text-base md:text-lg font-semibold">{o.title}</div>
              <div className="text-xs md:text-sm opacity-75 mt-1">{o.tag}</div>
            </div>
            <div className="text-[10px] md:text-xs opacity-70 text-right hidden sm:block">{o.short}</div>
          </motion.article>
        ))}
      </section>

      {/* CASE STUDIES — responsive */}
      <section id="casestudies" className="mb-12">
        <motion.h2 {...fade} className="text-xl md:text-2xl font-bold mb-4">Selected work</motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <a href="https://traceit.in" target="_blank" rel="noreferrer" className="group glass rounded-2xl overflow-hidden flex items-center justify-between p-4 md:p-5">
            <div>
              <div className="text-xs uppercase opacity-60">Case</div>
              <div className="font-semibold text-sm md:text-base">TraceIT</div>
              <div className="text-xs opacity-75 mt-1">Faster ops with focused dashboards</div>
            </div>
            <div className="relative w-24 h-16 md:w-28 md:h-20">
              <Image src="/t.png" alt="TraceIT" fill unoptimized className="object-cover" />
            </div>
          </a>

          <a href="https://anime.theokcompany.in" target="_blank" rel="noreferrer" className="group glass rounded-2xl overflow-hidden flex items-center justify-between p-4 md:p-5">
            <div>
              <div className="text-xs uppercase opacity-60">Case</div>
              <div className="font-semibold text-sm md:text-base">Ani-ike</div>
              <div className="text-xs opacity-75 mt-1">Fast, delightful browsing</div>
            </div>
            <div className="relative w-24 h-16 md:w-28 md:h-20">
              <Image src="/a.png" alt="Ani-ike" fill unoptimized className="object-cover" />
            </div>
          </a>
        </div>
      </section>

      {/* CTA — responsive */}
      <section className="mb-16">
        <motion.div {...fade} className="glass rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-lg md:text-xl font-semibold">Ready to start?</h3>
          <p className="mt-2 text-xs md:text-sm opacity-80 max-w-md mx-auto">Share a brief — I’ll scope and propose a plan.</p>
          <div className="mt-4 flex justify-center">
            <Link href="/contact" className="glass px-4 py-2 rounded-lg text-sm md:text-base">Get in touch</Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
