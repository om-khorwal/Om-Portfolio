"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// 🧠 Web Dev Projects
const projects = [
  {
    title: "TraceIT",
    tag: "Ruby on Rails",
    summary:
      "QR-powered product tracking platform with role-based dashboards and blazing-fast performance.",
    metrics: ["-40% load time", "+99.9% uptime"],
    link: "#",
    image: "/p.png",
  },
  {
    title: "Taste-of-Marwad",
    tag: "Next.js · Tailwind CSS · GSAP",
    summary:
      "A modern restaurant website featuring buttery animations, responsiveness and smooth scrolling.",
    metrics: ["Optimized assets", "Fast transitions"],
    link: "#",
    image: "/TOM.png",
  },
  {
    title: "Datamonk",
    tag: "React · UI/UX",
    summary:
      "Modern business website for a data consulting firm with clean design and structured content flow.",
    metrics: ["SEO-Ready", "Responsive design"],
    link: "#",
    image: "/datamonk.png",
  },
];

// 🎬 Your Real YouTube Video Projects
const youtubeVideos = [
  {
    id: "CmTY_8259Fg", // full review video
    title: "Review Video — Bike Ride & Experience",
    desc: "Complete review and cinematic breakdown of my biking experience with smooth transitions and storytelling cuts.",
    category: "Review Videos",
  },
  {
    id: "3FfO1_nLzQI", // your short reel
    title: "Fast Cuts Reel — Cinematic Ride Highlights",
    desc: "A short-form reel focused on quick cuts, energy, and transitions — best for Instagram & YouTube Shorts.",
    category: "Best Fast Cuts Reels",
  },
  {
    id: "5hL6dJNYwBw", // full vlog
    title: "Full Vlog — Scenic Ride Adventure",
    desc: "A full vlog capturing stunning landscapes, raw sound, and immersive storytelling from the road.",
    category: "Full Vlogs",
  },
];

// 🧩 Helper – generate YouTube thumbnail URLs
const getThumbnail = (id: string) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export default function ProjectsPage() {
  return (
    <main>
      {/* ---- Web Dev Projects ---- */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Projects</h1>
        <p className="mt-2 opacity-80">
          Selected web and video projects that blend creativity, storytelling, and performance.
        </p>
      </header>

      {/* Web Development Section */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <Link key={p.title} href={p.link} className="block">
            <motion.div
              className="group glass rounded-2xl p-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
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
                {p.metrics.map((m) => (
                  <span
                    key={m}
                    className="rounded-lg px-2 py-1 text-xs border border-white/15"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>
          </Link>
        ))}
      </section>

      {/* ---- Video Editing Section ---- */}
      <section className="mt-20 space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">
            🎬 Video Editing Projects
          </h2>
          <p className="opacity-85 text-sm sm:text-base leading-relaxed">
            Apart from IT, I’m a{" "}
            <span className="font-semibold">video editor and content creator</span> -
            creating cinematic edits, travel vlogs, and fast-cut reels.  
            Every edit focuses on pace, rhythm, and visual storytelling to keep viewers engaged.
          </p>

          <p className="mt-4 opacity-85 text-sm sm:text-base leading-relaxed">
            Below are some of my{" "}
            <span className="text-fuchsia-300 font-medium">recent video projects{" "}</span> 
            from my YouTube channel.  
            If you like my editing style, I can deliver the{" "}
            <span className="font-semibold">same quality and creativity</span> for your videos too -
            whether it’s for YouTube, Instagram, or brand promotions.
          </p>

          <p className="mt-4 font-medium text-fuchsia-300">
            👉 Visit my channel for more:{" "}
            <a
              href="https://www.youtube.com/@Om_Khorwal "
              target="_blank"
              className="underline hover:text-fuchsia-400"
            >
              Om's YouTube Channel
            </a>
          </p>
        </div>

        {/* Embedded YouTube Videos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {youtubeVideos.map((video, i) => (
            <motion.div
              key={video.id}
              className="glass rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="relative aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-wide text-fuchsia-300">
                  {video.category}
                </p>
                <h3 className="text-lg font-semibold mt-1">{video.title}</h3>
                <p className="mt-2 opacity-80 text-sm">{video.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
