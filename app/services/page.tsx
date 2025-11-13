"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const services = [
  {
    id: "fullstack",
    title: "Full-stack Development",
    subtitle: "Next.js, React, Rails, Node - robust, maintainable, scalable",
    bullets: [
      "Product-first architecture (domain models & flows)",
      "Fast, accessible UIs with solid test coverage",
      "APIs, background jobs, and predictable data pipelines",
    ],
    // icon key used below
    icon: "code",
  },
  {
    id: "deploy",
    title: "Deployment & Infra",
    subtitle: "Vercel, AWS - CI/CD, scaling, monitoring",
    bullets: [
      "Automated CI/CD + preview deployments",
      "Horizontal scaling, caching, and cost optimisations",
      "SRE-ready observability: logging, alerts, runbooks",
    ],
    icon: "cloud",
  },
  {
    id: "design",
    title: "Design & Web Graphics",
    subtitle: "UI, branding, component systems, marketing assets",
    bullets: [
      "Design systems & responsive layouts (Figma → code)",
      "High-impact hero graphics, icons & thumbnails",
      "Exportable assets for web, social and motion",
    ],
    icon: "pen",
  },
  {
    id: "video",
    title: "Video Editing",
    subtitle: "Reels, promos, vlogs - storytelling with motion",
    bullets: [
      "Short-form (reels) and long-form (vlogs) editing",
      "Color grading, sound design, captions & hooks",
      "Delivery-optimised formats for social platforms",
    ],
    icon: "play",
  },
];

const caseStudies = [
  {
    title: "TraceIT - Product Tracking",
    desc: "Role-based dashboards, QR flows, analytics; built on Rails + AWS.",
    href: "https://traceit.in",
    img: "/t.png",
  },
  {
    title: "Ani-ike - Anime Site",
    desc: "Curated episode lists, buttery scrolls and responsive UI (Next.js).",
    href: "https://anime.theokcompany.in",
    img: "/a.png",
  },
];

