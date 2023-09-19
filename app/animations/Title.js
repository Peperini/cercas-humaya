
import GSAP  from 'gsap'
import Animation from "classes/Animation"

import { calculate, split } from 'utils/text'

export default class Title extends Animation {
  constructor ( { element, elements }) {
    super({
      element,
      elements
    })

    split({ element: this.element })
    split({ element: this.element })

    this.elementLinesSpans = this.element.querySelectorAll('span span')
  }

  animateIn () {
    GSAP.set(this.element, {
      autoAlpha: 1
    })

    GSAP.fromTo(this.elementLines, {
      y: '100%'
    }, {
      delay: 0.2,
      duration: 0.5,
      stagger: {
        amount: 0.1,
        axis: 'x'
      },
      y: '0%'
    })
  }

  aninmateOut () {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

  onResize () {
    this.elementLines = calculate(this.elementLinesSpans)
  }
}
