import { SiteHeader } from './SiteHeader.js';

export default {
  title: 'Components/SiteHeader',
  render: (args) => `<div style="width: 880px">${SiteHeader(args)}</div>`,
  argTypes: {
    current: { control: 'select', options: ['top', 'menu', 'access'] },
  },
};

export const Top = { name: 'トップ', args: { current: 'top' } };

export const Menu = { name: 'パンのページ', args: { current: 'menu' } };

export const Mobile = {
  name: 'スマホ幅',
  args: { current: 'menu' },
  render: (args) => `<div style="width: 343px">${SiteHeader(args)}</div>`,
};
