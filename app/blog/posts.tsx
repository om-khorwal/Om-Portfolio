// app/blog/posts.ts
export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  hero?: string;
  contentHtml: string;
  tags?: string[];
};

export const posts: Post[] = [
  {
    slug: "ai-friend-not-foe",
    title: "AI - Friend, Not Foe",
    date: "2025-02-01",
    excerpt:
      "A practical look at how AI helps developers, designers, editors and founders - instead of replacing them.",
    hero: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["AI", "future", "productivity"],
    contentHtml: `
      <p>AI isn't here to replace humans - it's here to amplify us.
      Across development, design and video editing, AI acts as a multiplier, clearing repetitive work and letting creators focus on taste, strategy and execution.</p>

      <h3>The Myth of Replacement</h3>
      <p>Most AI systems don't create end-to-end products. They need direction, refinement and real-world understanding.
      What AI does best is <strong>remove friction</strong> - the busywork that slows down creatives and engineers.</p>

      <h3>Where AI Helps Today</h3>
      <ul>
        <li>Faster prototyping (UI ideas, drafts, layouts)</li>
        <li>Better code reviews and debugging</li>
        <li>Instant content adaptation (thumbnails, captions, resizes)</li>
        <li>Research, summaries and documentation cleanup</li>
      </ul>

      <h3>The Human Layer Still Wins</h3>
      <p>Storytelling, taste, product intuition, and decision-making remain deeply human skills.
      AI makes execution faster - but vision comes from people.</p>

      <p><em>AI is not a replacement. It's a power-up.</em></p>
    `,
  },
];

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug) || null;
}

