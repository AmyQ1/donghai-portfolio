import { useReveal } from '@/hooks/useReveal';
import { scrollToTop } from '@/lib/smooth-scroll';
import { profile } from '@/data/portfolio';

/**
 * Contact — 整屏收尾页：巨大标题 + 邮箱/电话 + 底部信息栏
 */
export function Contact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#05081a]"
    >
      {/* 背景光团收尾 */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[110px]"
        style={{
          background: 'radial-gradient(circle at 40% 35%, #2e4bff 0%, #7a2bff 45%, transparent 75%)',
          animation: 'blob-morph 18s ease-in-out infinite',
        }}
      />
      {/* 背景描边大字 */}
      <p
        className="text-stroke pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 select-none whitespace-nowrap font-serif opacity-30"
        style={{ fontSize: 'clamp(6rem, 18vw, 18rem)' }}
        aria-hidden
      >
        DONGHAI
      </p>

      <div ref={ref} className="reveal wrap relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <p className="mb-8 font-mono text-[11px] tracking-[0.5em] text-white/45">
          05 / CONTACT — 保持联系
        </p>
        <h2
          className="font-serif leading-[1.1] text-white"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 5.6rem)' }}
        >
          让下一束光，
          <br />
          为你而亮。
        </h2>

        <a
          href={`mailto:${profile.email}`}
          className="link-underline mt-12 font-serif text-2xl italic text-white/90 transition-colors hover:text-white md:text-4xl"
        >
          {profile.email}
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-mono text-[12px] tracking-[0.3em] text-white/55">
          <span>{profile.phone}</span>
          <span className="hidden h-3 w-px bg-white/30 md:block" />
          <span>{profile.location}</span>
        </div>
      </div>

      {/* 底部信息栏 */}
      <div className="wrap relative z-10 flex flex-col items-center justify-between gap-4 border-t border-white/12 py-8 font-mono text-[10px] tracking-[0.3em] text-white/40 md:flex-row">
        <p>© 2026 DONGHAI — PORTFOLIO</p>
        <p>VISUAL / BRAND / AI</p>
        <button
          onClick={scrollToTop}
          className="link-underline text-white/60 transition-colors hover:text-white"
        >
          回到顶部 ↑
        </button>
      </div>
    </section>
  );
}
