"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  return (
    <main className="grid lg:grid-cols-2 gap-6">
      <section>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Contact</h1>
        <p className="mt-2 opacity-80">
          Tell me about your project—goals, timeline, and what success looks like.
           I’ll reply with next steps.
        </p>

        <div className="mt-6 glass rounded-2xl p-6">
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
                hp: (form.elements.namedItem("hp") as HTMLInputElement).value, // honeypot
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
            className="space-y-4"
          >
            {/* Honeypot (hidden field that bots fill) */}
            <input
              type="text"
              name="hp"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

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

            <div>
              <label htmlFor="message" className="text-sm opacity-80">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-white/30"
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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-emerald-300"
            >
              Thanks! I’ll get back to you shortly.
            </motion.p>
          )}

          {err && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-red-300"
            >
              {err}
            </motion.p>
          )}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Quick links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="hover:underline" href="mailto:omkhorwalofficial@gmail.com">omkhorwalofficial@gmail.com</a></li>
            <li><a className="hover:underline" href="https://cal.com" target="_blank">Book a call</a></li>
            <li><a className="hover:underline" href="https://github.com/om-khorwal" target="_blank">GitHub</a></li>
            <li><a className="hover:underline" href="https://www.linkedin.com/in/om-khorwal-698281129/" target="_blank">LinkedIn</a></li>
          </ul>
        </div>
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Location</h2>
          <p className="mt-2 opacity-80 text-sm">India (IST) · Remote friendly</p>
        </div>
      </aside>
    </main>
  );
}
