/**
 * Represents a custom button element with a ribbon.
 * @extends HTMLElement
 */
export class NeuButton extends HTMLElement {
  /**
   * Indicates whether the ribbon should be shown.
   * @type {boolean}
   */
  showRibbon;

  /**
   * The text to be displayed on the ribbon.
   * @type {string}
   */
  ribbonText;
  private _isConnected: boolean;

  constructor() {
    super();
    this._isConnected = false;
    this.showRibbon = false;
    this.ribbonText = '';
  }
  /**
   * Indicates whether the element is connected to the DOM.
   * @type {boolean}
   * @private
   */

  connectedCallback() {
    this._isConnected = true;
    this.render();
  }
  /**
   * Indicates whether the element is connected to the DOM.
   * @type {boolean}
   * @private
   * @returns {boolean} True if the element is connected to the DOM, otherwise false.
   */
  disconnectedCallback() {
    this._isConnected = false;
  }

  /**
   * Returns an array of attribute names to observe for changes.
   * @returns {string[]} The observed attribute names.
   */
  static get observedAttributes() {
    return ['ribbon-text', 'show-ribbon'];
  }

  /**
   * Called when an observed attribute has changed.
   * @param {string} name - The name of the attribute that changed.
   * @param {string} oldValue - The previous value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'ribbon-text' && oldValue !== newValue) {
      this.ribbonText = newValue ?? ''; // Assign an empty string if newValue is null
    }
    if (name === 'show-ribbon' && oldValue !== newValue) {
      this.showRibbon = newValue === 'true'; // convert string to boolean
    }
    if (this._isConnected) {
      this.render();
    }
  }
  
  

  /**
   * Renders the button element with the specified ribbon.
   */
  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
      <style>
      @import '../scss/tools.scss';
      @import 'neu-button.scss';
      </style>
        <div class="neu-button ${this.showRibbon ? 'neu-shadow-light' : 'neu-light'}"
          role="button" 
          aria-label="Neu" 
          aria-pressed="false">
          <slot></slot>
          ${this.showRibbon ? `<div class="neu-ribbon">${this.ribbonText}</div>` : ''}
        </div>
      `;
    }
  }
}

customElements.define('neu-button', NeuButton, { extends: 'button' });

