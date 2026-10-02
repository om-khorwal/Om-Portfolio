"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { PortfolioProject } from "@/lib/portfolio-projects";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const inView = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const services = [
  { title: "Product & Engineering", tag: "Reliable product outcomes", detail: "From brief → preview → launch" },
  { title: "Deploy & Operate", tag: "Keep it healthy", detail: "Previews, monitoring, rollbacks" },
  { title: "Design & Brand", tag: "Clarity-first visuals", detail: "Reusable UI & marketing assets" },
];

const stats = [
  ["3+", "Years building"],
  ["50+", "Projects shipped"],
  ["95+", "Lighthouse targets"],
];

const tech: { name: string; icon?: string }[] = [
  { name: "javascript" },
  { name: "nextdotjs" },
  { name: "react" },
  { name: "nodedotjs" },
  { name: "express" },
  { name: "rubyonrails" },
  { name: "python" },
  { name: "fastapi" },
  { name: "amazonaws", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/amazonaws.svg" },
  { name: "cloudinary" },
  { name: "docker" },
  { name: "vue.js" },
  { name: "framer" },
  { name: "tailwindcss" },
  { name: "bootstrap" },
  { name: "postgresql" },
  { name: "mysql" },
  { name: "mongodb" },
  { name: "chatgpt", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/openai.svg" },
  { name: "codex", icon: "https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/codex-color.svg" },
  { name: "cursor" },
  { name: "claude" },
];

function SectionHeading({
  index,
  eyebrow,
  title,
  action,
}: {
  index: string;
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 md:mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
          <span className="text-slate-500">{index}</span> — {eyebrow}
        </div>
        <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
      </div>
      {action}
    </div>
  );
}

const section = "relative z-10 mx-auto max-w-6xl px-4 pb-16 md:pb-24";

export default function HomeContent({
  featured,
  projects,
}: {
  featured: PortfolioProject | null;
  projects: PortfolioProject[];
}) {
  return (
    <main className="relative overflow-hidden border-x border-gray-800 py-12 md:py-10 lg:py-12">
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />

      {/* ===== HERO ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pt-16 md:pt-24 lg:pt-28 pb-16 md:pb-24 text-center">
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <motion.div
          {...fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs md:text-sm text-slate-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Om Khorwal · Software Engineer
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-balance"
        >
          From Concept to Code to Cloud
          <span className="mt-3 block animated-gradient text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            I Build Products That Work and Wow.
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-6 mx-auto max-w-2xl text-slate-300 text-balance text-base md:text-lg"
        >
          I design, build, and ship full-stack products — fast, accessible, and beautiful digital experiences from web
          apps to cinematic edits, focused on real outcomes: quicker loads, smoother journeys, and happier users.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-3"
        >
          <Link
            href="/projects"
            className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-slate-200 transition text-sm md:text-base text-center"
          >
            View Work
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm md:text-base text-center"
          >
            Contact
          </Link>
        </motion.div>

        <motion.ul
          {...fadeUp}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm text-slate-300"
        >
          {["Next.js · Python", "Lighthouse 95+ targets", "Cinematic video edits"].map((item) => (
            <li key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
              {item}
            </li>
          ))}
        </motion.ul>
      </section>

      {/* ===== SELECTED WORK ===== */}
      <section className={section}>
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title="Products I've built and shipped"
          action={
            <Link
              href="/projects"
              className="text-sm md:text-base text-slate-300 hover:text-white underline underline-offset-4"
            >
              See all work →
            </Link>
          }
        />

        {/* Featured project */}
        {featured && <motion.a
          {...inView}
          href={featured.live_url ?? "/projects"}
          target="_blank"
          rel="noopener noreferrer"
          className="group glass rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-5"
        >
          <div className="relative aspect-video lg:aspect-auto lg:min-h-[380px] lg:col-span-3 overflow-hidden">
            <Image
              src={featured.image_url}
              alt={`${featured.title} project cover`}
              fill
              unoptimized
              priority
              sizes="(min-width:1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-center">
            <div className="text-xs uppercase tracking-wide text-slate-400">Featured · {featured.category_label}</div>
            <h3 className="mt-2 text-2xl md:text-3xl font-semibold">{featured.title}</h3>
            <p className="mt-3 text-slate-300 text-sm md:text-base">{featured.short_summary ?? featured.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {featured.badges.map((b) => (
                <span key={b} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300">
                  {b}
                </span>
              ))}
            </div>
            <span className="mt-6 inline-flex w-fit items-center gap-1 rounded-xl bg-white/10 px-4 py-2 text-sm md:text-base group-hover:bg-white/15 transition">
              Visit {featured.title} →
            </span>
          </div>
        </motion.a>}

        {/* Other projects */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              {...inView}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              href={p.live_url ?? "/projects"}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-2xl p-4 md:p-5 flex flex-col"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src={p.image_url}
                  alt={`${p.title} cover`}
                  fill
                  unoptimized
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-400">{p.category_label}</div>
                  <h3 className="mt-1 text-lg md:text-xl font-semibold">{p.title}</h3>
                </div>
                <span className="text-slate-400 group-hover:text-white transition">↗</span>
              </div>
              <p className="mt-2 text-slate-300 text-sm md:text-base">{p.short_summary ?? p.summary}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ===== WHAT I BUILD ===== */}
      <section className={section}>
        <SectionHeading index="02" eyebrow="What I build" title="Services — Build, Polish, Launch" />
        <p className="-mt-3 mb-8 max-w-2xl text-sm md:text-base text-slate-300">
          I help teams turn ideas into impact — product, operations, brand and short-form edits.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              {...inView}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -2 }}
              className="glass rounded-2xl p-6 flex flex-col"
            >
              <div className="text-sm font-mono text-slate-500">0{i + 1}</div>
              <h3 className="mt-6 text-lg md:text-xl font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-300">{s.tag}</p>
              <p className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">{s.detail}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className={section}>
        <motion.div
          {...inView}
          className="glass rounded-3xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center"
        >
          <div className="md:col-span-2 flex justify-center">
            <div className="relative w-56 sm:w-64 md:w-full max-w-sm aspect-square">
              <div className="absolute -inset-4 rounded-full bg-blue-500/25 blur-3xl" />
              <div className="relative h-full w-full rounded-full overflow-hidden ring-1 ring-white/15">
                <Image
                  src="/My%20Image.png"
                  alt="Om Khorwal"
                  fill
                  unoptimized
                  sizes="(min-width:768px) 35vw, 16rem"
                  className="object-cover scale-[1.12]"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-3 text-center md:text-left">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
              <span className="text-slate-500">03</span> — About me
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              I’m Om — I build <span className="animated-gradient">products that ship.</span>
            </h2>
            <p className="mt-4 text-slate-300 text-base md:text-lg">
              Speed, design, and clarity — clean execution with meaningful impact.
            </p>

            <dl className="mt-8 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
              {stats.map(([value, label]) => (
                <div key={label} className="py-5 px-2 text-center md:text-left md:px-5 first:md:pl-0">
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-3xl md:text-5xl font-extrabold tracking-tight">{value}</dd>
                  <dd className="mt-1 text-xs md:text-sm text-slate-400">{label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href="/about"
                className="px-5 py-2.5 rounded-xl bg-white text-black font-medium hover:bg-slate-200 transition text-sm md:text-base text-center"
              >
                Learn more
              </Link>
              <Link
                href="/projects"
                className="px-5 py-2.5 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm md:text-base text-center"
              >
                View Work
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== TECH STACK ===== */}
      <section className={section}>
        <SectionHeading index="04" eyebrow="Tech I work with" title="Tools & platforms I use to ship" />
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-3">
          {tech.map((t) => (
            <div
              key={t.name}
              title={t.name}
              className="aspect-square flex items-center justify-center rounded-xl bg-white/90 hover:bg-white hover:-translate-y-0.5 transition"
            >
              <img
                src={t.icon ?? `https://cdn.simpleicons.org/${t.name}`}
                alt={t.name}
                loading="lazy"
                className="h-8 w-8 md:h-9 md:w-9"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-8">
        <motion.div
          {...inView}
          className="relative overflow-hidden glass rounded-3xl px-6 py-12 md:px-12 md:py-16 text-center"
        >
          <div className="absolute inset-0 bg-mesh opacity-80 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Have a product in mind?
              <span className="block animated-gradient">Let’s build it together.</span>
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-slate-300 text-sm md:text-base">
              From brief to preview to launch — reliable, fast, and polished.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition text-sm md:text-base"
              >
                Hire me
              </Link>
              <a
                href="https://wa.me/918561863828"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition text-sm md:text-base inline-flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.06L2 22l5.09-1.34A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.57c-.2.56-1.18 1.07-1.62 1.14-.4.06-.91.08-1.47-.09-.34-.1-.77-.24-1.33-.47-2.32-.99-3.84-3.3-3.96-3.46-.12-.16-.95-1.26-.95-2.4s.6-1.7.81-1.93c.21-.23.46-.29.61-.29l.44.01c.14 0 .33-.05.51.39.2.47.67 1.62.73 1.74.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.25-.1.48.14.23.61.99 1.31 1.6.9.8 1.66 1.05 1.9 1.17.23.12.37.1.51-.06.14-.16.58-.67.73-.9.15-.23.3-.19.51-.11.21.08 1.32.62 1.55.74.23.12.38.18.44.28.06.1.06.56-.14 1.12z"/>
                </svg>
                WhatsApp
              </a>
              <Link
                href="/projects"
                className="px-6 py-3 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm md:text-base text-center"
              >
                See work
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
