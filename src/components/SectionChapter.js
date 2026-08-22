import { ButtonLink } from './ButtonLink.js';
import { MediaImage } from './MediaImage.js';
import { escapeHtml } from '../utils/dom.js';

export function SectionChapter({ chapter }) {
  return `<section class="chapter-section chapter-section--editorial">
    <div class="chapter-inner">
      <div class="chapter-copy">
        <p class="eyebrow">${escapeHtml(chapter.eyebrow)}</p>
        <h2 class="chapter-title">${escapeHtml(chapter.title)}</h2>
        <p class="chapter-summary">${escapeHtml(chapter.summary)}</p>
        <div class="action-row">
          ${ButtonLink({ href: chapter.href, label: chapter.actionLabel })}
        </div>
      </div>
      <figure class="chapter-visual">
        ${MediaImage({
          src: chapter.mediaSrc,
          alt: chapter.mediaAlt ?? chapter.title,
          className: 'chapter-media',
        })}
      </figure>
    </div>
  </section>`;
}
