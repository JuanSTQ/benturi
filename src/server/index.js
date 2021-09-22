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

const express = require('express');
const { createStore } = require('redux');
const app = express()
const dotenv = require("dotenv").config()
const webpack = require("webpack");
const reducer = require('../frontend/reducers');
const initialState = require('../frontend/utils/intitalState');
const {StaticRouter} = require("react-router-dom")
const {renderToString} = require("react-dom/server")

if(process.env.MODE ==="development"){
  console.log('::::::CONFIGURACION DE DESARROLLO::::::')
  const webPackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webPackConfig);
  const serverConfig = { port: PORT, hot: true };
  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
}else{

}

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : '/assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : '/assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';
  return (
    `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <meta charset="utf-8" />
          <link rel="stylesheet" href="${mainStyles}" type="text/css"/>
          <title>Platfix</title>
        </head>
        <body>
          <div id="app">${html}</div>
          <script id="preloadedState">
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <script src="${mainBuild}" type="text/javascript"></script>
          <script src="${vendorBuild}" type="text/javascript"></script>
        </body>
      </html>`
  );
};


const renderApp = (req,res,next)=>{
  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const isLogged = (initialState.user.id)
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>
          {renderRoutes(serverRoutes(isLogged))}
        </Layout>
      </StaticRouter>
    </Provider>
  )
  res.send(setResponse(html, preloadedState, req.hashManifest)); //HTML es el prerenderizado
}

app.get("*", renderApp)

app.listen(process.env.PORT, (err)=>{
  console.log(`Escuchando en el puerto http://localhost:${process.env.PORT}/`)
})
