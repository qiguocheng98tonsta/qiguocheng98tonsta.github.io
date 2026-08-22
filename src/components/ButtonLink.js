import { escapeHtml } from '../utils/dom.js';

export function ButtonLink({ href, label, variant = 'ghost' }) {
  return `<a class="button-link ${escapeHtml(variant)}" href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
}
