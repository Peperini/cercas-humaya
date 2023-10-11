require('dotenv').config()

const logger = require('morgan')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const nodeMailer = require('nodemailer')

// Mail template
const html = `
  <h2>Nueva cotización</h2>
  <p>This is the body of the message and here we'll find all the information related to the new quote from a cliente</p>
`

const express = require('express')
const app = express()
const path = require('path')
const port = 3000

app.use(logger('dev'))
app.use(errorHandler())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))

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

const handleLinkResolver = doc => {
  if (doc.type === 'quoter') {
      return '/quoter'
  }

  //Default to homepage
  return '/'
}

//Middleware to inject primic helper, ua-parser, and some utils
app.use((req, res, next) => {
  const ua = uap(req.headers['user-agent'])

  res.locals.isDesktop = ua.device.type === undefined
  res.locals.isPhone = ua.device.type === 'mobile'
  res.locals.isTablet = ua.device.type === 'tablet'

  res.locals.Link = handleLinkResolver

  res.locals.PrismicH = PrismicH

  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const handleRequest = async api => {
  const [ meta, navigation, homepage, quoter, quoter_end ] =
    await Promise.all([
      api.getSingle('meta'),
      api.getSingle('navigation'),
      api.getSingle('homepage'),
      api.getSingle('quoter'),
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
    quoter,
    quoter_end
  }
}

app.get('/', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/home', { ...defaults })
})

app.get('/quoter', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)

  res.render('pages/quoter', { ...defaults })
})

app.post('/formPost', (req, res) => {
  /* console.log(req.body) // The data we get is in the body of request */

  async function main() {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'josearmando.zara@gmail.com',
        pass: process.env.APP_PASSWORD,
      },
    })

    const info = await transporter.sendMail({
      from: 'Cercas Humaya <josearmando.zara@gmail.com>',
      to: 'isamar.bobadilla@gmail.com',
      subject: 'Testing...',
      html: html
    })

    console.log('Message sent: ' + info.messageId)
  }

  main().catch(e => console.log(e))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
