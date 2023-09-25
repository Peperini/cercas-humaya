import each from 'lodash/each'

import Home from 'pages/Home'
import Quoter from 'pages/Quoter'
import Preloader from 'components/Preloader'

class App {
  constructor() {
    this.createPreloader()
    this.createContent()
    this.createPages()

    this.addEventListeners()
    this.addLinkListeners()

    this.update()
  }

  createPreloader () {
    this.preloader = new Preloader()
    this.preloader.once('completed', this.onPreloaded.bind(this))
  }

  createContent () {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPages () {
    this.pages = {
      home: new Home(),
      quoter: new Quoter()
    }

    this.page = this.pages[this.template]
    this.page.create()
    this.page.show()
  }

  onPreloaded () {
    this.preloader.destroy()

    this.onResize()
  }

  async onChange (url) {
    await this.page.hide()

    const request = await window.fetch(url)

    if (request.status === 200) {
      const html = await request.text()
      const div = document.createElement('div')

      div.innerHTML = html

      const divContent = div.querySelector('.content')

      this.template =  divContent.getAttribute('data-template')

      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML

      this.page = this.pages[this.template]
      this.page.create()
      this.page.show()

      this.onResize()


      this.addLinkListeners()
    } else {
      console.log('Request Error')
    }
  }

  onResize () {
    if (this.page && this.page.onResize) {
      this.page.onResize()
    }
  }

  update () {
    if (this.page && this.page.update) {
      this.page.update()
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }

  addEventListeners () {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  addLinkListeners () {
    const links = document.querySelectorAll('a')

    each(links, link => {
      link.onclick = event => {
        event.preventDefault()

        const { href } = link

        this.onChange(href)
      }
    })
  }
}

new App()
