import Page from 'classes/Page'

export default class Home extends Page {
  constructor () {
    super({
      id: 'home',
      element: '.homepage',
      elements: {
        navigation: document.querySelector('.navigation'),
        button: '.homepage__hero__button'
      }
     })
  }

  create () {
    super.create()

    this.elements.button.addEventListener('click', () => console.log('You Clicked me!'))
  }
}
