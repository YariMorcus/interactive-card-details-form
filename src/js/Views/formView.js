import {
  CLASS_NAME_CARDHOLDER_NAME,
  CLASS_NAME_CARD_NUMBER,
  CLASS_NAME_CVC,
  CLASS_NAME_EXP_DATE_MM,
  CLASS_NAME_EXP_DATE_YY,
} from '../config';
import View from './View';

class FormView extends View {
  #parentEl = document.querySelector('.card-form');

  addHandlerInputChange(handler) {
    this.#parentEl.addEventListener('input', (e) => {
      const input = e.target.classList.contains('card-form__input');

      if (!input) return;

      // Retrieve full class list
      let changedInput = e.target.className;

      // Extract field name to identify correct error span
      if (changedInput.includes(CLASS_NAME_CARDHOLDER_NAME))
        changedInput = CLASS_NAME_CARDHOLDER_NAME;

      if (changedInput.includes(CLASS_NAME_CARD_NUMBER))
        changedInput = CLASS_NAME_CARD_NUMBER;

      if (changedInput.includes(CLASS_NAME_EXP_DATE_MM))
        changedInput = CLASS_NAME_EXP_DATE_MM;

      if (changedInput.includes(CLASS_NAME_EXP_DATE_YY))
        changedInput = CLASS_NAME_EXP_DATE_YY;

      if (changedInput.includes(CLASS_NAME_CVC)) changedInput = CLASS_NAME_CVC;

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
    if (inputClass === 'exp-mm' || inputClass === 'exp-yy') {
      this.#parentEl
        .querySelector(`#card-form__error-exp-date`)
        .classList.add('card-form__error--visible');

      this.#parentEl.querySelector(`#card-form__error-exp-date`).innerText =
        error;
      return;
    }

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
    if (inputClass === 'exp-mm' || inputClass === 'exp-yy') {
      this.#parentEl
        .querySelector(`#card-form__error-exp-date`)
        .classList.remove('card-form__error--visible');

      this.#parentEl.querySelector(`#card-form__error-exp-date`).innerText = '';
      return;
    }

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
