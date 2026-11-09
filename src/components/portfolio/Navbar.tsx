import { scrollToId } from '@/lib/smooth-scroll';

const LINKS = [
  { label: '首页', en: 'HOME', id: 'top' },
  { label: '作品', en: 'WORKS', id: 'works' },
  { label: '关于', en: 'ABOUT', id: 'about' },
  { label: '优势', en: 'STRENGTHS', id: 'advantages' },
];

export function Navbar() {
  const scrollTo = (id: string) => scrollToId(id);

  return (
    <header className="fixed inset-x-0 top-0 z-[80] mix-blend-difference">
      <div className="wrap flex items-center justify-between py-6 text-white">
        <button
          onClick={() => scrollTo('top')}
          className="font-serif text-xl tracking-[0.18em] leading-none"
          aria-label="back to top"
        >
          東海<span className="align-super text-[10px] tracking-normal">®</span>
        </button>

        <nav className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="link-underline font-mono text-[11px] tracking-[0.3em] text-white/80 hover:text-white transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo('contact')}
          className="rounded-full border border-white/60 px-6 py-2 font-mono text-[11px] tracking-[0.3em] transition-all duration-300 hover:bg-white hover:text-black"
        >
          联系我
        </button>
      </div>
    </header>
  );
}
