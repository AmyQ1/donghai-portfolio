/* ============================================================
   作品集内容数据 — 后续可直接改这里替换真实内容
   ============================================================ */

export const profile = {
  name: 'DONGHAI',
  cnName: '東海',
  roles: ['视觉设计师', 'AI 设计师', '品牌设计师'],
  phone: '19817200159',
  email: 'jia15157996411@qq.com',
  location: '浙江 · 湖州',
  education: '湖州学院 · 视觉传达设计（2023 — 2027）',
  intro: [
    '视觉传达设计专业出身，手绘与摄影功底扎实，熟练使用 PS、AI、Figma、AE 等设计工具。拥有国赛获奖与国家级项目实操经验，设计落地能力突出。',
    '我相信设计不是装饰，而是一种观看世界的方式 —— 在深蓝的秩序里寻找呼吸，在光与影之间安放细节。',
  ],
};

export const stats = [
  { value: '10+', label: '各级设计奖项' },
  { value: '3 项', label: '国家级赛事荣誉' },
  { value: '4.4/5', label: 'GPA · 专业前 10%' },
  { value: '20+', label: '课程与实践项目' },
];

export interface Project {
  title: string;
  category: string;
  year: string;
  award: string;
  seed: number;
}

export const projects: Project[] = [
  {
    title: '古贤智韵',
    category: '品牌视觉设计',
    year: '2025',
    award: '中国大学生计算机设计大赛 · 国家三等奖',
    seed: 11,
  },
  {
    title: '方言星球',
    category: 'UI 设计 / 交互',
    year: '2026',
    award: '中国好创意暨全国数字艺术设计大赛 · 文化遗产类浙江省三等奖',
    seed: 29,
  },
  {
    title: '静放',
    category: '产品设计 / 交互',
    year: '2026',
    award: '米兰设计周中国高校设计学科师生优秀作品展 · 全国决赛三等奖',
    seed: 23,
  },
];

export interface Flyout {
  src: string; // 图片路径（public/images 下）
  x: number; // 相对视口宽度的方向系数
  y: number; // 相对视口高度的方向系数
  w: number; // 宽度 px
  ar: string; // 宽高比
  r: number; // 旋转角度
}

/* 11 张飞出图片：方向四面八方、大小不一、时机错落 */
export const flyouts: Flyout[] = [
  { src: './images/flyout-01.jpg', x: -0.38, y: -0.34, w: 300, ar: '3/4', r: -8 },
  { src: './images/flyout-02.jpg', x: 0.36, y: -0.4, w: 400, ar: '3/2', r: 6 },
  { src: './images/flyout-03.jpg', x: -0.47, y: 0.04, w: 330, ar: '3/2', r: -4 },
  { src: './images/flyout-04.jpg', x: 0.45, y: 0.14, w: 370, ar: '3/2', r: 10 },
  { src: './images/flyout-05.jpg', x: -0.2, y: 0.43, w: 420, ar: '3/2', r: 5 },
  { src: './images/flyout-06.jpg', x: 0.17, y: -0.16, w: 280, ar: '3/2', r: -12 },
  { src: './images/flyout-07.jpg', x: 0.06, y: 0.45, w: 340, ar: '3/2', r: 3 },
  { src: './images/flyout-08.jpg', x: -0.31, y: -0.08, w: 280, ar: '4/3', r: 14 },
  { src: './images/flyout-09.jpg', x: 0.41, y: -0.24, w: 300, ar: '3/2', r: -6 },
  { src: './images/flyout-10.jpg', x: -0.13, y: -0.45, w: 290, ar: '1054/1492', r: 9 },
  { src: './images/flyout-11.jpg', x: 0.29, y: 0.37, w: 380, ar: '4/3', r: -9 },
];

export interface Advantage {
  index: string;
  title: string;
  en: string;
  desc: string;
  tags: string[];
  icon: 'pen' | 'brand' | 'ai' | 'motion' | 'ui' | 'team';
  /* 卡片翻转后的背面内容 */
  backText: string;
  backItems: string[];
}

