"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      <section className="relative z-10 mx-auto max-w-5xl px-4 pt-28 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl sm:text-7xl font-bold leading-tight tracking-tight"
        >
          Om’s Portfolio
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400">
            Design · Develop · Deploy
          </span>
        </motion.h1>
        <p className="mt-6 mx-auto max-w-2xl opacity-85 text-balance text-lg">
          I craft fast, accessible, and elegant web experiences - focused on outcomes:
          fewer clicks, faster loads, happier users.
        </p>

        <div className="mt-10 flex justify-center gap-3">
          <Link href="/projects" className="glass px-5 py-2 rounded-xl hover:opacity-90 transition">
            View Projects
          </Link>
          <Link href="/contact" className="px-5 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition">
            Contact
          </Link>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-24">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: "Performance", desc: "Lighthouse 95+ targets, image & font optimizations." },
            { title: "UI & UX", desc: "Clean architectures with delightful micro-interactions." },
            { title: "Delivery", desc: "Clear milestones, changelogs, and zero-surprise launches." },
          ].map((f) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -2 }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 opacity-80 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
