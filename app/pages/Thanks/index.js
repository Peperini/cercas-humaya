import Page from 'classes/Page'

export default class Thanks extends Page {
  constructor () {
    super({
      element: '.quoter-end',
      elements: {
        button: '.quoter-end__information__button',
        wrapper: '.quoter-end__wrapper'
      }
    })
  }

  create () {
    super.create()
  }

  show () {
    super.show()
  }

  hide () {
    super.hide()
  }
}
