// app/blog/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug } from "../posts";

type Props = { params: { slug: string } };

// Optional: pre-render the single known slug (helps Turbopack/dev)
export async function generateStaticParams() {
  return [{ slug: "ai-friend-not-foe" }];
}

export default async function BlogPostPage({ params }: Props) {
  // ✅ Await params (required by Next.js App Router runtime)
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  // defensive check
  if (!slug) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="glass p-8 rounded-2xl text-center">
          <h2 className="text-lg font-semibold">Bad request</h2>
          <p className="mt-2 opacity-80">No slug provided.</p>
          <Link href="/blog" className="underline mt-2 inline-block">Back to blog</Link>
        </div>
      </main>
    );
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="glass p-8 rounded-2xl text-center">
          <h2 className="text-lg font-semibold">Post not found</h2>
          <p className="mt-2 opacity-80">We couldn't find that article.</p>
          <Link href="/blog" className="underline mt-2 inline-block">Back to blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <article className="glass rounded-2xl overflow-hidden">
        {post.hero && (
          <div className="relative w-full h-64 overflow-hidden">
            <Image src={post.hero} alt={post.title} fill className="object-cover" unoptimized priority />
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="text-xs opacity-70">{new Date(post.date).toLocaleDateString()}</div>
          <h1 className="text-2xl md:text-3xl font-bold mt-2">{post.title}</h1>

          <div
            className="mt-4 text-sm md:text-base prose prose-invert"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div className="mt-8 flex justify-between">
            <div className="text-sm opacity-75">{post.tags?.join(", ")}</div>
            <Link href="/blog" className="text-sm underline">Back</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
