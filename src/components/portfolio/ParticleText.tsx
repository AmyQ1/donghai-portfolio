import { useEffect, useRef } from 'react';

interface Particle {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * ParticleText — 由粒子组成的文字：
 * 鼠标靠近时粒子被推开消散，移开后由弹性力重新聚合成文字。
 */
export function ParticleText({
  text = 'DONGHAI',
  className = '',
  style,
}: {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -99999, y: -99999, inside: false });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let disposed = false;
    let particles: Particle[] = [];

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      const w = canvas.width;
      const h = canvas.height;

      /* 离屏绘制文字并采样像素（逐字绘制以还原原图的宽字距） */
      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      const octx = off.getContext('2d')!;
      const chars = [...text];
      const TRACKING = 0.14; // em，对应原图 D O N G H A I 的宽字距
      const WORD_GAP = 0.5; // em，DONG 与 HAI 之间的词间空隙

      const charAdvance = (ch: string, fontSize: number) =>
        ch === ' ' ? WORD_GAP * fontSize : octx.measureText(ch).width + TRACKING * fontSize;

      const measure = (fontSize: number) => {
        octx.font = `800 ${fontSize}px "Playfair Display", Georgia, serif`;
        let total = 0;
        for (const ch of chars) total += charAdvance(ch, fontSize);
        return total - TRACKING * fontSize; // 末尾多算的一份字距
      };

      /* 先以 100px 量比例，再放大到尽量撑满容器 */
      const at100 = measure(100);
      const fontSize = Math.min(h * 0.94, (w * 0.99 * 100) / at100);

      octx.font = `800 ${fontSize}px "Playfair Display", Georgia, serif`;
      octx.textAlign = 'left';
      octx.textBaseline = 'middle';
      octx.fillStyle = '#fff';
      const totalW = measure(fontSize);
      let cx = (w - totalW) / 2;
      const cy = h / 2 + fontSize * 0.04;
      for (const ch of chars) {
        if (ch !== ' ') octx.fillText(ch, cx, cy);
        cx += charAdvance(ch, fontSize);
      }

      const img = octx.getImageData(0, 0, w, h).data;
      particles = [];
      const gap = Math.max(2, Math.round(w / 400));
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          if (img[(y * w + x) * 4 + 3] > 140) {
            particles.push({
              hx: x,
              hy: y,
              x: x + (Math.random() - 0.5) * w * 0.8,
              y: y + (Math.random() - 0.5) * h * 2.2,
              vx: 0,
              vy: 0,
            });
          }
        }
      }
    };

    const tick = () => {
      if (disposed) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const rect = canvas.getBoundingClientRect();
      const mx = ((mouseRef.current.x - rect.left) / rect.width) * w;
      const my = ((mouseRef.current.y - rect.top) / rect.height) * h;
      const active = mouseRef.current.inside;
      const R = Math.min(w, h) * 0.34;
      const size = Math.max(1.2, w / 520);

      ctx.fillStyle = 'rgba(252, 248, 240, 1)';
      for (const p of particles) {
        if (active) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const force = (1 - d / R) * (w / 260);
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }
        /* 回弹力：粒子总是想回到文字轮廓上 */
        p.vx += (p.hx - p.x) * 0.012;
        p.vy += (p.hy - p.y) * 0.012;
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillRect(p.x, p.y, size, size);
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const pad = 70;
      const inside =
        e.clientX >= rect.left - pad &&
        e.clientX <= rect.right + pad &&
        e.clientY >= rect.top - pad &&
        e.clientY <= rect.bottom + pad;
      mouseRef.current = { x: e.clientX, y: e.clientY, inside };
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) mouseRef.current.inside = false;
    };
    const onResize = () => build();

    const fontsReady: Promise<unknown> =
      typeof document !== 'undefined' && 'fonts' in document
        ? (document.fonts as FontFaceSet).ready
        : Promise.resolve();
    fontsReady.then(() => {
      if (disposed) return;
      build();
      tick();
    });

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onOut);
    window.addEventListener('resize', onResize);
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onOut);
      window.removeEventListener('resize', onResize);
    };
  }, [text]);

  return (
    <div ref={wrapRef} className={`pointer-events-none ${className}`} style={style}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
