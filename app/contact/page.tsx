"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  return (
    <main className="grid lg:grid-cols-2 gap-6 items-start min-h-[600px]">
      {/* LEFT: Contact form (unchanged) */}
      <section className="h-full flex flex-col">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Contact</h1>
        <p className="mt-2 opacity-80">
          Tell me about your project-goals, timeline, and what success looks like.
          I’ll reply with next steps.
        </p>

        <div className="mt-6 glass rounded-2xl p-6 flex-grow flex flex-col">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setErr(null);

              const form = e.currentTarget as HTMLFormElement;
              const data = {
                name: (form.elements.namedItem("name") as HTMLInputElement).value,
                email: (form.elements.namedItem("email") as HTMLInputElement).value,
                message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
                hp: (form.elements.namedItem("hp") as HTMLInputElement).value,
              };

              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              });

              setLoading(false);
              if (res.ok) {
                setSent(true);
                form.reset();
              } else {
                const j = await res.json().catch(() => ({}));
                setErr(j?.error || "Something went wrong. Please try again.");
              }
            }}
            className="space-y-4 flex-grow"
          >
            {/* Honeypot field */}
            <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />

            <div>
              <label htmlFor="name" className="text-sm opacity-80">Name</label>
              <input
                id="name"
                name="name"
                className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-white/30"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm opacity-80">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-white/30"
                required
                disabled={loading}
              />
            </div>

            <div className="flex-grow flex flex-col">
              <label htmlFor="message" className="text-sm opacity-80">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-white/30 flex-grow"
                required
                disabled={loading}
              />
            </div>

            <button
              className="w-full rounded-xl px-4 py-2 glass hover:opacity-90 transition disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending…" : "Send"}
            </button>
          </form>

          {sent && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-emerald-300">
              Thanks! I’ll get back to you shortly.
            </motion.p>
          )}

          {err && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-red-300">
              {err}
            </motion.p>
          )}
        </div>
      </section>

      {/* RIGHT: Aside (SDE-focused, minimal content - no projects/resume/experience/skills) */}
      <aside className="space-y-4 h-full flex flex-col">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass rounded-2xl p-6"
          role="region"
          aria-label="Profile"
        >
          <motion.div whileHover={{ y: -4, scale: 1.01 }} className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg overflow-hidden flex-none ring-1 ring-white/10">
              {/* simple avatar graphic */}
              <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden>
                <rect width="80" height="80" rx="12" fill="url(#a)"/>
                <defs>
                  <linearGradient id="a" x1="0" x2="1">
                    <stop offset="0" stopColor="#d8b4fe" />
                    <stop offset="1" stopColor="#93c5fd" />
                  </linearGradient>
                </defs>
                <circle cx="40" cy="30" r="14" fill="#071129" opacity="0.9"/>
                <rect x="18" y="46" width="44" height="16" rx="6" fill="#071129" opacity="0.9"/>
              </svg>
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold leading-none">Om Khorwal</h3>
              <p className="mt-1 text-sm opacity-80">Software Development Engineer · remote (IST)</p>
              <div className="mt-2 flex gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-white/5">Remote friendly</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick links / actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold">Contact & actions</h2>

          <div className="mt-3 grid grid-cols-1 gap-2">
            <a
              href="mailto:omkhorwalofficial@gmail.com"
              className="flex items-center gap-3 rounded-xl px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <EmailIcon />
              <div className="text-sm">
                <div className="leading-none">Email</div>
                <div className="text-xs opacity-60">omkhorwalofficial@gmail.com</div>
              </div>
            </a>

            

            <a
              href="https://github.com/om-khorwal"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <GitHubIcon />
              <div className="text-sm">
                <div className="leading-none">GitHub</div>
                <div className="text-xs opacity-60">profile</div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/om-khorwal-698281129/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <LinkedInIcon />
              <div className="text-sm">
                <div className="leading-none">LinkedIn</div>
                <div className="text-xs opacity-60">connect</div>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Availability & timezone - minimal */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.10 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold">Availability</h2>

          <div className="mt-3 text-sm space-y-2">
            <div>
              <div className="text-xs opacity-60">Timezone</div>
              <div className="mt-1">India · IST (UTC+05:30)</div>
            </div>

            <div>
              <div className="text-xs opacity-60">General availability</div>
              <div className="mt-1">Weekdays - mornings (IST). Flexible for discovery call.</div>
            </div>
          </div>
        </motion.div>

        {/* Small note - neutral and minimal */}
        <div className="text-xs opacity-60">
          <p className="text-sm">Don’t worry about the format - share whatever you’re comfortable with, and I’ll guide the rest.</p>
        </div>
      </aside>
    </main>
  );
}

/* ---------- Small inline SVG icon components ---------- */

function EmailIcon() {
  return (
    <svg className="w-5 h-5 flex-none" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 6.5v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 7.5l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5 flex-none" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 3v4M8 3v4M3 11h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5 flex-none" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.7 3 8.7 7.2 10.1.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.3-3.5-1.3-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.4-.8 1.4-.8.9-1.6 2.6-1.1 3.2-.8.1-.7.4-1.1.7-1.3-2.3-.3-4.7-1.1-4.7-4.9 0-1.1.4-2 1.1-2.7-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 2.9 1.1a10 10 0 012.7-.4c.9 0 1.9.1 2.7.4 2-1.4 2.9-1.1 2.9-1.1.6 1.5.2 2.6.1 2.9.7.7 1.1 1.6 1.1 2.7 0 3.8-2.5 4.6-4.7 4.9.4.4.8 1 .8 2v3c0 .3.2.6.7.5 4.2-1.4 7.2-5.4 7.2-10.1C23.1 5.3 18.3.5 12 .5z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5 flex-none" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6.5 9.5v7M6.5 7.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM10.5 16.5V11c0-.9.7-1.5 1.6-1.5s1.6.6 1.6 1.5v5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
