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

import { isEmpty } from './helper';

/**
 * Controller is used to handle the cardholder name when input field changed
 * @returns {undefined}
 */
const cardHolderNameController = function cardHolderNameController(inputEl) {
  const name = formView.retrieveCardHolderName();

  if (isEmpty(name)) return formView.renderError(inputEl);

  formView.hideError(inputEl);

  state.cardholderName = name;
  frontCardView.renderCardHolderName(state.cardholderName);
};

/**
 * Controller is used to handle the card number when input field changed
 * @returns {undefined}
 */
const cardNumberController = function cardNumberController() {
  // Check if input field is empty, if yes, only show 0
  state.cardNumber = formView.retrieveCardNumber();

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
const expDateMMController = function expDateMMController() {
  state.expDateMM = formView.retrieveCardExpDateMM();
  frontCardView.renderExpDateMM(state.expDateMM);
};

/**
 * Controller is used to handle the exp date yy when input field changed
 * @returns {undefined}
 */
const expDateYYController = function expDateYYController() {
  state.expDateYY = formView.retrieveCardExpDateYY();
  frontCardView.renderExpDateYY(state.expDateYY);
};

/**
 * Controller is used to handle the card cvc when input field changed
 * @returns {undefined}
 */
const cardCVCController = function cardCVCController() {
  state.cvc = formView.retrieveCardCVC();
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
  if (curInput === CLASS_NAME_CARD_NUMBER) cardNumberController();

  // Retrieve exp date mm and render data in UI
  if (curInput === CLASS_NAME_EXP_DATE_MM) expDateMMController();

  // Retrieve exp date yy and render data in UI
  if (curInput === CLASS_NAME_EXP_DATE_YY) expDateYYController();

  // Retrieve cvc and render data in UI
  if (curInput === CLASS_NAME_CVC) cardCVCController();
};

const init = function init() {
  formView.addHandlerInputChange(formController);
};

init();
