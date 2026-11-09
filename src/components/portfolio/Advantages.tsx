import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  PenTool, Fingerprint, Sparkles, Clapperboard, LayoutGrid, Users,
  LayoutTemplate, Type, Layers, BadgeCheck, Package, Wand2, Cpu,
  Film, Camera, MousePointerClick, CircleCheck, Presentation, MessageSquare,
  Award, RotateCcw,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { lockScroll, unlockScroll } from '@/lib/smooth-scroll';
import { advantages, type Advantage } from '@/data/portfolio';

const ICONS: Record<Advantage['icon'], ReactNode> = {
  pen: <PenTool size={20} strokeWidth={1.5} />,
  brand: <Fingerprint size={20} strokeWidth={1.5} />,
  ai: <Sparkles size={20} strokeWidth={1.5} />,
  motion: <Clapperboard size={20} strokeWidth={1.5} />,
  ui: <LayoutGrid size={20} strokeWidth={1.5} />,
  team: <Users size={20} strokeWidth={1.5} />,
};

/* 每个优势背面的三个小图标（对应 backItems 顺序） */
const BACK_ICONS: Record<Advantage['icon'], ReactNode[]> = {
  pen: [<LayoutTemplate size={16} strokeWidth={1.6} />, <Type size={16} strokeWidth={1.6} />, <Layers size={16} strokeWidth={1.6} />],
  brand: [<BadgeCheck size={16} strokeWidth={1.6} />, <Package size={16} strokeWidth={1.6} />, <Award size={16} strokeWidth={1.6} />],
  ai: [<Wand2 size={16} strokeWidth={1.6} />, <Cpu size={16} strokeWidth={1.6} />, <Sparkles size={16} strokeWidth={1.6} />],
  motion: [<Film size={16} strokeWidth={1.6} />, <Camera size={16} strokeWidth={1.6} />, <Clapperboard size={16} strokeWidth={1.6} />],
  ui: [<LayoutGrid size={16} strokeWidth={1.6} />, <MousePointerClick size={16} strokeWidth={1.6} />, <CircleCheck size={16} strokeWidth={1.6} />],
  team: [<Presentation size={16} strokeWidth={1.6} />, <MessageSquare size={16} strokeWidth={1.6} />, <Users size={16} strokeWidth={1.6} />],
};

/* 背面点缀色 — 低饱和微光，保持整体克制 */
const ACCENTS: Record<Advantage['icon'], string> = {
  pen: '#4c63ff',
  brand: '#8b5cf6',
  ai: '#38bdf8',
  motion: '#f472b6',
  ui: '#34d399',
  team: '#fbbf24',
};

/* 错落偏移 — 营造文件夹式的不规则排布 */
const OFFSETS = ['lg:translate-y-0', 'lg:translate-y-16', 'lg:translate-y-32'];

type FlipState = {
  adv: Advantage;
  rect: { left: number; top: number; width: number; height: number };
};

/**
 * Advantages — 6 个透明毛玻璃卡片，错落排布。
 * 点击任意卡片：卡片飞到视口中央并 3D 翻转，展示背面介绍。
 */
