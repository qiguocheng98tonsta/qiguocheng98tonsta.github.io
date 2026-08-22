import { normalizeHash } from './utils/routeUtils.js';

export function createRouter(routes, render) {
  const routeMap = new Map(routes.map((route) => [route.path, route]));

  if (window.history && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  function resetScrollPosition() {
    if (typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }

  function scheduleScrollReset() {
    resetScrollPosition();

    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(resetScrollPosition);
    }
  }

  function resolve() {
    const path = normalizeHash(window.location.hash);
    const page = routeMap.get(path) || routeMap.get('/');
    render(page, path);
    scheduleScrollReset();
  }

  window.addEventListener('hashchange', resolve);
  resolve();

  return {
    destroy() {
      window.removeEventListener('hashchange', resolve);
    },
  };
}
