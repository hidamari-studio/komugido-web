/**
 * パンのカード。menu.html の一つひとつのパンと同じ形を返す。
 * 見た目を直したら menu.html のカードも同じ形に揃え、npm run shoot で story の画像を撮り直す。
 *
 * @param {object} props
 * @param {string} props.name 名前
 * @param {string} props.description ひとこと
 * @param {string} props.price 値段（「380円」「1斤 420円」など、表示のまま）
 * @param {string} [props.image] 写真（assets/img/ から）
 * @param {string} [props.badge] 名前の上の札（「10月の新作」など）
 * @param {boolean} [props.soldOut] 本日は売り切れ
 * @returns {string}
 */
export function BreadCard({ name, description, price, image, badge, soldOut = false }) {
  const soldOutBadge = soldOut ? '<span class="bread-card__sold-badge">本日売り切れ</span>' : '';
  const photo = image
    ? `<div class="bread-card__photo"><img src="${image}" alt="${name}">${soldOutBadge}</div>`
    : '';
  const badgeHtml = badge ? `<span class="bread-card__badge">${badge}</span>` : '';
  const status = soldOut ? '<p class="bread-card__status">本日は売り切れました</p>' : '';
  const reserve = soldOut
    ? '<a class="bread-card__reserve" aria-disabled="true">取り置きできません</a>'
    : '<a class="bread-card__reserve" href="#reserve">取り置きする</a>';

  return `<article class="bread-card${soldOut ? ' is-sold-out' : ''}">
  ${photo}
  <div class="bread-card__body">
    ${badgeHtml}
    <h3 class="bread-card__name">${name}</h3>
    <p class="bread-card__desc">${description}</p>
    <p class="bread-card__price">${price}</p>
    ${status}
    ${reserve}
  </div>
</article>`;
}
