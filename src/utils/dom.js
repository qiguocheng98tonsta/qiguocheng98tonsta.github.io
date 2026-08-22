export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function html(strings, ...values) {
  return strings.reduce((output, string, index) => {
    const value = index < values.length ? escapeHtml(values[index]) : '';
    return `${output}${string}${value}`;
  }, '');
}

export function list(items, renderItem) {
  return items.map((item, index) => renderItem(item, index)).join('');
}
