export class CustomDetails extends HTMLElement {
  constructor() {
    super();
    console.log('CustomDetails constructor called');
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('CustomDetails connected to DOM');
    this.render();
    this.attachEventListeners();
  }

  render() {
    console.log('Rendering CustomDetails, open state:', this.open);
    this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                background-color: var(--sl-color-neutral-0);
                overflow: hidden;
                position: relative;
                border: 1px solid var(--sl-color-neutral-200);
                border-radius: var(--sl-border-radius-medium);
            }

            .content {
                max-height: ${this.open ? 'none' : '320px'};
                overflow: hidden;
                position: relative;
            }
            
            .content::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 100px;
                background: linear-gradient(to bottom, transparent, var(--sl-color-neutral-50));
                pointer-events: none;
                opacity: ${this.open ? '0' : '1'};
                transition: opacity 0.3s ease;
            }

            .toggle {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: var(--sl-spacing-2x-small);
                padding: var(--sl-spacing-small);
                background: var(--sl-color-neutral-50);
                border-bottom-right-radius: var(--sl-border-radius-medium);
                border-bottom-left-radius: var(--sl-border-radius-medium);
                cursor: pointer;
                font-size: var(--sl-font-size-small);
                color: var(--sl-color-neutral-600);
            }

            .toggle sl-icon {
                font-size: var(--sl-font-size-medium);
            }

            .toggle:hover {
                color: var(--sl-color-primary-600);
            }
        </style>
      
      <div class="content">
        <slot></slot>
      </div>
      <div class="toggle">
        ${this.open ? 'Collapse' : 'Expand'}
        ${this.open ? `<sl-icon name="chevron-contract"></sl-icon>` : `<sl-icon name="chevron-expand"></sl-icon>` }
      </div>
    `;
  }

  attachEventListeners() {
    console.log('Attaching event listeners');
    const toggleButton = this.shadowRoot.querySelector('.toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        console.log('Toggle clicked, current state:', this.open);
        this.toggle();
      });
    } else {
      console.error('Toggle button not found in shadow DOM');
    }
  }

  toggle() {
    console.log('Toggle method called, changing from:', this.open);
    this.open = !this.open;
    console.log('New state:', this.open);
    this.render();
    this.attachEventListeners(); // Re-attach after re-render
  }

  static get observedAttributes() {
    return ['open'];
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(value) {
    console.log('Setting open to:', value);
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }
}

customElements.define('custom-details', CustomDetails);