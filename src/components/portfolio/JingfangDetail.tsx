import { useEffect, type WheelEvent } from 'react';
import { lockScroll, unlockScroll } from '@/lib/smooth-scroll';

const IMG = './images/jingfang';

const MECHANISMS = [
  {
    no: '01',
    title: '呼吸节律模拟',
    en: 'BREATHING RHYTHM',
    desc: '以柔和光线的明暗起伏引导呼吸，让使用者在缓慢的节律中放松身心，逐渐进入睡眠状态。',
  },
  {
    no: '02',
    title: '情绪变色转译',
    en: 'EMOTIONAL LIGHT',
    desc: '将情绪状态转译为不同的色温与色彩，用可被感知的光回应情绪，提供安静的确认与陪伴。',
  },
  {
    no: '03',
    title: '触觉交互反馈',
    en: 'TACTILE FEEDBACK',
    desc: '通过低强度触碰完成互动，减少数字设备带来的干扰，让操作回归自然、直接的身体感受。',
  },
];

export function JingfangDetail({ onClose }: { onClose: () => void }) {
  // 详情打开后全站 Lenis 已停止；明确把滚轮事件交给本层滚动容器，避免被外层平滑滚动拦截。
  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const scroller = event.currentTarget.querySelector<HTMLElement>('.jf-scroll');
    if (!scroller) return;
    const delta = event.deltaMode === 1 ? event.deltaY * 18 : event.deltaY;
    const max = scroller.scrollHeight - scroller.clientHeight;
    scroller.scrollTop = Math.max(0, Math.min(scroller.scrollTop + delta, max));
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    lockScroll();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      unlockScroll();
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="jf-overlay" onClick={onClose} onWheel={handleWheel} role="dialog" aria-modal="true" aria-label="静放作品详情">
      <button className="jf-close" onClick={onClose} aria-label="关闭静放作品详情" autoFocus>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
        </svg>
        <span>关闭</span>
      </button>

      <div className="jf-scroll" data-lenis-prevent onClick={(event) => event.stopPropagation()}>
        <div className="jf-hero">
          <img src={`${IMG}/cover.jpg`} alt="静放睡眠疗愈装置——暖光花树造型灯具" />
        </div>

        <header className="jf-header">
          <p className="jf-kicker">SELECTED WORK — 02 / 2026</p>
          <h2 className="jf-title">《静放》</h2>
          <p className="jf-en">QUIET REST BY NIGHT</p>
          <p className="jf-sub">睡眠疗愈装置设计</p>
          <div className="jf-meta">
            <span>产品设计 / 交互设计</span>
            <span className="jf-dot" />
            <span>2026</span>
            <span className="jf-dot" />
            <span>米兰设计周中国高校设计学科师生优秀作品展 · 全国决赛三等奖</span>
          </div>
        </header>

        <section className="jf-section">
          <h3 className="jf-section-title"><span>01</span>设计说明</h3>
          <div className="jf-description">
            <p>
              「静放」以月光花为造型，是一件兼具睡眠灯功能与沉浸式体验的睡眠疗愈装置。
              它融合情绪变色、低强度交互与呼吸节律，尝试成为卧室中的微型生态载体，
              帮助城市人群对抗光环境与数字设备干扰，缓解情绪紧张与感知迟钝。
            </p>
            <p>
              设计引导使用者放缓节奏、觉察情绪，重建与自然的感性联系。通过呼吸节律模拟、
              情绪变色转译与触觉交互反馈三大机制，实现睡眠引导、情绪调节与陪伴功能，
              同时提供柔和、不打扰休息的照明。
            </p>
          </div>
          <div className="jf-inspiration" aria-label="设计灵感来源">
            <span>灵感来源</span>
            <strong>月光花</strong><i />
            <strong>大树</strong><i />
            <strong>花苞</strong>
          </div>
        </section>

        <section className="jf-section">
          <h3 className="jf-section-title"><span>02</span>核心疗愈机制</h3>
          <div className="jf-mechanisms">
            {MECHANISMS.map((item) => (
              <article className="jf-mechanism" key={item.no}>
                <p className="jf-mechanism-no">{item.no}</p>
                <h4>{item.title}</h4>
                <p className="jf-mechanism-en">{item.en}</p>
                <p className="jf-mechanism-desc">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="jf-section">
          <h3 className="jf-section-title"><span>03</span>概念与造型推演</h3>
          <p className="jf-section-note">灵感来源 · 设计草图 · 设计定位 · 应用场景 · 结构细节</p>
          <div className="jf-board">
            <img src={`${IMG}/board-01.jpg`} alt="静放设计展板一：灵感来源、草图、设计定位、应用场景与细节" loading="lazy" />
          </div>
        </section>

        <section className="jf-section">
          <h3 className="jf-section-title"><span>04</span>交互界面</h3>
          <p className="jf-section-note">灯光调节 · 呼吸引导 · 白噪音选择 · 定时关断</p>
          <div className="jf-ui">
            <img src={`${IMG}/ui-detail.jpg`} alt="静放智能控制界面，包含灯光调节、呼吸引导、白噪音与定时关断" loading="lazy" />
          </div>
        </section>

        <section className="jf-section">
          <h3 className="jf-section-title"><span>05</span>材质与光线效果</h3>
          <p className="jf-section-note">材质预览 · 六组光线效果 · 不同情绪状态下的灯光变化</p>
          <div className="jf-board">
            <img src={`${IMG}/board-02.jpg`} alt="静放设计展板二：UI 界面、材质预览与六组光线效果" loading="lazy" />
          </div>
        </section>

        <footer className="jf-footer">
          <p>《静放》 · 让光慢下来，让情绪被看见</p>
          <span>QUIET REST BY NIGHT</span>
        </footer>
      </div>

      <style>{`
        .jf-overlay {
          position: fixed; inset: 0; z-index: 80;
          display: flex; justify-content: center;
          background: rgba(9, 6, 8, 0.88);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          animation: jfFade 0.4s ease both;
        }
        @keyframes jfFade { from { opacity: 0; } to { opacity: 1; } }
        .jf-scroll {
          width: min(1080px, 92vw); height: 100%; overflow-y: auto;
          overscroll-behavior: contain; padding: 9vh 0 12vh;
          scrollbar-width: thin; scrollbar-color: rgba(236,190,139,.38) transparent;
          animation: jfRise .6s cubic-bezier(.22,.61,.21,1) both;
        }
        .jf-scroll::-webkit-scrollbar { width: 5px; }
        .jf-scroll::-webkit-scrollbar-thumb { background: rgba(236,190,139,.35); border-radius: 3px; }
        @keyframes jfRise { from { opacity: 0; transform: translateY(48px); } to { opacity: 1; transform: none; } }
        .jf-close {
          position: fixed; top: 26px; right: 30px; z-index: 90;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 18px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(255,236,214,.3); background: rgba(41,25,22,.78);
          color: rgba(255,245,233,.92); backdrop-filter: blur(8px);
          font-family: "IBM Plex Mono", monospace; font-size: 11px; letter-spacing: .25em;
          transition: background .3s, color .3s, border-color .3s;
        }
        .jf-close svg { transition: transform .35s; }
        .jf-close:hover { background: #f4e4d0; color: #36231d; border-color: #f4e4d0; }
        .jf-close:hover svg { transform: rotate(90deg); }
        .jf-hero {
          overflow: hidden; border-radius: 14px; border: 1px solid rgba(255,230,204,.16);
          box-shadow: 0 40px 90px rgba(0,0,0,.55); background: #2b1913;
        }
        .jf-hero img { display: block; width: 100%; height: auto; }
        .jf-header { padding: 7vh 5vw 0; text-align: center; }
        .jf-kicker {
          margin-bottom: 22px; color: rgba(244,221,199,.48);
          font-family: "IBM Plex Mono", monospace; font-size: 11px; letter-spacing: .5em;
        }
        .jf-title {
          color: #fff8ee; font-family: "Playfair Display", "Songti SC", serif;
          font-size: clamp(2.5rem,4.5vw,4.1rem); line-height: 1.15; font-weight: 400;
        }
        .jf-en { margin-top: 14px; color: rgba(238,198,157,.72); font-family: "IBM Plex Mono", monospace; font-size: 11px; letter-spacing: .42em; }
        .jf-sub { margin-top: 18px; color: rgba(255,244,232,.74); font-size: 16px; letter-spacing: .2em; }
        .jf-meta {
          margin-top: 28px; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 14px;
          color: rgba(255,240,225,.46); font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: .12em;
        }
        .jf-dot { width: 4px; height: 4px; flex: 0 0 auto; border-radius: 50%; background: rgba(238,198,157,.5); }
        .jf-section { padding-top: 9vh; }
        .jf-section-title {
          display: flex; align-items: baseline; gap: 16px; margin-bottom: 18px; padding-bottom: 18px;
          border-bottom: 1px solid rgba(255,231,207,.14); color: #fff7ed;
          font-family: "Songti SC", "SimSun", serif; font-size: 22px; font-weight: 400; letter-spacing: .16em;
        }
        .jf-section-title > span { color: rgba(236,190,139,.5); font-family: "IBM Plex Mono", monospace; font-size: 11px; letter-spacing: .25em; }
        .jf-section-note { margin: 0 0 28px; color: rgba(255,237,220,.46); font-size: 12px; letter-spacing: .12em; line-height: 1.8; }
        .jf-description { max-width: 47em; margin: 34px auto 0; }
        .jf-description p { margin-bottom: 1.35em; color: rgba(255,244,233,.78); font-size: 15px; line-height: 2.15; letter-spacing: .04em; text-align: justify; }
        .jf-inspiration {
          margin-top: 38px; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 18px;
          color: rgba(255,239,222,.65); font-size: 12px; letter-spacing: .15em;
        }
        .jf-inspiration > span { margin-right: 14px; color: rgba(236,190,139,.5); font-family: "IBM Plex Mono", monospace; font-size: 10px; }
        .jf-inspiration strong { color: #f5dfc7; font-family: "Songti SC", serif; font-size: 16px; font-weight: 400; }
        .jf-inspiration i { width: 34px; height: 1px; background: rgba(236,190,139,.25); }
        .jf-mechanisms { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 34px; }
        .jf-mechanism {
          min-height: 250px; padding: 28px 26px; border: 1px solid rgba(255,229,203,.13); border-radius: 12px;
          background: linear-gradient(145deg,rgba(86,53,38,.28),rgba(24,17,19,.38));
          transition: transform .4s, border-color .4s, background .4s;
        }
        .jf-mechanism:hover { transform: translateY(-6px); border-color: rgba(238,198,157,.35); background: linear-gradient(145deg,rgba(105,65,43,.36),rgba(24,17,19,.45)); }
        .jf-mechanism-no { color: rgba(236,190,139,.46); font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: .3em; }
        .jf-mechanism h4 { margin-top: 34px; color: #fff4e8; font-family: "Songti SC", serif; font-size: 19px; font-weight: 400; letter-spacing: .1em; }
        .jf-mechanism-en { margin-top: 10px; color: rgba(236,190,139,.5); font-family: "IBM Plex Mono", monospace; font-size: 9px; letter-spacing: .16em; }
        .jf-mechanism-desc { margin-top: 22px; color: rgba(255,241,227,.6); font-size: 13px; line-height: 1.9; }
        .jf-board, .jf-ui { overflow: hidden; border-radius: 12px; border: 1px solid rgba(255,231,207,.13); background: #f3e7d7; }
        .jf-board img, .jf-ui img { display: block; width: 100%; height: auto; }
        .jf-ui { background: #2b160e; box-shadow: 0 24px 60px rgba(0,0,0,.24); }
        .jf-footer { margin-top: 11vh; text-align: center; color: rgba(255,239,224,.46); }
        .jf-footer p { font-family: "Songti SC", "SimSun", serif; font-size: 15px; letter-spacing: .22em; }
        .jf-footer span { display: block; margin-top: 16px; color: rgba(236,190,139,.34); font-family: "IBM Plex Mono", monospace; font-size: 9px; letter-spacing: .42em; }
        @media (max-width: 760px) {
          .jf-scroll { padding-top: 10vh; }
          .jf-close { top: 16px; right: 16px; }
          .jf-mechanisms { grid-template-columns: 1fr; }
          .jf-mechanism { min-height: 0; }
          .jf-header { padding-left: 0; padding-right: 0; }
          .jf-sub { font-size: 14px; }
          .jf-meta { line-height: 1.8; }
        }
      `}</style>
    </div>
  );
}
