require('dotenv').config()

const logger = require('morgan')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const nodeMailer = require('nodemailer')

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

  if (doc.type === 'thanks') {
    return '/thanks'
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

app.post('/thanks', async (req, res) => {
  const api = await initApi(req)
  const defaults = await handleRequest(api)
  console.log(req.body) // The data we get is in the body of request

  // Mail template
  const html = `
    <h1>Nueva Cotización</h1>
    <h2>Datos de quien cotiza: </h2>
    <p>Nombre: ${req.body.nombre}</p>
    <p>Teléfono: ${req.body.tel}</p>
    <p>Correo: ${req.body.correo}</p>
    <p>Dirección: ${req.body.dir}</p>
    <div>
      <h2>Servicios</h2>
      <ul>
        <li>${req.body.service}</li>
      </ul>
      <h2>Extras</h2>
      <ul>
        <li>${req.body.extra}</li>
      </ul>
      <h2>Tipo de terreno</h2>
      <ul>
        <li>${req.body.terreno}</li>
        <li>${req.body.metros} metros lineales</li>
        <li>${req.body.lados} lados</li>
      </ul>
    </div>
  `

  async function main() {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const info = await transporter.sendMail({
      from: 'Cercas Humaya <service@cercashumaya.com>',
      to: 'josearmando.zara@gmail.com',
      subject: 'Nueva Cotización',
      html: html
    })

    console.log('Message sent: ' + info.messageId)
  }
  main().catch(e => console.log(e))

  res.render('pages/thanks', { ...defaults })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
