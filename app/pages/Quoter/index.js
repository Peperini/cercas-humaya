import Page from 'classes/Page'

export default class Quoter extends Page {
  constructor () {
    super({
      id: 'quoter',
      element: '.quoter',
      elements: {
        wrapper: '.quoter__wrapper',
        submit: '.quoter__form__button__wrapper',
        checkboxes: '.quoter__button',
        form: '.quoter__popup__form'
      }
    })
  }

  create () {
    super.create()
  }

  show () {
    super.show()
    this.addEventListener()
  }

  hide () {
    super.hide()
  }

  addEventListener() {
    this.elements.checkboxes.forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('active'); // Toggle an 'active' class
      });
    })
  }
}
