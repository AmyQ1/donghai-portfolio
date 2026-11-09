import { useEffect, type WheelEvent } from 'react';
import { lockScroll, unlockScroll } from '@/lib/smooth-scroll';

/**
 * 古贤智韵 — 作品详情弹层：
 * 点击精选项目卡片后全屏浮现，鼠标可滚动浏览全部细节与设计说明；
 * 右上角 X、ESC、点击背景均可退出。
 */

const IMG = './images/guxian';

const SECTIONS = [
  { src: 'board-01.jpg', label: '插画展示 · 画面元素 · 衍生效果' },
  { src: 'board-process.jpg', label: '过程展示 — 从线稿到成稿' },
  { src: 'board-poster.jpg', label: '海报展示与应用' },
  { src: 'board-merch.jpg', label: '周边延展设计' },
];

const WORKS = [
  { src: 'work-1-mozi.jpg', name: '墨子', en: 'MOZI' },
  { src: 'work-2-zhangheng.jpg', name: '张衡', en: 'ZHANG HENG' },
  { src: 'work-3-song.jpg', name: '宋应星', en: 'SONG YINGXING' },
];

const PALETTE = ['#446C47', '#1D5B8B', '#5B457F', '#E6B12D', '#D0E1A3', '#9AB6CB'];

export function GuxianDetail({ onClose }: { onClose: () => void }) {
  // 详情打开后全站 Lenis 已停止；明确把滚轮事件交给本层滚动容器，避免被外层平滑滚动拦截。
  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const scroller = event.currentTarget.querySelector<HTMLElement>('.pd-scroll');
    if (!scroller) return;
    const delta = event.deltaMode === 1 ? event.deltaY * 18 : event.deltaY;
    const max = scroller.scrollHeight - scroller.clientHeight;
    scroller.scrollTop = Math.max(0, Math.min(scroller.scrollTop + delta, max));
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      unlockScroll();
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="pd-overlay" onClick={onClose} onWheel={handleWheel}>
      {/* 右上角退出按钮 */}
      <button
        className="pd-close"
        onClick={onClose}
        aria-label="关闭详情"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
        </svg>
        <span>关闭</span>
      </button>

      {/* 可滚动内容（data-lenis-prevent：让滚轮在本层内原生滚动，不被全站平滑滚动拦截） */}
      <div className="pd-scroll" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
        {/* 头图 */}
        <div className="pd-hero">
          <img src={`${IMG}/cover.jpg`} alt="古贤智韵 三联插画" />
        </div>

        {/* 标题区 */}
        <header className="pd-header">
          <p className="pd-kicker">SELECTED WORK — 01 / 2025</p>
          <h2 className="pd-title">《古贤智韵》</h2>
          <p className="pd-sub">中国古代物理科学家与成就插画与视觉延展设计</p>
          <div className="pd-meta">
            <span>品牌视觉设计</span>
            <span className="pd-dot" />
            <span>2025</span>
            <span className="pd-dot" />
            <span>中国大学生计算机设计大赛 · 国家三等奖</span>
          </div>
        </header>

        {/* 设计说明 */}
        <section className="pd-section">
          <h3 className="pd-section-title">设计说明</h3>
          <div className="pd-desc">
            <p>
              本系列作品聚焦墨子、张衡、宋应星等古代物理领域杰出科学家及其成就。
              构图上，以中心构图凸显人物；技法采用板绘搭配肌理异色渐变，赋予画面质感。
            </p>
            <p>
              设计融合古今元素与图形创意，呈现传统科技智慧与现代理念交织、古代科学多元创造
              及工艺科技融合之貌。旨在致敬古代科技先驱，弘扬科学家精神，唤起大众对古代科技
              成就的关注，传承创新精神。
            </p>
            <p>
              以独特视觉语言，兼具文化与艺术魅力，讲述科技故事，展望科技未来。
            </p>
          </div>
          <div className="pd-palette">
            {PALETTE.map((c) => (
              <span key={c} className="pd-swatch" style={{ backgroundColor: c }} title={c} />
            ))}
          </div>
        </section>

        {/* 三张插画 */}
        <section className="pd-section">
          <h3 className="pd-section-title">系列插画</h3>
          <div className="pd-works">
            {WORKS.map((w) => (
              <figure key={w.src} className="pd-work">
                <img src={`${IMG}/${w.src}`} alt={w.name} loading="lazy" />
                <figcaption>
                  <span className="pd-work-name">{w.name}</span>
                  <span className="pd-work-en">{w.en}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 展板细节 */}
        {SECTIONS.map((s, i) => (
          <section key={s.src} className="pd-section">
            <h3 className="pd-section-title">
              <span className="pd-section-no">{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </h3>
            <div className="pd-board">
              <img src={`${IMG}/${s.src}`} alt={s.label} loading="lazy" />
            </div>
          </section>
        ))}

        <div className="pd-footer">
          <p>《古贤智韵》 · 古圣先贤，智韵流长</p>
        </div>
      </div>

      <style>{`
        .pd-overlay {
          position: fixed; inset: 0; z-index: 80;
          background: rgba(4, 6, 16, 0.82);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          animation: pdFade 0.45s ease both;
          display: flex; justify-content: center;
        }
        @keyframes pdFade { from { opacity: 0; } to { opacity: 1; } }

        .pd-scroll {
          width: min(1080px, 92vw);
          height: 100%;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 9vh 0 12vh;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.25) transparent;
          animation: pdRise 0.6s cubic-bezier(0.22, 0.61, 0.21, 1) both;
        }
        .pd-scroll::-webkit-scrollbar { width: 5px; }
        .pd-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.22); border-radius: 3px; }
        @keyframes pdRise { from { opacity: 0; transform: translateY(48px); } to { opacity: 1; transform: none; } }

        .pd-close {
          position: fixed; top: 26px; right: 30px; z-index: 90;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 18px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(10, 15, 44, 0.72);
          color: rgba(255,255,255,0.9);
          font-family: "IBM Plex Mono", monospace; font-size: 11px; letter-spacing: 0.3em;
          cursor: pointer; transition: background 0.3s, border-color 0.3s, transform 0.3s;
          backdrop-filter: blur(8px);
        }
        .pd-close:hover {
          background: rgba(255,255,255,0.92); color: #0a0f2c;
          border-color: rgba(255,255,255,0.9);
          transform: rotate(90deg);
        }
        .pd-close span { letter-spacing: 0.25em; }

        .pd-hero {
          border-radius: 14px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 40px 90px rgba(0,0,0,0.55);
        }
        .pd-hero img { display: block; width: 100%; height: auto; }

        .pd-header { text-align: center; padding: 7vh 6vw 0; }
        .pd-kicker {
          font-family: "IBM Plex Mono", monospace; font-size: 11px;
          letter-spacing: 0.5em; color: rgba(255,255,255,0.45); margin-bottom: 22px;
        }
        .pd-title {
          font-family: "Playfair Display", "Songti SC", serif;
          font-size: clamp(2.4rem, 4.5vw, 4rem); color: #fff; line-height: 1.15;
        }
        .pd-sub { margin-top: 16px; font-size: 15px; letter-spacing: 0.12em; color: rgba(255,255,255,0.62); }
        .pd-meta {
          margin-top: 26px; display: flex; align-items: center; justify-content: center; gap: 16px;
          font-family: "IBM Plex Mono", monospace; font-size: 11px;
          letter-spacing: 0.22em; color: rgba(255,255,255,0.5); flex-wrap: wrap;
        }
        .pd-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.35); }

        .pd-section { padding: 8vh 0 0; }
        .pd-section-title {
          font-family: "Songti SC", "SimSun", serif; font-size: 22px; color: #fff;
          letter-spacing: 0.18em; margin-bottom: 30px;
          display: flex; align-items: baseline; gap: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 18px;
        }
        .pd-section-no {
          font-family: "IBM Plex Mono", monospace; font-size: 11px;
          letter-spacing: 0.3em; color: rgba(255,255,255,0.4);
        }

        .pd-desc { max-width: 46em; margin: 0 auto; }
        .pd-desc p {
          font-size: 15px; line-height: 2.15; color: rgba(255,255,255,0.78);
          letter-spacing: 0.04em; margin-bottom: 1.4em; text-align: justify;
        }
        .pd-palette {
          margin-top: 34px; display: flex; justify-content: center; gap: 14px;
        }
        .pd-swatch {
          width: 26px; height: 26px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.25);
          transition: transform 0.35s cubic-bezier(0.22, 0.61, 0.21, 1);
        }
        .pd-swatch:hover { transform: translateY(-6px) scale(1.15); }

        .pd-works {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px;
        }
        .pd-work {
          border-radius: 12px; overflow: hidden; position: relative;
          border: 1px solid rgba(255,255,255,0.1);
          transition: transform 0.5s cubic-bezier(0.22, 0.61, 0.21, 1), box-shadow 0.5s;
        }
        .pd-work:hover { transform: translateY(-8px); box-shadow: 0 26px 60px rgba(0,0,0,0.5); }
        .pd-work img { display: block; width: 100%; height: auto; }
        .pd-work figcaption {
          display: flex; align-items: baseline; justify-content: space-between;
          padding: 14px 16px; background: rgba(10, 15, 44, 0.9);
        }
        .pd-work-name { font-family: "Songti SC", serif; font-size: 17px; color: #fff; letter-spacing: 0.2em; }
        .pd-work-en {
          font-family: "IBM Plex Mono", monospace; font-size: 10px;
          letter-spacing: 0.25em; color: rgba(255,255,255,0.45);
        }

        .pd-board {
          border-radius: 12px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          background: #fff;
        }
        .pd-board img { display: block; width: 100%; height: auto; }

        .pd-footer {
          margin-top: 10vh; text-align: center;
          font-family: "Songti SC", "SimSun", serif; font-size: 15px;
          letter-spacing: 0.25em; color: rgba(255,255,255,0.4);
        }

        @media (max-width: 760px) {
          .pd-works { grid-template-columns: 1fr; }
          .pd-scroll { padding: 8vh 0 10vh; }
        }
      `}</style>
    </div>
  );
}
