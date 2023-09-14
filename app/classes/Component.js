import EventEmitter from 'events'

import each from 'lodash/each'

export default class Component extends EventEmitter {
  constructor ({
    element,
    elements
  }) {
    super()

    this.selector = element
    this.selectorChildren = {
      ...elements
    }

    this.create()

    this.addEventListeners()
    this.removeEventListeners()
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

  addEventListeners () {

  }

  removeEventListeners () {

  }
}
