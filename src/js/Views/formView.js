import { SLICE_START_POSITION_INPUT_CLASS_NAME } from '../config';
import View from './View';

class FormView extends View {
  #parentEl = document.querySelector('.card-form');

  addHandlerInputChange(handler) {
    this.#parentEl.addEventListener('input', (e) => {
      const input = e.target.classList.contains('card-form__input');

      if (!input) return;

      const changedInput = e.target.className.slice(
        e.target.className.lastIndexOf(' ') +
          SLICE_START_POSITION_INPUT_CLASS_NAME
      );
      handler(changedInput);
    });
  }

  retrieveCardHolderName() {
    return this.#parentEl
      .querySelector('.js-input-cardholder-name')
      .value.trim();
  }

  retrieveCardNumber() {
    return this.#parentEl.querySelector('.js-input-card-number').value.trim();
  }

  retrieveCardExpDateMM() {
    return this.#parentEl.querySelector('.js-input-exp-mm').value.trim();
  }

  retrieveCardExpDateYY() {
    return this.#parentEl.querySelector('.js-input-exp-yy').value.trim();
  }

  retrieveCardCVC() {
    return this.#parentEl.querySelector('.js-input-cvc').value.trim();
  }
}

export default new FormView();
