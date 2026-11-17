/**
 * トップのお知らせ。index.html の「お知らせ」と同じ形を返す。
 *
 * @param {object} props
 * @param {{ date: string, label: string, text: string }[]} props.items 新しい順。date は 2026-10-15 の形、label は「10月15日」
 * @returns {string}
 */
export function NewsList({ items = [] } = {}) {
  const body = items.length
    ? `<ul>
    ${items.map((it) => `<li><time datetime="${it.date}">${it.label}</time>${it.text}</li>`).join('\n    ')}
  </ul>`
    : '<p class="news-empty">いまお知らせはありません。</p>';

  return `<section class="news">
  <h2>お知らせ</h2>
  ${body}
</section>`;
}
