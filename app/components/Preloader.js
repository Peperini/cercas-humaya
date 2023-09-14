import GSAP from 'gsap'
import each from 'lodash/each'

import Component from 'classes/Component';

export default class Preloader extends Component {
  constructor () {
    super({
      element: '.preloader',
      elements: {
        number: '.preloader__number',
        images: document.querySelectorAll('img')
      }
    })

    this.length = 0

    this.createLoader()
  }

  createLoader () {
    each(this.elements.images, element => {
      element.src = element.getAttribute('data-src')
      element.onload = () => this.onAssetLoaded(element)
    })
  }

  onAssetLoaded (image) {
    this.length += 1

    const percent = Math.round(this.length / this.elements.images.length * 100)

    this.elements.number.innerHTML = `${percent}`

    if (percent === 91) {
      this.onLoeaded()
    }
  }

  onLoeaded () {
    return new Promise(resolve => {
      this.animateOut = GSAP.timeline({ delay: 1 })

      this.animateOut.to(this.element, {
        autoAlpha: 0
      })

      this.animateOut.call(() => {
        this.emit('completed')
      })
    })
  }

  destroy () {
    this.element.parentNode.removeChild(this.element)
  }
}
