"use client";

import { motion } from "framer-motion";
import { h1 } from "framer-motion/client";

const tiers = [
  {
    name: "Starter",
    price: "₹",
    items: ["1–3 pages", "Basic SEO", "Contact form", "1 round of revisions"],
  },
  {
    name: "Growth",
    price: "₹₹",
    items: ["5–8 pages", "CMS/blog", "Animations", "2 rounds of revisions"],
  },
  {
    name: "Scale",
    price: "₹₹₹",
    items: ["Custom CMS", "Integrations", "Analytics & A/B", "Priority support"],
  },
];

const steps = ["Discovery", "Design System", "Build", "Integrate", "QA & Launch"];

export default function ServicesPage() {
  return (
    <h1 className="w-full justify-center text-center font-black text-3xl">Upcoming</h1>
    // <main className="space-y-10">
    //   <header>
    //     <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Services</h1>
    //     <p className="mt-2 opacity-80">Pick a tier or request a custom plan. Every project ships with performance and a11y baked in.</p>
    //   </header>

    //   <section className="grid md:grid-cols-3 gap-4">
    //     {tiers.map((t, i) => (
    //       <motion.div key={t.name} className="glass rounded-2xl p-6" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
    //         <h3 className="text-xl font-semibold">{t.name}</h3>
    //         <div className="mt-1 text-sm opacity-70">{t.price}</div>
    //         <ul className="mt-4 space-y-2">
    //           {t.items.map((it) => (
    //             <li key={it} className="text-sm opacity-90">• {it}</li>
    //           ))}
    //         </ul>
    //       </motion.div>
    //     ))}
    //   </section>

    //   <section className="glass rounded-2xl p-6">
    //     <h2 className="text-lg font-semibold">Process</h2>
    //     <ol className="mt-3 grid sm:grid-cols-5 gap-3">
    //       {steps.map((s, i) => (
    //         <li key={s} className="rounded-xl border border-white/10 px-3 py-3 text-center text-sm">
    //           <div className="opacity-70">Step {i + 1}</div>
    //           <div className="mt-1 font-medium">{s}</div>
    //         </li>
    //       ))}
    //     </ol>
    //   </section>
    // </main>
  );
}
