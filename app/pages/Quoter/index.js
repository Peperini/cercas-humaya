import GSAP from 'gsap'

import Page from 'classes/Page'

export default class Quoter extends Page {
  constructor () {
    super({
      id: 'quoter',
      element: '.quoter',
      elements: {
        closeButton: '.quoter__close__icon',
        wrapper: '.quoter__wrapper'
      }
    })

  }

  create () {
    super.create()
  }

  show () {
    super.show()
    /* return new Promise(resolve => {
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
      })

      this.animateIn.call(() => {
        this.addEventListeners()

        resolve()
      })
    }) */
  }

  hide () {
    super.hide()
    /* return new Promise(resolve => {
      this.removeEventListeners()

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
    }) */
  }
}
