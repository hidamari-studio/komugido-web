/** @type { import('@storybook/html-vite').StorybookConfig } */
export default {
  stories: ['../src/**/*.stories.js'],
  framework: { name: '@storybook/html-vite', options: {} },
  // story の中の写真（assets/img/）をサイトと同じパスで読めるようにする
  staticDirs: [{ from: '../assets', to: '/assets' }],
  core: { disableTelemetry: true },
};
