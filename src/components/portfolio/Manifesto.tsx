import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useReveal } from '@/hooks/useReveal';
import { manifestoBlocks } from '@/data/portfolio';
import { onSmoothScroll } from '@/lib/smooth-scroll';

/**
 * Manifesto — 黑色背景区，科技感鼠标特效：
 * 电光蓝准星跟随（带延迟）+ 扩散光环 + 能量粒子 + 柔和辉光
 * 中央一段白色文字，继续下滑右半边依次出现三段文字。
 */
export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowLayerRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const lastRing = useRef(0);
  const lastGlow = useRef(0);
  const quickX = useRef<((v: number) => void) | null>(null);
  const quickY = useRef<((v: number) => void) | null>(null);

  const introRef = useReveal<HTMLDivElement>();

  const spawnGlow = useCallback((e: React.MouseEvent) => {
    const layer = glowLayerRef.current;
    const section = sectionRef.current;
    if (!layer || !section) return;

    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    /* 准星跟随 */
    if (!quickX.current || !quickY.current) {
      quickX.current = gsap.quickTo(followerRef.current, 'x', { duration: 0.32, ease: 'power3.out' });
      quickY.current = gsap.quickTo(followerRef.current, 'y', { duration: 0.32, ease: 'power3.out' });
    }
    quickX.current(x);
    quickY.current(y);
    if (followerRef.current) followerRef.current.style.opacity = '1';

    const now = performance.now();

    /* 扩散光环 + 能量粒子（科技感） */
    if (now - lastRing.current > 110) {
      lastRing.current = now;
      const ring = document.createElement('div');
      ring.className = 'ring-tech';
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      ring.addEventListener('animationend', () => ring.remove());
      layer.appendChild(ring);

      const dot = document.createElement('div');
      dot.className = 'dot-tech';
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.addEventListener('animationend', () => dot.remove());
      layer.appendChild(dot);
    }

    /* 柔和辉光（频率更低） */
    if (now - lastGlow.current > 160) {
      lastGlow.current = now;
      const glow = document.createElement('div');
      glow.className = 'cursor-glow';
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.addEventListener('animationend', () => glow.remove());
      layer.appendChild(glow);
    }

    while (layer.childElementCount > 40) {
      layer.firstElementChild?.remove();
    }
  }, []);

  const hideFollower = useCallback(() => {
    if (followerRef.current) followerRef.current.style.opacity = '0';
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={spawnGlow}
      onMouseLeave={hideFollower}
      className="relative overflow-clip bg-black"
    >
      {/* 特效层 */}
      <div ref={glowLayerRef} className="pointer-events-none absolute inset-0" />

      {/* 电光蓝准星 */}
      <div
        ref={followerRef}
        className="pointer-events-none absolute left-0 top-0 z-20 opacity-0 transition-opacity duration-300"
      >
        <div className="relative -ml-8 -mt-8 h-16 w-16">
          <span className="absolute inset-0 rounded-full border border-[#5a8cff]/70" />
          <span className="absolute inset-[26px] rounded-full bg-[#3fd0ff] shadow-[0_0_14px_#3fd0ff]" />
          <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-[#5a8cff]/80" />
          <span className="absolute left-1/2 bottom-0 h-3 w-px -translate-x-1/2 bg-[#5a8cff]/80" />
          <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-[#5a8cff]/80" />
          <span className="absolute top-1/2 right-0 h-px w-3 -translate-y-1/2 bg-[#5a8cff]/80" />
        </div>
      </div>

      {/* 中央白色文字 */}
      <div
        className="wrap relative z-10 flex min-h-screen flex-col items-center justify-center text-center"
        style={{ paddingTop: '12vh' }}
      >
        <div ref={introRef} className="reveal">
          <p className="mb-10 font-mono text-sm tracking-[0.5em] text-white/50 md:text-base">
            01 / MANIFESTO — 设计宣言
          </p>
          <div className="script-wrap">
            <div className="script-glow" aria-hidden />
            <img
              className="script-img"
              src="./images/manifesto-script.png"
              alt="光落下的地方，万物开始显影。"
            />
            <div className="script-shine" aria-hidden />
          </div>
          <p className="mt-10 font-mono text-base tracking-[0.35em] text-white/45 md:text-lg">
            让光经过，让故事显现。
          </p>
        </div>
      </div>

      {/* 三段文字（kaitonote 式：左侧几何图形 sticky 固定中央随滚动变形，右侧文字滚动） */}
      <div className="wrap relative z-10 pb-[18vh]">
        <div className="geo-edge-glow" aria-hidden />
        <ManifestoBlocks />
      </div>

      <style>{`
        .script-wrap { position: relative; display: inline-block; }
        /* 呼吸辉光：文字背后的蓝青光晕缓慢起伏 */
        .script-glow {
          position: absolute; inset: -22% -14%; pointer-events: none;
          background: radial-gradient(50% 50% at 50% 50%, rgba(90, 140, 255, 0.22), rgba(63, 208, 255, 0.08) 55%, transparent 78%);
          filter: blur(30px);
          animation: scriptGlowBreathe 4.5s ease-in-out infinite;
        }
        .script-img {
          display: block; height: auto; margin: 0 auto;
          width: clamp(520px, 62vw, 1120px);
          clip-path: inset(-10% 102% -10% -2%); opacity: 0;
        }
        /* 进入视口后：手写出现（从左向右扫出） */
        .reveal.is-revealed .script-img {
          animation: scriptWipe 1.9s cubic-bezier(0.55, 0.05, 0.2, 1) 0.25s forwards;
        }
        /* 笔画流光：一道光沿笔画周期扫过（用同一张图做蒙版，只落在笔触上） */
        .script-shine {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.9) 50%, transparent 60%);
          background-size: 260% 100%;
          background-position: 130% 0;
          -webkit-mask-image: url(./images/manifesto-script.png);
          mask-image: url(./images/manifesto-script.png);
          -webkit-mask-size: 100% 100%; mask-size: 100% 100%;
          -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
        }
        .reveal.is-revealed .script-shine {
          animation: scriptShine 5.5s ease-in-out 2.4s infinite;
        }
        @keyframes scriptWipe {
          from { clip-path: inset(-10% 102% -10% -2%); opacity: 0.25; }
          to   { clip-path: inset(-10% -2% -10% -2%); opacity: 1; }
        }
        @keyframes scriptGlowBreathe {
          0%, 100% { opacity: 0.65; transform: scale(0.97); }
          50%      { opacity: 1;    transform: scale(1.04); }
        }
        @keyframes scriptShine {
          0%        { background-position: 130% 0; }
          28%, 100% { background-position: -60% 0; }
        }

        /* ===== kaitonote 式几何图形 ===== */
        .geo-edge-glow {
          position: absolute; top: -6vh; bottom: 0; left: calc(50% - 52vw);
          width: 44vw; pointer-events: none;
          background: radial-gradient(65% 55% at 0% 42%, rgba(66, 96, 246, 0.20), rgba(112, 62, 235, 0.08) 46%, transparent 74%);
          filter: blur(6px);
        }
        .geo-sticky {
          position: sticky; top: 0; height: 100vh;
          display: flex; align-items: center; justify-content: center;
        }
        .geo-figure {
          position: relative; width: min(30vw, 430px); aspect-ratio: 1;
          opacity: 0; transform: scale(0.82);
          transition: opacity 1.1s ease 0.15s, transform 1.1s cubic-bezier(0.22, 0.61, 0.21, 1) 0.15s;
        }
        .reveal.is-revealed .geo-figure,
        .geo-figure.is-revealed { opacity: 1; transform: scale(1); }
        .geo-layer {
          position: absolute; inset: 0;
          opacity: 0; transform: scale(0.88) rotate(-10deg);
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.22, 0.61, 0.21, 1);
        }
        .geo-layer.is-active { opacity: 1; transform: scale(1) rotate(0deg); }
        .geo-figure svg { width: 100%; height: 100%; display: block; animation: geoFloat 9s ease-in-out infinite; }
        @keyframes geoFloat {
          0%, 100% { transform: translateY(-8px); }
          50%      { transform: translateY(8px); }
        }
        .geo-dots {
          stroke: rgba(255, 255, 255, 0.32); stroke-width: 1.6;
          stroke-dasharray: 0.1 8; stroke-linecap: round; fill: none;
        }
        .geo-dots-dim { stroke: rgba(255, 255, 255, 0.16); }
        .geo-ring { stroke: rgba(255, 255, 255, 0.5); stroke-width: 1; fill: none; }
        .geo-ring-dim { stroke: rgba(255, 255, 255, 0.24); }
        .geo-core { fill: rgba(255, 255, 255, 0.85); }
        .geo-tick { stroke: rgba(255, 255, 255, 0.45); stroke-width: 1; }
        .geo-spin-a, .geo-spin-b, .geo-spin-c { transform-box: view-box; transform-origin: 200px 200px; }
        .geo-spin-a { animation: geoSpin 46s linear infinite; }
        .geo-spin-b { animation: geoSpin 18s linear infinite; }
        .geo-spin-c { animation: geoSpinRev 60s linear infinite; }
        @keyframes geoSpin    { to { transform: rotate(360deg); } }
        @keyframes geoSpinRev { to { transform: rotate(-360deg); } }

        /* 三段文字块高度（预编译 Tailwind 无 min-h-[82vh]，用自定义类） */
        .m-block { min-height: 82vh; }

        /* ===== 逐字出现的文字动效 ===== */
        .geo-char {
          display: inline-block; opacity: 0;
          transform: translateY(0.55em) rotate(3deg); filter: blur(5px);
          transition: opacity 0.7s cubic-bezier(0.22, 0.61, 0.21, 1),
                      transform 0.7s cubic-bezier(0.22, 0.61, 0.21, 1),
                      filter 0.7s ease;
          will-change: transform, opacity, filter;
        }
        .geo-char-sm { transform: translateY(0.3em); filter: blur(3px); }
        .reveal.is-revealed .geo-char { opacity: 1; transform: none; filter: blur(0); }
      `}</style>
    </section>
  );
}

/** 逐字拆分：kaitonote 式逐字入场 */
function SplitChars({
  text,
  base = 0,
  step = 40,
  small = false,
}: {
  text: string;
  base?: number;
  step?: number;
  small?: boolean;
}) {
  return (
    <span aria-label={text}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className={small ? 'geo-char geo-char-sm' : 'geo-char'}
          style={{ transitionDelay: `${base + i * step}ms` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}

/** 几何图形的单层（三种形态叠放，active 层显示，切换时交叉淡入 + 旋转缩放） */
function GeoFigure({ variant, active }: { variant: number; active: boolean }) {
  return (
    <div className={active ? 'geo-layer is-active' : 'geo-layer'} aria-hidden>
      <svg viewBox="0 0 400 400" fill="none">
        {variant === 0 && (
          <>
            <circle cx="146" cy="148" r="94" className="geo-dots" />
            <circle cx="254" cy="250" r="106" className="geo-dots" />
            <g className="geo-spin-a">
              <ellipse cx="200" cy="200" rx="160" ry="40" className="geo-ring" />
              <ellipse cx="200" cy="200" rx="112" ry="26" className="geo-ring geo-ring-dim" />
            </g>
            <g className="geo-spin-b">
              <circle cx="330" cy="200" r="3" className="geo-core" />
            </g>
            <circle cx="200" cy="200" r="2.5" className="geo-core" />
            <path d="M200 84v14M193 91h14" className="geo-tick" />
          </>
        )}
        {variant === 1 && (
          <>
            <circle cx="200" cy="200" r="64" className="geo-dots" />
            <circle cx="200" cy="200" r="112" className="geo-dots" />
            <circle cx="200" cy="200" r="150" className="geo-dots geo-dots-dim" />
            <g className="geo-spin-a">
              <ellipse cx="200" cy="200" rx="172" ry="46" className="geo-ring" />
            </g>
            <g className="geo-spin-c">
              <ellipse cx="200" cy="200" rx="172" ry="46" className="geo-ring geo-ring-dim" transform="rotate(62 200 200)" />
            </g>
            <g className="geo-spin-b">
              <circle cx="350" cy="200" r="3" className="geo-core" />
            </g>
            <path d="M200 192v16M192 200h16" className="geo-tick" />
          </>
        )}
        {variant === 2 && (
          <>
            <circle cx="200" cy="200" r="132" className="geo-dots" />
            <circle cx="274" cy="130" r="56" className="geo-dots geo-dots-dim" />
            <g className="geo-spin-c">
              <ellipse cx="200" cy="200" rx="172" ry="42" className="geo-ring" />
            </g>
            <g className="geo-spin-a">
              <ellipse cx="200" cy="200" rx="118" ry="30" className="geo-ring geo-ring-dim" transform="rotate(-38 200 200)" />
            </g>
            <g className="geo-spin-b">
              <circle cx="332" cy="200" r="3" className="geo-core" />
            </g>
            <circle cx="200" cy="200" r="2.5" className="geo-core" />
            <path d="M200 58v14M193 65h14" className="geo-tick" />
          </>
        )}
      </svg>
    </div>
  );
}

/**
 * ManifestoBlocks — kaitonote 式布局：
 * 左侧几何图形 sticky 固定在视口中央，随滚动进度整体旋转变形、切换形态；
 * 右侧三段文字正常滚动，逐字入场。
 */
function ManifestoBlocks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotatorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      // 整体随滚动缓慢旋转
      if (rotatorRef.current) {
        rotatorRef.current.style.transform = `rotate(${(p - 0.5) * 140}deg)`;
      }
      // 形态切换：滚动到哪个文字块，几何就变成对应的形态
      const idx = Math.min(manifestoBlocks.length - 1, Math.floor(p * manifestoBlocks.length + 0.0001));
      setActive((prev) => (prev === idx ? prev : idx));
    };
    update();
    const off = onSmoothScroll(update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const poll = window.setInterval(update, 200);
    return () => {
      off();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.clearInterval(poll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative grid grid-cols-1 md:grid-cols-2">
      {/* 左侧：sticky 固定中央的几何图形（桌面端） */}
      <div className="relative hidden md:block">
        <div className="geo-sticky">
          <div ref={rotatorRef} style={{ willChange: 'transform' }}>
            <div className="geo-figure is-revealed">
              {[0, 1, 2].map((v) => (
                <GeoFigure key={v} variant={v} active={active === v} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 右侧：三段文字依次滚动经过 */}
      <div>
        {manifestoBlocks.map((b) => (
          <ManifestoBlock key={b.index} {...b} />
        ))}
      </div>
    </div>
  );
}

function ManifestoBlock({
  index,
  title,
  en,
  desc,
}: {
  index: string;
  title: string;
  en: string;
  desc: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal m-block flex items-center">
      <div className="w-full max-w-2xl border-l border-white/15 pl-12">
        <p className="mb-6 font-mono text-sm tracking-[0.45em] text-white/45">
          <SplitChars text={`${index} — ${en}`} step={26} />
        </p>
        <h3 className="font-serif text-5xl text-white md:text-6xl" style={{ marginBottom: '2.5rem' }}>
          <SplitChars text={title} base={280} step={110} />
        </h3>
        <p className="text-lg leading-loose text-white/65" style={{ lineHeight: 2.1 }}>
          <SplitChars text={desc} base={520} step={14} small />
        </p>
      </div>
    </div>
  );
}
