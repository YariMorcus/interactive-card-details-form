import backCardView from './Views/backCardView';
import formView from './Views/formView';
import frontCardView from './Views/frontCardView';
import state from './model';

import {
  CLASS_NAME_CARDHOLDER_NAME,
  CLASS_NAME_CARD_NUMBER,
  CLASS_NAME_CVC,
  CLASS_NAME_EXP_DATE_MM,
  CLASS_NAME_EXP_DATE_YY,
  CVC_TRUNCATE_LENGTH,
  DEFAULT_CARD_NUMBER_WHEN_INPUT_FIELD_IS_EMPTY,
  DEFAULT_EXP_DATE_MM_WHEN_INPUT_FIELD_IS_EMPTY,
  EXP_DATE_MM_TRUNCATE_LENGTH,
  EXP_DATE_YY_TRUNCATE_LENGTH,
} from './config';

import { isEmpty, isInvalidFormat } from './helper';

const errorController = function errorController(data, inputEl) {
  // Check if field is empty
  if (isEmpty(data)) return formView.renderError(inputEl);

  // Check if field matches format
  const [isInvalid, statusCode] = isInvalidFormat(data, inputEl);

  // console.log('🚀 ~ errorController ~ isInvalid:', isInvalid);
  // console.log('🚀 ~ errorController ~ statusCode:', statusCode);

  if (isInvalid) return formView.renderError(inputEl, statusCode);

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
  // Prevent more than 2 numbers to be shown
  formView.truncateNumbers(inputEl, EXP_DATE_MM_TRUNCATE_LENGTH);

  // Retrieve exp date mm
  const expDateMM = formView.retrieveCardExpDateMM();

  // Apply error handling
  errorController(expDateMM, inputEl);

  // Save exp date mm
  state.expDateMM = expDateMM;

  // Render exp date mm
  state.expDateMM === ''
    ? frontCardView.renderExpDateMM(
        DEFAULT_EXP_DATE_MM_WHEN_INPUT_FIELD_IS_EMPTY
      )
    : frontCardView.renderExpDateMM(state.expDateMM);
};

/**
 * Controller is used to handle the exp date yy when input field changed
 * @returns {undefined}
 */
// todo:  fix missing error when both mm and yy fields are empty and one is filled in
const expDateYYController = function expDateYYController(inputEl) {
  // Prevent more than 4 numbers to be shown
  formView.truncateNumbers(inputEl, EXP_DATE_YY_TRUNCATE_LENGTH);

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
  // Prevent more than 3 numbers to be shown
  formView.truncateNumbers(inputEl, CVC_TRUNCATE_LENGTH);

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
