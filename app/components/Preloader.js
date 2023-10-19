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

    if (percent === 100) {
      this.onLoeaded()
    }
  }

  onLoeaded () {
    return new Promise(resolve => {
      this.animateOut = GSAP.timeline({ delay: 1 })

      this.animateOut.to(this.elements.number, {
        duration: 0.5,
        ease: 'expo.in',
        x: '-100%'
      })

      this.animateOut.to(this.element, {
        duration: 1.5,
        ease: 'expo.in',
        scaleX: 0,
        transformOrigin: '100% 100%'
      }, '-=0.5')

      this.animateOut.call(() => {
        this.emit('completed')
      })
    })
  }

  destroy () {
    this.element.parentNode.removeChild(this.element)
  }
}
