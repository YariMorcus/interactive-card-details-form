import View from './View';

class FrontCardView extends View {
  _parentEl = document.querySelector('.card-front');

  /**
   * Render the cardholder name onto the card
   * @param {string} name the cardholder name
   */
  renderCardHolderName(name) {
    this._parentEl.querySelector('#js-card-front__cardholder-name').innerText =
      name;
  }

  /**
   * Renders the card number onto the card
   * @param {string} number the card number
   */
  renderCardNumber(number) {
    this._parentEl.querySelector('#js-card-front__card-number').innerText =
      this.#createNumberGroup(number);
  }

  /**
   * Renders the expiry date month onto the card
   * @param {string} expDateMM the expiry date month
   */
  renderExpDateMM(expDateMM) {
    // If month contains 1 digit, append it with a 0
    this._parentEl.querySelector('#js-card-front__exp-date-mm').innerText =
      expDateMM.length === 1 ? expDateMM.padStart(2, 0) : expDateMM;
  }

  /**
   * Renders the expiry date year onto the card
   * @param {string} expDateYY the expiry date year
   */
  renderExpDateYY(expDateYY) {
    this._parentEl.querySelector('#js-card-front__exp-date-yy').innerText =
      expDateYY;
  }

  /**
   * Adds a whitespace after every 4th number to create a number existing of 4 separate groups
   * @param {string} number single number string without groups (e.g. 1234567890123456)
   * @returns {string} number group (e.g. 1234 5678 9012 3456)
   */
  #createNumberGroup(number) {
    return [...number]
      .map((num, ind) => {
        return ind % 4 === 0 && ind !== 0 ? [' ', num] : num;
      })
      .flat()
      .join('');
  }
}

export default new FrontCardView();
