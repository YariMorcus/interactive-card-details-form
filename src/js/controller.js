import backCardView from './Views/backCardView';
import formView from './Views/formView';
import frontCardView from './Views/frontCardView';
import {
  CLASS_NAME_CARDHOLDER_NAME,
  CLASS_NAME_CARD_NUMBER,
  CLASS_NAME_CVC,
  CLASS_NAME_EXP_DATE_MM,
  CLASS_NAME_EXP_DATE_YY,
  DEFAULT_CARD_NUMBER_WHEN_INPUT_FIELD_IS_EMPTY,
} from './config';
import state from './model';

import { isEmpty, isInvalidFormat } from './helper';

const errorController = function errorController(data, inputEl) {
  if (isEmpty(data)) return formView.renderError(inputEl);

  // 1. Check if card number is in right format
  if (isInvalidFormat(data, inputEl))
    return formView.renderError(inputEl, 'Wrong format, numbers only');

  formView.hideError(inputEl);
};

/**
 * Controller is used to handle the cardholder name when input field changed
 * @returns {undefined}
 */
const cardHolderNameController = function cardHolderNameController(inputEl) {
  // Retrieve cardholder name
  const name = formView.retrieveCardHolderName();

  // Apply error handling
  errorController(name, inputEl);

  // Save cardholder name
  state.cardholderName = name;

  // Render cardholder name
  frontCardView.renderCardHolderName(state.cardholderName);
};

/**
 * Controller is used to handle the card number when input field changed
 * @returns {undefined}
 */
const cardNumberController = function cardNumberController(inputEl) {
  // Retrieve card number
  const cardNumber = formView.retrieveCardNumber();

  // Apply error handling
  errorController(cardNumber, inputEl);

  // Save card number
  state.cardNumber = cardNumber;

  // Render card number
  state.cardNumber === ''
    ? frontCardView.renderCardNumber(
        DEFAULT_CARD_NUMBER_WHEN_INPUT_FIELD_IS_EMPTY
      )
    : frontCardView.renderCardNumber(state.cardNumber);
};

/**
 * Controller is used to handle the exp date mm when input field changed
 * @returns {undefined}
 */
const expDateMMController = function expDateMMController(inputEl) {
  // Retrieve exp date mm
  const expDateMM = formView.retrieveCardExpDateMM();

  // Apply error handling
  errorController(expDateMM, inputEl);

  // Save exp date mm
  state.expDateMM = expDateMM;

  // Render exp date mm
  frontCardView.renderExpDateMM(state.expDateMM);
};

/**
 * Controller is used to handle the exp date yy when input field changed
 * @returns {undefined}
 */
const expDateYYController = function expDateYYController(inputEl) {
  // Retrieve exp date yy
  const expDateYY = formView.retrieveCardExpDateYY();

  // Apply error handling
  errorController(expDateYY, inputEl);

  // Save exp date yy
  state.expDateYY = expDateYY;

  // Render exp date yy
  frontCardView.renderExpDateYY(state.expDateYY);
};

/**
 * Controller is used to handle the card cvc when input field changed
 * @returns {undefined}
 */
const cardCVCController = function cardCVCController(inputEl) {
  // Retrieve card cvc
  const cvc = formView.retrieveCardCVC();

  // Apply error handling
  errorController(cvc, inputEl);

  // Save card cvc
  state.cvc = cvc;

  // Render card cvc
  backCardView.renderCardCVC(state.cvc);
};

/**
 * General controller of the form
 * Controller links to several sub controllers that each handle
 * their own input field
 * @returns {undefined}
 */
const formController = function formController(curInput) {
  // Retrieve cardholder name and render data in UI
  if (curInput === CLASS_NAME_CARDHOLDER_NAME)
    cardHolderNameController(curInput);

  // Retrieve card number and render data in UI
  if (curInput === CLASS_NAME_CARD_NUMBER) cardNumberController(curInput);

  // Retrieve exp date mm and render data in UI
  if (curInput === CLASS_NAME_EXP_DATE_MM) expDateMMController(curInput);

  // Retrieve exp date yy and render data in UI
  if (curInput === CLASS_NAME_EXP_DATE_YY) expDateYYController(curInput);

  // Retrieve cvc and render data in UI
  if (curInput === CLASS_NAME_CVC) cardCVCController(curInput);
};

const init = function init() {
  formView.addHandlerInputChange(formController);
};

init();
