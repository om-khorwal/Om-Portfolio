// app/blog/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug } from "../posts";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return [
    { slug: "ai-friend-not-foe" },
    { slug: "vibe-coding-the-new-way-to-build" },
    { slug: "typescript-is-not-optional-anymore" },
    { slug: "edge-runtime-why-it-matters" },
  ];
}

function readingTime(html: string) {
  const words = html.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="opacity-60">No slug provided.</p>
        <Link href="/blog" className="mt-4 inline-block underline text-sm">Back to blog</Link>
      </main>
    );
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-2xl font-bold mb-2">Post not found</p>
        <p className="opacity-60 mb-6">We could not find that article.</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition-colors"
        >
          <span>&#8592;</span> Back to blog
        </Link>
      </main>
    );
  }

  const mins = readingTime(post.contentHtml);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen pb-24">
      {/* Hero */}
      {post.hero && (
        <div className="relative w-full h-72 md:h-96 overflow-hidden">
          <Image
            src={post.hero}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
            priority
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/40 to-transparent" />

          {/* back button on hero */}
          <div className="absolute top-5 left-5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-black/50 border border-white/10 backdrop-blur hover:bg-black/70 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                <path d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Blog
            </Link>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4">
        {/* back button when no hero */}
        {!post.hero && (
          <div className="pt-10 mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/10 hover:bg-white/5 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                <path d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Blog
            </Link>
          </div>
        )}

        {/* Header */}
        <header className={post.hero ? "-mt-20 relative z-10" : ""}>
          {/* Meta row */}
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
            <span>{formattedDate}</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>{mins} min read</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white mb-4">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />
        </header>

        {/* Content */}
        <article
          className="
            text-slate-300 text-base leading-[1.85] space-y-0

            [&_h3]:text-white [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:font-bold
            [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:tracking-tight

            [&_p]:mb-5 [&_p]:text-slate-300

            [&_.lead]:text-lg [&_.lead]:md:text-xl [&_.lead]:text-slate-200
            [&_.lead]:leading-relaxed [&_.lead]:mb-7 [&_.lead]:font-light

            [&_ul]:my-5 [&_ul]:space-y-2.5 [&_ul]:pl-0 [&_ul]:list-none
            [&_ul_li]:flex [&_ul_li]:items-start [&_ul_li]:gap-2.5 [&_ul_li]:text-slate-300
            [&_ul_li]:before:content-[''] [&_ul_li]:before:mt-2.5 [&_ul_li]:before:shrink-0
            [&_ul_li]:before:w-1.5 [&_ul_li]:before:h-1.5 [&_ul_li]:before:rounded-full
            [&_ul_li]:before:bg-white/30

            [&_strong]:text-white [&_strong]:font-semibold

            [&_blockquote]:relative [&_blockquote]:my-8 [&_blockquote]:px-6 [&_blockquote]:py-5
            [&_blockquote]:rounded-xl [&_blockquote]:bg-white/4 [&_blockquote]:border [&_blockquote]:border-white/10
            [&_blockquote]:border-l-4 [&_blockquote]:border-l-white/40
            [&_blockquote_em]:text-slate-300 [&_blockquote_em]:text-base [&_blockquote_em]:not-italic
            [&_blockquote_p]:mb-0

            [&_em]:italic [&_em]:text-slate-400
          "
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/8 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-white/4 border border-white/8 text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
              <path d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All posts
          </Link>
        </footer>
      </div>
    </main>
  );
}
