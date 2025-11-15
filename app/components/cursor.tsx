"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);

  // Detect touch devices first
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) setEnabled(true);
  }, []);

  // Always define hooks (do NOT conditionally run hooks)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.3 });

  const vx = useVelocity(springX);
  const vy = useVelocity(springY);

  const speed = useMotionValue(0);
  useMotionValueEvent(vx, "change", (vxNow) => {
    const vyNow = vy.get();
    speed.set(Math.hypot(vxNow, vyNow));
  });

  const scaleX = useTransform(speed, [0, 800], [1, 1.35], { clamp: true });
  const scaleY = useTransform(speed, [0, 800], [1, 0.65], { clamp: true });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  // Rendering condition must be HERE (after all hooks)
  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-5 w-5 rounded-full 
                 border border-white/30 bg-white/10 mix-blend-difference backdrop-blur-sm
                 shadow-[0_0_15px_3px_rgba(255,255,255,0.4)] transition-shadow duration-200"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        scaleX,
        scaleY,
      }}
    />
  );
}
