require('dotenv').config()


const logger = require('morgan')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const express = require('express')
const app = express()
const path = require('path')
const port = 3000

const fetch = require('node-fetch')
const Prismic = require('@prismicio/client')
const PrismicH = require('@prismicio/helpers')
const uap = require('ua-parser-js')

const initApi = (req) => {
  return Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
    fetch,
  })
}


//Middleware to inject primic helper, ua-parser, and some utils
app.use((req, res, next) => {
  const ua = uap(req.headers['user-agent'])

  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isPhone = ua.device.type === 'mobile'
  res.locals.isTablet = ua.device.type === 'tablet'

  /* res.locals.Numbers = index => {
      return index == 0 ? 'One' : index == 1 ? 'Two' : index == 2 ? 'Three' : index == 3 ? 'Four' : ''
  } */

  res.locals.PrismicH = PrismicH

  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const handleRequest = async api => {
  const [ meta, navigation, homepage, quoter_selector, quoter_end ] =
    await Promise.all([
      api.getSingle('meta'),
      api.getSingle('navigation'),
      api.getSingle('homepage'),
      api.getSingle('quoter_selector'),
      api.getSingle('quoter_end'),
    ])

  /* const assets = []

  home.data.gallery.forEach(item => {
      assets.push(item.image.url)
  }) */

  return {
    meta,
    navigation,
    homepage,
    quoter_selector,
    quoter_end
  }
}

app.get('/', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  console.log(defaults.homepage.data)

  res.render('base', { ...defaults })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
