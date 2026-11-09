import { useEffect, type WheelEvent } from 'react';
import { lockScroll, unlockScroll } from '@/lib/smooth-scroll';

const IMG = './images/fangyan';

const PALETTE = ['#162148', '#CBBBAF', '#D04A3A', '#E8C04B', '#3E9D8B'];

const PERSONS = [
  { no: '01', title: '年轻体验型用户', age: '18 — 25 岁', desc: '乐于尝试新鲜事物，习惯使用手机 APP 获取信息，对数字化生活接受度高。' },
  { no: '02', title: '文化认同型用户', age: '30 — 50 岁', desc: '认同家乡文化的独特价值，希望以轻松有趣的方式延续乡音与地域记忆。' },
  { no: '03', title: '文化记录型用户', age: '40 — 65 岁', desc: '关注地方语言的传承与记录，愿意参与方言采集、学习和分享。' },
];

const FEATURES = [
  { title: '方言翻译', en: 'DIALECT TRANSLATION', desc: '支持文字、语音与对话三种翻译方式，让不同场景下的交流更自然。' },
  { title: '方言地图', en: 'DIALECT MAP', desc: '以地域为线索组织方言内容，在探索空间的过程中理解声音背后的文化。' },
  { title: '趣味体验', en: 'INTERACTIVE PRACTICE', desc: '通过情境对话、跟读练习与趣味游戏，降低学习门槛并增强参与感。' },
];

