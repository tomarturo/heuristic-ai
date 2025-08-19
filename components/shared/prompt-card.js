export class PromptCard extends HTMLElement {
    static get observedAttributes() {
        return ['data-prompt-id', 'data-title', 'data-description', 'data-name'];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    attributeChangedCallback() {
        this.render();
    }

    get promptId() {
        return this.getAttribute('data-prompt-id');
    }

    get title() {
        return this.getAttribute('data-title');
    }

    get description() {
        return this.getAttribute('data-description');
    }

    get name() {
        return this.getAttribute('data-name');
    }

    render() {
        this.innerHTML = `
            <div class="prompt-card">
                <div class="prompt-card-content">
                    <h3 class="prompt-card-title">
                        <a href="#prompts/${this.promptId}" class="prompt-card-link">
                            ${this.title}
                        </a>
                    </h3>
                    <p class="prompt-card-description">${this.description}</p>
                </div>
                <div class="prompt-card-meta">
                    <sl-tag class="card-tag" size="small" variant="neutral">
                        <sl-icon name="braces"></sl-icon>
                        ${this.name}
                    </sl-tag>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const link = this.querySelector('.prompt-card-link');
        if (link) {
            link.addEventListener('click', (e) => {
                // Optional: Add analytics or custom handling here
                console.log(`Navigating to prompt: ${this.promptId}`);
            });
        }

        // Make the entire card clickable
        this.addEventListener('click', (e) => {
            // Only trigger if not clicking on a link directly
            if (!e.target.closest('a')) {
                window.location.hash = `#prompts/${this.promptId}`;
            }
        });
    }
}

customElements.define('prompt-card', PromptCard);