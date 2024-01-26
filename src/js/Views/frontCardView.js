import View from './View';

class FrontCardView extends View {
  _parentEl = document.querySelector('.card-front');

  renderCardHolderName(name) {
    this._parentEl.querySelector('#js-card-front__cardholder-name').innerText =
      name;
  }

  renderCardNumber(number) {
    this._parentEl.querySelector('#js-card-front__card-number').innerText =
      number;
  }

  renderExpDateMM(expDateMM) {
    this._parentEl.querySelector('#js-card-front__exp-date-mm').innerText =
      expDateMM.length === 1 ? expDateMM.padStart(2, 0) : expDateMM;
  }

  renderExpDateYY(expDateYY) {
    this._parentEl.querySelector('#js-card-front__exp-date-yy').innerText =
      expDateYY;
  }
}

export default new FrontCardView();