export function Advantages() {
  const headRef = useReveal<HTMLDivElement>();
  const [flip, setFlip] = useState<FlipState | null>(null);

  return (
    <section id="advantages" className="relative overflow-hidden bg-[#06091d] py-[16vh]">
      {/* 背景氛围光 */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full opacity-25 blur-[130px]"
        style={{ background: 'radial-gradient(ellipse, #2e4bff 0%, transparent 65%)' }}
      />

      <div className="wrap relative">
        <div ref={headRef} className="reveal mb-[12vh] flex items-end justify-between border-b border-white/12 pb-8">
          <div>
            <p className="mb-5 font-mono text-[11px] tracking-[0.5em] text-white/45">
              04 / STRENGTHS
            </p>
            <h2 className="font-serif text-5xl text-white md:text-7xl">个人优势</h2>
          </div>
          <p className="hidden pb-2 font-mono text-[11px] tracking-[0.35em] text-white/40 md:block">
            06 FILES — GLASS EDITION
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 pb-32 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {advantages.map((a, i) => (
            <AdvantageCard
              key={a.index}
              data={a}
              offset={OFFSETS[i % 3]}
              ghost={flip !== null}
              onFlip={(rect) => setFlip({ adv: a, rect })}
            />
          ))}
        </div>
      </div>

      {flip && <FlipOverlay state={flip} onClose={() => setFlip(null)} />}
    </section>
  );
}

function AdvantageCard({
  data,
  offset,
  ghost,
  onFlip,
}: {
  data: Advantage;
  offset: string;
  ghost: boolean;
  onFlip: (rect: { left: number; top: number; width: number; height: number }) => void;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        onFlip({ left: r.left, top: r.top, width: r.width, height: r.height });
      }}
      style={ghost ? { visibility: 'hidden' } : undefined}
      className={`reveal glass group relative cursor-pointer overflow-hidden rounded-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/25 ${offset}`}
    >
      <CardFront data={data} />

      {/* 悬停提示 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="rounded-full border border-white/30 bg-black/40 px-4 py-1.5 font-mono text-[10px] tracking-[0.3em] text-white/85 backdrop-blur-sm">
          点击翻转
        </span>
      </div>
    </div>
  );
}

/* 卡片正面内容 — 翻转弹层的前面板复用同一结构，保证无缝衔接 */
function CardFront({ data }: { data: Advantage }) {
  return (
    <>
      {/* 悬停时的内部辉光 */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
        style={{ background: 'radial-gradient(circle, #4c63ff 0%, transparent 70%)' }}
      />

      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors duration-500 group-hover:border-white/50 group-hover:text-white">
          {ICONS[data.icon]}
        </span>
        <span className="font-mono text-[11px] tracking-[0.35em] text-white/35">{data.index}</span>
      </div>

      <h3 className="mt-8 font-serif text-3xl text-white">{data.title}</h3>
      <p className="mt-1 font-mono text-[10px] tracking-[0.35em] text-white/40">{data.en}</p>
      <p className="mt-5 text-sm leading-relaxed text-white/65">{data.desc}</p>

      <div className="mt-7 flex flex-wrap gap-2">
        {data.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-white/60"
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );
}

/**
 * FlipOverlay — 点击后卡片飞到屏幕中央并沿 Y 轴 3D 翻转：
 * 前段位移（rect → 居中），后段翻面（rotateY 0 → 180°），展示背面介绍。
 * 关闭时逆向回放。
 */
function FlipOverlay({ state, onClose }: { state: FlipState; onClose: () => void }) {
  const { adv, rect } = state;
  const [placed, setPlaced] = useState(false);   // 是否已过渡到中央
  const [flipped, setFlipped] = useState(false); // 是否已翻面
  const [settled, setSettled] = useState(false); // 翻面动画是否结束（结束后隐藏另一面，防止 bleed）
  const [leaving, setLeaving] = useState(false); // 关闭回放中
  const timers = useRef<number[]>([]);

  const target = (() => {
    const w = Math.min(620, window.innerWidth * 0.9);
    const h = Math.min(470, window.innerHeight * 0.84);
    return { left: (window.innerWidth - w) / 2, top: (window.innerHeight - h) / 2, width: w, height: h };
  })();

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => {
    lockScroll();
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setPlaced(true)));
    later(() => setFlipped(true), 560);
    later(() => setSettled(true), 1250);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      timers.current.forEach(clearTimeout);
      window.removeEventListener('keydown', onKey);
      unlockScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    if (leaving) return;
    setLeaving(true);
    setSettled(false);
    setFlipped(false);
    later(() => setPlaced(false), 580);
    later(onClose, 1180);
  };

  const box = placed ? target : rect;
  const accent = ACCENTS[adv.icon];

  return (
    <div className="adv-flip-root" role="dialog" aria-modal="true" aria-label={`${adv.title}详情`}>
      {/* 背景压暗 */}
      <div
        className="adv-flip-backdrop"
        onClick={close}
        style={{ opacity: placed ? 1 : 0 }}
      />

      {/* 飞行 + 翻转的卡片 */}
      <div
        className="adv-flip-box"
        style={{
          left: box.left,
          top: box.top,
          width: box.width,
          height: box.height,
          transitionDuration: leaving ? '560ms' : '560ms',
        }}
      >
        <div
          className="adv-flip-inner"
          style={{
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transitionDuration: '600ms',
          }}
        >
          {/* 正面：与原卡片一致（翻面完成后隐藏，防止部分浏览器 bleed） */}
          <div className="adv-flip-face adv-flip-front glass" style={{ visibility: settled ? 'hidden' : 'visible' }}>
            <CardFront data={adv} />
          </div>

          {/* 背面：文字介绍 + 三个小图标条目 */}
          <div className="adv-flip-face adv-flip-back glass" style={{ borderColor: `${accent}55` }}>
            <div
              className="pointer-events-none absolute -left-14 -top-14 h-44 w-44 rounded-full opacity-25 blur-3xl"
              style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
            />
            <span
              className="pointer-events-none absolute select-none font-serif leading-none opacity-[0.08]"
              style={{ color: accent, fontSize: '7rem', bottom: -26, right: 8 }}
            >
              {adv.index}
            </span>

            <div className="flex items-start justify-between">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full border text-white"
                style={{ borderColor: `${accent}88`, background: `${accent}22` }}
              >
                {ICONS[adv.icon]}
              </span>
              <span className="font-mono text-[11px] tracking-[0.35em]" style={{ color: `${accent}cc` }}>
                {adv.index} / BACK
              </span>
            </div>

            <h3 className="mt-6 font-serif text-3xl text-white">{adv.title}</h3>
            <p className="mt-1 font-mono text-[10px] tracking-[0.35em] text-white/40">{adv.en}</p>
            <p className="mt-5 text-sm leading-relaxed text-white/75">{adv.backText}</p>

            <div className="mt-6 grid gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {adv.backItems.map((item, i) => (
                <div
                  key={item}
                  className="flex flex-col items-center gap-2 rounded-lg border border-white/12 px-2 py-3 text-center"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ color: accent, background: `${accent}1e`, border: `1px solid ${accent}44` }}>
                    {BACK_ICONS[adv.icon][i]}
                  </span>
                  <span className="text-[11px] leading-snug text-white/70">{item}</span>
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.3em] text-white/35">
              <RotateCcw size={11} strokeWidth={1.6} />
              点击任意处返回
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .adv-flip-root { position: fixed; inset: 0; z-index: 80; }
        .adv-flip-backdrop {
          position: absolute; inset: 0;
          background: rgba(3, 5, 13, 0.78);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          transition: opacity 0.5s ease;
        }
        .adv-flip-box {
          position: fixed; z-index: 81;
          transition-property: left, top, width, height;
          transition-timing-function: cubic-bezier(0.22, 0.61, 0.21, 1);
          perspective: 1600px;
        }
        .adv-flip-inner {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d;
          transition-property: transform;
          transition-timing-function: cubic-bezier(0.35, 0.1, 0.25, 1);
        }
        .adv-flip-face {
          position: absolute; inset: 0; overflow: hidden; border-radius: 12px;
          padding: 32px; backface-visibility: hidden; -webkit-backface-visibility: hidden;
        }
        .adv-flip-back { transform: rotateY(180deg); }
        @media (max-width: 640px) {
          .adv-flip-face { padding: 22px; }
        }
      `}</style>
    </div>
  );
}
