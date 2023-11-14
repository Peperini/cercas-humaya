import Page from 'classes/Page'
import GSAP from 'gsap'

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
    return new Promise(resolve => {
      this.animationIn = GSAP.timeline()

      this.animationIn.fromTo(this.element, {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
      })

      this.animationIn.call(() => {
        resolve()
      })
    })
  }

  hide () {
    return new Promise(resolve => {
      this.animationOut = GSAP.timeline()

      this.animationOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }
}
