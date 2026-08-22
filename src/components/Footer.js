import { escapeHtml } from '../utils/dom.js';

export function Footer({ site }) {
  return `<footer class="site-footer">
    <div class="site-footer-inner">
      <div class="footer-brand">
        <p class="brand-subtitle">${escapeHtml(site.brandName)}</p>
        <p class="brand-title">${escapeHtml(site.title)}</p>
      </div>
      <div class="footer-meta">
        <p>${escapeHtml(site.address)}</p>
        <p>${escapeHtml(site.businessHours)}</p>
      </div>
      <p class="footer-copyright">${escapeHtml(site.copyright)}</p>
    </div>
  </footer>`;
}
