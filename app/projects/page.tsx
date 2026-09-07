"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// ---- DEV PROJECTS ----
const devProjects = [
  {
    title: "PICO",
    tag: "Consumer & B2B Product",
    summary: "A grocery price-comparison product with a B2B experience for market-pricing insights and more confident decisions.",
    link: "https://pico-test-alpha.vercel.app/home",
    image: "/portfolio/pico-specials.jpeg",
    badges: ["Product engineering", "Consumer product", "B2B experience"],
  },
  {
    title: "Livinnovate",
    tag: "Business / Community Website",
    summary: "Responsive platform with structured content, modern UI, community-focused sections, and an SEO-friendly foundation.",
    link: "https://livinnovate.com/",
    image: "/portfolio/livinnovate.png",
    badges: ["Community", "Responsive", "SEO"],
  },
  {
    title: "TraceIT",
    tag: "Web Application",
    summary: "QR-powered product traceability platform with role-based dashboards and product tracking workflows.",
    link: "https://traceit.in",
    image: "/portfolio/traceit.png",
    badges: ["Traceability", "Dashboards", "QR"],
  },
  {
    title: "Agaate",
    tag: "AgriTech Website",
    summary: "Website for an agriculture technology business, presenting its products, services, and technology-driven approach.",
    link: "https://agaate.in/",
    image: "/portfolio/agaate.png",
    badges: ["AgriTech", "Business website", "UI/UX"],
  },
  {
    title: "Ani-ite",
    tag: "Web Application",
    summary: "Anime discovery and information website with API integration, responsive layouts, and a modern browsing experience.",
    link: "https://anime.theokcompany.in/",
    image: "/portfolio/ani-ite.png",
    badges: ["API integration", "Responsive", "Discovery"],
  },
  {
    title: "InsightUI AI",
    tag: "AI / Website Intelligence",
    summary: "An AI-powered website auditing platform that turns a website URL into actionable design, UX, performance, SEO, accessibility, and technical insights.",
    link: "",
    image: "/portfolio/insightui-ai.png",
    badges: ["AI", "Product engineering", "UI/UX", "Technical consulting"],
  },
  {
    title: "Customer Feedback Intelligence",
    tag: "AI Automation / Business Workflow",
    summary: "An AI workflow that turns feedback from emails, product reviews, and support tickets into recurring themes and actionable insights.",
    link: "",
    image: "/portfolio/customer-feedback-intelligence.png",
    badges: ["AI Automation", "LLM", "Workflow Automation", "Product Engineering"],
  },
  {
    title: "DataMonk",
    tag: "Business Website",
    summary: "Modern business website focused on clear presentation, responsiveness, performance, and SEO.",
    link: "https://datamonk.dev",
    image: "/portfolio/datamonk.png",
    badges: ["Responsive", "Performance", "SEO"],
  },
  {
    title: "NotesFlow",
    tag: "Freelance · Full-stack Web App",
    summary: "Professional notes and tasks system — capture ideas, manage work, and share anything instantly with rich formatting and dark mode.",
    link: "https://notes-flow.theokcompany.in/",
    image: "https://res.cloudinary.com/duljp6zqa/image/upload/v1776624869/07ebdf63-c67c-4fd0-90e7-aa2c88dd2ace.png",
    badges: ["Rich Notes", "Task Management", "Secure Sharing"],
  },
];

type TabKey = "Development" | "Videos";
const TABS: TabKey[] = ["Development", "Videos"];

export default function ProjectsPage() {
  const [active, setActive] = useState<TabKey>("Development");

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
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Work</h1>
        <p className="mt-2 text-sm sm:text-base opacity-80">
          Full-stack development work and video edits.
        </p>
      </header>

      {/* Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
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
                p.link ? (
                  <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer">
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
                ) : (
                  <motion.div
                    key={p.title}
                    className="group glass rounded-2xl p-4 sm:p-5 h-full"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
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
                )
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
