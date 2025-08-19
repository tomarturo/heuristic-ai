export class NotFoundPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <section class="two-col-layout">
                <div class="main-column">
                    <div class="not-found">
                        <sl-icon name="exclamation-triangle" style="font-size: 3rem; color: var(--sl-color-warning-600); margin-bottom: 1rem;"></sl-icon>
                        <h2>Page Not Found</h2>
                        <p>The page you're looking for doesn't exist or may have been moved.</p>
                        <sl-button variant="primary" href="#prompts">
                            <sl-icon slot="prefix" name="arrow-left"></sl-icon>
                            Back to Prompts
                        </sl-button>
                    </div>
                </div>
                <div class="right-rail"></div>
            </section>
        `;
    }
}

customElements.define('not-found-page', NotFoundPage);