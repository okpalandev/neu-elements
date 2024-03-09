import "./neu-notice.scss";
export declare class NeuNotice extends HTMLElement {
    _active: boolean;
    _timerId: number;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    set active(value: boolean);
    get active(): boolean;
    render(): void;
}
