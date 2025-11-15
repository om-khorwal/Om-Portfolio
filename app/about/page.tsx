"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const core = [
  { emoji: "🎨", title: "Design", desc: "Interfaces, flow, motion & clarity." },
  { emoji: "🛠️", title: "Develop", desc: "Functional, smooth & reliable builds." },
  { emoji: "☁️", title: "Deploy", desc: "Stable launches across devices & scale." },
];

const creative = [
  { emoji: "🎬", title: "Video Editing", desc: "Cinematic pacing, rhythm & story." },
  { emoji: "🎧", title: "Sound & Vibe", desc: "Music, effects & emotional tone." },
];

const process = [
  "Discover",
  "Plan",
  "Create",
  "Polish",
  "Launch",
];

export default function AboutPage() {
  return (
    <main className="space-y-10">
      {/* Intro */}
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">About</h1>
        <p className="mt-2 opacity-80 ">
          I’m Om (Thunder) - I bring ideas to life end-to-end:
          <strong> Design → Develop → Deploy</strong>. 
          And beyond code, I also craft cinematic edits, content creation video editing and have a youtube channel as a creative side hobby.
        </p>
      </header>

      {/* Core Capabilities */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {core.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5 text-center flex flex-col items-center"
          >
            <div className="text-3xl">{c.emoji}</div>
            <h3 className="mt-3 font-semibold text-lg">{c.title}</h3>
            <p className="text-sm opacity-75 mt-1">{c.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Creative Hobby (Video Editing) */}
      <section>
        <h2 className="text-lg font-semibold opacity-90">Creative Side - Video Editing</h2>
        <p className="mt-2 opacity-80">
          Editing is my craft outside development - a place where I explore timing, rhythm,
          color, and storytelling through visuals.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
          {creative.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-3 text-center"
            >
              <div className="text-2xl">{c.emoji}</div>
              <div className="text-sm mt-2 font-medium">{c.title}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4">
          <a
            href="https://www.youtube.com/@Om_Khorwal"
            target="_blank"
            className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/5 transition"
          >
            Visit YouTube Channel
          </a>
        </div>
      </section>

      {/* Process Block (infographic) */}
      <section className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-3">How I Work</h2>

        <ol className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          {process.map((step, i) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl border border-white/10 px-3 py-3"
            >
              <div className="text-xs opacity-70">Step {i + 1}</div>
              <div className="font-medium">{step}</div>
            </motion.li>
          ))}
        </ol>

        <p className="mt-4 opacity-75 text-xs sm:text-sm text-center">
          A simple, repeatable workflow - from idea to execution, code or video.
        </p>
      </section>

      {/* CTA */}
      <section className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Let’s Work Together</h2>
        <p className="mt-2 opacity-85">
          Need a product, a landing page, or a sharp video edit?  
          I help bring ideas to life - polished, fast, and expressive.
        </p>

        <div className="mt-4 flex gap-3">
          <Link href="/contact" className="glass rounded-xl px-4 py-2 text-sm hover:opacity-90 transition">
            Contact Me
          </Link>
          <Link href="/services" className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/5 transition">
            View Services
          </Link>
        </div>
      </section>
    </main>
  );
}
