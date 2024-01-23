import formView from './Views/formView';
import state from './model';

const formController = function formController(curInput) {
  // Retrieve form data
  if (curInput === 'cardholder-name')
    state.cardholderName = formView.retrieveCardHolderName();
  if (curInput === 'card-number')
    state.cardNumber = formView.retrieveCardNumber();
  if (curInput === 'exp-mm') state.expDateMM = formView.retrieveCardExpDateMM();
  if (curInput === 'exp-yy') state.expDateYY = formView.retrieveCardExpDateYY();
  if (curInput === 'cvc') state.cvc = formView.retrieveCardCVC();

  // 2. Render form data on front card
  // formView.render(state);
};

const init = function init() {
  formView.addHandlerInputChange(formController);
};

init();
