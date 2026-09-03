import test from 'node:test';
import assert from 'node:assert/strict';

import { siteContent } from '../src/content/siteContent.js';
import { ProjectsPage } from '../src/pages/ProjectsPage.js';

test('renders the four riding packages directly after the riverside ride introduction', () => {
  const html = ProjectsPage(siteContent);
  const riversidePosition = html.indexOf('河边野骑');
  const packagesPosition = html.indexOf('骑行套餐');
  const teamPosition = html.indexOf('团队定制活动');

  assert.ok(riversidePosition >= 0, '河边野骑项目应显示');
  assert.ok(packagesPosition > riversidePosition, '套餐应位于河边野骑介绍之后');
  assert.ok(teamPosition > packagesPosition, '团队定制活动应保留在套餐之后');
  assert.equal((html.match(/class="package-card"/g) ?? []).length, 4);

  for (const price of ['¥88', '¥358', '¥499', '¥598']) {
    assert.match(html, new RegExp(price));
  }

  assert.match(html, /场内骑行 3 圈/);
  assert.match(html, /户外野骑约 5 公里/);
  assert.match(html, /户外野骑约 10 公里/);
  assert.match(html, /一对一野骑私教/);
  assert.match(html, /套餐详情及预约安排请电话咨询，或搜索第三方销售平台了解。/);
});
