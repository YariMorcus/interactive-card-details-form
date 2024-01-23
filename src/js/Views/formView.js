import View from './View';

class FormView extends View {
  #parentEl = document.querySelector('.card-form');

  addHandlerInputChange(handler) {
    this.#parentEl.addEventListener('input', (e) => {
      const input = e.target.classList.contains('card-form__input');
      if (!input) return;
      handler();
    });
  }
}

export default new FormView();
