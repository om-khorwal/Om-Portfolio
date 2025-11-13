"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// ---- Data ----
const designProjects = [
  {
    title: "BMF — Buildmyflow",
    tag: "Product Design· Figma",
    summary: "Complete product design for a no-code workflow automation tool.",
    link: "https://www.figma.com/design/KahM52ankr6DGvXZJ7cpVF/BMF--Buildmyflow?node-id=0-1&p=f&t=f2X5gtpczITdhgyi-0",
    figmaUrl:
      "https://www.figma.com/design/KahM52ankr6DGvXZJ7cpVF/BMF--Buildmyflow?node-id=0-1&p=f&t=f2X5gtpczITdhgyi-0",
    badges: ["Component-driven", "Prototypes"],
  },
  {
    title: "OCS",
    tag: "UI/UX · Figma",
    summary: "Community platform design with engaging, hero-focused layouts.",
    link: "https://www.figma.com/design/IKw4sk8SK2HbPCwNdsjxhX/OCS?node-id=0-1&p=f&t=N2R1Py8or1ZpioeN-0",
    figmaUrl:
      "https://www.figma.com/design/IKw4sk8SK2HbPCwNdsjxhX/OCS?node-id=0-1&p=f&t=N2R1Py8or1ZpioeN-0",
    badges: ["Hero-focused", "Responsive"],
  },
  {
    title: "Valutics",
    tag: "Web-App · Figma",
    summary: "Client web app for IT service management.",
    link: "https://www.figma.com/design/2SXZDIpUFvGNSk4MXdX7kl/Valutics-Landing-Page?node-id=0-1&p=f&t=7pegHWLfN1scSdKE-0",
    figmaUrl:
      "https://www.figma.com/design/2SXZDIpUFvGNSk4MXdX7kl/Valutics-Landing-Page?node-id=0-1&p=f&t=7pegHWLfN1scSdKE-0",
    badges: ["Design system", "Landing UX"],
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

// youtubeVideos: assumed ordered newest -> oldest (keep latest first)
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

  // Selected video for the Videos tab (default: latest)
  const [selectedVideo, setSelectedVideo] = useState(() => youtubeVideos[0]);

  return (
    <main>
      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Projects</h1>
        <p className="mt-2 text-sm sm:text-base opacity-80">
          Three lenses on my work: visual design, full-stack development, and video edits.
        </p>
      </header>

      {/* 3-column tab switcher */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 sm:mb-8">
        {TABS.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`relative w-full rounded-2xl border border-white/10 px-4 py-3 text-left transition
                ${isActive ? "text-white" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="tabGlow"
                  className="absolute inset-0 rounded-2xl bg-white/8"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative z-10">
                <div className="text-xs uppercase opacity-70">Category</div>
                <div className="mt-1 text-base md:text-lg font-semibold">{tab}</div>
                <p className="mt-1 text-xs md:text-sm opacity-75">
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
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {designProjects.map((p, i) => (
                <a
                  key={p.title}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <motion.div
                    className="group glass rounded-2xl p-4 sm:p-5 h-full"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                      {/* Figma embed preview (responsive) */}
                      <iframe
                        src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
                          p.figmaUrl
                        )}`}
                        title={`${p.title} — Figma preview`}
                        className="w-full h-full border-0"
                        allowFullScreen
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                    </div>

                    <div className="text-xs uppercase tracking-wide opacity-70">{p.tag}</div>
                    <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 opacity-80 text-sm">{p.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
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
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {devProjects.map((p, i) => (
                <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer" className="block">
                  <motion.div
                    className="group glass rounded-2xl p-4 sm:p-5 h-full"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-3 min-h-[140px]">
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
                    <div className="mt-3 flex flex-wrap gap-2">
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
              transition={{ duration: 0.18 }}
              className="grid grid-cols-1 gap-6"
            >
              {/* Featured (latest) video */}
              <div className="glass rounded-2xl overflow-hidden p-0">
                <div className="w-full">
                  <div className="relative aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs uppercase tracking-wide text-fuchsia-300">{selectedVideo.category}</div>
                    <h3 className="text-lg md:text-xl font-semibold mt-1">{selectedVideo.title}</h3>
                    <p className="mt-2 opacity-80 text-sm md:text-base">{selectedVideo.desc}</p>
                  </div>
                </div>
              </div>

              {/* Thumbnails / list — responsive grid */}
              <div>
                <h4 className="text-sm md:text-base font-semibold mb-3">More videos</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {youtubeVideos.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVideo(v)}
                      className={`group text-left rounded-lg overflow-hidden border border-white/8 p-0 focus:outline-none ${
                        selectedVideo.id === v.id ? "ring-2 ring-white/20" : ""
                      }`}
                      aria-label={`Play ${v.title}`}
                    >
                      <div className="relative aspect-video">
                        {/* YouTube thumbnail */}
                        <img
                          src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                          alt={v.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/40 rounded-full p-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                              <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <div className="text-xs uppercase tracking-wide opacity-70">{v.category}</div>
                        <div className="mt-1 text-sm font-medium">{v.title}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
