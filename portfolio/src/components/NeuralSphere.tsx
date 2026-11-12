import { useEffect, useRef } from 'react';

/**
 * A slowly turning 3D sphere of connected nodes drawn on a 2D canvas.
 * It leans toward the cursor and a few nodes pulse. No WebGL, so it stays light.
 */
export function NeuralSphere() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const N = 200;
    const pts = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      return { x: Math.cos(th) * r, y, z: Math.sin(th) * r, active: i % 9 === 0, phase: i * 0.7 };
    });
    const edges: [number, number][] = [];
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, dz = pts[i].z - pts[j].z;
        if (dx * dx + dy * dy + dz * dz < 0.085) edges.push([i, j]);
      }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let mx = 0, my = 0, cx = 0, cy = 0, angle = 0, raf = 0, visible = true;
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    const proj = new Array<{ x: number; y: number; d: number; s: number }>(N);
    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (!reduce) angle += 0.003;
      cx += (mx - cx) * 0.05;
      cy += (my - cy) * 0.05;
      const ry = angle + cx * 0.8, rx = -0.2 + cy * 0.5;
      const sY = Math.sin(ry), cY = Math.cos(ry), sX = Math.sin(rx), cX = Math.cos(rx);
      const R = Math.min(w, h) * 0.42, ox = w * 0.5, oy = h * 0.4, fov = 2.8;
      for (let k = 0; k < N; k++) {
        const p = pts[k];
        const x1 = p.x * cY - p.z * sY, z1 = p.x * sY + p.z * cY;
        const y2 = p.y * cX - z1 * sX, z2 = p.y * sX + z1 * cX;
        const s = fov / (fov - z2);
        proj[k] = { x: ox + x1 * R * s, y: oy + y2 * R * s, d: (z2 + 1) / 2, s };
      }
      ctx.lineWidth = 1;
      for (const [ai, bi] of edges) {
        const a = proj[ai], b = proj[bi], dd = (a.d + b.d) / 2;
        ctx.strokeStyle = `rgba(35,69,54,${(0.05 + dd * dd * 0.32).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      const time = t / 1000;
      for (let m = 0; m < N; m++) {
        const q = proj[m];
        if (pts[m].active) {
          const pulse = reduce ? 1 : 0.6 + 0.4 * Math.sin(time * 2 + pts[m].phase);
          ctx.fillStyle = `rgba(255,255,255,${(0.55 * q.d * pulse).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(q.x, q.y, (6 + 6 * pulse) * q.s, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(47,122,82,${(0.45 + 0.55 * q.d).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(q.x, q.y, 2.8 * q.s, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(35,69,54,${(0.18 + 0.7 * q.d * q.d).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(q.x, q.y, (0.8 + 1.4 * q.d) * q.s, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
