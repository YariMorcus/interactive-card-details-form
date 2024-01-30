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

  // Form prefixes and inputs
  #jsInputPrefix = '.js-input-';
  #cardFormInput = 'card-form__input';
  #inputCardholderName = '.js-input-cardholder-name';
  #inputCardNumber = '.js-input-card-number';
  #inputCardExpDateMM = '.js-input-exp-mm';
  #inputCardExpDateYY = '.js-input-exp-yy';
  #inputCardCVC = '.js-input-cvc';

  // Form error prefixes and placeholders
  #cardFormErrorPrefix = '#card-form__error-';
  #cardFormErrorExpDate = '#card-form__error-exp-date';

  // Form error outline class
  #cardFormInputInvalid = 'card-form__input--invalid';

  // Form error messages
  #cardFormErrorVisible = 'card-form__error--visible';
  #errorMessageBlank = "Can't be blank";
  #errorMessageNumbersOnly = 'Wrong format, numbers only';
  #errorMessageTooLong = 'Card number can only be 16 digits (too long)';
  #errorMessageTooShort = 'Card number must be 16 digits';

  addHandlerInputChange(handler) {
    this.#parentEl.addEventListener('input', (e) => {
      const input = e.target.classList.contains(this.#cardFormInput);

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

  /**
   * Retrieve cardholder name
   * @returns {string} cardholder name
   */
  retrieveCardHolderName() {
    return this.#parentEl.querySelector(this.#inputCardholderName).value.trim();
  }

  /**
   * Retrieve card number
   * @returns {string} card number (whitespace removed)
   */
  retrieveCardNumber() {
    return this.#parentEl
      .querySelector(this.#inputCardNumber)
      .value.replaceAll(' ', '');
  }
  /**
   * Retrieve card expiry date month
   * @returns {string} card expiry date month
   */
  retrieveCardExpDateMM() {
    return this.#parentEl
      .querySelector(this.#inputCardExpDateMM)
      .value.trim()
      .slice(0, 2);
  }

  /**
   * Retrieve card expiry date year
   * @returns {string} card expiry date year
   */
  retrieveCardExpDateYY() {
    return this.#parentEl.querySelector(this.#inputCardExpDateYY).value.trim();
  }

  /**
   * Retrieve card CVC
   * @returns {string} card CVC
   */
  retrieveCardCVC() {
    return this.#parentEl.querySelector(this.#inputCardCVC).value.trim();
  }

  /**
   * Prevent user from filling in more characters than specified
   * @param {string} inputClass name of the input field
   * @param {number} trunc amount of characters to be shown
   */
  truncateNumbers(inputClass, trunc) {
    const inputField = this.#parentEl.querySelector(
      `${this.#jsInputPrefix}${inputClass}`
    );
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

    // Set aria-invalid to true
    this.#toggleAria(inputClass, true);

    // Show red outline
    this.#showRedOutline(inputClass, true);

    // Show error
    if (inputClass === 'exp-mm' || inputClass === 'exp-yy') {
      this.#parentEl
        .querySelector(this.#cardFormErrorExpDate)
        .classList.add(this.#cardFormErrorVisible);

      this.#parentEl.querySelector(this.#cardFormErrorExpDate).innerText =
        error;
      return;
    }

    this.#parentEl
      .querySelector(`${this.#cardFormErrorPrefix}${inputClass}`)
      .classList.add(this.#cardFormErrorVisible);
    this.#parentEl.querySelector(
      `${this.#cardFormErrorPrefix}${inputClass}`
    ).innerText = error;
  }

  /**
   * Hide corresponding error
   * @param {string} inputClass class name
   * @returns {undefined}
   */
  hideError(inputClass) {
    // Set aria-invalid to false
    this.#toggleAria(inputClass, false);

    // Hide red outline
    this.#hideRedOutline(inputClass);

    // Hide error
    if (inputClass === 'exp-mm' || inputClass === 'exp-yy') {
      const expMMValue = this.#parentEl.querySelector(
        this.#inputCardExpDateMM
      ).value;
      const expYYValue = this.#parentEl.querySelector(
        this.#inputCardExpDateYY
      ).value;

      // If one of the input fields is filled in and other is empty,
      // do not hide the error for the other field
      if (expMMValue === '' || expYYValue === '') return;

      this.#parentEl
        .querySelector(this.#cardFormErrorExpDate)
        .classList.remove(this.#cardFormErrorVisible);

      this.#parentEl.querySelector(this.#cardFormErrorExpDate).innerText = '';
      return;
    }

    this.#parentEl
      .querySelector(`${this.#cardFormErrorPrefix}${inputClass}`)
      .classList.remove(this.#cardFormErrorVisible);
    this.#parentEl.querySelector(
      `${this.#cardFormErrorPrefix}${inputClass}`
    ).innerText = '';
  }

  /**
   * Toggle aria-invalid attribute
   * @param {string} inputClass class name
   * @param {bool} bool value to be set
   */
  #toggleAria(inputClass, bool) {
    this.#parentEl
      .querySelector(`${this.#jsInputPrefix}${inputClass}`)
      .setAttribute('aria-invalid', bool);
  }

  /**
   * Indicate that field has an error (red outline)
   * @param {string} inputClass class name
   */
  #showRedOutline(inputClass) {
    this.#parentEl
      .querySelector(`${this.#jsInputPrefix}${inputClass}`)
      .classList.add(this.#cardFormInputInvalid);
  }

  /**
   * Hide error outline
   * @param {string} inputClass class name
   */
  #hideRedOutline(inputClass) {
    this.#parentEl
      .querySelector(`${this.#jsInputPrefix}${inputClass}`)
      .classList.remove(this.#cardFormInputInvalid);
  }

  /**
   * Returns appropriate error message based on given status code
   * @param {number} statusCode current status code
   * @returns {string} the error message
   */
  #statusCodeHandler(statusCode) {
    if (statusCode === 1) return this.#errorMessageBlank;
    if (statusCode === 2) return this.#errorMessageNumbersOnly;
    if (statusCode === 3) return this.#errorMessageTooLong;
    if (statusCode === 4) return this.#errorMessageTooShort;
  }
}

export default new FormView();
