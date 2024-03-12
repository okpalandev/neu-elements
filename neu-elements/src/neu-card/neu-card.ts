import './neu-card.scss';

export class NeuCard extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }


  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    this.render();
  }
  
  render() {
     this.innerHTML = `
      <div class="neu-card" role="region" aria-labelledby="neu-card-title">
        <h2 id="neu-card-title" style="display:none">Neu Card</h2>
        <div class="neu-container" slot="neu-container">
          <slot></slot>
        </div>
      </div>
    `;
  }

}

customElements.define('neu-card', NeuCard);


