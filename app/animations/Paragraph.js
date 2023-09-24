import each from 'lodash/each'
import GSAP  from 'gsap'
import Animation from "classes/Animation"
import { calculate, split } from 'utils/text'

export default class Paragraph extends Animation {
  constructor ( { element, elements }) {
    super({
      element,
      elements
    })

    this.elementLinesSpans = split({
      element: this.element,
      append: true
    })
  }

  animateIn () {
    this.timelineIn = GSAP.timeline({
      delay: 0.5
    })

    this.timelineIn.set(this.element, {
      autoAlpha: 1
    })

    each(this.elementLines, (line, index) => {
      this.timelineIn.fromTo(line, {
        autoAlpha: 0,
        y: '100%'
      }, {
        autoAlpha: 1,
        delay: index * 0.2,
        duration: 0.6,
        ease: 'expo.out',
        y: '0%'
      }, 0)
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
