require('dotenv').config()

const fetch = require('node-fetch')
const logger = require('morgan')
const express = require('express')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const path = require('path')
const port = 3000

const Prismic = require('@prismicio/client')
const PrismicH = require('@prismicio/helpers')
const uap = require('ua-parser-js')

const initApi = (req) => {
  return Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
    fetch,
  });
};

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const handleRequest = async api => {
  const [ meta, navigation, homepage, quoter-selectors, quoter-end ] =
    await Promise.all([
      api.getSingle('meta'),
      api.getSingle('preloader'),
      api.getSingle('navigation'),
      api.getSingle('home'),
      api.getSingle('about'),
    ])

  /* const assets = []

  home.data.gallery.forEach(item => {
      assets.push(item.image.url)
  }) */

  return {
    meta,
    navigation,
    homepage,
    quoter-selectors,
    quoter-end
  }
}

app.get('/', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  console.log(defaults.data)

  res.render('base', { defaults })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
