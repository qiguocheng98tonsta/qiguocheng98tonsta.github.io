import { escapeHtml } from '../utils/dom.js';

export function AboutPage(content) {
  return `<main id="main" class="page-shell">
    <section class="simple-page">
      <p class="eyebrow">河边上马 / 乐石琪牧场</p>
      <h1>关于我们</h1>
      <p class="chapter-summary">${escapeHtml(content.site.description)}</p>
      <div class="feature-grid">
        <article class="feature-card">
          <h2>真实场地</h2>
          <p>牧场内容围绕真实场地展开，来访者可以看到马匹、草场和现场活动状态。</p>
        </article>
        <article class="feature-card">
          <h2>自然路线</h2>
          <p>河边路线以慢节奏体验为主，让第一次接触马匹的人也能留意风景和身体感受。</p>
        </article>
        <article class="feature-card">
          <h2>教练陪同</h2>
          <p>上马前有基础说明，体验中有教练陪同，根据参与者状态调整节奏。</p>
        </article>
        <article class="feature-card">
          <h2>周末体验</h2>
          <p>更适合周末、亲子和朋友结伴的轻量体验，不做培训机构式包装。</p>
        </article>
      </div>
    </section>
  </main>`;
}
