import { MediaImage } from '../components/MediaImage.js';
import { escapeHtml, list } from '../utils/dom.js';

export function ProjectsPage(content) {
  return `<main id="main" class="page-shell">
    <section class="simple-page">
      <p class="eyebrow">乐石琪牧场</p>
      <h1>项目介绍</h1>
      <p class="chapter-summary">首页只做入口，详情在这里展开。每个项目都会根据天气、参与者状态和现场节奏安排，页面只保留项目说明和咨询入口。</p>
      <div class="feature-grid">
        ${list(content.projects ?? [], (project) => `<article class="feature-card">
          ${MediaImage({
            src: project.cover,
            alt: project.title,
            className: 'feature-cover',
          })}
          <h2>${escapeHtml(project.title)}</h2>
          <p>${escapeHtml(project.summary)}</p>
          <p class="feature-audience">适合：${escapeHtml(project.audience)}</p>
        </article>`)}
      </div>
    </section>
  </main>`;
}
