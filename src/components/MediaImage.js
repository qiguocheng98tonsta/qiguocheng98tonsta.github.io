import { escapeHtml } from '../utils/dom.js';

export function MediaImage({ src, alt, className = '' }) {
  const classAttribute = className ? ` class="${escapeHtml(className)}"` : '';

  return `<img${classAttribute} src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">`;
}
