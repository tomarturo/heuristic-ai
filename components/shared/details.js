export class CustomDetails extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border: solid 1px var(--sl-color-neutral-200);
          border-radius: var(--sl-border-radius-medium);
          background-color: var(--sl-color-neutral-0);
          overflow: hidden;
          position: relative;
        }
        
        .content {
          padding: var(--sl-spacing-medium);
          max-height: ${this.open ? 'none' : '200px'};
          overflow: hidden;
          position: relative;
        }
        
        .content::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(to bottom, transparent, white);
          pointer-events: none;
          opacity: ${this.open ? '0' : '1'};
          transition: opacity 0.3s ease;
        }
        
        .toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--sl-spacing-small);
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.8), white);
          border-top: 1px solid var(--sl-color-neutral-100);
          cursor: pointer;
          font-size: var(--sl-font-size-small);
          color: var(--sl-color-neutral-600);
        }
      </style>
      
      <div class="content">
        <slot></slot>
      </div>
      <div class="toggle" @click="${this.toggle}">
        ${this.open ? 'Collapse' : 'Expand'}
      </div>
    `;
  }

  toggle() {
    this.open = !this.open;
    this.render();
  }

  static get observedAttributes() {
    return ['open'];
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(value) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }
}

customElements.define('custom-details', CustomDetails);