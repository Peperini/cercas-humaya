import Home from 'pages/Home'

class App {
  constructor() {
    this.createContent()
    this.createPages()
  }

  createContent () {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPages () {
    this.pages = {
      home: new Home()
    }

    this.page = this.pages[this.template]
    this.page.create()
  }
}

new App()
