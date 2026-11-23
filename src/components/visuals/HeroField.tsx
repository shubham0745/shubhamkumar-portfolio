"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Orbiting node field behind the hero copy.
 *
 * Replaces the previous react-three-fiber scene. Same visual intent — a glowing
 * core with orbiting nodes and a constellation mesh — at a fraction of the cost:
 * ~2 kB of logic on a 2D canvas instead of the three.js + drei runtime.
 *
 * Performance guards, all of which mattered on the WebGL version too:
 *  - device pixel ratio capped at 1.5 (retina phones would otherwise shade 4x
 *    the pixels for no visible gain)
 *  - the rAF loop is only running while the canvas is actually on screen
 *    (IntersectionObserver) and the tab is visible (visibilitychange)
 *  - glow is drawn by blitting a pre-rendered sprite, never via shadowBlur,
 *    which is the usual reason canvas particle fields get slow
 *  - prefers-reduced-motion paints a single static frame and stops
 */

type Node = {
  /** Orbit radius as a fraction of the smaller viewport axis. */
  radius: number;
  angle: number;
  speed: number;
  /** Vertical squash, so orbits read as tilted ellipses rather than circles. */
  tilt: number;
  size: number;
  colour: number;
};

const PALETTE: ReadonlyArray<readonly [number, number, number]> = [
  [96, 165, 250], // accent-soft
  [59, 130, 246], // accent
  [167, 139, 250], // violet
  [34, 211, 238], // cyan
];

const LINK_DISTANCE = 108;

function makeSprite([r, g, b]: readonly [number, number, number]) {
  const size = 36;
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = size;
  const ctx = sprite.getContext("2d");
  if (!ctx) return sprite;

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, `rgba(${r},${g},${b},1)`);
  gradient.addColorStop(0.28, `rgba(${r},${g},${b},0.42)`);
  gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

export default function HeroField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sprites = PALETTE.map(makeSprite);

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frameId = 0;
    let running = false;
    let onScreen = true;
    let time = 0;

    // Eased pointer parallax. Target is set on pointermove; the applied value
    // catches up inside the draw loop so we never lay out on the event itself.
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerX = 0;
    let pointerY = 0;

    const build = () => {
      // Scale the node count to the area so phones do materially less work.
      const count = Math.max(26, Math.min(78, Math.round((width * height) / 15000)));
      nodes = Array.from({ length: count }, (_, i) => {
        const band = i % 3;
        return {
          radius: 0.16 + band * 0.13 + Math.random() * 0.09,
          angle: Math.random() * Math.PI * 2,
          speed: (0.08 + Math.random() * 0.12) * (band % 2 === 0 ? 1 : -1),
          tilt: 0.42 + band * 0.12,
          size: 1.1 + Math.random() * 1.9,
          colour: Math.floor(Math.random() * PALETTE.length),
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const draw = () => {
      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height);

      pointerX += (pointerTargetX - pointerX) * 0.05;
      pointerY += (pointerTargetY - pointerY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Orbit rings, drawn first so nodes sit on top of them.
      ctx.lineWidth = 1;
      for (let band = 0; band < 3; band++) {
        const rx = scale * (0.2 + band * 0.13);
        const ry = rx * (0.42 + band * 0.12);
        ctx.beginPath();
        ctx.ellipse(cx + pointerX * 0.4, cy + pointerY * 0.4, rx, ry, band * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99,132,241,${0.1 - band * 0.02})`;
        ctx.stroke();
      }

      // Resolve positions once, then reuse for both links and nodes.
      const xs = new Float32Array(nodes.length);
      const ys = new Float32Array(nodes.length);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const angle = n.angle + time * n.speed;
        const r = n.radius * scale;
        xs[i] = cx + Math.cos(angle) * r + pointerX;
        ys[i] = cy + Math.sin(angle) * r * n.tilt + pointerY;
      }

      // Constellation mesh. Capped node count keeps this pairwise pass cheap.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = xs[i] - xs[j];
          if (dx > LINK_DISTANCE || dx < -LINK_DISTANCE) continue;
          const dy = ys[i] - ys[j];
          if (dy > LINK_DISTANCE || dy < -LINK_DISTANCE) continue;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DISTANCE) continue;
          ctx.beginPath();
          ctx.moveTo(xs[i], ys[i]);
          ctx.lineTo(xs[j], ys[j]);
          ctx.strokeStyle = `rgba(125,170,255,${0.16 * (1 - dist / LINK_DISTANCE)})`;
          ctx.stroke();
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const sprite = sprites[n.colour];
        const s = n.size * 7;
        ctx.drawImage(sprite, xs[i] - s / 2, ys[i] - s / 2, s, s);
      }
    };

    const frame = () => {
      time += 0.01;
      draw();
      frameId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced || !onScreen || document.hidden) return;
      running = true;
      frameId = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointerTargetX = (e.clientX / window.innerWidth - 0.5) * 34;
      pointerTargetY = (e.clientY / window.innerHeight - 0.5) * 22;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        onScreen ? start() : stop();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) window.addEventListener("pointermove", onPointerMove, { passive: true });

    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}
