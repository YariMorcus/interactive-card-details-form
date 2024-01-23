import backCardView from './Views/backCardView';
import formView from './Views/formView';
import frontCardView from './Views/frontCardView';
import {
  CLASS_NAME_CARDHOLDER_NAME,
  CLASS_NAME_CARD_NUMBER,
  CLASS_NAME_CVC,
  CLASS_NAME_EXP_DATE_MM,
  CLASS_NAME_EXP_DATE_YY,
} from './config';
import state from './model';

/**
 * Controller is used to handle the cardholder name when input field changed
 * @returns {undefined}
 */
const cardHolderNameController = function cardHolderNameController() {
  state.cardholderName = formView.retrieveCardHolderName();
  frontCardView.renderCardHolderName(state.cardholderName);
};

/**
 * Controller is used to handle the card number when input field changed
 * @returns {undefined}
 */
// TODO: fix jumping issue when no card number is given
const cardNumberController = function cardNumberController() {
  state.cardNumber = formView.retrieveCardNumber();
  frontCardView.renderCardNumber(state.cardNumber);
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
  if (curInput === CLASS_NAME_CARDHOLDER_NAME) cardHolderNameController();

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
