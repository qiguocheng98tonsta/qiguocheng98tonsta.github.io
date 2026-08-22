import { ButtonLink } from '../components/ButtonLink.js';
import { SectionChapter } from '../components/SectionChapter.js';
import { escapeHtml, list } from '../utils/dom.js';

function HeroMedia(hero) {
  if (hero.mediaType === 'video') {
    return `<video class="hero-media" src="${escapeHtml(hero.mediaSrc)}" autoplay muted loop playsinline></video>`;
  }

  return `<img class="hero-media" src="${escapeHtml(hero.mediaSrc)}" alt="${escapeHtml(hero.title)}" decoding="async">`;
}

function HeroSection({ hero }) {
  return `<section class="hero-section">
    ${HeroMedia(hero)}
    <div class="hero-overlay" aria-hidden="true"></div>
    <div class="hero-content">
      <p class="eyebrow">${escapeHtml(hero.brandName)}</p>
      <h1 class="hero-title">${escapeHtml(hero.title)}</h1>
      <p class="hero-brand">${escapeHtml(hero.brandName)}</p>
      <p class="hero-summary">${escapeHtml(hero.subtitle)}</p>
      <div class="action-row">
        ${list(hero.actions ?? [], (action) => ButtonLink(action))}
      </div>
    </div>
  </section>`;
}

function SafetySection({ safetySteps }) {
  return `<section class="chapter-section safety-section">
    <div class="chapter-inner">
      <div class="chapter-copy">
        <p class="eyebrow">安全说明</p>
        <h2 class="chapter-title">安全流程清楚，体验才更放松</h2>
      </div>
      <div class="process-grid">
        ${list(safetySteps ?? [], (step, index) => `<article class="process-step">
          <span class="step-number">${String(index + 1).padStart(2, '0')}</span>
          <h3>${escapeHtml(step.title)}</h3>
          <p>${escapeHtml(step.text)}</p>
        </article>`)}
      </div>
    </div>
  </section>`;
}

function ContactPreview({ site }) {
  const features = [
    { label: '营业时间', value: site.businessHours },
    { label: '场地位置', value: site.address },
    { label: '电话咨询', value: site.phone },
    { label: '微信咨询', value: site.wechatLabel },
  ];

  return `<section class="chapter-section contact-preview">
    <div class="chapter-inner">
      <div class="chapter-copy">
        <p class="eyebrow">到访信息</p>
        <h2 class="chapter-title">来之前，先确认位置和营业信息</h2>
      </div>
      <div class="feature-grid">
        ${list(features, (feature) => `<article class="feature-card">
          <h3>${escapeHtml(feature.label)}</h3>
          <p class="feature-value">${escapeHtml(feature.value)}</p>
        </article>`)}
      </div>
      <div class="action-row">
        ${ButtonLink({ href: '#/contact', label: '查看联系方式', variant: 'primary' })}
      </div>
    </div>
  </section>`;
}

export function HomePage(content) {
  return `<main id="main" class="scroll-home">
    ${HeroSection({ hero: content.hero })}
    ${list(content.homeChapters ?? [], (chapter) => SectionChapter({ chapter }))}
    ${SafetySection({ safetySteps: content.safetySteps })}
    ${ContactPreview({ site: content.site })}
  </main>`;
}
