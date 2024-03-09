import "./neu-notice.scss";

export class NeuNotice extends HTMLElement {
  _active;
  _timerId;

  constructor() {
    super();
    this._active = false;
    this._timerId = 0;
  }

  connectedCallback() {
    this.render();
    this.querySelector('.neu-notice-close')?.addEventListener('click', () => {
      this.active = false;
    });
    
  }

  disconnectedCallback() {
    if (this._timerId) {
      clearTimeout(this._timerId);
    }
  }
  
  static get observedAttributes() {
    return ['timer-id', 'timer-active'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'timer-id' && oldValue !== newValue) {
      this._timerId = Number(newValue);
    }
    if (name === 'timer-active' && oldValue !== newValue) {
      this.active = newValue === 'true'; // Convert the attribute value to a boolean
    }
  }

  set active(value) {
    this._active = value;
    this.render();
  }

  get active() {
    return this._active;
  }

  render() {
    this.innerHTML = `
      <div class="neu-notice" role="region" aria-labelledby="neu-notice-title" style="${this.active ? '' : 'display: none;'}">
        <h2 id="neu-card-title" style="display:none;">Neu Notice</h2>
        <slot class="neu-notice-close" name=close>&times;</slot>
        <slot></slot>
      </div>
    `;
  }
}
customElements.define("neu-notice", NeuNotice);


