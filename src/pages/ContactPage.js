import { escapeHtml } from '../utils/dom.js';

function ContactInfoCard({ title, value, href }) {
  const renderedValue = href
    ? `<a class="feature-value" href="${escapeHtml(href)}">${escapeHtml(value)}</a>`
    : `<p class="feature-value">${escapeHtml(value)}</p>`;

  return `<article class="feature-card">
    <h2>${escapeHtml(title)}</h2>
    ${renderedValue}
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
    {
      title: '邮箱',
      value: site.email,
      href: site.email ? `mailto:${site.email}` : '',
    },
  ].filter((item) => String(item.value ?? '').trim());
  const navigationUrl = safeExternalUrl(site.navigationUrl);
  const formEnabled = site.contactFormEnabled !== false;
  const formStateAttribute = formEnabled ? 'data-contact-form' : 'data-contact-form-preview';
  const disabledAttribute = formEnabled ? '' : ' disabled';
  const submitLabel = formEnabled ? '提交留言' : '在线留言即将开放';
  const feedback = formEnabled
    ? '<p data-contact-feedback></p>'
    : `<p class="contact-form-notice">在线留言转发正在配置中，目前请发送邮件至 <a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a>。</p>`;

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
      <form class="contact-form" ${formStateAttribute}>
        <label>
          <span>称呼</span>
          <input type="text" name="name" autocomplete="name"${disabledAttribute}>
        </label>
        <label>
          <span>电话或微信</span>
          <input type="text" name="contact" autocomplete="tel"${disabledAttribute}>
        </label>
        <label>
          <span>想了解的内容</span>
          <textarea name="content" rows="5"${disabledAttribute}></textarea>
        </label>
        <button type="submit"${disabledAttribute}>${submitLabel}</button>
        ${feedback}
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