export const advantages: Advantage[] = [
  {
    index: '01',
    title: '视觉传达',
    en: 'VISUAL COMMUNICATION',
    desc: '版式、字体与招贴的系统训练，让信息以最恰当的秩序被看见。',
    tags: ['Photoshop', 'Illustrator', '版式设计'],
    icon: 'pen',
    backText: '从第一张招贴开始建立秩序感：栅格、留白、字距与层级的反复推敲，让信息在最短路径内被读懂。擅长把复杂的命题收束成一张安静而有力量的版面。',
    backItems: ['栅格与版式系统', '字体排印与层级', '招贴与信息设计'],
  },
  {
    index: '02',
    title: '品牌设计',
    en: 'BRAND IDENTITY',
    desc: '从标志到品牌系统与包装落地，构建一致而有记忆点的视觉语言。',
    tags: ['Logo', 'VI 系统', '包装设计'],
    icon: 'brand',
    backText: '相信品牌是一套可以被复述的记忆：从一枚标志出发，延展到色彩、字体、图形语言与包装落地，保证每一次出现都在为同一个故事投票。',
    backItems: ['标志与延展设计', 'VI 系统规范', '包装与落地物料'],
  },
  {
    index: '03',
    title: 'AI 生成设计',
    en: 'AI-DRIVEN DESIGN',
    desc: '以 AIGC 工作流扩展想象边界，让工具成为创作的共谋而非替代。',
    tags: ['Midjourney', 'Stable Diffusion', '提示词工程'],
    icon: 'ai',
    backText: '把 AIGC 当作一位不知疲倦的助手：用提示词工程锁定风格，用工作流串联生成、修图与排版，让效率翻倍的同时守住审美决策权。',
    backItems: ['Midjourney 场景生成', 'Stable Diffusion 工作流', '提示词工程与迭代'],
  },
  {
    index: '04',
    title: '动态与影像',
    en: 'MOTION & FILM',
    desc: 'AE 动效与摄影摄像双修，用时间轴讲述静态之外的故事。',
    tags: ['After Effects', '摄影', '摄像'],
    icon: 'motion',
    backText: '静态之外，用时间轴继续讲故事：从分镜、拍摄到 AE 合成与剪辑，关注节奏、转场与音效细节，让画面在动起来的瞬间被记住。',
    backItems: ['After Effects 动效', '分镜与剪辑节奏', '摄影与布光实践'],
  },
  {
    index: '05',
    title: 'UI 与交互',
    en: 'UI & INTERACTION',
    desc: '界面、流程与交互原型设计，让美感与可用性同时成立。',
    tags: ['Figma', '交互设计', '原型'],
    icon: 'ui',
    backText: '界面是看得见的流程：以用户路径为起点，用组件化思维搭建 Figma 设计系统，配合可点击原型反复验证，让美感与可用性同时成立。',
    backItems: ['Figma 组件化设计', '交互原型与走查', '设计规范沉淀'],
  },
  {
    index: '06',
    title: '协作与教学',
    en: 'COLLABORATION',
    desc: '设计助教与学生会宣传经历，擅长沟通表达与团队协作推进。',
    tags: ['课程助教', '团队管理', '表达'],
    icon: 'team',
    backText: '设计不只发生在屏幕里：课程助教与学生工作经历，训练了把想法讲清楚、把分歧摆平、把进度推进的能力，让协作本身成为生产力。',
    backItems: ['课程助教与评图', '跨角色沟通协作', '设计表达与汇报'],
  },
];

export const manifestoBlocks = [
  {
    index: '01',
    title: '观看',
    en: 'SEEING',
    desc: '以摄影与手绘训练眼睛 —— 先学会看，再动手做。每一次按下快门，都是一次构图的练习；每一笔落纸，都是对光影的推敲。街角的一束光、水面的倒影、陌生人的背影，都是被忽略的答案。看得足够久，世界自己会开口。',
  },
  {
    index: '02',
    title: '生成',
    en: 'GENERATING',
    desc: '用 AI 扩展想象的边界。提示词不是咒语，而是与机器共谋的一门新语言。我学习如何描述一束光的温度、一种材质的呼吸，让模糊的直觉变成清晰的画面。工具负责速度，我负责方向；生成的终点，始终是人的判断。',
  },
  {
    index: '03',
    title: '落地',
    en: 'DELIVERING',
    desc: '从品牌到界面，让每一处细节经得起印刷的审视，也经得起像素的检验。字距的一毫米、留白的呼吸感、交付前的最后一次校对，都是设计的一部分。美不是停在提案里的效果图，而是真正被人拿在手里、看在眼里、留在心里的东西。',
  },
];
