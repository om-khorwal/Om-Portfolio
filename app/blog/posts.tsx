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
      <p class="lead">AI isn't here to replace humans - it's here to amplify us. That's not a comforting PR line, it's what actually happens in practice when you work with these tools day to day.</p>

      <h3>The Myth of Replacement</h3>
      <p>Every time a powerful new tool arrives, people predict mass displacement. Spreadsheets were going to eliminate accountants. Photoshop was going to kill graphic designers. Neither happened - both professions grew, because the tool lowered the cost of doing the work and raised the ceiling of what one person could produce.</p>
      <p>AI is the same pattern, just faster and more visible. Most AI systems don't build end-to-end products on their own. They need direction, taste, context, and real-world understanding. What they do exceptionally well is <strong>remove friction</strong> - the repetitive busywork that slows down creatives and engineers.</p>

      <h3>Where AI Actually Helps Today</h3>
      <ul>
        <li><strong>Development</strong> - Autocomplete that actually understands context, instant boilerplate, faster debugging. A junior dev with good AI tools can move like a senior in straightforward tasks.</li>
        <li><strong>Design</strong> - Rapid UI mockups, image generation for concepts, instant asset resizing and adaptation across formats.</li>
        <li><strong>Writing and content</strong> - First drafts, research summaries, documentation cleanup, and caption variations at scale.</li>
        <li><strong>Video and media</strong> - Auto-subtitles, B-roll suggestions, thumbnail generation, and script outlines.</li>
      </ul>

      <h3>What AI Cannot Do</h3>
      <p>It cannot replace the instinct that tells you something feels off. It cannot understand your client's personality, your team's internal jokes, or the unspoken brand direction that lives in your founder's head. It cannot make the judgment call when two good options exist and neither is obviously correct.</p>
      <p>Storytelling, taste, strategy, and accountability remain deeply human. AI accelerates execution - it does not replace vision.</p>

      <h3>The Real Threat Is Complacency</h3>
      <p>The people who will struggle are not the ones AI replaces - they are the ones who refuse to learn how to use it. If you are a developer who ignores AI tooling, a designer who dismisses generative tools, or a writer who treats AI as a threat rather than a collaborator, you are not protected. You are falling behind.</p>
      <p>The leverage now belongs to people who combine craft with AI fluency. That is the new baseline.</p>

      <blockquote><em>AI is not a replacement. It is a power-up. Pick it up.</em></blockquote>
    `,
  },
  {
    slug: "vibe-coding-the-new-way-to-build",
    title: "Vibe Coding - The New Way to Build",
    date: "2025-09-10",
    excerpt:
      "Prompting your way to working software is real now. Here is what vibe coding actually is, where it works, and where it breaks.",
    hero: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1770&auto=format&fit=crop",
    tags: ["AI", "development", "tools"],
    contentHtml: `
      <p class="lead">Vibe coding is writing software by describing what you want in plain language and letting an AI generate the code. It sounds like a meme. It is increasingly a legitimate workflow.</p>

      <h3>What It Actually Looks Like</h3>
      <p>You open a chat interface or an AI-native editor. You describe a feature in plain English. You review the output, tweak the prompt, and iterate. You are not writing every line - you are steering. The AI handles boilerplate, scaffolding, and pattern repetition. You handle architecture, product decisions, and quality control.</p>
      <p>Tools like Cursor, GitHub Copilot, and Claude Code have pushed this from novelty to daily workflow for a lot of developers.</p>

      <h3>Where It Works Well</h3>
      <ul>
        <li>Prototyping - spin up a working UI or API in minutes</li>
        <li>Boilerplate and CRUD - forms, tables, basic endpoints</li>
        <li>Learning unfamiliar syntax or frameworks fast</li>
        <li>Writing tests for existing logic</li>
        <li>Generating first drafts that you then refine</li>
      </ul>

      <h3>Where It Breaks Down</h3>
      <p>Vibe coding struggles with anything that requires deep understanding of a full codebase over time. Context limits mean the AI does not always know what code already exists, what patterns your team has agreed on, or why a certain tricky workaround is in place.</p>
      <p>It also produces confident-sounding wrong answers. If you cannot read and understand the output, you will ship bugs you do not understand. That is dangerous.</p>

      <h3>The Honest Take</h3>
      <p>Vibe coding is not the death of programming. It is a shift in what programming looks like. The work moves up the stack - from writing syntax to making decisions. You still need to understand systems, tradeoffs, and architecture. But you can spend far less time on the mechanical parts.</p>
      <p>If you can code and you add AI fluency, you become dramatically faster. If you cannot code and you vibe code, you can build simple things but you will hit a wall the moment something breaks in a non-obvious way.</p>

      <blockquote><em>The best vibe coders are still engineers. They have just automated the boring parts.</em></blockquote>
    `,
  },
  {
    slug: "typescript-is-not-optional-anymore",
    title: "TypeScript is Not Optional Anymore",
    date: "2025-11-20",
    excerpt:
      "Plain JavaScript still works. But if you are building anything that lasts more than a week, TypeScript is the baseline now - not a preference.",
    hero: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1756&auto=format&fit=crop",
    tags: ["TypeScript", "development", "engineering"],
    contentHtml: `
      <p class="lead">A few years ago TypeScript felt like extra ceremony. Today it is the default choice for almost every serious JavaScript project, and the holdouts are getting harder to justify.</p>

      <h3>What Changed</h3>
      <p>TypeScript used to require a lot of setup and felt like fighting the language. Tooling has caught up. Most frameworks ship TypeScript configs out of the box. Editor support is excellent. The cost of adopting it is lower than it has ever been - and the cost of not adopting it is higher.</p>

      <h3>The Real Benefits in Practice</h3>
      <ul>
        <li><strong>Catch errors before they reach production</strong> - Type errors surface at compile time, not at 2am when a user hits an undefined property.</li>
        <li><strong>Refactoring becomes safe</strong> - Rename a field and the compiler tells you everywhere you missed it. In a plain JS codebase that same change becomes a grep and a prayer.</li>
        <li><strong>Better autocomplete</strong> - Types make your editor smarter. You spend less time reading docs and less time guessing what shape a response object is.</li>
        <li><strong>Self-documenting code</strong> - A well-typed function signature tells you what it takes and what it returns. That is documentation that cannot go stale.</li>
      </ul>

      <h3>The Common Objections</h3>
      <p><strong>"It slows me down."</strong> It slows you down for the first week. After that you move faster because you are catching bugs before they exist.</p>
      <p><strong>"My project is small."</strong> Small projects grow. The time to add types is at the start, not after 10,000 lines of untyped code.</p>
      <p><strong>"I use JSDoc instead."</strong> JSDoc gives you some of the benefit with more maintenance overhead. TypeScript just does it better.</p>

      <h3>Where We Are Now</h3>
      <p>Next.js, Remix, SvelteKit, tRPC, Prisma - the entire modern web stack is TypeScript-first. If you are not writing TypeScript, you are working against the grain of the ecosystem you are likely using.</p>

      <blockquote><em>TypeScript is not a style preference. It is professional infrastructure.</em></blockquote>
    `,
  },
  {
    slug: "edge-runtime-why-it-matters",
    title: "Edge Runtime - Why Your App Should Run Closer to Users",
    date: "2026-01-15",
    excerpt:
      "Edge computing moves execution away from central servers and toward the user. Here is what that means for performance and how modern frameworks are using it.",
    hero: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1768&auto=format&fit=crop",
    tags: ["performance", "edge", "web"],
    contentHtml: `
      <p class="lead">Traditional web apps run on servers in a handful of data centers. Every request travels to that server and back. Edge runtime changes the model - your code runs in dozens or hundreds of locations simultaneously, as close to the user as possible.</p>

      <h3>The Latency Problem</h3>
      <p>Physics sets a hard limit on how fast data can travel. If your server is in Virginia and your user is in Mumbai, every single request is paying a geography tax. CDNs solved this for static assets years ago. Edge runtime solves it for dynamic logic too.</p>

      <h3>What Edge Runtime Actually Is</h3>
      <p>Edge runtime is a lightweight JavaScript runtime - like Node.js but stripped down - that runs at CDN edge nodes. Platforms like Cloudflare Workers, Vercel Edge Functions, and Fastly Compute run your code at 200+ locations globally. A user in Tokyo gets a response from a server in Tokyo, not from a data center on another continent.</p>

      <h3>What Works Well at the Edge</h3>
      <ul>
        <li>Middleware - auth checks, redirects, A/B testing, geolocation logic</li>
        <li>Personalized responses - render the right content for the right region without a round trip to a central server</li>
        <li>API rate limiting and request filtering</li>
        <li>Edge-side rendering for dynamic but cacheable content</li>
      </ul>

      <h3>The Tradeoffs</h3>
      <p>Edge runtime is not Node.js. You do not get access to the full Node API - no file system, limited native modules. Database connections are expensive to establish at the edge, which is why edge-compatible databases like PlanetScale, Neon, and Turso have emerged alongside it.</p>
      <p>It is also more complex to debug and reason about. You are now running code in 200 locations simultaneously. When something breaks, figuring out where and why takes different skills than debugging a single server.</p>

      <h3>Where It Is Heading</h3>
      <p>Next.js, Remix, and Astro all have first-class edge support now. The Vercel and Cloudflare ecosystems are building entire development platforms around it. Edge is not replacing traditional servers - it is becoming a complementary layer that handles the parts of your stack that benefit most from low latency.</p>

      <blockquote><em>Closer to the user means faster for the user. That is always worth taking seriously.</em></blockquote>
    `,
  },
];

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug) || null;
}
