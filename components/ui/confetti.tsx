"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Piece = {
  id: number;
  x: number;
  targetX: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  rotate: number;
  isCircle: boolean;
};

const COLORS = [
  "#e8ff47", "#ffffff", "#22c55e",
  "#a78bfa", "#f472b6", "#60a5fa", "#fbbf24",
];

export function Confetti() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPieces(
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        targetX: (Math.random() - 0.5) * 250,
        size: Math.random() * 9 + 5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 1.8,
        duration: Math.random() * 2 + 2.5,
        rotate: Math.random() * 720 * (Math.random() > 0.5 ? 1 : -1),
        isCircle: Math.random() > 0.6,
      })),
    );
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            y: 900,
            x: p.targetX,
            opacity: [1, 1, 1, 0],
            rotate: p.rotate,
            scale: [1, 1, 0.7],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: `${p.x}%`,
            width: p.size,
            height: p.isCircle ? p.size : p.size * 2.2,
            backgroundColor: p.color,
            borderRadius: p.isCircle ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}
