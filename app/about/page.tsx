"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const devSkills = [
  "Next.js", "TypeScript", "React", "Node", "Postgres",
  "Prisma", "Tailwind", "Framer Motion", "CI/CD", "Ruby on Rails",
];

const videoSkills = [
  "YouTube Editing", "Shorts/Reels", "Color Grading",
  "Sound Design", "Motion Graphics", "Storytelling",
];

const process = [
  "Discovery",
  "Design & Plan",
  "Build",
  "Edit & Refine",
  "Launch",
];

export default function AboutPage() {
  return (
    <main className="space-y-10">
      {/* Intro */}
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">About</h1>
        <p className="mt-2 opacity-80 max-w-2xl">
          I’m Om (Thunder) — a full-stack developer and video editor.  
          I design and build fast, interactive web apps and create cinematic edits for YouTube, vlogs, and short-form content.
        </p>
      </header>

      {/* Skills */}
      <section className="grid md:grid-cols-2 gap-4">
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg font-semibold">Web Development</h2>
          <p className="mt-2 opacity-85">
            I focus on clean code, speed, and smooth motion — building apps that are both functional and visually engaging.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {devSkills.map((s) => (
              <li key={s} className="px-2 py-1 rounded-lg border border-white/15">{s}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg font-semibold">Video Editing</h2>
          <p className="mt-2 opacity-85">
            I edit review videos, reels, and full vlogs — blending rhythm, pacing, and storytelling to bring ideas to life.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {videoSkills.map((s) => (
              <li key={s} className="px-2 py-1 rounded-lg border border-white/15">{s}</li>
            ))}
          </ul>
          <div className="mt-4 flex gap-3">
            <Link href="/projects" className="glass rounded-xl px-3 py-2 text-sm hover:opacity-90 transition">
              View Projects
            </Link>
            <a
              href="https://www.youtube.com/@Om_Khorwal"
              target="_blank"
              className="rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/5 transition"
            >
              YouTube Channel
            </a>
          </div>
        </motion.div>
      </section>

      {/* Process */}
      <section className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-3">Process</h2>
        <ol className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          {process.map((step, i) => (
            <motion.li
              key={step}
              className="rounded-xl border border-white/10 px-3 py-3"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="text-sm opacity-70">Step {i + 1}</div>
              <div className="font-medium">{step}</div>
            </motion.li>
          ))}
        </ol>
        <p className="mt-4 opacity-80 text-sm text-center">
          Each project — web or video — follows a clear process from concept to launch, ensuring speed, quality, and creativity.
        </p>
      </section>

      {/* CTA */}
      <section className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Let’s Work Together</h2>
        <p className="mt-2 opacity-85">
          Need a stunning website or a crisp video edit?  
          I combine design, code, and storytelling to craft impactful digital experiences.
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
