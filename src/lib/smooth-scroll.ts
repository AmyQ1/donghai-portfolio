import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/**
 * 订阅 Lenis 的滚动进度。
 * Lenis 会接管原生滚动，window.scrollY / scroll 事件不再可靠，
 * 因此进度条需要直接挂在 lenis 的 scroll 事件上。
 */
export function onSmoothScroll(cb: (progress: number) => void) {
  if (!lenis) return () => {};
  const handler = (event: { progress?: number; scroll?: number; limit?: number }) => {
    const progress = typeof event.progress === 'number'
      ? event.progress
      : event.limit && event.limit > 0
        ? (event.scroll ?? 0) / event.limit
        : 0;
    cb(progress);
  };
  lenis.on('scroll', handler);
  // 订阅后立即同步一次当前值，避免组件初始状态停在 0
  cb(getScrollProgress());
  return () => lenis?.off('scroll', handler);
}

/** 读取当前滚动进度（0 ~ 1）。Lenis 与原生各算一份，取较大值兜底 */
export function getScrollProgress() {
  let p = 0;
  if (lenis) {
    const current = lenis as Lenis & { limit?: number; scroll?: number; progress?: number };
    if (typeof current.progress === 'number' && Number.isFinite(current.progress)) {
      p = current.progress;
    } else if (typeof current.limit === 'number' && current.limit > 0) {
      p = (current.scroll ?? 0) / current.limit;
    }
  }
  // 原生兜底：Lenis 被锁住/未接管（如拖滚动条、弹层后状态异常）时仍能读到真实进度
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const native = max > 0 ? window.scrollY / max : 0;
  return Math.min(1, Math.max(p, native));
}

/** 初始化 Lenis 平滑滚动，并与 GSAP ScrollTrigger 同步 */
export function initSmoothScroll() {
  if (lenis) return lenis;
  lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    wheelMultiplier: 0.9,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/** 平滑滚动到指定 id 的区块 */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 3) });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/** 打开全屏弹层时锁住背景滚动 */
export function lockScroll() {
  lenis?.stop();
  document.body.style.overflow = 'hidden';
}

/** 弹层关闭后恢复滚动 */
export function unlockScroll() {
  lenis?.start();
  document.body.style.overflow = '';
}

/** 平滑回到顶部 */
export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 3) });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
