"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="grid lg:grid-cols-2 gap-6">
      <section>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Contact</h1>
        <p className="mt-2 opacity-80">
          Tell me about your project—goals, timeline, and what success looks like. I’ll reply with next steps.
        </p>

        <div className="mt-6 glass rounded-2xl p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm opacity-80">Name</label>
              <input className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-white/30" required />
            </div>
            <div>
              <label className="text-sm opacity-80">Email</label>
              <input type="email" className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-white/30" required />
            </div>
            <div>
              <label className="text-sm opacity-80">Message</label>
              <textarea rows={5} className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 outline-none focus:border-white/30" required />
            </div>
            <button className="w-full rounded-xl px-4 py-2 glass hover:opacity-90 transition" type="submit">
              Send
            </button>
          </form>

          {sent && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-emerald-300">
              Thanks! I’ll get back to you shortly.
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
            <li><a className="hover:underline" href="https://github.com" target="_blank">GitHub</a></li>
            <li><a className="hover:underline" href="https://linkedin.com" target="_blank">LinkedIn</a></li>
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
