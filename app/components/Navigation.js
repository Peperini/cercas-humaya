import Component from 'classes/Component'
import Prefix from 'prefix'
import GSAP from 'gsap'

export default class Navigation extends Component {
  constructor ({ template }) {
    super({
      element: '.navigation',
        elements: {
          items: '.navigation__list__item',
          links: '.navigation__list__link',
          wrapper: '.homepage__wrapper',
        }
    })

    this.transformPrefix = Prefix('transform')

    this.addEventListeners()
  }

  addEventListeners () {
    /* this.elements.links.forEach(link => {
      if (link.innerHTML === 'Historia') {
        link.onclick = event => {
          event.preventDefault()

          GSAP.to(this.elements.wrapper, {
            duration: 0.5,
            ease: 'expo.in',
            y: -2000
          })

          this.elements.wrapper.style[this.transformPrefix] = `translateY(-1285px)`
        }
      }
    }) */
  }
}
