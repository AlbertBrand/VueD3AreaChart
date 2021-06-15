module.exports = {
  outputDir: 'dist-wc',
  chainWebpack: (config) => {
    // update entrypoint
    config.entry('app').clear().add('./src/webComponent.ts').end();
    // update index template
    config.plugin('html').tap(([options]) => [
      {
        ...options,
        title: 'Area chart web component',
        template: './public/web-component.html',
      },
    ]);
  },
};
