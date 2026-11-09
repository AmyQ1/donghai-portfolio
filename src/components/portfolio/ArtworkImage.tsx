import { useId, useMemo } from 'react';

/* 确定性伪随机数生成器 — 同一 seed 永远生成同一张“作品图” */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* 朦胧彩铅色板：深沉柔和的深蓝主调 + 灰调雾彩色粉 */
const PASTELS = ['#6f7fb8', '#4a5a9e', '#7a6ba8', '#4e7d8c', '#9a6b8a', '#5a6fb0', '#8a7ab8'];
const GRAY_PASTELS = ['#3f4a6b', '#59617c', '#4a4360'];
const BASES = ['#101a3c', '#0e1734', '#121c40', '#0c142e'];

interface ArtworkImageProps {
  seed: number;
  className?: string;
  gray?: boolean;
}

/**
 * ArtworkImage — 朦胧彩铅风格的生成式作品图
 * 深沉深蓝底 + 细腻晕染的色粉笔触（重度柔雾、无硬线条）+ 铅笔颗粒肌理，
 * 构图简洁空灵，重色彩层次。后续可整体替换为真实作品图片。
 */
export function ArtworkImage({ seed, className, gray = false }: ArtworkImageProps) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '');

  const art = useMemo(() => {
    const rnd = mulberry32(seed * 997 + 13);
    const pick = <T,>(arr: T[]) => arr[Math.floor(rnd() * arr.length)];

    const base = gray ? '#232a3f' : pick(BASES);
    const palette = gray ? GRAY_PASTELS : PASTELS;

    /* 2~3 片大面积柔雾色块（椭圆、可出画、带角度） */
    const count = 2 + Math.floor(rnd() * 2);
    const smudges = Array.from({ length: count }, () => ({
      cx: -10 + rnd() * 120,
      cy: -10 + rnd() * 120,
      rx: 30 + rnd() * 34,
      ry: 22 + rnd() * 26,
      rot: rnd() * 180,
      color: pick(palette),
      o: 0.45 + rnd() * 0.3,
    }));

    /* 一处朦胧月光似的亮斑 */
    const light = {
      cx: 20 + rnd() * 60,
      cy: 15 + rnd() * 50,
      r: 14 + rnd() * 14,
      color: gray ? '#aab4d0' : '#c8d2ee',
      o: 0.4 + rnd() * 0.25,
    };

    /* 一缕极淡的晕染雾带（替代硬线条） */
    const mist = {
      x: -10 + rnd() * 40,
      y: 30 + rnd() * 50,
      w: 90 + rnd() * 60,
      h: 8 + rnd() * 10,
      rot: -20 + rnd() * 40,
    };

    return { base, smudges, light, mist };
  }, [seed, gray]);

  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="pastel artwork"
    >
      <defs>
        <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={art.base} />
          <stop offset="100%" stopColor={gray ? '#1a2032' : '#070d22'} />
        </linearGradient>
        <filter id={`soft${uid}`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="38" />
        </filter>
        <filter id={`softM${uid}`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        {/* 彩铅颗粒肌理 */}
        <filter id={`pencil${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        {/* 斜向铅笔排线（细腻手绘感） */}
        <filter id={`hatch${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.16" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        {art.smudges.map((s, i) => (
          <radialGradient key={i} id={`s${uid}${i}`}>
            <stop offset="0%" stopColor={s.color} stopOpacity={s.o} />
            <stop offset="70%" stopColor={s.color} stopOpacity={s.o * 0.4} />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </radialGradient>
        ))}
        <radialGradient id={`l${uid}`}>
          <stop offset="0%" stopColor={art.light.color} stopOpacity={art.light.o} />
          <stop offset="100%" stopColor={art.light.color} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#bg${uid})`} />

      {/* 柔雾色块层次 */}
      <g filter={`url(#soft${uid})`}>
        {art.smudges.map((s, i) => (
          <ellipse
            key={i}
            cx={(s.cx / 100) * 400}
            cy={(s.cy / 100) * 300}
            rx={(s.rx / 100) * 400}
            ry={(s.ry / 100) * 300}
            fill={`url(#s${uid}${i})`}
            transform={`rotate(${s.rot} ${(s.cx / 100) * 400} ${(s.cy / 100) * 300})`}
          />
        ))}
      </g>

      {/* 朦胧亮斑 */}
      <circle
        cx={(art.light.cx / 100) * 400}
        cy={(art.light.cy / 100) * 300}
        r={(art.light.r / 100) * 400}
        fill={`url(#l${uid})`}
        filter={`url(#softM${uid})`}
      />

      {/* 晕染雾带（弱化线条，只剩一抹颜色） */}
      <rect
        x={(art.mist.x / 100) * 400}
        y={(art.mist.y / 100) * 300}
        width={(art.mist.w / 100) * 400}
        height={(art.mist.h / 100) * 300}
        rx={(art.mist.h / 200) * 300}
        fill="#ffffff"
        opacity="0.05"
        filter={`url(#softM${uid})`}
        transform={`rotate(${art.mist.rot} 200 150)`}
      />

      {/* 铅笔肌理：排线 + 颗粒 */}
      <rect width="400" height="300" filter={`url(#hatch${uid})`} opacity="0.06" />
      <rect width="400" height="300" filter={`url(#pencil${uid})`} opacity="0.13" />
    </svg>
  );
}
