import Page from 'classes/Page'

export default class Quoter extends Page {
  constructor () {
    super({
      id: 'quoter',
      element: '.quoter',
      elements: {
        wrapper: '.quoter__wrapper',
        submit: '.quoter__form__button__wrapper',
        checkboxes: '.quoter__button',
        form: '.quoter__popup__form'
      }
    })
  }

  create () {
    super.create()
  }

  show () {
    super.show()
    this.addEventListener()
  }

  hide () {
    super.hide()
  }

  addEventListener() {
    this.elements.checkboxes.forEach((button) => {
      button.addEventListener('click', () => {
        button.classList.toggle('active'); // Toggle an 'active' class
        console.log(button.firstChild.checked)
      });
    })

    /* const form = this.elements.form
    console.log(form)

    form.addEventListener('submit', async (event) => {
      event.preventDefault() // Prevent the default form submission behavior

      // Serialize form data into a format that can be sent via AJAX
      const formData = new FormData(form)
      const formObject = {}

      formData.forEach((value, key) => {
        formObject[key] = value
      })

      try {
        // Send the form data to the server via AJAX
        const response = await fetch('/thanks', {
          method: 'POST',
          body: JSON.stringify(formObject),
          headers: {
            "Content-Type": "application/json",
          }
        })

        if (response.ok) {
          // Handle succes or redirection here if needed
          window.location.href = '/thanks' // Redirect to the 'thanks' page after successful form submission
        } else {
          // Handle errors or display a message to the user
          console.log('Form submission failed.')
        }
      } catch (error) {
        console.log('An error ocurred:', error)
      }
    }) */
  }
}
