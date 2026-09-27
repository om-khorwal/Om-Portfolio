import Image from "next/image";
import Link from "next/link";
import { getPortfolioProjects, type PortfolioProject } from "@/lib/portfolio-projects";
import ProjectTabs from "./project-tabs";

function ArrowUpRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const content = (
    <>
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image_url}
          alt={project.title}
          fill
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-30 transition" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] opacity-70">
          {project.category_label}
        </p>
        <h3 className="mt-3 text-lg font-semibold tracking-tight">{project.title}</h3>
        {project.note && (
          <p className="mt-1 text-xs font-medium opacity-60">{project.note}</p>
        )}
        <p className="mt-3 text-sm leading-relaxed opacity-80">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.badges.map((b) => (
            <span key={b} className="px-2 py-1 text-xs border border-white/15 rounded-lg">
              {b}
            </span>
          ))}
        </div>
        {project.live_url && (
          <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm underline opacity-80 group-hover:opacity-100">
            Visit project <ArrowUpRightIcon className="h-4 w-4" />
          </span>
        )}
      </div>
    </>
  );

  return project.live_url ? (
    <a
      href={project.live_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass flex h-full flex-col overflow-hidden rounded-2xl"
    >
      {content}
    </a>
  ) : (
    <article className="group glass flex h-full flex-col overflow-hidden rounded-2xl">
      {content}
    </article>
  );
}

export default async function ProjectsPage() {
  const projects = await getPortfolioProjects();

  return (
    <main className="space-y-10">
      {/* Intro */}
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Work</h1>
        <p className="mt-2 opacity-80">
          A selection of products, platforms, websites, and video edits I&apos;ve designed and built.
        </p>
      </header>

      {/* Tabs */}
      <section>
        <ProjectTabs
          developmentProjects={projects.map((project) => ({
            id: project.id,
            card: <ProjectCard project={project} />,
          }))}
        />
      </section>

      {/* CTA */}
      <section className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Have a project or problem you want to solve?</h2>
        <p className="mt-2 opacity-85">
          Whether you need a product built, an existing system improved, or simply want to
          explore an idea, let&apos;s talk.
        </p>

        <div className="mt-4">
          <Link href="/contact" className="glass rounded-xl px-4 py-2 text-sm hover:opacity-90 transition">
            Start a Conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
