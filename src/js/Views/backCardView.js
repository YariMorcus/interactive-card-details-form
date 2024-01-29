import View from './View';

class BackCardView extends View {
  _parentEl = document.querySelector('.card-back');

  /**
   * Render the card CVC onto the back card
   * @param {string} cvc the card cvc (3-digits)
   */
  renderCardCVC(cvc) {
    this._parentEl.querySelector('#js-card-back__cvc').innerText = cvc;
  }
}

export default new BackCardView();
