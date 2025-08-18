import { prompts } from '../../data/prompts.js';
import { methods } from '../../data/methods.js';
import '../shared/prompt-card.js';

export class PromptsPage extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    truncateText(text, maxLength = 150) {
        if (text.length <= maxLength) return text.trim();
        return text.substring(0, maxLength).trim() + '...';
    }

    render() {
        this.innerHTML = `
            <section class="two-col-layout">
                <div class="main-column">
                    <div class="page-header">
                        <h1>Prompts</h1>
                        <p class="page-description">I explore four methodologies for directing large language models to conduct comprehensive heuristic assessments of user interfaces. Within each methodology I test multiple prompts and prompt iterations.</p>
                    </div>
                    <div>
                    ${methods.map(method => `
                        <div class="method-section">
                            <h2>${method.title}</h2>
                            <p class="text-muted">${method.description}</p>
                            <p class="prompt-count">Prompts found: ${prompts.filter(prompt => prompt.type === method.type).length}</p>
                            <div class="prompts-grid">
                                ${prompts
                                    .filter(prompt => prompt.type === method.type)
                                    .map(prompt => `
                                        <div class="prompt-card" data-prompt-id="${prompt.id}">
                                            <div class="prompt-card-content">
                                                <h3 class="prompt-card-title">${prompt.title}</h3>
                                                <p class="prompt-card-description">${this.truncateText(prompt.description)}</p>
                                                <div class="prompt-card-meta">
                                                    <sl-tag size="small" variant="neutral">
                                                        <sl-icon name="braces"></sl-icon>
                                                        ${prompt.name || prompt.id}
                                                    </sl-tag>
                                                    ${prompt.versions ? 
                                                        `<sl-tag size="small" variant="primary">
                                                            <sl-icon name="layers"></sl-icon>
                                                            ${prompt.versions.length} versions
                                                        </sl-tag>` : ''
                                                    }
                                                </div>
                                            </div>
                                            <div class="prompt-card-arrow">
                                                <sl-icon name="arrow-right"></sl-icon>
                                            </div>
                                        </div>
                                    `).join('')}
                            </div>
                        </div>
                    `).join('')}
                    </div>
                </div>

                <!-- Table of Contents Right Rail -->

                <div class="right-rail">
                    <div class="toc-header">
                        <h3>Methods</h3>
                    </div>
                    <section class="toc-nav">
                        <ul class="toc-list">
                            ${methods.map(method => `
                                <li><a href="#${method.type}" class="toc-link">${method.title}</a></li>
                            `).join('')}
                        </ul>
                    </section>
                </div>

            </section>
        `;
    }

    setupEventListeners() {
        // Handle prompt card clicks
        this.addEventListener('click', (event) => {
            const promptCard = event.target.closest('.prompt-card');
            if (promptCard) {
                const promptId = promptCard.getAttribute('data-prompt-id');
                if (promptId) {
                    window.location.hash = `#prompts/${promptId}`;
                }
            }
        });
    }
}

customElements.define('prompts-page', PromptsPage);