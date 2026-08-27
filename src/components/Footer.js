import { escapeHtml } from '../utils/dom.js';

function safeExternalUrl(value) {
  try {
    const url = new URL(String(value ?? ''));
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

export function Footer({ site }) {
  const emailMarkup = site.email
    ? `<p>邮箱：<a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a></p>`
    : '';
  const navigationUrl = safeExternalUrl(site.navigationUrl);
  const navigationMarkup = navigationUrl
    ? ` <a href="${escapeHtml(navigationUrl)}" target="_blank" rel="noreferrer">打开导航</a>`
    : '';
  const phoneMarkup = site.phone ? `<p>电话：${escapeHtml(site.phone)}</p>` : '';
  const wechatMarkup = site.wechatLabel
    ? `<p>微信：${escapeHtml(site.wechatLabel)}</p>`
    : '';

  return `<footer class="site-footer">
    <div class="site-footer-inner">
      <div class="footer-brand">
        <p class="brand-subtitle">${escapeHtml(site.brandName)}</p>
        <p class="brand-title">${escapeHtml(site.title)}</p>
      </div>
      <div class="footer-meta">
        <p>地址：${escapeHtml(site.address)}${navigationMarkup}</p>
        <p>营业时间：${escapeHtml(site.businessHours)}</p>
        ${phoneMarkup}
        ${wechatMarkup}
        ${emailMarkup}
      </div>
      <p class="footer-copyright">${escapeHtml(site.copyright)}</p>
    </div>
  </footer>`;
}