export function FangyanDetail({ onClose }: { onClose: () => void }) {
  // 详情打开后全站 Lenis 已停止；明确把滚轮事件交给本层滚动容器，避免被外层平滑滚动拦截。
  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const scroller = event.currentTarget.querySelector<HTMLElement>('.fy-scroll');
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
    <div className="fy-overlay" onClick={onClose} onWheel={handleWheel} role="dialog" aria-modal="true" aria-label="方言星球作品详情">
      <button className="fy-close" onClick={onClose} aria-label="关闭方言星球作品详情" autoFocus>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
        </svg>
        <span>关闭</span>
      </button>

      <div className="fy-scroll" data-lenis-prevent onClick={(event) => event.stopPropagation()}>
        <div className="fy-hero">
          <img src={`${IMG}/hero.jpg?v=2`} alt="方言星球——构建方言文化数字宇宙的 APP" />
        </div>

        <header className="fy-header">
          <p className="fy-kicker">SELECTED WORK — 02 / 2026</p>
          <h2 className="fy-title">《方言星球》</h2>
          <p className="fy-en">FANG YAN XING QIU</p>
          <p className="fy-sub">一款构建方言文化数字宇宙的 APP</p>
          <div className="fy-meta">
            <span>UI 设计 / 交互设计</span>
            <span className="fy-dot" />
            <span>2026</span>
            <span className="fy-dot" />
            <span>中国好创意暨全国数字艺术设计大赛 · 文化遗产类浙江省三等奖</span>
          </div>
        </header>

        <section className="fy-section">
          <h3 className="fy-section-title"><span>01</span>设计说明</h3>
          <div className="fy-description">
            <p>
              「方言星球」以数字宇宙为概念，将各地方言转化为可探索的数字空间，构建一场
              关于乡音与文化的漫游体验。通过声音可视化、场景化表达与地域符号融合，
              让方言由听觉感知转化为多维感知的视觉语言。
            </p>
            <p>
              产品以轻量化、互动化的方式降低使用门槛，增强趣味性与参与感，
              引导用户在探索、翻译、学习和分享中，感知方言所承载的文化记忆与情感联系。
            </p>
          </div>
          <div className="fy-palette" aria-label="方言星球品牌色板">
            {PALETTE.map((color) => (
              <span key={color} className="fy-swatch" style={{ backgroundColor: color }} title={color} />
            ))}
          </div>
        </section>

        <section className="fy-section">
          <h3 className="fy-section-title"><span>02</span>目标用户</h3>
          <div className="fy-persons">
            {PERSONS.map((person) => (
              <article className="fy-person" key={person.no}>
                <p className="fy-person-no">{person.no}</p>
                <h4>{person.title}</h4>
                <p className="fy-person-age">{person.age}</p>
                <p className="fy-person-desc">{person.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="fy-section">
          <h3 className="fy-section-title"><span>03</span>核心功能</h3>
          <div className="fy-features">
            {FEATURES.map((feature) => (
              <article className="fy-feature" key={feature.title}>
                <h4>{feature.title}</h4>
                <p className="fy-feature-en">{feature.en}</p>
                <p className="fy-feature-desc">{feature.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="fy-section">
          <h3 className="fy-section-title"><span>04</span>设计规范与体验地图</h3>
          <p className="fy-section-note">色彩与字体规范 · 底部导航 · 图标系统 · 用户画像 · APP 界面展示 · 用户体验地图</p>
          <div className="fy-board">
            <img src={`${IMG}/board-01.jpg?v=2`} alt="方言星球展板一：设计规范、用户画像、图标系统、界面展示与体验地图" loading="lazy" />
          </div>
        </section>

        <section className="fy-section">
          <h3 className="fy-section-title"><span>05</span>产品结构与主要界面</h3>
          <p className="fy-section-note">产品结构 · 翻译界面 · 体验与我的 · 多场景应用展示</p>
          <div className="fy-board">
            <img src={`${IMG}/board-02.jpg?v=2`} alt="方言星球展板二：产品结构、主要界面介绍与应用展示" loading="lazy" />
          </div>
        </section>

        <section className="fy-section">
          <h3 className="fy-section-title"><span>06</span>高保真页面与应用延展</h3>
          <p className="fy-section-note">全部页面高保真设计图 · 多设备应用延展</p>
          <div className="fy-board">
            <img src={`${IMG}/board-03.jpg?v=2`} alt="方言星球展板三：全部页面高保真设计图与应用延展" loading="lazy" />
          </div>
        </section>

        <footer className="fy-footer">
          <p>《方言星球》 · 让每个声音，都有自己的星球</p>
          <span>FANG YAN XING QIU</span>
        </footer>
      </div>

      <style>{`
        .fy-overlay {
          position: fixed; inset: 0; z-index: 80;
          display: flex; justify-content: center;
          background: rgba(4, 6, 14, 0.88);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          animation: fyFade 0.4s ease both;
        }
        @keyframes fyFade { from { opacity: 0; } to { opacity: 1; } }
        .fy-scroll {
          width: min(1080px, 92vw); height: 100%; overflow-y: auto;
          overscroll-behavior: contain; padding: 9vh 0 12vh;
          scrollbar-width: thin; scrollbar-color: rgba(151,164,255,.38) transparent;
          animation: fyRise .6s cubic-bezier(.22,.61,.21,1) both;
        }
        .fy-scroll::-webkit-scrollbar { width: 5px; }
        .fy-scroll::-webkit-scrollbar-thumb { background: rgba(151,164,255,.35); border-radius: 3px; }
        @keyframes fyRise { from { opacity: 0; transform: translateY(48px); } to { opacity: 1; transform: none; } }
        .fy-close {
          position: fixed; top: 26px; right: 30px; z-index: 90;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 18px; border-radius: 999px; cursor: pointer;
          border: 1px solid rgba(202,210,255,.3); background: rgba(17,24,57,.78);
          color: rgba(240,244,255,.94); backdrop-filter: blur(8px);
          font-family: "IBM Plex Mono", monospace; font-size: 11px; letter-spacing: .25em;
          transition: background .3s, color .3s, border-color .3s;
        }
        .fy-close svg { transition: transform .35s; }
        .fy-close:hover { background: #eef2ff; color: #111832; border-color: #eef2ff; }
        .fy-close:hover svg { transform: rotate(90deg); }
        .fy-hero {
          overflow: hidden; border-radius: 14px; border: 1px solid rgba(183,194,255,.18);
          box-shadow: 0 40px 90px rgba(0,0,0,.58); background: #10172f;
        }
        .fy-hero img { display: block; width: 100%; height: auto; }
        .fy-header { padding: 7vh 5vw 0; text-align: center; }
        .fy-kicker {
          margin-bottom: 22px; color: rgba(190,200,255,.5);
          font-family: "IBM Plex Mono", monospace; font-size: 11px; letter-spacing: .5em;
        }
        .fy-title {
          color: #f7f9ff; font-family: "Playfair Display", "Songti SC", serif;
          font-size: clamp(2.5rem,4.5vw,4.1rem); line-height: 1.15; font-weight: 400;
        }
        .fy-en { margin-top: 14px; color: rgba(151,164,255,.72); font-family: "IBM Plex Mono", monospace; font-size: 11px; letter-spacing: .42em; }
        .fy-sub { margin-top: 18px; color: rgba(235,240,255,.76); font-size: 16px; letter-spacing: .16em; }
        .fy-meta {
          margin-top: 28px; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 14px;
          color: rgba(228,234,255,.5); font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: .1em;
        }
        .fy-dot { width: 4px; height: 4px; flex: 0 0 auto; border-radius: 50%; background: rgba(151,164,255,.55); }
        .fy-section { padding-top: 9vh; }
        .fy-section-title {
          display: flex; align-items: baseline; gap: 16px; margin-bottom: 18px; padding-bottom: 18px;
          border-bottom: 1px solid rgba(183,194,255,.15); color: #f4f7ff;
          font-family: "Songti SC", "SimSun", serif; font-size: 22px; font-weight: 400; letter-spacing: .16em;
        }
        .fy-section-title > span { color: rgba(151,164,255,.55); font-family: "IBM Plex Mono", monospace; font-size: 11px; letter-spacing: .25em; }
        .fy-section-note { margin: 0 0 28px; color: rgba(226,232,255,.48); font-size: 12px; letter-spacing: .12em; line-height: 1.8; }
        .fy-description { max-width: 47em; margin: 34px auto 0; }
        .fy-description p { margin-bottom: 1.35em; color: rgba(236,241,255,.8); font-size: 15px; line-height: 2.15; letter-spacing: .04em; text-align: justify; }
        .fy-palette { margin-top: 36px; display: flex; justify-content: center; gap: 14px; }
        .fy-swatch {
          width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,.28);
          transition: transform .35s cubic-bezier(.22,.61,.21,1);
        }
        .fy-swatch:hover { transform: translateY(-6px) scale(1.15); }
        .fy-persons, .fy-features { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 34px; }
        .fy-person, .fy-feature {
          min-height: 245px; padding: 28px 26px; border: 1px solid rgba(183,194,255,.14); border-radius: 12px;
          background: linear-gradient(145deg,rgba(37,49,101,.34),rgba(8,13,31,.52));
          transition: transform .4s, border-color .4s, background .4s;
        }
        .fy-person:hover, .fy-feature:hover {
          transform: translateY(-6px); border-color: rgba(151,164,255,.4);
          background: linear-gradient(145deg,rgba(47,62,125,.42),rgba(8,13,31,.58));
        }
        .fy-person-no { color: rgba(151,164,255,.48); font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: .3em; }
        .fy-person h4, .fy-feature h4 { margin-top: 32px; color: #f6f8ff; font-family: "Songti SC", serif; font-size: 19px; font-weight: 400; letter-spacing: .08em; }
        .fy-person-age { margin-top: 12px; color: rgba(151,164,255,.66); font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: .16em; }
        .fy-person-desc, .fy-feature-desc { margin-top: 20px; color: rgba(229,235,255,.62); font-size: 13px; line-height: 1.9; }
        .fy-feature-en { margin-top: 12px; color: rgba(151,164,255,.5); font-family: "IBM Plex Mono", monospace; font-size: 9px; letter-spacing: .18em; }
        .fy-board { overflow: hidden; border-radius: 12px; border: 1px solid rgba(183,194,255,.14); background: #10172f; }
        .fy-board img { display: block; width: 100%; height: auto; }
        .fy-footer { margin-top: 11vh; text-align: center; color: rgba(230,236,255,.48); }
        .fy-footer p { font-family: "Songti SC", "SimSun", serif; font-size: 15px; letter-spacing: .22em; }
        .fy-footer span { display: block; margin-top: 16px; color: rgba(151,164,255,.38); font-family: "IBM Plex Mono", monospace; font-size: 9px; letter-spacing: .42em; }
        @media (max-width: 760px) {
          .fy-scroll { padding-top: 10vh; }
          .fy-close { top: 16px; right: 16px; }
          .fy-persons, .fy-features { grid-template-columns: 1fr; }
          .fy-person, .fy-feature { min-height: 0; }
          .fy-header { padding-left: 0; padding-right: 0; }
          .fy-sub { font-size: 14px; }
          .fy-meta { line-height: 1.8; }
        }
      `}</style>
    </div>
  );
}
