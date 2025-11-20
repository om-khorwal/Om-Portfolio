"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { summary } from "framer-motion/client";

// ---- DESIGN PROJECTS ----
const designProjects = [
  {
    title: "BMF — Buildmyflow",
    tag: "Product Design · Figma",
    img: "https://res.cloudinary.com/duljp6zqa/image/upload/v1763229778/Screenshot_from_2025-11-15_18-07-13_xy6tgn.png",
    summary: "Complete product design for a no-code workflow automation tool.",
    link: "https://www.figma.com/design/KahM52ankr6DGvXZJ7cpVF/BMF--Buildmyflow?node-id=0-1&p=f",
    badges: ["Component-driven", "Prototypes"],
  },
  {
    title: "OCS",
    tag: "UI/UX · Figma",
    img: "https://res.cloudinary.com/duljp6zqa/image/upload/v1763229903/31beb1e8-c0e4-4e81-9433-8f743eddffac.png",
    summary: "Community platform design with engaging, hero-focused layouts.",
    link: "https://www.figma.com/design/IKw4sk8SK2HbPCwNdsjxhX/OCS?node-id=0-1&p=f",
    badges: ["Hero-focused", "Responsive"],
  },
  {
    title: "Valutics",
    tag: "Web-App · Figma",
    img: "https://res.cloudinary.com/duljp6zqa/image/upload/v1763229874/b7bd832f-ee06-4e2f-b220-ff8fc58f0ca1.png",
    summary: "Client web app for IT service management.",
    link: "https://www.figma.com/design/2SXZDIpUFvGNSk4MXdX7kl/Valutics-Landing-Page?node-id=0-1&p=f",
    badges: ["Design system", "Landing UX"],
  },
];

// ---- DEV PROJECTS ----
const devProjects = [
  {
    title: "TraceIT",
    tag: "Ruby on Rails",
    summary: "QR-powered product tracking with role-based dashboards.",
    link: "https://www.traceit.in",
    image: "https://res.cloudinary.com/duljp6zqa/image/upload/v1763099904/t_bggdu4.png",
    badges: ["-40% load time", "+99.9% uptime"],
  },
  {
    title: "DataMonk",
    tag: "Next.js · Tailwind CSS · Framer Motion",
    summary: "Datamonk official business website with SEO optimizations.",
    link: "https://www.datamonk.dev",
    image: "https://res.cloudinary.com/duljp6zqa/image/upload/v1763631076/5f77e88e-b2c2-4f88-9297-a4fe0a25121a.png",
    badges: ["Modern Website",],
  },
  {
    title: "Livinnovate",
    tag: "React · Fastapi",
    summary: "Website with clean structure, elegant UI, and strong SEO.",
    href: "https://www.livinnovate.com/",
    image: "/l.png",
    badges: ["Clear & Scalable code",],
  },
];

type TabKey = "Design" | "Development" | "Videos";
const TABS: TabKey[] = ["Design", "Development", "Videos"];

export default function ProjectsPage() {
  const [active, setActive] = useState<TabKey>("Design");

  // YOUTUBE FROM BACKEND API
  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [videosLoading, setVideosLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      try {
        setVideosLoading(true);
        const res = await fetch("/api/youtube/latest");
        const data = await res.json();
        const items = data.items || [];

        setYoutubeVideos(items);
        setSelectedVideo(items[0] || null);
      } catch (err) {
        console.error("Failed to fetch YouTube:", err);
      } finally {
        setVideosLoading(false);
      }
    }
    loadVideos();
  }, []);

  return (
    <main>
      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Projects</h1>
        <p className="mt-2 text-sm sm:text-base opacity-80">
          Three lenses on my work: visual design, full-stack development, and video edits.
        </p>
      </header>

      {/* Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {TABS.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`relative rounded-2xl border border-white/10 px-4 py-3 text-left transition ${
                isActive ? "text-white" : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="tabGlow"
                  className="absolute inset-0 rounded-2xl bg-white/8"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <div className="relative z-10">
                <div className="text-xs uppercase opacity-70">Category</div>
                <div className="mt-1 text-base md:text-lg font-semibold">{tab}</div>
                <p className="mt-1 text-xs md:text-sm opacity-75">
                  {tab === "Design" && "Product, UI/UX & systems."}
                  {tab === "Development" && "Dashboards, workflows & backends."}
                  {tab === "Videos" && "Shorts, cinematic edits & vlogs."}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="min-h-[320px]">
        <AnimatePresence mode="wait">
          {/* DESIGN TAB */}
          {active === "Design" && (
            <motion.section
              key="design"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {designProjects.map((p, i) => (
                <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    className="group glass rounded-2xl p-4 sm:p-5 h-full"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-20 transition" />
                    </div>

                    <div className="text-xs uppercase opacity-70">{p.tag}</div>
                    <h3 className="text-lg font-semibold mt-1">{p.title}</h3>
                    <p className="text-sm opacity-80 mt-2">{p.summary}</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.badges.map((b) => (
                        <span key={b} className="px-2 py-1 text-xs border border-white/15 rounded-lg">
                          {b}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </a>
              ))}
            </motion.section>
          )}

          {/* DEVELOPMENT TAB */}
          {active === "Development" && (
            <motion.section
              key="development"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {devProjects.map((p, i) => (
                <a key={p.title} href={p.link} target="_blank">
                  <motion.div
                    className="group glass rounded-2xl p-4 sm:p-5 h-full"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-30 transition" />
                    </div>

                    <div className="text-xs uppercase opacity-70">{p.tag}</div>
                    <h3 className="text-xl font-semibold mt-1">{p.title}</h3>
                    <p className="text-sm opacity-80 mt-2">{p.summary}</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.badges.map((b) => (
                        <span key={b} className="px-2 py-1 text-xs border border-white/15 rounded-lg">
                          {b}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </a>
              ))}
            </motion.section>
          )}

          {/* VIDEOS TAB */}
          {active === "Videos" && (
            <motion.section
              key="videos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 gap-6"
            >
              {/* LOADING */}
              {videosLoading && (
                <div className="glass rounded-2xl p-6 text-center">Loading latest uploads...</div>
              )}

              {/* NO DATA */}
              {!videosLoading && youtubeVideos.length === 0 && (
                <div className="glass rounded-2xl p-6 text-center">No videos found.</div>
              )}

              {/* FEATURED VIDEO */}
              {!videosLoading && selectedVideo && (
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="relative aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                      title={selectedVideo.title}
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs uppercase text-fuchsia-300">
                      {selectedVideo.category}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mt-1">
                      {selectedVideo.title}
                    </h3>
                    <p className="mt-2 text-sm opacity-80">{selectedVideo.desc}</p>
                  </div>
                </div>
              )}

              {/* GRID OF MORE VIDEOS */}
              {!videosLoading && youtubeVideos.length > 0 && (
                <div>
                  <h4 className="text-sm md:text-base font-semibold mb-3">More uploads</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {youtubeVideos.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVideo(v)}
                        className={`group rounded-lg overflow-hidden border border-white/10 ${
                          selectedVideo?.id === v.id ? "ring-2 ring-white/20" : ""
                        }`}
                      >
                        <div className="relative aspect-video">
                          <img
                            src={v.thumbnail}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            alt={v.title}
                          />
                        </div>
                        <div className="p-2">
                          <div className="text-xs uppercase opacity-70">{v.category}</div>
                          <div className="mt-1 text-sm font-medium">{v.title}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
