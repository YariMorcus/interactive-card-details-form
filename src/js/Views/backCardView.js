import View from './View';

class BackCardView extends View {
  _parentEl = document.querySelector('.card-back');

  renderCardCVC(cvc) {
    this._parentEl.querySelector('#js-card-back__cvc').innerText = cvc;
  }
}

export default new BackCardView();
