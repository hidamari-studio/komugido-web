import { BreadCard } from './BreadCard.js';

export default {
  title: 'Components/BreadCard',
  render: (args) => `<div style="max-width: 280px">${BreadCard(args)}</div>`,
  args: {
    name: '塩バターロール',
    description: 'いちばん人気。お昼前に売り切れることがあります。',
    price: '150円',
    image: 'assets/img/shio-butter-roll.jpg',
  },
};

export const Default = { name: '通常' };

export const Seasonal = {
  name: '季節のパン',
  args: {
    name: 'さつまいもとくるみのカンパーニュ',
    description: '蒸したさつまいもと、ローストしたくるみをたっぷり。',
    price: '380円',
    image: 'assets/img/campagne-satsumaimo.jpg',
    badge: '10月の新作',
  },
};

export const SoldOut = { name: '売り切れ', args: { soldOut: true } };

export const NoPhoto = { name: '写真なし', args: { image: undefined } };

export const Mobile = {
  name: 'スマホ幅',
  render: (args) => `<div style="width: 343px">${BreadCard(args)}</div>`,
};
