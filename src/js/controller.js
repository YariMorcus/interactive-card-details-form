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

const formController = function formController(curInput) {
  // Retrieve cardholder name and render data in UI
  if (curInput === CLASS_NAME_CARDHOLDER_NAME) {
    state.cardholderName = formView.retrieveCardHolderName();
    frontCardView.renderCardHolderName(state.cardholderName);
  }

  // Retrieve card number and render data in UI
  if (curInput === CLASS_NAME_CARD_NUMBER) {
    // TODO: fix jumping issue when no card number is given
    state.cardNumber = formView.retrieveCardNumber();
    frontCardView.renderCardNumber(state.cardNumber);
  }

  // Retrieve exp date mm and render data in UI
  if (curInput === CLASS_NAME_EXP_DATE_MM) {
    state.expDateMM = formView.retrieveCardExpDateMM();
    frontCardView.renderExpDateMM(state.expDateMM);
  }

  // Retrieve exp date yy and render data in UI
  if (curInput === CLASS_NAME_EXP_DATE_YY) {
    state.expDateYY = formView.retrieveCardExpDateYY();
    frontCardView.renderExpDateYY(state.expDateYY);
  }

  // Retrieve cvc and render data in UI
  if (curInput === CLASS_NAME_CVC) {
    state.cvc = formView.retrieveCardCVC();
    backCardView.renderCardCVC(state.cvc);
  }
};

const init = function init() {
  formView.addHandlerInputChange(formController);
};

init();
