import { MediaImage } from '../components/MediaImage.js';
import { escapeHtml, list } from '../utils/dom.js';

export function ProjectsPage(content) {
  const projects = content.projects ?? [];
  const riversideProject = projects.find((project) => project.id === 'riverside-ride');
  const supportingProjects = projects.filter((project) => project.id !== 'riverside-ride');

  return `<main id="main" class="page-shell">
    <section class="simple-page">
      <p class="eyebrow">乐石琪牧场</p>
      <h1>项目介绍</h1>
      <p class="chapter-summary">首页只做入口，详情在这里展开。每个项目都会根据天气、参与者状态和现场节奏安排，页面只保留项目说明和咨询入口。</p>
      ${riversideProject ? `<article class="feature-card riverside-project">
        ${MediaImage({
          src: riversideProject.cover,
          alt: riversideProject.title,
          className: 'feature-cover riverside-project-cover',
        })}
        <div class="riverside-project-copy">
          <h2>${escapeHtml(riversideProject.title)}</h2>
          <p>${escapeHtml(riversideProject.summary)}</p>
          <p class="feature-audience">适合：${escapeHtml(riversideProject.audience)}</p>
        </div>
      </article>
      <section class="package-section" aria-labelledby="riding-packages-title">
        <div class="package-heading">
          <p class="eyebrow">河边野骑</p>
          <h2 id="riding-packages-title">骑行套餐</h2>
        </div>
        <div class="package-grid">
          ${list(riversideProject.packages ?? [], (item) => `<article class="package-card">
            <div class="package-card-header">
              <h3>${escapeHtml(item.title)}</h3>
              <p class="package-price">${escapeHtml(item.price)}</p>
            </div>
            <p class="package-duration">${escapeHtml(item.duration)}</p>
            <p>${escapeHtml(item.summary)}</p>
            <p class="package-audience">${escapeHtml(item.audience)}</p>
          </article>`)}
        </div>
        <p class="package-note">${escapeHtml(riversideProject.packagesNote)}</p>
      </section>` : ''}
      <div class="feature-grid supporting-projects">
        ${list(supportingProjects, (project) => `<article class="feature-card">
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
