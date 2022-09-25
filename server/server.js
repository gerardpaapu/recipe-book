const express = require('express')
const path = require('path')

const recipeRoutes = require('./routes/recipes')

const server = express()

server.use(express.json())
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const config = require('../client/webpack.config')
  const compiler = webpack(config)

  server.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  )
}

server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/recipes', recipeRoutes)

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})
module.exports = server
