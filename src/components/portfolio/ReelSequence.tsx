import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { flyouts } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

/**
 * ReelSequence — 钉住的全屏滚动序列：
 * 1. 蓝紫光团迅速变暗变大 → 回归深色背景，中央出现白色文字
 * 2. 11 张图由小变大、时机错落地向四面八方飞出页面
 * 3. 最后一张灰色图片由小变大覆盖全屏，白文字变灰消失
 * 4. 中央出现 PLAY REEL
 */
export function ReelSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scriptImgRef = useRef<HTMLImageElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coverRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=430%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* 1 — 光团变暗变大直至消失，白色文字浮现 */
      tl.fromTo(
        blobRef.current,
        { scale: 1, opacity: 0.95 },
        { scale: 3.4, opacity: 0, filter: 'blur(90px) brightness(0.5)', duration: 1.3, ease: 'power2.in' },
        0,
      );
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 60, filter: 'blur(14px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
        0.4,
      );
      /* 手写出现特效：clip-path 从左向右扫出，模拟笔触书写 */
      tl.fromTo(
        scriptImgRef.current,
        { clipPath: 'inset(-12% 102% -12% -2%)', opacity: 0.4 },
        { clipPath: 'inset(-12% -2% -12% -2%)', opacity: 1, duration: 1.15, ease: 'power1.inOut' },
        0.45,
      );

      /* 2 — 11 张图由小变大（回弹弹出），加速放大冲向屏幕外 */
      flyouts.forEach((f, i) => {
        const el = imgRefs.current[i];
        if (!el) return;
        const start = 1.3 + i * 0.38;
        tl.fromTo(
          el,
          { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 0, opacity: 0, rotation: 0 },
          { opacity: 1, scale: 0.24, duration: 0.4, ease: 'back.out(2.2)' },
          start,
        );
        tl.to(
          el,
          {
            x: () => f.x * window.innerWidth * 0.55,
            y: () => f.y * window.innerHeight * 0.55,
            scale: 0.85,
            rotation: f.r * 0.5,
            duration: 1.0,
            ease: 'power1.inOut',
          },
          start + 0.35,
        );
        tl.to(
          el,
          {
            x: () => f.x * window.innerWidth * 1.9,
            y: () => f.y * window.innerHeight * 1.9,
            scale: 2.0,
            rotation: f.r * 1.4,
            opacity: 0,
            duration: 0.95,
            ease: 'power3.in',
          },
          start + 1.35,
        );
      });

      /* 3 — 灰色图片由小变大覆盖全屏；白文字变灰直至消失 */
      const coverStart = 1.3 + 10 * 0.38 + 1.0; // ≈ 6.1
      tl.fromTo(
        coverRef.current,
        { xPercent: -50, yPercent: -50, scale: 0.04, opacity: 0, borderRadius: '48px' },
        { scale: 1, opacity: 1, borderRadius: '0px', duration: 1.9, ease: 'power3.inOut' },
        coverStart,
      );
      tl.to(textRef.current, { color: '#7c7c84', duration: 0.7 }, coverStart + 0.3);
      tl.to(textRef.current, { opacity: 0, filter: 'blur(8px)', duration: 0.9 }, coverStart + 1.0);

      /* 4 — PLAY REEL 浮现并停留 */
      tl.fromTo(
        reelRef.current,
        { opacity: 0, scale: 0.86 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
        coverStart + 1.7,
      );
      tl.to({}, { duration: 0.7 });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-[#06091d]">
      {/* 承接 Hero 的蓝紫光团 */}
      <div
        ref={blobRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle at 38% 35%, #2e4bff 0%, #7a2bff 45%, #1a1050 72%, transparent 100%)',
          filter: 'blur(70px)',
        }}
      />

      {/* 中央白色文字 */}
      <div
        ref={textRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center opacity-0"
      >
        <p className="mb-7 font-mono text-[11px] tracking-[0.5em] text-white/50">
          SELECTED ARCHIVE — 2023 / 2026
        </p>
        <img
          ref={scriptImgRef}
          src="./images/archive-script.png"
          alt="每一次创作，都是一次显影。"
          className="h-auto"
          style={{ width: 'clamp(320px, 50vw, 760px)' }}
        />
      </div>

      {/* 11 张飞出图片 */}
      {flyouts.map((f, i) => (
        <div
          key={f.src}
          ref={(el) => {
            imgRefs.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 z-20 overflow-hidden rounded-md opacity-0 shadow-2xl"
          style={{ width: f.w, aspectRatio: f.ar }}
        >
          <img src={f.src} alt="" className="h-full w-full object-cover" />
        </div>
      ))}

      {/* 覆盖全屏的荣誉证书图 */}
      <div
        ref={coverRef}
        className="absolute left-1/2 top-1/2 z-30 h-screen w-screen overflow-hidden opacity-0"
      >
        <img src="./images/honor-cover.jpg" alt="所获荣誉" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* PLAY REEL */}
      <div ref={reelRef} className="absolute inset-0 z-40 flex items-center justify-center opacity-0">
        <button className="group flex flex-col items-center gap-7" aria-label="play reel">
          <span className="flex h-24 w-24 items-center justify-center rounded-full border border-white/70 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10">
            <span
              className="ml-1 inline-block h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-white"
            />
          </span>
          <span className="font-mono text-[13px] tracking-[0.6em] text-white">PLAY&nbsp;REEL</span>
        </button>
      </div>

      {/* 角落标记 */}
      <div className="pointer-events-none absolute left-8 top-24 z-10 hidden font-mono text-[10px] tracking-[0.4em] text-white/35 md:block lg:left-14">
        ( ARCHIVE ) — 11 PIECES
      </div>
    </section>
  );
}
