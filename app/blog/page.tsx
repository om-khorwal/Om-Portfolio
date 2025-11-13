"use client";

import { motion } from "framer-motion";

const posts = [
  { title: "Animating with Purpose", date: "Oct 2025", excerpt: "Use motion to guide—not distract—users.", link: "#" },
  { title: "From Brief to Launch", date: "Sep 2025", excerpt: "My 5-step delivery pipeline that avoids surprises.", link: "#" },
  { title: "Tuning for 95+ Scores", date: "Aug 2025", excerpt: "Perf budgets, image strategy, and script discipline.", link: "#" },
];

export default function BlogPage() {
  return (
    <main>
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-2 opacity-80">upcoming</p>
      </header>
{/* 
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.link}
            className="glass rounded-2xl p-5 block"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="text-xs uppercase tracking-wide opacity-70">{p.date}</div>
            <h3 className="mt-1 text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 opacity-80 text-sm">{p.excerpt}</p>
            <span className="mt-4 inline-block text-sm opacity-90">Read →</span>
          </motion.a>
        ))}
      </div> */}
    </main>
  );
}
