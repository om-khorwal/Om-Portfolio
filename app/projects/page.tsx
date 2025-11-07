"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// ---- Data ----
const designProjects = [
  {
    title: "Taste-of-Marwad",
    tag: "Next.js · Tailwind · GSAP",
    summary: "Animated restaurant site with buttery scroll + responsive layouts.",
    link: "#",
    image: "/TOM.png",
    badges: ["Optimized assets", "Fast transitions"],
  },
  {
    title: "Datamonk",
    tag: "React · UI/UX",
    summary: "Clean, SEO-friendly services website with clear content flow.",
    link: "#",
    image: "/datamonk.png",
    badges: ["SEO-Ready", "Responsive"],
  },
];

const devProjects = [
  {
    title: "TraceIT",
    tag: "Ruby on Rails",
    summary: "QR-powered product tracking with role-based dashboards.",
    link: "https://www.traceit.in",
    image: "/p.png",
    badges: ["-40% load time", "+99.9% uptime"],
  },
];

const youtubeVideos = [
  {
    id: "CmTY_8259Fg",
    title: "Review Video — Bike Ride & Experience",
    category: "Review",
    desc: "Cinematic breakdown with smooth transitions & story pacing.",
  },
  {
    id: "3FfO1_nLzQI",
    title: "Fast Cuts Reel — Ride Highlights",
    category: "Reel",
    desc: "Quick cuts, motion, captions — short-form impact.",
  },
  {
    id: "5hL6dJNYwBw",
    title: "Full Vlog — Scenic Ride Adventure",
    category: "Vlog",
    desc: "Immersive landscapes, raw sound, on-the-road storytelling.",
  },
];

type TabKey = "Design" | "Development" | "Videos";
const TABS: TabKey[] = ["Design", "Development", "Videos"];

export default function ProjectsPage() {
  const [active, setActive] = useState<TabKey>("Design");

  return (
    <main>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Projects</h1>
        <p className="mt-2 opacity-80">
          Three lenses on my work: visual design, full-stack development, and video edits.
        </p>
      </header>

      {/* 3-column tab switcher */}
      <div className="grid md:grid-cols-3 gap-3 mb-8">
        {TABS.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`relative w-full rounded-2xl border border-white/10 px-4 py-4 text-left transition
                ${isActive ? "text-white" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="tabGlow"
                  className="absolute inset-0 rounded-2xl bg-white/10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative z-10">
                <div className="text-sm uppercase opacity-70">Category</div>
                <div className="mt-1 text-lg font-semibold">{tab}</div>
                <p className="mt-1 text-sm opacity-75">
                  {tab === "Design" && "Animated, conversion-focused websites."}
                  {tab === "Development" && "MVPs, dashboards, and real-world backends."}
                  {tab === "Videos" && "Reels, reviews, and full vlogs."}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Content area */}
      <div className="min-h-[320px]">
        <AnimatePresence mode="wait">
          {active === "Design" && (
            <motion.section
              key="design"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {designProjects.map((p, i) => (
                <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer" className="block">
                  <motion.div
                    className="group glass rounded-2xl p-5 h-full"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                      <Image
                        src={p.image}
                        alt={`${p.title} cover`}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    </div>
                    <div className="text-xs uppercase tracking-wide opacity-70">{p.tag}</div>
                    <h3 className="mt-1 text-xl font-semibold">{p.title}</h3>
                    <p className="mt-2 opacity-80 text-sm">{p.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.badges.map((m) => (
                        <span key={m} className="rounded-lg px-2 py-1 text-xs border border-white/15">
                          {m}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </a>
              ))}
            </motion.section>
          )}

          {active === "Development" && (
            <motion.section
              key="development"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {devProjects.map((p, i) => (
                <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer" className="block">
                  <motion.div
                    className="group glass rounded-2xl p-5 h-full"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                      <Image
                        src={p.image}
                        alt={`${p.title} cover`}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    </div>
                    <div className="text-xs uppercase tracking-wide opacity-70">{p.tag}</div>
                    <h3 className="mt-1 text-xl font-semibold">{p.title}</h3>
                    <p className="mt-2 opacity-80 text-sm">{p.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.badges.map((m) => (
                        <span key={m} className="rounded-lg px-2 py-1 text-xs border border-white/15">
                          {m}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </a>
              ))}
            </motion.section>
          )}

          {active === "Videos" && (
            <motion.section
              key="videos"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {youtubeVideos.map((v, i) => (
                <motion.div
                  key={v.id}
                  className="glass rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="relative aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${v.id}`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wide text-fuchsia-300">{v.category}</p>
                    <h3 className="text-lg font-semibold mt-1">{v.title}</h3>
                    <p className="mt-2 opacity-80 text-sm">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
