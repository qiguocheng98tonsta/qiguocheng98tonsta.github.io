import { escapeHtml } from '../utils/dom.js';

function ContactInfoCard({ title, value }) {
  return `<article class="feature-card">
    <h2>${escapeHtml(title)}</h2>
    <p class="feature-value">${escapeHtml(value)}</p>
  </article>`;
}

function safeExternalUrl(value) {
  try {
    const url = new URL(String(value ?? ''));
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '#';
  } catch {
    return '#';
  }
}

export function ContactPage(content) {
  const site = content.site;
  const contactItems = [
    { title: '营业时间', value: site.businessHours },
    { title: '场地位置', value: site.address },
    { title: '电话', value: site.phone },
    { title: '微信', value: site.wechatLabel },
  ];
  const navigationUrl = safeExternalUrl(site.navigationUrl);

  return `<main id="main" class="page-shell">
    <section class="simple-page">
      <p class="eyebrow">河边上马 / 乐石琪牧场</p>
      <h1>联系我们</h1>
      <p class="chapter-summary">来之前可以先确认营业时间、位置和适合的体验方式。</p>
      <div class="feature-grid">
        ${contactItems.map((item) => ContactInfoCard(item)).join('')}
      </div>
      <div class="action-row">
        <a class="button-link primary" href="${escapeHtml(navigationUrl)}" target="_blank" rel="noreferrer">打开导航</a>
      </div>
      <form class="contact-form" data-contact-form>
        <label>
          <span>称呼</span>
          <input type="text" name="name" autocomplete="name">
        </label>
        <label>
          <span>电话或微信</span>
          <input type="text" name="contact" autocomplete="tel">
        </label>
        <label>
          <span>想了解的内容</span>
          <textarea name="content" rows="5"></textarea>
        </label>
        <button type="submit">提交留言</button>
        <p data-contact-feedback></p>
      </form>
    </section>
  </main>`;
}

export function bindContactForm(submitContactMessage) {
  const form = document.querySelector('[data-contact-form]');

  if (!form) {
    return;
  }

  const feedback = form.querySelector('[data-contact-feedback]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const result = submitContactMessage({
      name: formData.get('name'),
      contact: formData.get('contact'),
      content: formData.get('content'),
    });

    if (result.ok) {
      feedback.textContent = '留言已收到，工作人员会根据联系方式尽快回复。';
      form.reset();
      return;
    }

    feedback.textContent = Object.values(result.errors).join('；');
  });
}
