import Page from 'classes/Page'
import Menu from 'classes/Menu'

export default class Home extends Page {
  constructor () {
    super({
      id: 'home',
      element: '.homepage',
      elements: {
        wrapper: '.homepage__wrapper',
        navigation: document.querySelector('.navigation'),
        links: '.navigation__list__link',
        button: '.homepage__hero__button',
        menuEl: '.homepage__services__list',
      }
     })
  }

  create () {
    super.create()
    new Menu(this.elements.menuEl)
  }
}
