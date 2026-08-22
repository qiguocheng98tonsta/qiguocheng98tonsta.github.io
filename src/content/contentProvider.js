import { siteContent } from './siteContent.js';

const navigationItems = [
  { label: '首页', href: '#/' },
  { label: '项目介绍', href: '#/projects' },
  { label: '图片视频', href: '#/media' },
  { label: '师资团队', href: '#/team' },
  { label: '关于我们', href: '#/about' },
  { label: '联系我们', href: '#/contact' },
];

export function getSiteContent() {
  return siteContent;
}

export function getNavigationItems() {
  return navigationItems;
}

export function getProjectById(id) {
  return siteContent.projects.find((project) => project.id === id) ?? null;
}

export function getMediaCategories() {
  return [...new Set(siteContent.media.map((item) => item.category))];
}
