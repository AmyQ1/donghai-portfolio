import { useReveal } from '@/hooks/useReveal';
import { profile, stats } from '@/data/portfolio';

/**
 * About — 个人经历：人物图 + 个人介绍 + 联系方式 + 项目数据
 */
export function About() {
  const headRef = useReveal<HTMLDivElement>();
  const imgRef = useReveal<HTMLDivElement>();
  const bodyRef = useReveal<HTMLDivElement>();
  const statsRef = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative bg-[#070b21]" style={{ paddingTop: '16vh', paddingBottom: '16vh' }}>
      {/* 背景细线 */}
      <div className="pointer-events-none absolute inset-y-0 left-[8%] w-px bg-white/6" />
      <div className="pointer-events-none absolute inset-y-0 right-[8%] w-px bg-white/6" />

      <div className="wrap relative">
        <div ref={headRef} className="reveal border-b border-white/12 pb-8" style={{ marginBottom: '9vh' }}>
          <p className="mb-5 font-mono text-[11px] tracking-[0.5em] text-white/45">03 / ABOUT</p>
          <h2 className="font-serif text-5xl text-white md:text-7xl">个人经历</h2>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* 人物图 */}
          <div ref={imgRef} className="reveal lg:col-span-5">
            <div className="relative overflow-hidden rounded-lg border border-white/10">
              <div className="aspect-[3/4]">
                <img
                  src="./images/about-portrait.jpg"
                  alt={profile.cnName}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06091d]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="font-serif text-3xl text-white">{profile.cnName}</p>
                  <p className="mt-1 font-mono text-[11px] tracking-[0.3em] text-white/60">
                    {profile.name} — VISUAL DESIGNER
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 介绍与联系 */}
          <div ref={bodyRef} className="reveal lg:col-span-7 lg:pl-8">
            <p className="font-mono text-[11px] tracking-[0.4em] text-white/45">
              {profile.education}
            </p>
            {profile.intro.map((t) => (
              <p key={t.slice(0, 8)} className="mt-7 max-w-2xl text-lg leading-loose text-white/75">
                {t}
              </p>
            ))}

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3">
              {[
                { k: '电话', v: profile.phone },
                { k: '邮箱', v: profile.email },
                { k: '现居', v: profile.location },
              ].map((c) => (
                <div key={c.k} className="bg-[#0a0f2c] px-6 py-5">
                  <p className="font-mono text-[10px] tracking-[0.35em] text-white/40">{c.k}</p>
                  <p className="mt-2 break-all text-sm text-white/85">{c.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 项目数据 */}
        <div ref={statsRef} className="reveal grid grid-cols-2 border-t border-white/12 lg:grid-cols-4" style={{ marginTop: '12vh' }}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-10 pr-6 ${i > 0 ? 'border-l border-white/12 pl-8' : ''}`}
            >
              <p className="font-serif text-5xl text-white md:text-6xl">{s.value}</p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.3em] text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
