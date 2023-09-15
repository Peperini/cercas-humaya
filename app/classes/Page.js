import GSAP from 'gsap'
import each from 'lodash/each'

export default class Page {
  constructor ({
    element,
    elements,
    id
  }) {
    this.selector = element
    this.selectorChildren = {
      ...elements
    }

    this.id = id
  }

  create () {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    each(this.selectorChildren, (element, key) => {
      if (element instanceof window.HTMLElement || element instanceof window.NodeList || Array.isArray(element)) {
        this.elements[key] = element
      } else {
        this.elements[key] = document.querySelectorAll(element)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(element)
        }
      }
    })
  }

  show () {
    return new Promise(resolve => {
      GSAP.fromTo(this.element, {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
        onComplete: resolve
      })
    })
  }

  hide () {
    return new Promise(resolve => {
      GSAP.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }
}
