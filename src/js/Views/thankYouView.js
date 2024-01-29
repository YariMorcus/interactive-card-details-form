import icons from '../../img/icon-complete.svg';
import View from './View';

class thankYouView extends View {
  _parentEl = document.querySelector('.right-column');

  _generateMarkup() {
    const markup = `
      <div class="thank-you">
          <img src="${icons}/img/icon-complete.svg" alt="" class="thank-you__success-icon">
          <h1 class="thank-you__title">Thank you!</h1>
          <p class="thank-you__text">We've added your card details</p>
          <button id="js-thank__you-continue" class="button">Continue</button>
      </div>
    `;

    return markup;
  }
}

export default new thankYouView();
