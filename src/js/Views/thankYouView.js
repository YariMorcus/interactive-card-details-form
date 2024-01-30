import icons from '../../img/icon-complete.svg';
import View from './View';

class thankYouView extends View {
  _parentEl = document.querySelector('.right-column');
  #continueButton = '#js-thank__you-continue';

  addHandlerContinue(handler) {
    this._parentEl.addEventListener('click', (e) => {
      const button = e.target.closest(this.#continueButton);

      if (!button) return;

      handler();
    });
  }

  _generateMarkup() {
    const markup = `
      <div class="thank-you">
          <img src="${icons}/img/icon-complete.svg" alt="" class="thank-you__success-icon">
          <h1 class="thank-you__title">Thank you!</h1>
          <p class="thank-you__text">We've added your card details</p>
          <button id="js-thank__you-continue" class="button" aria-label="Go back">Continue</button>
      </div>
      <footer class="footer">
        Challenge by <a class="footer__link" rel="noopener noreferrer" href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
        Coded&nbsp;by&nbsp;<a class="footer__link" rel="noopener noreferrer" href="https://www.linkedin.com/in/yarimorcus" target="_blank">Yari&nbsp;Morcus</a>.
    </footer> <!-- .footer -->
    `;

    return markup;
  }
}

export default new thankYouView();
