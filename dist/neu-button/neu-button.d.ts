/**
 * Represents a custom button element with a ribbon.
 * @extends HTMLElement
 */
export declare class NeuButton extends HTMLElement {
    /**
     * Indicates whether the ribbon should be shown.
     * @type {boolean}
     */
    showRibbon: boolean;
    /**
     * The text to be displayed on the ribbon.
     * @type {string}
     */
    ribbonText: string;
    /**
     * Indicates whether the element is connected to the DOM.
     * @type {boolean}
     * @private
     */
    _isConnected: boolean;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Returns an array of attribute names to observe for changes.
     * @returns {string[]} The observed attribute names.
     */
    static get observedAttributes(): string[];
    /**
     * Called when an observed attribute has changed.
     * @param {string} name - The name of the attribute that changed.
     * @param {string} oldValue - The previous value of the attribute.
     * @param {string} newValue - The new value of the attribute.
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    /**
     * Renders the button element with the specified ribbon.
     */
    render(): void;
}
