import { NewsList } from './NewsList.js';

export default {
  title: 'Components/NewsList',
  render: (args) => `<div style="width: 640px">${NewsList(args)}</div>`,
};

export const Default = {
  name: '通常',
  args: {
    items: [
      { date: '2026-10-15', label: '10月15日', text: '秋の新作「さつまいもとくるみのカンパーニュ」が並びました。' },
      { date: '2026-10-01', label: '10月1日', text: '10月の定休日は毎週水曜日と、第3木曜日です。' },
    ],
  },
};

export const Empty = { name: 'お知らせなし', args: { items: [] } };
