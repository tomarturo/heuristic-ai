// components/app-shell.js
import { prompts } from "../data/prompts.js";
import { changes } from "../data/changelog.js";

const converter = new showdown.Converter({
    simpleLineBreaks: true,
});

const tagIcons = {
  "design": "palette",
  "development": "code", 
  "data": "database",
  "planning": "journal-text",
  "research": "search",
  "prompting":"braces"
};

class AppShell extends HTMLElement {
    constructor() {
        super();
        this.currentView = 'home';
        this.selectedPrompt = null;
    }

    connectedCallback() {
        this.setupHashRouting();
        this.render();
        this.handleRoute();
    }

    setupHashRouting() {
        window.addEventListener('hashchange', () => this.handleRoute());
    }

    handleRoute() {
        const hash = window.location.hash.slice(1);

        if (!hash) {
            this.currentView = 'home';
        } else if (hash === 'methodology') {
            this.currentView = 'methodology';
            this.selectedPrompt = null;
        } else if (hash.startsWith('prompts/')) {
            this.currentView = 'prompt-detail';
            const promptId = hash.split('/')[1];
            this.selectedPrompt = prompts.find(p => p.id === promptId);
        }

        this.render();
    }

    getSplitPanelPosition() {
        switch (this.currentView) {
            case 'home':
                return '75';
            case 'methodology':
                return '75';
            case 'prompt-detail':
                return '50';
            case 'default':
                return '50';
        }
    }

    render() {
        this.innerHTML = `
            <nav class="nav">
                ${this.renderNavigation()}
            </nav>
            <sl-split-panel position="${this.getSplitPanelPosition()}">
                <div slot="start">
                    ${this.renderLeftPanel()}
                </div>
                <div slot="end">         
                    ${this.renderRightPanel()}  
                </div>
            </sl-split-panel>
        `;
    }

    renderNavigation() {
        return `
        <a href="" class="nav-link ${this.currentView === 'home' ? 'active' : ''}">AI for Hueristics</a>
        <a href="#methodology" class="nav-link ${this.currentView === 'methodology' ? 'active' : ''}">Methodology</a>
        <p class="nav-subhead">Prompts</p>
        ${prompts.map(prompt => `
            <a href="#prompts/${prompt.id}" class="nav-link ${this.selectedPrompt?.id === prompt.id ? 'active' : ''}">
                ${prompt.title}
            </a>
        `).join('')}
    `;
    }

    renderLeftPanel() {
        switch (this.currentView) {
            case 'home':
                return `
                <div class="panel-content">
                    <h1>LLMs & UX Hueristic Analysis</h1>
                    <sl-divider></sl-divider>
                    <h3>Can large language models reliably conduct a UX hueristic analysis?</h3>
                    <p>A few posts on LinkedIn got me thinking about this question. Most of the attempts I read about were not particularly methodical, more or less attaching a screenshot to a prompt and blithely asking the model for a UX hueristic analysis based on its default dearth of information.</p>
                    <p>It struck me as a worthwile task, seeing how far we could get a model to perform this tried and true UX task.</p>
                    <p>The timing was opportune as well. I needed a compelling subject to motivate me to,</p>
                    <ul>
                    <li>Dig more methodically into prompting</li>
                    <li>Explore, think about how to document, and then document the results of different prompt strategies and methods</li>
                    <li>Illustrate to other product designers what it looks like to design deeply with LLMS</li>
                    </ul>
                    <p>A collection of ${prompts.length} curated AI prompts.</p>
                    <p>Start by exploring the methodology or individual prompts above.</p>
                </div>
            `;
            case 'methodology': 
                return `
                <div class="panel-content">
                    <h3>About This Project</h3>
                    <p>This collection explores various AI prompting techniques and methodologies.</p>
                    <p>Each prompt is designed to demonstrate specific approaches to AI interaction.</p>
                </div>
            `;
            case 'prompt-detail':
                const htmlContent = converter.makeHtml(this.selectedPrompt?.prompt || 'No prompt found');
                return `
                    <div class="panel-content">
                        <sl-tag pill size="small" variant="neutral">August 06 2025</sl-tag>
                        <h1>${this.selectedPrompt?.title} Prompt</h1>
                        <p>${this.selectedPrompt?.description}</p>
                        <div class="prompt-wrapper">
                            <div class="flex-apart">
                                <sl-tag size="small" variant="primary">
                                    <sl-icon name="braces"></sl-icon>
                                    ${this.selectedPrompt?.name}
                                </sl-tag>
                                <sl-copy-button from="prompt-text"></sl-copy-button>
                            </div>
                            <div class="prompt-content" id="prompt-text">${htmlContent}</div>
                        </div>
                    </div>
                `;
            default:
                return '<div class="panel-content">Select a view</div>';
        }
    }

    renderRightPanel() {
        switch (this.currentView) {
            case 'home':
                return `
                <div class="panel-content">
                    <h1>Changelog</h1>
                    <sl-divider></sl-divider>
                    <div class="changelog-wrapper">
                    ${changes.map(change => `
                        <div class="changelog-item">
                            <sl-tag pill size="medium" variant="neutral">${change.date}</sl-tag>
                            <p>${change.description}</p>
                            <div class="changelog-item-tags">
                            ${change.tags.map(tag => `
                                 <sl-tag size="small" variant="neutral">
                                    <sl-icon name="${tagIcons[tag] || 'tag'}"></sl-icon>
                                    ${tag}
                                </sl-tag>
                                `).join('')}
                            </div>
                        </div>
                            `).join('')}
                    </div>
                </div>
            `;
            case 'methodology':
                return `
                <div class="panel-content">
                    <h2>Prompting Methodology</h2>
                    <p>Explain your approach to AI prompting here...</p>
                    <h3>How to Use These Prompts</h3>
                    <p>Instructions for using the prompts effectively...</p>
                </div>
            `;
            case 'prompt-detail':
                return `
                <div class="panel-content">
                    <h2>${this.selectedPrompt?.title || 'Prompt Not Found'}</h2>
                    <h3>Example Output</h3>
                    <div class="output-content">${this.selectedPrompt?.output || 'No output available'}</div>
                </div>
            `;
            default:
                return '<div class="panel-content">Content area</div>';
        }
    }
}

customElements.define('app-shell', AppShell);