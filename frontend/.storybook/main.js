module.exports = {
  stories: [
    '../app/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    "@storybook/experimental-nextjs-vite"
  ],
  core: {
    builder: '@storybook/builder-vite'
  },
  framework: {
    name: "@storybook/experimental-nextjs-vite",
    options: {}
  },
  docs: {
    autodocs: false
  }
};