function Icon({ name }: { name: string }) {
  const base = "w-12 h-12 md:w-14 md:h-14 flex-shrink-0";
  switch (name) {
    case "code":
      return (
        <div className={`${base} flex items-center justify-center rounded-lg bg-white/5`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
            <path d="M16 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-300"/>
            <path d="M8 6L2 12l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-300"/>
            <path d="M14 4l-4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/70"/>
          </svg>
        </div>
      );
    case "cloud":
      return (
        <div className={`${base} flex items-center justify-center rounded-lg bg-white/5`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
            <path d="M20 17.5A4.5 4.5 0 0015.5 13H14a4 4 0 10-7.874 1.333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-300"/>
            <path d="M3 19h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-white/70"/>
          </svg>
        </div>
      );
    case "pen":
      return (
        <div className={`${base} flex items-center justify-center rounded-lg bg-white/5`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
            <path d="M3 21l3-1 11-11 1-3-3 1L4 20z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-300"/>
            <path d="M14 7l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70"/>
          </svg>
        </div>
      );
    case "play":
      return (
        <div className={`${base} flex items-center justify-center rounded-lg bg-white/5`}>
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden>
            <path d="M5 3v18l15-9L5 3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-300"/>
          </svg>
        </div>
      );
    default:
      return (
        <div className={`${base} flex items-center justify-center rounded-lg bg-white/5`}>
          <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden>
            <circle cx="12" cy="12" r="8" className="text-fuchsia-300" />
          </svg>
        </div>
      );
  }
}

export default function ServicesPage() {
  return (
    <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-16 lg:py-20">
      {/* HERO */}
      <section className="text-center mb-10 md:mb-14">
        <motion.h1 {...fade} className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
          Services - Build, Design, Deploy
        </motion.h1>
        <motion.p {...fade} transition={{ delay: 0.08 }} className="mt-4 max-w-2xl mx-auto opacity-80 text-sm md:text-base">
          I ship end-to-end digital products: full-stack apps, pixel-perfect design and high-quality video edits.
          I’ll scope the work, design for your users, build with maintainability in mind, and deploy with reliability.
        </motion.p>

        <motion.div {...fade} transition={{ delay: 0.16 }} className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/contact" className="glass px-4 py-2 rounded-xl text-sm md:text-base">
            Start a Project
          </Link>
          <a href="#casestudies" className="px-4 py-2 rounded-xl border border-white/10 text-sm md:text-base hover:bg-white/5 transition">
            See case studies
          </a>
        </motion.div>
      </section>

      {/* SERVICE GRID (icons instead of images) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {services.map((s, i) => (
          <motion.article
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="glass rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-4 items-stretch"
          >
            {/* ICON (replaces image) */}
            <div className="flex items-start">
              <Icon name={s.icon} />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-semibold">{s.title}</h3>
                <div className="text-sm opacity-75 mt-1">{s.subtitle}</div>

                <ul className="mt-3 grid gap-2 text-sm">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="text-fuchsia-300 mt-0.5 text-lg">•</span>
                      <span className="opacity-85">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Link href="/contact" className="glass px-3 py-2 rounded-md text-sm md:text-base">
                  Get started
                </Link>
                <Link href="/projects" className="text-sm opacity-80 hover:opacity-100 underline underline-offset-4">
                  See projects →
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      {/* HOW I WORK - tailored for each service */}
      <section className="mb-10">
        <motion.h2 {...fade} className="text-2xl md:text-3xl font-bold mb-4">How I work - by service</motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Full-stack + Deployment combined flow */}
          <div className="glass rounded-2xl p-5">
            <h4 className="font-semibold">Full-stack Development & Deployment</h4>
            <ol className="mt-3 text-sm space-y-3 list-decimal list-inside">
              <li><strong>Discovery:</strong> Requirements, user flows, data modelling and acceptance criteria.</li>
              <li><strong>Design → API contract:</strong> Wireframes, API spec, and component checklist.</li>
              <li><strong>Iterative sprints:</strong> Frontend, API, background jobs; CI runs on each PR.</li>
              <li><strong>Previews & QA:</strong> Preview deployments for stakeholders + automated tests.</li>
              <li><strong>Production launch:</strong> Promote, enable monitoring, health checks and rollback plan.</li>
            </ol>
            <div className="mt-4 text-xs opacity-75">Deliverables: repo, CI, infra-as-code, runbook.</div>
          </div>

          {/* Design */}
          <div className="glass rounded-2xl p-5">
            <h4 className="font-semibold">Design & Web Graphics</h4>
            <ol className="mt-3 text-sm space-y-3 list-decimal list-inside">
              <li><strong>Brand check:</strong> Tone, colors, and existing assets audit.</li>
              <li><strong>Component-driven UI:</strong> Figma library, responsive tokens, and a style guide.</li>
              <li><strong>High-impact assets:</strong> Hero art, icons, thumbnails and social cutdowns.</li>
              <li><strong>Handoff:</strong> Export-ready assets, CSS tokens, and developer specs.</li>
            </ol>
            <div className="mt-4 text-xs opacity-75">Deliverables: Figma file, SVG/PNG assets, token list.</div>
          </div>

          {/* Video */}
          <div className="glass rounded-2xl p-5">
            <h4 className="font-semibold">Video Editing</h4>
            <ol className="mt-3 text-sm space-y-3 list-decimal list-inside">
              <li><strong>Storyboard & brief:</strong> Outline beats, tone, and platform (reel / YT / long-form).</li>
              <li><strong>Rough cut:</strong> Structure + pacing for stakeholder feedback.</li>
              <li><strong>Fine cut:</strong> Color grade, audio, captions and motion polish.</li>
              <li><strong>Delivery:</strong> Multiple formats & aspect ratios, export presets for platforms.</li>
            </ol>
            <div className="mt-4 text-xs opacity-75">Deliverables: MP4/WebM sources, thumbnails, captions (SRT).</div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="casestudies" className="mb-10">
        <motion.h2 {...fade} className="text-2xl md:text-3xl font-bold mb-4">Selected work</motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {caseStudies.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <div className="relative aspect-video">
                <Image src={c.img} alt={`${c.title} cover`} fill unoptimized className="object-cover" />
              </div>
              <div className="p-4">
                <div className="text-xs uppercase opacity-70">{i === 0 ? "Ruby on Rails · AWS" : "Next.js · Tailwind"}</div>
                <h3 className="mt-1 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm opacity-80">{c.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <motion.h2 {...fade} className="text-2xl md:text-3xl font-bold mb-4">FAQ</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-4">
            <h4 className="font-semibold">How do you charge?</h4>
            <p className="mt-2 text-sm opacity-80">I prefer fixed-scope proposals for product work and per-project pricing for video/design. We scope first, then agree on milestones.</p>
          </div>
          <div className="glass rounded-2xl p-4">
            <h4 className="font-semibold">Do you provide design handoffs?</h4>
            <p className="mt-2 text-sm opacity-80">Yes - Figma libraries, exported assets and dev-ready specs are included in delivery for design & UI work.</p>
          </div>
          <div className="glass rounded-2xl p-4">
            <h4 className="font-semibold">Can you operate as long-term support?</h4>
            <p className="mt-2 text-sm opacity-80">Yes - I offer retainer packages for maintenance, monitoring, and feature sprints after launch.</p>
          </div>
          <div className="glass rounded-2xl p-4">
            <h4 className="font-semibold">What I need to start?</h4>
            <p className="mt-2 text-sm opacity-80">A short brief (objectives, users, references) and access to any existing assets or repos. I'll handle the rest.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-16">
        <motion.div {...fade} className="glass rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-semibold">Ready to build?</h3>
          <p className="mt-2 text-sm md:text-base opacity-80">Let's scope your idea and ship a product your users love.</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="glass px-4 py-2 rounded-xl">Start a Project</Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
