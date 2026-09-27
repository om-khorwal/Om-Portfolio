"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type TabKey = "Development" | "Videos";
type YoutubeVideo = {
  id: string;
  title: string;
  category: string;
  desc?: string;
  thumbnail: string;
};

const TABS: TabKey[] = ["Development", "Videos"];

export default function ProjectTabs({
  developmentProjects,
}: {
  developmentProjects: { id: string; card: ReactNode }[];
}) {
  const [active, setActive] = useState<TabKey>("Development");
  const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideo | null>(null);
  const [videosLoading, setVideosLoading] = useState(true);

  useEffect(() => {
    async function loadVideos() {
      try {
        setVideosLoading(true);
        const res = await fetch("/api/youtube/latest");
        const data = await res.json();
        const items = (data.items || []) as YoutubeVideo[];

        setYoutubeVideos(items);
        setSelectedVideo(items[0] || null);
      } catch (err) {
        console.error("Failed to fetch YouTube:", err);
      } finally {
        setVideosLoading(false);
      }
    }
    loadVideos();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {TABS.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`relative rounded-2xl border border-white/10 px-4 py-3 text-left transition ${
                isActive ? "text-white" : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="tabGlow"
                  className="absolute inset-0 rounded-2xl bg-white/8"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <div className="relative z-10">
                <div className="text-xs uppercase opacity-70">Category</div>
                <div className="mt-1 text-base md:text-lg font-semibold">{tab}</div>
                <p className="mt-1 text-xs md:text-sm opacity-75">
                  {tab === "Development" && "Dashboards, workflows & backends."}
                  {tab === "Videos" && "Shorts, cinematic edits & vlogs."}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="min-h-[320px]">
        <AnimatePresence mode="wait">
          {active === "Development" && (
            <motion.section
              key="development"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6 max-w-2xl">
                <p className="text-xs uppercase tracking-widest opacity-70">
                  Design, engineering &amp; experimentation
                </p>
                <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight">
                  Built to make complex work clearer.
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {developmentProjects.map(({ id, card }, index) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % 3) * 0.07 }}
                    whileHover={{ y: -3 }}
                    className="h-full"
                  >
                    {card}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {active === "Videos" && (
            <motion.section
              key="videos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 gap-6"
            >
              {videosLoading && (
                <div className="glass rounded-2xl p-6 text-center">Loading latest uploads...</div>
              )}

              {!videosLoading && youtubeVideos.length === 0 && (
                <div className="glass rounded-2xl p-6 text-center">No videos found.</div>
              )}

              {!videosLoading && selectedVideo && (
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="relative aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                      title={selectedVideo.title}
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs uppercase text-fuchsia-300">
                      {selectedVideo.category}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mt-1">
                      {selectedVideo.title}
                    </h3>
                    <p className="mt-2 text-sm opacity-80">{selectedVideo.desc}</p>
                  </div>
                </div>
              )}

              {!videosLoading && youtubeVideos.length > 0 && (
                <div>
                  <h4 className="text-sm md:text-base font-semibold mb-3">More uploads</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {youtubeVideos.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => setSelectedVideo(video)}
                        className={`group rounded-lg overflow-hidden border border-white/10 ${
                          selectedVideo?.id === video.id ? "ring-2 ring-white/20" : ""
                        }`}
                      >
                        <div className="relative aspect-video">
                          <img
                            src={video.thumbnail}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            alt={video.title}
                          />
                        </div>
                        <div className="p-2">
                          <div className="text-xs uppercase opacity-70">{video.category}</div>
                          <div className="mt-1 text-sm font-medium">{video.title}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}