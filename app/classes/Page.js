import GSAP from 'gsap'
import each from 'lodash/each'
import map from 'lodash/map'
import normalizeWheel from 'normalize-wheel'
import Prefix from 'prefix'

import Cursor from 'utils/cursor'
import Title from 'animations/Title'
import Paragraph from 'animations/Paragraph'

import AsyncLoad from 'classes/AsyncLoad'

export default class Page {
  constructor ({
    element,
    elements,
    id
  }) {
    this.selector = element
    this.selectorChildren = {
      ...elements,
      animationTitles: '[data-animation="title"]',
      animationParagraphs: '[data-animation="paragraph"]',
      cursor: '.cursor',
      preloaders: '[data-src]'
    }

    this.id = id
    this.transformPrefix = Prefix('transform')

    this.lastTouchY = 0; // Initialize the previous touch Y-coordinate

    this.onMouseWheelEvent = this.onMouseWheel.bind(this)
  }

  create () {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0
    }

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

    this.createAnimations()
    this.createCursor()
    this.createPreloader()
  }

  createCursor() {
    const cursor = new Cursor(this.elements.cursor)
  }

  createAnimations () {
    this.animations = []

    this.animationTitles = map(this.elements.animationTitles, element => {
      return new Title ({
        element
      })
    })

    this.animations.push(...this.animationTitles)

    this.animationParagraphs = map(this.elements.animationParagraphs, element => {
      return new Paragraph ({
        element
      })
    })

    this.animations.push(...this.animationParagraphs)
  }

  createPreloader () {
    this.preloader = map(this.elements.preloaders, element => {
      return new AsyncLoad({ element })
    })
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
        this.addEventListeners()

        resolve()
      })
    })
  }

  hide () {
    return new Promise(resolve => {
      this.removeEventListeners()

      this.animationOut = GSAP.timeline()

      this.animationOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }

  onTouchDown (event) {
    this.lastTouchY = event.touches[0].clientY;
    this.touchVelocity = 0;
  }

  onTouchMove (event) {
    const touch = event.touches[0]
    const { clientY } = touch

    // Calculate the difference in Y-coordinates from the previous touch
    const deltaY = this.lastTouchY - clientY

    // Update the scroll target based on the deltaY
    this.scroll.target += deltaY

    // Update the touch velocity
    this.touchVelocity = deltaY;

    // Store the current touch Y-coordinate for the next calculation
    this.lastTouchY = clientY
  }

  onTouchUp () {
    // Gradually decelerate the scrolling based on the touch velocity
    const deceleration = 0.9; // Adjust this value as needed

    const animate = () => {
      this.scroll.target += this.touchVelocity;
      this.touchVelocity *= deceleration;

      // If the velocity is still significant, continue the animation
      if (Math.abs(this.touchVelocity) > 0.1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  onMouseWheel (event) {
    const { pixelY } = normalizeWheel(event)

    this.scroll.target += pixelY
  }

  onResize () {
    if (this.elements.wrapper) {
      this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight
    }

    each(this.animations, animation => animation.onResize())
  }

  update () {
    this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target)
    this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)

    if (this.scroll.target < 0.01) {
      this.scroll.target = 0
    }

    if (this.elements.wrapper) {
      this.elements.wrapper.style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`
    }
  }

  addEventListeners () {
    window.addEventListener('mousewheel', this.onMouseWheelEvent)
    window.addEventListener('touchstart', this.onTouchDown.bind(this))
    window.addEventListener('touchmove', this.onTouchMove.bind(this))
    window.addEventListener('touchend', this.onTouchUp.bind(this))

    if (this.id === 'home') {
      this.elements.links.forEach(link => {
        if (link.innerHTML === 'Historia') {
          link.onclick = event => {
            event.preventDefault()

            this.scroll.target = 1250;
          }
        }

        if (link.innerHTML === 'Servicios') {
          link.onclick = event => {
            event.preventDefault()

            this.scroll.target = 2730;
          }
        }

        if (link.innerHTML === 'Contacto') {
          link.onclick = event => {
            event.preventDefault()

            this.scroll.target = this.scroll.limit ;
          }
        }
      })
    }
  }

  removeEventListeners () {
    window.removeEventListener('mousewheel', this.onMouseWheelEvent)
    window.removeEventListener('touchstart', this.onTouchDown.bind(this))
    window.removeEventListener('touchmove', this.onTouchMove.bind(this))
    window.removeEventListener('touchend', this.onTouchUp.bind(this))
  }
}
