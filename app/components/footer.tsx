"use client";

import Link from "next/link";

const links = {
  good: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
  ],
  cool: [
    { label: "Instagram", href: "https://instagram.com", external: true },
    { label: "X.com", href: "https://x.com", external: true },
  ],
  boring: [
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Privacy Policy", href: "/legal/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-24 h-1/2">
      {/* main footer container */}
      <div className="relative mx-auto max-w-[80%] rounded-3xl bg-[#141414] text-slate-100 overflow-hidden">
        {/* subtle top glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-white,transparent)]" />

        {/* grid content */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-14">
          {/* Brand block */}
          <div className="space-y-4">
            <div className="inline-block">
              <div className="text-sm uppercase tracking-widest text-white/70">theokcompany</div>
              <div className="h-[2px] w-7 bg-white mt-1" />
            </div>
            <p className="text-sm text-slate-300/90">
              theokcompany builds fast, elegant web apps and cinematic edits that turn ideas into outcomes.
            </p>
            <p className="text-xs text-slate-400">© {new Date().getFullYear()} theokcompany</p>
          </div>

          {/* columns */}
          <FooterCol title="The Good" items={links.good} />
          <FooterCol title="The Cool" items={links.cool} />
          <FooterCol title="The Boring" items={links.boring} />
        </div>

        {/* big watermark text (behind and below all links) */}
        <div
          aria-hidden
          className="pointer-events-none  text-[28vw] leading-none font-extrabold tracking-tight text-white/5 z-10 select-none text-center"
        >
          OK
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white/90">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((i) =>
          i.external ? (
            <li key={i.label}>
              <a
                href={i.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition"
              >
                {i.label}
              </a>
            </li>
          ) : (
            <li key={i.label}>
              <Link href={i.href} className="text-slate-300 hover:text-white transition">
                {i.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
