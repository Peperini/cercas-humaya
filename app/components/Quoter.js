import GSAP from 'gsap'
import each from 'lodash/each'

import Component from 'classes/Component';

export default class Quoter extends Component {
  constructor () {
    super({
      element: '.quoter',
      elements: {
        button: '.homepage__hero__button',
        closeButton: '.quoter__close__icon',
        wrapper: '.quoter__wrapper'
      }
    })

  }

  create () {
    super.create()

    this.elements.button.addEventListener('click', () => this.show())
    this.elements.closeButton.addEventListener('click', () => this.hide())
  }

  show () {
    return new Promise(resolve => {
      this.animateIn = GSAP.timeline()

      this.animateIn.to(this.element, {
        autoAlpha: 1,
      })

      this.animateIn.fromTo(this.element, {
        scaleY: 0
      }, {
        duration: 1,
        ease: 'expo.out',
        scaleY: 1,
        transformOrigin: '100% 100%',
      })

      this.animateIn.fromTo(this.elements.wrapper, {
        autoAlpha: 0,
        duration: 0.5
      }, {
        autoAlpha: 1,
        onComplete: resolve
      })
    })
  }

  hide () {
    return new Promise(resolve => {
      this.animateOut = GSAP.timeline()

      this.animateOut.to(this.elements.wrapper, {
        autoAlpha: 0,
        duration: 0.5
      })

      this.animateOut.to(this.element, {
        duration: 1,
        ease: 'expo.in',
        scaleY: 0,
        transformOrigin: '100% 100%',
      })

      this.animateOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }
}
