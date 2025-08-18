import { prompts } from '../../data/prompts.js';
import { methods } from '../../data/methods.js';
import '../shared/prompt-card.js';

export class PromptsPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <section class="two-col-layout">
                <div>
                    <div>
                        <h1>Prompts</h1>
                        <p class="sub-copy">I explore four methodologies for directing large language models to conduct comprehensive heuristic assessments of user interfaces. Within each methodology I test multiple prompts and prompt iterations.</p>
                    </div>
                    <div>
                    ${methods.map(method => `
                        <div>
                        <h2>${method.title}</h2>
                        <p class="text-muted">${method.description}</p>
                        <p>Prompts found: ${prompts.filter(prompt => prompt.type === method.type).length}</p>
                        ${prompts
                            .filter(prompt => prompt.type === method.type)
                            .map(prompt => `
                                <div class="prompt-item">
                                    <h3>${prompt.title}</h3>
                                    <p>${prompt.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    `).join('')}
                    </div>
                </div>

                <!-- Table of Contents Right Rail -->

                <div class="prompt-toc">
                    <div class="toc-header">
                        <h3>Contents</h3>
                    </div>
                    <section class="toc-nav">
                        <ul class="toc-list">
                            <li><a href="#overview" class="toc-link">Overview</a></li>
                            <li><a href="#prompt-detail" class="toc-link">Prompt Detail</a></li>
                            <li><a href="#sample-output" class="toc-link">Sample Output</a></li>
                            <li><a href="#usage" class="toc-link">Usage</a></li>
                        </ul>
                    </section>
                </div>

            </section>
        `;
    }
}

customElements.define('prompts-page', PromptsPage);