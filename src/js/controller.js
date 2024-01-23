import formView from './Views/formView';

const formController = function formController() {};

const init = function init() {
  formView.addHandlerInputChange(formController);
};

init();
