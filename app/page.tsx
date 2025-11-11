"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const projects = [
  {
    title: "TraceIT",
    tag: "Ruby on Rails · AWS",
    desc: "QR-powered product tracking with role-based dashboards and real-time analytics.",
    href: "https://traceit.in",
    image: "/t.png",
    external: true, // ✅ open in new tab
  },
  {
    title: "Ani-ike (Anime Website)",
    tag: "Next.js · Tailwind · Framer Motion · Vercel",
    desc: "Smooth anime info website with buttery scroll and responsive layouts.",
    href: "https://anime.theokcompany.in",
    image: "/a.png",
    external: true, // ✅ open in new tab
  },
  {
    title: "Livinnovate",
    tag: "React · UI/UX",
    desc: "Modern services site with clean structure, elegant UI, and strong SEO foundation.",
    href: "https://www.livinnovate.com/", // optional if live
    image: "/l.png",
    external: true, // ✅ external link too
  },
];


export default function HomePage() {
  return (
    <main className="relative overflow-hidden border-x border-gray-800 py-15">
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />

      {/* ===== HERO ===== */}
      <section className="relative  z-10 mx-auto max-w-7xl px-4 pt-28 pb-20 text-center">
       <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster=""         // fallback image
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* soft overlay so text stays readable */}
        <div className="absolute inset-0 -z-10 bg-black/30" />

        {/* your heading */}
        <motion.h1
          {...fadeUp}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight"
        >
          From Concept to Code to Cloud
          <span className="block animated-gradient">
            I Build Products That Work and Wow.
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-6 mx-auto max-w-2xl opacity-85 text-balance text-lg"
        >
          I craft fast, accessible, and beautiful digital experiences from web apps to cinematic edits - focused on real
          outcomes: quicker loads, smoother journeys, and happier users.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 flex justify-center gap-3"
        >
          <Link href="/projects" className="glass px-5 py-2 rounded-xl hover:opacity-90 transition">
            View Projects
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition"
          >
            Contact
          </Link>
        </motion.div>

        {/* quick trust row */}
        <motion.ul
          {...fadeUp}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm opacity-75"
        >
          <li>Next.js · Rails · AWS</li>
          <span className="opacity-40">•</span>
          <li>Lighthouse 95+ targets</li>
          <span className="opacity-40">•</span>
          <li>Cinematic video edits</li>
        </motion.ul>
      </section>

      {/* ===== VALUE / FEATURES ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-20">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: "Performance", desc: "LCP under control, optimized images & fonts, caching strategies." },
            { title: "UX & Motion", desc: "Clear flows with subtle micro-interactions and smooth transitions." },
            { title: "Delivery", desc: "Crisp milestones, changelogs, and zero-surprise launches." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -2 }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 opacity-80 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== ABOUT (with image) ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-20">
        <div className="grid md:grid-cols-5 gap-6 items-center">
          {/* photo */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 rounded-2xl overflow-hidden border border-white/10 glass"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src="/r.jpg" 
                alt="Om Khorwal portrait"
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* text */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 glass rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold tracking-tight">About Me</h2>
            <p className="mt-3 opacity-85">
              I’m Om Khorwal - a software engineer who blends performance, design, and storytelling.
              I scope, design, and ship end-to-end products with clean architecture, smooth motion,
              and measurable impact.
            </p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm opacity-85">
              <li>🧩 Full-stack: Next.js, Rails, Node</li>
              <li>🚀 Deployments: Vercel, AWS</li>
              <li>🎬 Video: Reels, vlogs, edits</li>
              <li>📈 Targets: Lighthouse 95+, P99 {"<"} 300ms</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <Link href="/about" className="glass px-4 py-2 rounded-xl hover:opacity-90 transition">
                Learn more
              </Link>
              <Link href="/services" className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition">
                Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS (with images) ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-20">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Featured Work</h2>
          <Link href="/projects" className="text-sm opacity-80 hover:opacity-100 underline underline-offset-4">
            See all
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((p, i) => {
            const Card = (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="glass rounded-2xl p-5 h-full"
              >
                {/* media */}
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`${p.title} cover`}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>

                <div className="text-xs uppercase tracking-wide opacity-70">{p.tag}</div>
                <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 opacity-80 text-sm">{p.desc}</p>
                <div className="mt-4 text-sm underline opacity-80 group-hover:opacity-100">
                  View project →
                </div>
              </motion.div>
            );

            // External vs internal link handling
            return p.external ? (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                {Card}
              </a>
            ) : (
              <Link key={p.title} href={p.href} className="block group">
                {Card}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== SERVICES + CTA ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-28">
        <div className="grid lg:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold tracking-tight">What I Do</h2>
            <ul className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
              <li className="rounded-xl border border-white/10 p-3">🖥️ Web Apps (Next.js, React)</li>
              <li className="rounded-xl border border-white/10 p-3">⚙️ Backends (Rails, Node)</li>
              <li className="rounded-xl border border-white/10 p-3">☁️ Deployments (Vercel, AWS)</li>
              <li className="rounded-xl border border-white/10 p-3">🎬 Video Edits (Reels, Vlogs)</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Let’s Build Something</h2>
              <p className="mt-2 opacity-80 text-sm">
                Have a product in mind? I can scope, design, develop, and deploy — end-to-end. Clear communication,
                measurable progress, and on-time delivery.
              </p>
            </div>
            <div className="mt-6">
              <Link href="/contact" className="glass px-5 py-2 rounded-xl hover:opacity-90 transition">
                Start a Project
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
