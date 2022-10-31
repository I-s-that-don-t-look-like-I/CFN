const { override, addWebpackAlias, addBabelPlugins } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    // "@components": path.resolve(__dirname, "src", "components"),
    '@assets': path.resolve(__dirname, 'src', 'assets'),
    '@styles': path.resolve(__dirname, 'src', 'styles'),
  }),
  ...addBabelPlugins(['babel-plugin-styled-components'])
);
