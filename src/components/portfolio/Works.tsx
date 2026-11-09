import { useState, type CSSProperties } from 'react';
import { GuxianDetail } from './GuxianDetail';
import { FangyanDetail } from './FangyanDetail';
import { JingfangDetail } from './JingfangDetail';
import { useReveal } from '@/hooks/useReveal';
import { projects } from '@/data/portfolio';

/* 俄罗斯方块式错落排布（最多 3 张大图）。
   预编译 Tailwind CSS 不含新的任意值类，这里用内联样式，避免类名缺失导致宽度失效。 */
const LAYOUTS: CSSProperties[] = [
  { marginLeft: '3%', width: '46%' },
  { marginLeft: '56%', marginTop: '-2%', width: '26%' },
  { marginLeft: '16%', marginTop: '7%', width: '52%' },
];

const PROJECT_COVERS = [
  './images/guxian/cover.jpg',
  './images/fangyan/cover.jpg?v=2',
  './images/jingfang/cover.jpg',
];

/* 方言星球使用竖版展板比例，其余作品保持横版。 */
const PROJECT_ASPECTS = ['16 / 10', '3 / 4.2', '16 / 10'];

/**
 * Works — 精选项目：
 * 大小不一的图片错落分散排布；鼠标碰到图片时，
 * 整个背景变成这张图的模糊版本，移开则恢复深色。
 */
export function Works() {
  const [active, setActive] = useState<number | null>(null);
  const [openProject, setOpenProject] = useState<number | null>(null);
  const headRef = useReveal<HTMLDivElement>();

  return (
    <section id="works" className="relative overflow-hidden bg-[#06091d] py-[16vh]">
      {/* 悬停背景只渲染当前项目，避免同时维护 3 个全屏 SVG 导致卡顿。 */}
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-700">
        {active !== null && (
          <div className="absolute inset-0 opacity-100">
            <div className="absolute inset-0 scale-110 blur-2xl">
              {active < PROJECT_COVERS.length ? (
                <img src={PROJECT_COVERS[active]} alt="" className="h-full w-full object-cover" />
              ) : (
                <ArtworkImage seed={projects[active].seed} className="h-full w-full" />
              )}
            </div>
            <div className="absolute inset-0 bg-[#06091d]/55" />
          </div>
        )}
      </div>

      <div className="wrap relative z-10">
        <div ref={headRef} className="reveal mb-[10vh] flex items-end justify-between border-b border-white/12 pb-8">
          <div>
            <p className="mb-5 font-mono text-[11px] tracking-[0.5em] text-white/45">
              02 / SELECTED WORKS
            </p>
            <h2 className="font-serif text-5xl text-white md:text-7xl">精选项目</h2>
          </div>
          <p className="hidden pb-2 font-mono text-[11px] tracking-[0.35em] text-white/40 md:block">
            HOVER TO PREVIEW — 03
          </p>
        </div>

        {projects.map((p, i) => (
          <WorkCard
            key={p.title}
            index={i}
            layout={LAYOUTS[i % LAYOUTS.length]}
            onEnter={() => setActive(i)}
            onLeave={() => setActive(null)}
            onClick={() => setOpenProject(i)}
            dimmed={active !== null && active !== i}
          />
        ))}
      </div>

      {/* 作品详情弹层 */}
      {openProject === 0 && <GuxianDetail onClose={() => setOpenProject(null)} />}
      {openProject === 1 && <FangyanDetail onClose={() => setOpenProject(null)} />}
      {openProject === 2 && <JingfangDetail onClose={() => setOpenProject(null)} />}
    </section>
  );
}

function WorkCard({
  index,
  layout,
  onEnter,
  onLeave,
  onClick,
  dimmed,
}: {
  index: number;
  layout: CSSProperties;
  onEnter: () => void;
  onLeave: () => void;
  onClick?: () => void;
  dimmed: boolean;
}) {
  const p = projects[index];

  return (
    <div
      style={layout}
      className={`works-card mb-[8vh] cursor-pointer transition-[opacity,transform] duration-500 will-change-transform ${
        dimmed ? 'opacity-75' : 'opacity-100'
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className="works-card-inner group relative overflow-hidden rounded-lg border border-white/10 shadow-2xl">
        <div
          className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          style={{ aspectRatio: PROJECT_ASPECTS[index] }}
        >
          <img
            src={PROJECT_COVERS[index]}
            alt={p.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {onClick && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="rounded-full border border-white/40 bg-black/45 px-5 py-2 font-mono text-[10px] tracking-[0.35em] text-white/90 backdrop-blur-sm">
              点击查看作品详情 +
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-serif text-2xl text-white md:text-3xl">《{p.title}》</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">{p.award}</p>
        </div>
        <div className="shrink-0 text-right font-mono text-[11px] leading-relaxed tracking-[0.25em] text-white/50">
          <p>{p.category}</p>
          <p className="mt-1">{p.year}</p>
        </div>
      </div>
    </div>
  );
}
