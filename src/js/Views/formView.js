import { SLICE_START_POSITION_INPUT_CLASS_NAME } from '../config';
import View from './View';

class FormView extends View {
  #parentEl = document.querySelector('.card-form');

  addHandlerInputChange(handler) {
    this.#parentEl.addEventListener('input', (e) => {
      const input = e.target.classList.contains('card-form__input');

      if (!input) return;

      let changedInput = e.target.className.slice(
        e.target.className.lastIndexOf(' ') +
          SLICE_START_POSITION_INPUT_CLASS_NAME
      );

      if (changedInput.endsWith('--invalid')) {
        changedInput = e.target.className.slice(
          e.target.className.indexOf(' ') + 10,
          e.target.className.lastIndexOf(' ')
        );
      }
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

  renderError(inputClass, error = "Can't be blank") {
    // set aria-invalid to true
    this.#toggleAria(inputClass, true);

    // show red outline
    this.#showRedOutline(inputClass, true);

    // show error
    this.#parentEl
      .querySelector(`#card-form__error-${inputClass}`)
      .classList.add('card-form__error--visible');
    this.#parentEl.querySelector(`#card-form__error-${inputClass}`).innerText =
      error;
  }

  hideError(inputClass) {
    // set aria-invalid to false
    this.#toggleAria(inputClass, false);

    // hide red outline
    this.#hideRedOutline(inputClass);

    // hide error
    this.#parentEl
      .querySelector(`#card-form__error-${inputClass}`)
      .classList.remove('card-form__error--visible');
    this.#parentEl.querySelector(`#card-form__error-${inputClass}`).innerText =
      '';
  }

  #toggleAria(inputClass, bool) {
    this.#parentEl
      .querySelector(`.js-input-${inputClass}`)
      .setAttribute('aria-invalid', bool);
  }

  #showRedOutline(inputClass) {
    this.#parentEl
      .querySelector(`.js-input-${inputClass}`)
      .classList.add('card-form__input--invalid');
  }

  #hideRedOutline(inputClass) {
    this.#parentEl
      .querySelector(`.js-input-${inputClass}`)
      .classList.remove('card-form__input--invalid');
  }
}

export default new FormView();
