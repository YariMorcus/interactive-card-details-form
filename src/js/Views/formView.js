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
  #errorMessageBlank = "Can't be blank";
  #errorMessageNumbersOnly = 'Wrong format, numbers only';
  #errorMessageTooLong = 'Card number can only be 16 digits (too long)';
  #errorMessageTooShort = 'Card number must be 16 digits';

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

  addHandlerSubmit(handler) {
    this.#parentEl.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }

  retrieveCardHolderName() {
    return this.#parentEl
      .querySelector('.js-input-cardholder-name')
      .value.trim();
  }

  retrieveCardNumber() {
    return this.#parentEl
      .querySelector('.js-input-card-number')
      .value.replaceAll(' ', '');
  }

  retrieveCardExpDateMM() {
    return this.#parentEl
      .querySelector('.js-input-exp-mm')
      .value.trim()
      .slice(0, 2);
  }

  retrieveCardExpDateYY() {
    return this.#parentEl.querySelector('.js-input-exp-yy').value.trim();
  }

  retrieveCardCVC() {
    return this.#parentEl.querySelector('.js-input-cvc').value.trim();
  }

  /**
   * Prevent user from filling in more characters than specified
   * @param {string} inputClass name of the input field
   * @param {trunc} number amount of characters to be shown
   */
  truncateNumbers(inputClass, trunc) {
    const inputField = this.#parentEl.querySelector(`.js-input-${inputClass}`);
    inputField.value = inputField.value.slice(0, trunc);
  }

  /**
   * Render error to corresponding field based status code
   * @param {string} inputClass name of the field
   * @param {number} [statusCode=1] the status code
   */
  renderError(inputClass, statusCode = 1) {
    // Retrieve corresponding error message based on status code
    const error = this.#statusCodeHandler(statusCode);

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
    // Set aria-invalid to false
    this.#toggleAria(inputClass, false);

    // Hide red outline
    this.#hideRedOutline(inputClass);

    // Hide error
    if (inputClass === 'exp-mm' || inputClass === 'exp-yy') {
      const expMMValue = this.#parentEl.querySelector(`.js-input-exp-mm`).value;
      const expYYValue = this.#parentEl.querySelector(`.js-input-exp-yy`).value;

      // If one of the input fields is filled in and other is empty,
      // do not hide the error for the other field
      if (expMMValue === '' || expYYValue === '') return;

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

  #statusCodeHandler(statusCode) {
    if (statusCode === 1) return this.#errorMessageBlank;
    if (statusCode === 2) return this.#errorMessageNumbersOnly;
    if (statusCode === 3) return this.#errorMessageTooLong;
    if (statusCode === 4) return this.#errorMessageTooShort;
  }
}

export default new FormView();
