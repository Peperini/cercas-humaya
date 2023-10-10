import GSAP from 'gsap'

import Page from 'classes/Page'
import QuoterEnd from 'components/QuoterEnd'

export default class Quoter extends Page {
  constructor () {
    super({
      id: 'quoter',
      element: '.quoter',
      elements: {
        closeButton: '.quoter__close__icon',
        wrapper: '.quoter__wrapper',
        submit: '.quoter__form__button__wrapper',
        quoterEnd: '.quoter-end'
      }
    })
  }

  create () {
    super.create()
  }

  onSubmit(event) {
    event.preventDefault()
    this.quoterEnd = new QuoterEnd()
  }

  show () {
    super.show()
    this.addEventListener()
  }

  hide () {
    super.hide()
  }

  addEventListener() {
    this.elements.submit.addEventListener('click', event => {
      this.onSubmit(event)
    })

    const quoterButtons = document.querySelectorAll('.quoter__button')

    quoterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('active'); // Toggle an 'active' class
        console.log(button.firstChild.checked)
      });
    })
  }
}
