"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getAllPosts } from "./posts";

const posts = getAllPosts();

export default function BlogIndex() {
  return (
    <main className="relative z-10 mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8 text-center">
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold">
          Blog
        </motion.h1>
        <p className="mt-2 text-sm opacity-80">
          Thoughts, ideas and breakdowns from my work.
        </p>
      </header>

      <section className="grid gap-4">
        {posts.map((post) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-5"
          >
            <div className="text-xs opacity-70">{new Date(post.date).toLocaleDateString()}</div>
            <h2 className="mt-1 text-lg font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm opacity-80">{post.excerpt}</p>

            <div className="mt-3 text-sm underline opacity-75">
              <Link href={`/blog/${post.slug}`}>Read article →</Link>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
