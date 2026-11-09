import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '@/data/portfolio';
import { ParticleText } from './ParticleText.tsx';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* ?v=old → 上一版：原背景（含烘焙文字）、无光团、无粒子文字，用于对比 */
  const isOld =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('v') === 'old';

  useGSAP(
    () => {
      gsap.set(bgRef.current, { scale: 1.06, y: 24 });

      gsap.fromTo(
        bgRef.current,
        { scale: 1.16, y: 24, opacity: 0.4 },
        { scale: 1.06, y: 24, opacity: 1, duration: 2, ease: 'power3.out' },
      );
      gsap.fromTo(
        '.hero-fade',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.8 },
      );

      gsap.to(bgRef.current, {
        scale: 1.4,
        y: 24,
        filter: 'blur(46px) brightness(0.42)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom 30%',
          scrub: 0.6,
        },
      });
      gsap.to(contentRef.current, {
        y: -120,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="top" ref={sectionRef} className="relative h-screen overflow-hidden bg-[#060919]">
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: isOld ? 'url(./images/hero-bg.png)' : 'url(./images/hero-bg-clean.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 52%',
          transform: 'translateY(24px) scale(1.06)',
        }}
      />

      {/* 三个不断流动变换的光团 */}
      {!isOld && (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="orb absolute left-[8%] top-[16%] h-[46vmax] w-[46vmax] rounded-full will-change-transform"
          style={{
            background:
              'radial-gradient(circle at 42% 40%, rgba(96, 140, 255, 0.2), rgba(96, 140, 255, 0.05) 46%, transparent 68%)',
            filter: 'blur(60px)',
            animation: 'orbDrift1 26s ease-in-out infinite alternate',
          }}
        />
        <div
          className="orb absolute right-[4%] top-[38%] h-[40vmax] w-[40vmax] rounded-full will-change-transform"
          style={{
            background:
              'radial-gradient(circle at 55% 45%, rgba(64, 224, 208, 0.18), rgba(64, 224, 208, 0.05) 48%, transparent 70%)',
            filter: 'blur(58px)',
            animation: 'orbDrift2 32s ease-in-out infinite alternate',
          }}
        />
        <div
          className="orb absolute left-[30%] bottom-[-12%] h-[52vmax] w-[52vmax] rounded-full will-change-transform"
          style={{
            background:
              'radial-gradient(circle at 48% 50%, rgba(146, 96, 255, 0.2), rgba(146, 96, 255, 0.06) 50%, transparent 72%)',
            filter: 'blur(64px)',
            animation: 'orbDrift3 38s ease-in-out infinite alternate',
          }}
        />
      </div>
      )}

      {/* 文字背后的深色柔光罩：压住光团，让 DONG HAI 浮出来 */}
      {!isOld && (
      <div
        className="pointer-events-none absolute inset-0 z-[4]"
        style={{
          background:
            'radial-gradient(66% 34% at 50% 47%, rgba(4, 6, 18, 0.62) 0%, rgba(4, 6, 18, 0.3) 55%, transparent 80%)',
        }}
      />
      )}

      {/* DONG HAI 粒子文字：页面正中央，触碰消散，移开聚合 */}
      {!isOld && (
      <ParticleText
        text="DONG HAI"
        className="absolute z-[5]"
        style={{ left: '50%', top: '47%', width: '80vw', height: '36vh', transform: 'translate(-50%, -50%)' }}
      />
      )}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(125% 100% at 50% 42%, transparent 52%, rgba(4, 6, 18, 0.6) 100%)',
        }}
      />

      <h1 className="sr-only">DONGHAI 東海 — 视觉设计作品集</h1>

      <div ref={contentRef} className="relative z-10 flex h-full flex-col">
        <p className="hero-fade mt-[13vh] text-center font-mono text-[11px] tracking-[0.55em] text-white/65">
          PORTFOLIO — 2025 / 2026
        </p>

        <div className="mt-auto pb-[13vh] text-center">
          <div className="hero-fade flex items-center justify-center gap-5 font-mono text-[12px] tracking-[0.4em] text-white/85">
            {profile.roles.map((role, index) => (
              <span key={role} className="flex items-center gap-5">
                {index > 0 && <span className="h-3 w-px bg-white/50" />}
                {role}
              </span>
            ))}
          </div>
          <p className="hero-fade mx-auto mt-6 max-w-xl font-serif text-lg italic leading-relaxed text-white/75 md:text-xl">
            以光为笔，以影为墨 —— 在深蓝的秩序里，寻找设计的呼吸。
          </p>
        </div>
      </div>

      <div className="hero-fade pointer-events-none absolute bottom-[9%] right-[4%] z-10 hidden text-right font-mono text-[10px] leading-relaxed tracking-[0.3em] text-white/60 md:block">
        HUZHOU, CN
        <br />
        30.86°N — 120.09°E
      </div>

      <div className="hero-fade absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.45em] text-white/60">向下滚动</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/30">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrolldrip_1.8s_ease-in-out_infinite] bg-white" />
        </span>
      </div>

      <style>{`
        @keyframes scrolldrip { 0% { transform: translateY(-100%); } 100% { transform: translateY(220%); } }
        @keyframes orbDrift1 {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(9vw, 6vh) scale(1.14); }
          66%  { transform: translate(-5vw, 12vh) scale(0.92); }
          100% { transform: translate(4vw, -4vh) scale(1.08); }
        }
        @keyframes orbDrift2 {
          0%   { transform: translate(0, 0) scale(1); }
          40%  { transform: translate(-10vw, -7vh) scale(1.18); }
          75%  { transform: translate(6vw, 5vh) scale(0.9); }
          100% { transform: translate(-3vw, 10vh) scale(1.06); }
        }
        @keyframes orbDrift3 {
          0%   { transform: translate(0, 0) scale(1); }
          30%  { transform: translate(7vw, -9vh) scale(1.1); }
          65%  { transform: translate(-8vw, -4vh) scale(0.94); }
          100% { transform: translate(5vw, 6vh) scale(1.12); }
        }
      `}</style>
    </section>
  );
}
