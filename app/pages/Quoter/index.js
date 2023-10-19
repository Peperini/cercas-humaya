import Page from 'classes/Page'

export default class Quoter extends Page {
  constructor () {
    super({
      id: 'quoter',
      element: '.quoter',
      elements: {
        closeButton: '.quoter__close__icon',
        wrapper: '.quoter__wrapper',
        submit: '.quoter__form__button__wrapper',
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
    const quoterButtons = document.querySelectorAll('.quoter__button')

    quoterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('active'); // Toggle an 'active' class
        console.log(button.firstChild.checked)
      });
    })
  }
}
