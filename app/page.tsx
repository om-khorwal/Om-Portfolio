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
    external: true,
  },
  {
    title: "Ani-ike (Anime Website)",
    tag: "Next.js · Tailwind · Framer Motion · Vercel",
    desc: "Smooth anime info website with buttery scroll and responsive layouts.",
    href: "https://anime.theokcompany.in",
    image: "/a.png",
    external: true,
  },
  {
    title: "Livinnovate",
    tag: "React · UI/UX",
    desc: "Modern services site with clean structure, elegant UI, and strong SEO foundation.",
    href: "https://www.livinnovate.com/",
    image: "/l.png",
    external: true,
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden border-x border-gray-800 py-12 md:py-16 lg:py-20">
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none " />

      {/* ===== HERO ===== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-20 md:pt-24 lg:pt-28 pb-14 md:pb-18 lg:pb-20 text-center ">
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster=""
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 -z-10 bg-black/30" />

        <motion.h1
          {...fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight"
        >
          From Concept to Code to Cloud
          <span className="block animated-gradient text-2xl md:text-3xl lg:text-4xl">
            I Build Products That Work and Wow.
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-4 md:mt-6 mx-auto max-w-2xl opacity-85 text-balance text-base md:text-lg"
        >
          I craft fast, accessible, and beautiful digital experiences from web apps to cinematic edits - focused on real
          outcomes: quicker loads, smoother journeys, and happier users.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 md:mt-10 flex flex-col md:flex-row justify-center gap-3 md:gap-4"
        >
          <Link
            href="/projects"
            className="glass px-4 py-2 md:px-5 md:py-2.5 rounded-xl hover:opacity-90 transition text-sm md:text-base text-center"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 md:px-5 md:py-2.5 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm md:text-base text-center"
          >
            Contact
          </Link>
        </motion.div>

        <motion.ul
          {...fadeUp}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-sm md:text-base opacity-75"
        >
          <li>Next.js · Rails · AWS</li>
          <span className="opacity-40">•</span>
          <li>Lighthouse 95+ targets</li>
          <span className="opacity-40">•</span>
          <li>Cinematic video edits</li>
        </motion.ul>
      </section>

      {/* ===== VALUE / FEATURES ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-12 md:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
              className="glass rounded-2xl p-4 md:p-5 lg:p-6"
            >
              <h3 className="text-lg md:text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 opacity-80 text-sm md:text-base">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-12 md:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch">
          {/* IMAGE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 glass rounded-2xl overflow-hidden border border-white/10 flex"
          >
            <div className="relative w-full h-full min-h-[380px] md:min-h-[100%]">
              <Image
                src="/r.jpg"
                alt="Om Khorwal portrait"
                fill
                unoptimized
                sizes="(min-width:1280px) 35vw, (min-width:768px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* ABOUT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 glass rounded-2xl p-5 md:p-6 lg:p-8 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">About Me</h2>
              <p className="mt-3 opacity-85 text-sm md:text-base">
                I’m Om Khorwal - a software engineer who blends performance, design, and storytelling.
              </p>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm md:text-base opacity-85">
                <li> Full-stack: Next.js, Rails, Node</li>
                <li> Deployments: Vercel, AWS</li>
                <li> Video: Reels, vlogs, edits</li>
                <li> Targets: Lighthouse 95+, P99 {"<"} 300ms</li>
              </ul>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/about" className="glass px-4 py-2 md:px-5 md:py-2.5 rounded-xl hover:opacity-90 transition text-sm md:text-base text-center">
                Learn more
              </Link>
              <Link href="/services" className="px-4 py-2 md:px-5 md:py-2.5 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm md:text-base text-center">
                Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== ANIME (Ani-ike) SPOTLIGHT ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-12 md:pb-16 lg:pb-20">
        <div className="glass rounded-2xl p-4 md:p-6 lg:p-8 flex flex-col md:flex-row items-stretch gap-4">
          <div className="md:w-1/2 rounded-lg overflow-hidden">
            <div className="relative aspect-video min-h-[220px]">
              <Image
                src="/a.png"
                alt="Ani-ike cover"
                fill
                unoptimized
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col justify-center">
            <div className="text-xs uppercase tracking-wide opacity-70">{projects[1].tag}</div>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold">Ani-ike (Anime Website)</h3>
            <p className="mt-2 opacity-80 text-sm md:text-base">
              Smooth anime info website with buttery scroll, curated episode lists, and responsive layouts.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://anime.theokcompany.in"
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-4 py-2 rounded-xl hover:opacity-95 transition text-sm md:text-base"
              >
                Visit Ani-ike
              </a>

           
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-12 md:pb-16 lg:pb-20">
        <div className="flex items-end justify-between mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Featured Work</h2>
          <Link href="/projects" className="text-sm md:text-base opacity-80 hover:opacity-100 underline underline-offset-4">
            See all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => {
            const Card = (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="glass rounded-2xl p-4 md:p-5 lg:p-6 h-full"
              >
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden  ">
                  <Image
                    src={p.image}
                    alt={`${p.title} cover`}
                    fill
                    unoptimized
                    sizes=""
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>

                <div className="text-xs lg:text-xs md:text-sm uppercase tracking-wide opacity-70">{p.tag}</div>
                <h3 className="mt-1 text-lg md:text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 opacity-80 text-sm md:text-base">{p.desc}</p>
                <div className="mt-4 text-sm md:text-base underline opacity-80 group-hover:opacity-100">
                  View project →
                </div>
              </motion.div>
            );

            return p.external ? (
              <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer" className="block group">
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
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 md:pb-20 lg:pb-28">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

    {/* ---- WHAT I DO ---- */}
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-5 md:p-6 lg:p-7"
    >
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">What I Do</h2>
      <p className="mt-2 text-sm md:text-base opacity-80">
        I help founders, brands, and teams build fast, polished, and scalable digital experiences.
      </p>

      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-sm md:text-base">
        <li className="rounded-xl border border-white/10 p-3">
          <span className="font-semibold">🖥️ Web Apps</span>
          <p className="text-xs md:text-sm opacity-70 mt-1">
            Next.js, React — fast, SEO-friendly, and built with clean architecture.
          </p>
        </li>

        <li className="rounded-xl border border-white/10 p-3">
          <span className="font-semibold">⚙️ Backends</span>
          <p className="text-xs md:text-sm opacity-70 mt-1">
            Rails, Node — secure APIs, dashboards, and real-world data workflows.
          </p>
        </li>

        <li className="rounded-xl border border-white/10 p-3">
          <span className="font-semibold">☁️ Deployments</span>
          <p className="text-xs md:text-sm opacity-70 mt-1">
            Vercel, AWS — CI/CD, scaling strategies, uptime monitoring.
          </p>
        </li>

        <li className="rounded-xl border border-white/10 p-3">
          <span className="font-semibold">🎬 Cinematic Edits</span>
          <p className="text-xs md:text-sm opacity-70 mt-1">
            Reels, vlogs, promos — motion-focused storytelling for brands.
          </p>
        </li>
      </ul>
    </motion.div>

    {/* ---- CTA CARD ---- */}
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-5 md:p-6 lg:p-7 flex flex-col justify-between"
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Let’s Build Something</h2>
        <p className="mt-2 opacity-80 text-sm md:text-base">
          Whether you need a production-ready app, a sleek landing page, or a cinematic promo —
          I work end-to-end: strategy → design → development → deployment.
        </p>

        <ul className="mt-4 space-y-2 text-sm md:text-base opacity-80">
          <li>• Fast communication, clear milestones</li>
          <li>• Clean, scalable codebases</li>
          <li>• Pixel-perfect design to development</li>
          <li>• Performance first (Lighthouse 95+)</li>
        </ul>
      </div>

      <div className="mt-6">
        <Link
          href="/contact"
          className="glass px-4 py-2 md:px-5 md:py-2.5 rounded-xl hover:opacity-90 transition text-sm md:text-base text-center"
        >
          Start a Project
        </Link>
      </div>
    </motion.div>

  </div>
</section>

    </main>
  );
}
