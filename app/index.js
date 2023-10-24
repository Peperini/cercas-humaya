import each from 'lodash/each'

import Home from 'pages/Home'
import Quoter from 'pages/Quoter'
import Thanks from 'pages/Thanks'
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
      quoter: new Quoter(),
      thanks: new Thanks()
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
    const forms = document.querySelectorAll('form')

    each(links, link => {
      link.onclick = event => {
        event.preventDefault()

        const { href } = link
        console.log(href)
        this.onChange(href)
      }
    })

    each(forms, form => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault()

        // Serialize form data into a format that can be sent via AJAX
        const formData = new FormData(form)
        const formObject = {}

        formData.forEach((value, key) => {
          formObject[key] = value
        })

        console.log(formObject)

        try {
          // Send the form data to the server via AJAX
          console.log(window.location.href)
          const response = await fetch('/thanks', {
            method: 'POST',
            body: JSON.stringify(formObject),
            headers: {
              "Content-Type": "application/json",
            }
          })
          console.log('after')

          if (response.ok) {
            // Handle succes or redirection here if needed
            //window.location.href = '/thanks' // Redirect to the 'thanks' page after successful form submission
            console.log(window.location.href)
            this.onChange('/thanks')
          } else {
            // Handle errors or display a message to the user
            console.log('Form submission failed.')
          }
        } catch (error) {
          console.log('An error ocurred:', error)
        }
      })
    })
  }
}

new App()
