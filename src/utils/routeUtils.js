export const ROUTES = [
  { path: '/', label: '首页' },
  { path: '/projects', label: '项目介绍' },
  { path: '/media', label: '图片视频' },
  { path: '/team', label: '师资团队' },
  { path: '/about', label: '关于我们' },
  { path: '/contact', label: '联系我们' },
];

const routePaths = new Set(ROUTES.map((route) => route.path));

export function normalizeHash(hash) {
  if (!hash || hash === '#') {
    return '/';
  }

  const rawPath = String(hash).replace(/^#/, '');
  const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;

  return routePaths.has(path) ? path : '/';
}

export function routeHref(path) {
  return `#${path}`;
}
