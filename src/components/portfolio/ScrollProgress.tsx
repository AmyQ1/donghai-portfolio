import { useEffect, useRef } from 'react';
import { getScrollProgress, initSmoothScroll } from '@/lib/smooth-scroll';

/**
 * ScrollProgress — 左下角固定的 SCROLL 百分比指示器（0% → 100%）
 *
 * 健壮性设计：不用 React state 驱动（避免重渲染调度/副作用竞态导致卡住），
 * 每帧直接用 rAF 读真实滚动位置写 DOM，只要页面脚本活着就一定是准的。
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    initSmoothScroll();

    let raf = 0;
    let lastShown = -1;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const pct = Math.min(100, Math.max(0, getScrollProgress() * 100));
      const shown = Math.round(pct);
      if (shown === lastShown) return;
      lastShown = shown;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      if (labelRef.current) labelRef.current.textContent = `SCROLL   ${shown}%`;
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none fixed left-6 bottom-6 z-[80] font-mono text-[11px] tracking-[0.35em] text-white mix-blend-difference md:left-10 md:bottom-8">
      <div className="mb-3 h-px w-28 bg-white/25">
        <div ref={barRef} className="h-full bg-white" style={{ width: '0%' }} />
      </div>
      <span ref={labelRef}>SCROLL&nbsp;&nbsp;0%</span>
    </div>
  );
}
