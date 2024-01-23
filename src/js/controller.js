import formView from './Views/formView';
import state from './model';

const formController = function formController() {
  // 1. Retrieve form data
  state.cardholderName = formView.retrieveCardHolderName();
  state.cardNumber = formView.retrieveCardNumber();
  state.expDateMM = formView.retrieveCardExpDateMM();
  state.expDateYY = formView.retrieveCardExpDateYY();
  state.cvc = formView.retrieveCardCVC();

  // 2. Render form data on front card
};

const init = function init() {
  formView.addHandlerInputChange(formController);
};

init();
