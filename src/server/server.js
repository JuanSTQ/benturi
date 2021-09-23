import express from 'express'
import React from 'react'
import {createStore} from 'redux'
import webpack  from 'webpack'
import reducer from '../frontend/reducers/index'
import initialState from '../frontend/utils/intitalState'
import {StaticRouter} from 'react-router-dom' 
import {renderToString} from 'react-dom/server'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import serverRoutes from '../frontend/routes/serverRoutes'
import helmet from 'helmet'

const app = express()
const dotenv = require("dotenv").config()


if(process.env.MODE ==="development"){
  console.log('::::::CONFIGURACION DE DESARROLLO::::::')
  const webPackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webPackConfig); //COPILAR WEBPACK DESDE NODE
  const serverConfig = { port: process.env.PORT, hot: true };
  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
}else{
  console.log('::::::CONFIGURACION DE PRODUCCION::::::')
  app.use(express.static(`${__dirname}/dist`))
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies())
  app.disable('x-powered-by')
}

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : '/assets/main.css';
  const mainBuild = manifest ? manifest['main.js'] : '/assets/bundle.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : '/assets/vendor.js';
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
          <title>Benturi</title>
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
  const store = createStore(reducer, initialState)
  const preloadedState = store.getState();
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
          {renderRoutes(serverRoutes())}
      </StaticRouter>
    </Provider>
  )
  //res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
  res.set("Content-Security-Policy", "img-src 'self' http://dummyimage.com; media-src *; style-src-elem 'self' https://fonts.googleapis.com;")
  res.send(setResponse(html, preloadedState, req.hashManifest)); //HTML es el prerenderizado
}

app.get("*", renderApp)

app.listen(process.env.PORT, (err)=>{
  console.log(`Escuchando en el puerto http://localhost:${process.env.PORT}/`)
})
