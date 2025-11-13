"use client";

import Link from "next/link";

const links = {
  good: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
  ],
  cool: [
    { label: "Instagram", href: "https://www.instagram.com/_om_khorwal/ ", external: true },
    { label: "Youtube", href: "https://www.youtube.com/@Om_Khorwal", external: true },
    { label: "Linkedin", href: "https://www.linkedin.com/in/om-khorwal-698281129/", external: true },
    { label: "Anime (Ani-ike)", href: "https://anime.theokcompany.in", external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="relative mx-auto max-w-[80%] rounded-3xl bg-[#141414] text-slate-100 overflow-hidden">

        {/* content grid */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-14">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="inline-block">
              <div className="text-sm uppercase tracking-widest text-white/70">theokcompany</div>
              <div className="h-[2px] w-7 bg-white mt-1" />
            </div>
            <p className="text-sm text-slate-300/90">
              theokcompany builds fast, elegant web apps and cinematic edits that turn ideas into outcomes.
            </p>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} theokcompany
            </p>
          </div>

          <FooterCol title="The Good" items={links.good} />
          <FooterCol title="The Cool" items={links.cool} />
        </div>

        {/* BIG WATERMARK WITH FADE */}
        <div aria-hidden className="relative lg:h-[40vh] w-full flex justify-center select-none">
          <div
            className="
              pointer-events-none 
              text-[28vw] leading-none font-extrabold tracking-tight 
              bg-gradient-to-b from-transparent via-black/50 to-[#161616]
              text-transparent bg-clip-text
              z-10 text-center relative"
          >
            OK
          </div>
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
