require('ignore-styles')
require('@babel/polyfill')
require('@babel/register')({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    // para que acepte async/ await
    "@babel/plugin-transform-runtime",
    "react-hot-loader/babel"
  ]
})
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif', 'svg'],
  name: '/assets/[name].[ext]',
});
require('./server')