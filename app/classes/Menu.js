import GSAP from 'gsap'
import MenuItem from 'components/menuItem'

export default class Menu {
  constructor(el) {
    this.DOM = {el: el}
    this.DOM.menuItems = this.DOM.el.querySelectorAll('.service__item')
    this.animatableProperties = {
      tx: {previous: 0, current: 0, amt: 0.08},
      ty: {previous: 0, current: 0, amt: 0.08},
      rotation: {previous: 0, current: 0, amt: 0.08},
      brightness: {previous: 1, current: 1, amt: 0.08}
    }
    this.menuItems = [];

    [...this.DOM.menuItems].forEach((item, pos) => this.menuItems.push(new MenuItem(item, pos, this.animatableProperties)))

    this.showMenuItems()
  }

  showMenuItems () {
    GSAP.to(this.menuItems.map(item => item.DOM.textInner), {
      duration: 1.2,
      ease: 'Expo.easeOut',
      startAt: {y: '100%'},
      y: 0,
      delay: pos => pos*0.06
    })
  }
}
