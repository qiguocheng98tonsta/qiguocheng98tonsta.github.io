import { MediaImage } from '../components/MediaImage.js';
import { escapeHtml, list } from '../utils/dom.js';

function CoachTags(tags) {
  if (!tags || tags.length === 0) {
    return '';
  }

  return `<div class="tag-list">
    ${list(tags, (tag) => `<span>${escapeHtml(tag)}</span>`)}
  </div>`;
}

export function TeamPage(content) {
  return `<main id="main" class="page-shell">
    <section class="simple-page">
      <p class="eyebrow">安心上马</p>
      <h1>师资团队</h1>
      <p class="chapter-summary">教练会根据年龄、经验、天气和马匹状态安排节奏，帮助新手在真实场地里安心体验。</p>
      <div class="feature-grid">
        ${list(content.coaches ?? [], (coach) => `<article class="feature-card">
          ${MediaImage({
            src: coach.avatar,
            alt: coach.name,
            className: 'coach-avatar',
          })}
          <h2>${escapeHtml(coach.name)}</h2>
          <p class="coach-role">${escapeHtml(coach.role)}</p>
          <p>${escapeHtml(coach.bio)}</p>
          ${CoachTags(coach.tags)}
        </article>`)}
      </div>
    </section>
  </main>`;
}
