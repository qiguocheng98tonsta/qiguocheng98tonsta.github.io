import { MediaImage } from '../components/MediaImage.js';
import { getMediaCategories } from '../content/contentProvider.js';
import { escapeHtml, list } from '../utils/dom.js';

function pageMediaCategories(media) {
  const providerCategories = getMediaCategories();
  const contentCategories = [...new Set(media.map((item) => item.category))];
  const visibleProviderCategories = providerCategories.filter((category) =>
    media.some((item) => item.category === category),
  );

  return visibleProviderCategories.length > 0 ? visibleProviderCategories : contentCategories;
}

function mediaCard(item) {
  if (item.type === 'video') {
    const poster = item.cover ? ` poster="${escapeHtml(item.cover)}"` : '';

    return `<article class="feature-card media-video-card">
              <video class="feature-cover media-video"${poster} controls preload="metadata">
                <source src="${escapeHtml(item.src)}" type="video/mp4">
              </video>
              <span class="media-type-label">视频</span>
              <h3>${escapeHtml(item.title)}</h3>
            </article>`;
  }

  return `<article class="feature-card">
              ${MediaImage({
                src: item.cover ?? item.src,
                alt: item.title,
                className: 'feature-cover',
              })}
              <h3>${escapeHtml(item.title)}</h3>
            </article>`;
}

export function MediaPage(content) {
  const media = content.media ?? [];
  const categories = pageMediaCategories(media);

  return `<main id="main" class="page-shell">
    <section class="simple-page">
      <p class="eyebrow">牧场影像</p>
      <h1>图片视频</h1>
      <p class="chapter-summary">先按场地环境、河边路线、日常活动整理素材。后期素材增多后，可以接入后台筛选。</p>
      ${list(categories, (category, index) => {
        const items = media.filter((item) => item.category === category);

        return `<section class="media-group" aria-labelledby="media-group-${index}">
          <h2 id="media-group-${index}">${escapeHtml(category)}</h2>
          <div class="feature-grid">
            ${list(items, mediaCard)}
          </div>
        </section>`;
      })}
    </section>
  </main>`;
}
