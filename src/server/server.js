import express from 'express'
import React from 'react'
import {createStore} from 'redux'
import webpack  from 'webpack'
import reducer from '../frontend/reducers/index'
//import initialState from '../frontend/utils/intitalState'
import {StaticRouter} from 'react-router-dom' 
import {renderToString} from 'react-dom/server'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import serverRoutes from '../frontend/routes/serverRoutes'
import helmet from 'helmet'
import axios from 'axios'
import passport from 'passport'
import boom from '@hapi/boom'
const app = express()
const dotenv = require("dotenv").config()
import cookieParser from 'cookie-parser'
require('./utils/basic')

app.use(cookieParser())
app.use(express.json())
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


const renderApp = async (req,res,next)=>{
  const initialState = {
   // user: {email:"", name:"", id:""},
    user: "",
    myList: [],
    trends: [],
    searchTrends:[],
    originals:[],
    searchOriginals:[],
    playing: [],
  }
  try {
    let arr = await axios({
      url:`${process.env.API_URL}/api/movies/`,
      method: "get",
    })
    arr = arr.data
    const originals = arr.filter(({contentRating})=>{
      return ["G", "NC-17", "R"].includes(contentRating)
    })
    initialState.originals = originals
    initialState.searchOriginals = originals
    let trends = arr.filter(({contentRating})=>{
      return ["PG", "PG-13"].includes(contentRating)
    })
    initialState.trends = trends;
    initialState.searchTrends = trends;

    if(req.cookies.name && req.cookies.email){
      const {name, token, email, id} = req.cookies
      initialState.user = {
        name: name,
        email: email,
        id,
        token
      }

      let arr = await axios({
        url: `${process.env.API_URL}/api/usermovies/?userId=${id}`,
        method: "get",
        headers: {Authorization: `Bearer ${token}`},
      })
      arr = arr.data
      let arrMyList = await Promise.all(arr.map(async ({movieId, _id})=>{
        const movie = await axios({
          url: `${process.env.API_URL}/api/movies/${movieId}`,
          method: "get"
        })
        movie.data.userMovie = _id
        return movie.data
      }))

      initialState.myList = arrMyList
    }
    
  } catch (error) {
    next(error)
  }
  console.log('render to string')
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
  res.set("Content-Security-Policy", "img-src 'self' http://dummyimage.com https://gravatar.com http://commondatastorage.googleapis.com; media-src *; style-src-elem 'self' https://fonts.googleapis.com;")
  res.send(setResponse(html, preloadedState, req.hashManifest)); //HTML es el prerenderizado
}


app.post("/auth/sign-in", async function(req, res, next) {
  passport.authenticate("basic", function(error, data) {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }
      
      req.login(data, { session: false }, async function(err) {
        if (err) {
          next(err);
        }

        const { token, ...user } = data;

        res.cookie("token", token, {
          httpOnly: !(process.env.MODE==='development'),
          secure: !(process.env.MODE==="development")
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post("/auth/sign-up", async function(req, res, next) {
  
  const { body: user } = req;
  //console.log('PETICION ENCONTRADA', `${process.env.API_URL}`, user)
  try {
    const userCreated = await axios({
      url: `${process.env.API_URL}/auth/sign-up`,
      method: "post",
      data: {
        'email': user.email,
        'name': user.name,
        'password': user.password,
      }
    });
    //console.log(userCreated, "USER CRETAEDD:::::")
    res.status(201).json({
      "email": user.email,
      "name": user.name,
      "id": userCreated.data.id
    });
  } catch (error) {
    next(error);
  }
});
app.post('/api/usermovies', async (req,res,next)=>{
  const {body: userMovie} = req
  try {
    let data = await axios({
      url:`${process.env.API_URL}/api/usermovies`,
      method: "post",
      data: userMovie,
      headers: {Authorization: `Bearer ${req.cookies.token}`},
    })
    data = data.data
    res.status(201).json({id:data.id})
    
  } catch (error) {
    next(error)
  }
})

app.delete('/api/usermovies/:id', async (req,res,next)=>{
  try {
    const data = await axios({
      url: `${process.env.API_URL}/api/usermovies/${req.params.id}`,
      method: 'delete',
      headers: {Authorization: `Bearer ${req.cookies.token}`},
      params: req.params
    })
    const id = data.data.id
    res.status(200).json({id})
  } catch (error) {
    next(error)
  }
})

app.get("/movie/:id", async (req,res,next)=>{
  try {
    const {data} = await axios({
      url:`${process.env.API_URL}/api/movies/${req.params.id}`,
      params: req.params,
      method:"get"
    })
    res.status(200).json(data)
    
  } catch (error) {
    next(error)
  }
})

app.get("*", renderApp)

app.listen(process.env.PORT, (err)=>{
  console.log(`Escuchando en el puerto http://localhost:${process.env.PORT}/`)
})
