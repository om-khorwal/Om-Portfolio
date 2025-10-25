"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-sm">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="opacity-70">
          © {new Date().getFullYear()} theokcompany · Om Khorwal
        </p>
        <div className="flex items-center gap-3">
          <a
            className="hover:underline opacity-80 hover:opacity-100"
            href="/contact"
          >
            Contact
          </a>
          <a
            className="hover:underline opacity-80 hover:opacity-100"
            href="/services"
          >
            Services
          </a>
          <a
            className="hover:underline opacity-80 hover:opacity-100"
            href="mailto:omkhorwalofficial@gmail.com"
          >
            omkhorwalofficial@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
