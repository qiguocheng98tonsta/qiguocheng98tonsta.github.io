import { escapeHtml, list } from '../utils/dom.js';

let activeScrollHandler = null;
let activeToggle = null;
let activeToggleHandler = null;

export function Header({ site, navigation }) {
  return `<header class="site-header" data-header>
    <div class="header-inner">
      <a class="brand-lockup" href="#/" aria-label="${escapeHtml(site.title)}">
        <span class="brand-title">${escapeHtml(site.title)}</span>
        <span class="brand-subtitle">${escapeHtml(site.brandName)}</span>
      </a>
      <button class="nav-toggle" type="button" aria-label="打开导航" aria-expanded="false" aria-controls="primary-navigation" data-nav-toggle>菜单</button>
      <nav class="nav-list" id="primary-navigation" aria-label="主导航">
        ${list(
          navigation,
          (item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`,
        )}
      </nav>
    </div>
  </header>`;
}

export function bindHeaderInteractions() {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-nav-toggle]');

  if (!header) {
    return;
  }

  const hasHero = Boolean(document.querySelector('.hero-section'));

  if (activeScrollHandler && window.removeEventListener) {
    window.removeEventListener('scroll', activeScrollHandler);
  }

  if (activeToggle && activeToggleHandler && activeToggle.removeEventListener) {
    activeToggle.removeEventListener('click', activeToggleHandler);
  }

  const updateSolidState = () => {
    if (!hasHero || window.scrollY > 24) {
      header.classList.add('is-solid');
      return;
    }

    header.classList.remove('is-solid');
  };

  const toggleMenu = () => {
    const isOpen = header.classList.toggle('is-open');
    toggle?.setAttribute('aria-expanded', String(isOpen));
  };

  updateSolidState();

  if (toggle) {
    toggle.addEventListener('click', toggleMenu);
  }

  window.addEventListener('scroll', updateSolidState);
  activeScrollHandler = updateSolidState;
  activeToggle = toggle;
  activeToggleHandler = toggleMenu;
}
