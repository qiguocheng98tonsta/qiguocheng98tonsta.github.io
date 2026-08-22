import { createRouter } from './router.js';
import { Footer } from './components/Footer.js';
import { Header, bindHeaderInteractions } from './components/Header.js';
import { getNavigationItems, getSiteContent } from './content/contentProvider.js';
import { submitContactMessage } from './services/contactAdapter.js';
import { AboutPage } from './pages/AboutPage.js';
import { bindContactForm, ContactPage } from './pages/ContactPage.js';
import { HomePage } from './pages/HomePage.js';
import { MediaPage } from './pages/MediaPage.js';
import { ProjectsPage } from './pages/ProjectsPage.js';
import { TeamPage } from './pages/TeamPage.js';
import { escapeHtml } from './utils/dom.js';
import { ROUTES } from './utils/routeUtils.js';

const app = document.querySelector('#app');
const content = getSiteContent();
const navigation = getNavigationItems();

function temporaryPage(page) {
  return `<main class="page-content">
    <h1>${escapeHtml(page.label)}</h1>
    <p>页面结构将在后续任务中接入内容与排版。</p>
  </main>`;
}

function renderPage(page, path) {
  const pageMarkupByPath = {
    '/': HomePage,
    '/projects': ProjectsPage,
    '/media': MediaPage,
    '/team': TeamPage,
    '/about': AboutPage,
    '/contact': ContactPage,
  };
  const renderContentPage = pageMarkupByPath[path];
  const pageMarkup = renderContentPage ? renderContentPage(content) : temporaryPage(page);

  app.innerHTML = `<div class="site-shell">
    ${Header({ site: content.site, navigation })}
    ${pageMarkup}
    ${Footer({ site: content.site })}
  </div>`;

  bindHeaderInteractions();

  if (path === '/contact') {
    bindContactForm(submitContactMessage);
  }
}

createRouter(ROUTES, renderPage);
