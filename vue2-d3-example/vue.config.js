const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  chainWebpack: config => {
    config.plugin("web-component-html").use(HtmlWebpackPlugin, [
      {
        template: "public/web-component.html",
        filename: "web-component.html",
        inject: false,
        minify: false
      }
    ]);
  }
};
