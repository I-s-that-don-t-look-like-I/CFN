const { override, addWebpackAlias, addBabelPlugins } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({}),
  ...addBabelPlugins(['babel-plugin-styled-components'])
);
