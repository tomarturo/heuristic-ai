import { prompts } from '../../data/prompts.js';
import '../shared/prompt-card.js';

export class PromptsPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <h1>Prompt Collection</h1>
            <sl-divider></sl-divider>
            <p>Explore the different prompting approaches we've tested for UX heuristic evaluation.</p>
            
            <div class="prompts-grid">
                ${prompts.map(prompt => `
                    <prompt-card 
                        data-prompt-id="${prompt.id}"
                        data-title="${prompt.title}"
                        data-description="${prompt.description}"
                        data-name="${prompt.name}">
                    </prompt-card>
                `).join('')}
            </div>
        `;
    }
}

customElements.define('prompts-page', PromptsPage);