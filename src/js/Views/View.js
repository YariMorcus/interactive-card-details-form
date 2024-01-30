export default class View {
  _data = null;

  /**
   * Responsible for storing the data in the corresponding view and
   * rendering the markup
   * @param {string} [data] the data to be rendered
   */
  render(data) {
    this._data = data;

    const markup = this._generateMarkup();
    this.#clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Clear parent element of any existing HTML
   */
  #clear() {
    this._parentEl.innerHTML = '';
  }
}
