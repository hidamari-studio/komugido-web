/**
 * サイトのヘッダー（ロゴとページの切り替え）。index.html・menu.html・access.html の先頭と同じ形を返す。
 *
 * @param {object} props
 * @param {'top' | 'menu' | 'access'} [props.current] 今のページ（下線が付く）
 * @returns {string}
 */
export function SiteHeader({ current = 'top' } = {}) {
  const link = (key, href, label) =>
    `<a href="${href}"${current === key ? ' aria-current="page"' : ''}>${label}</a>`;

  return `<header class="site-header">
  <a class="logo" href="index.html">こむぎ堂</a>
  <nav>
    ${link('menu', 'menu.html', 'パン')}
    ${link('access', 'access.html', 'お店')}
  </nav>
</header>`;
}
