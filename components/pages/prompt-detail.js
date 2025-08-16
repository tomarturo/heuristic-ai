// components/pages/prompt-detail.js - Simplified version
import { prompts } from '../../data/prompts.js';

const converter = new showdown.Converter({
    simpleLineBreaks: true,
});

export class PromptDetail extends HTMLElement {
    constructor() {
        super();
        this.prompt = null;
        this.selectedVersion = null;
    }

    static get observedAttributes() {
        return ['prompt-id'];
    }

    connectedCallback() {
        this.loadPrompt();
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'prompt-id' && oldValue !== newValue) {
            this.loadPrompt();
            if (this.isConnected) {
                this.render();
            }
        }
    }

    loadPrompt() {
        const promptId = this.getAttribute('prompt-id');
        this.prompt = prompts.find(p => p.id === promptId);
        
        // Set default version if prompt has multiple versions
        if (this.prompt?.versions) {
            this.selectedVersion = this.prompt.versions[0];
        } else {
            this.selectedVersion = this.prompt;
        }
    }

    render() {
        if (!this.prompt) {
            this.renderNotFound();
            return;
        }

        this.innerHTML = `
                <div class="prompt-header">
                    <h1>${this.prompt.title}</h1>
                    <p class="prompt-description">${this.prompt.description}</p>
                    ${this.renderVersionSelector()}
                </div>
                <sl-tab-group class="prompt-tabs">
                    <sl-tab slot="nav" panel="details">Prompt Details</sl-tab>
                    <sl-tab slot="nav" panel="output">Sample Output</sl-tab>
                    <sl-tab-panel name="details">
                        ${this.renderPromptDetails()}
                    </sl-tab-panel>
                    <sl-tab-panel name="output">
                        ${this.renderSampleOutput()}
                    </sl-tab-panel>
                </sl-tab-group>
        `;

        this.attachEventListeners();
    }

    renderVersionSelector() {
        // Only show version selector if there are multiple versions
        if (!this.prompt.versions || this.prompt.versions.length <= 1) {
            return '';
        }

        return `
            <div class="version-selector">
                <label for="version-select">Version:</label>
                <sl-select id="version-select" value="${this.selectedVersion.id}" size="small">
                    ${this.prompt.versions.map(version => `
                        <sl-option value="${version.id}">${version.name}</sl-option>
                    `).join('')}
                </sl-select>
            </div>
        `;
    }

    renderPromptDetails() {
        const htmlContent = converter.makeHtml(this.selectedVersion.prompt || this.selectedVersion.content);
        
        return `
            <div class="prompt-wrapper">
                <div class="prompt-meta">
                    <div class="prompt-info">
                        <sl-tag size="small" variant="primary">
                            <sl-icon name="braces"></sl-icon>
                            ${this.selectedVersion.name || this.prompt.name}
                        </sl-tag>
                        <span class="prompt-stats">
                            ${this.getWordCount()} words • ~${Math.ceil(this.getWordCount() * 1.3)} tokens
                        </span>
                    </div>
                    <sl-copy-button 
                        value="${this.escapeHtml(this.selectedVersion.prompt || this.selectedVersion.content)}"
                        copy-label="Copy prompt"
                        success-label="Copied!">
                    </sl-copy-button>
                </div>
                
                <div class="prompt-content">
                    ${htmlContent}
                </div>

                <div class="prompt-footer">
                    <div class="usage-tips">
                        <h4>Usage Tips</h4>
                        <ul>
                            <li>Works best with vision-capable models (GPT-4 Vision, Claude 3, etc.)</li>
                            <li>Attach high-resolution, clear screenshots</li>
                            <li>Include the full interface for comprehensive analysis</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    renderSampleOutput() {
        const output = this.selectedVersion.output || this.prompt.output;
        
        return `
            <div class="output-wrapper">
                <div class="output-meta">
                    <div class="model-info">
                        <sl-tag variant="neutral" size="small">
                            <sl-icon name="cpu"></sl-icon>
                            GPT-4 Vision
                        </sl-tag>
                        <sl-tag variant="neutral" size="small">
                            <sl-icon name="dollar-sign"></sl-icon>
                            ~$0.12
                        </sl-tag>
                        <sl-tag variant="neutral" size="small">
                            <sl-icon name="clock"></sl-icon>
                            ~15s
                        </sl-tag>
                    </div>
                </div>
                
                ${output ? 
                    `<div class="output-content">
                        <div class="output-text">${output}</div>
                     </div>` :
                    `<div class="output-placeholder">
                        <sl-icon name="play-circle" style="font-size: 2.5rem; opacity: 0.5; margin-bottom: 1rem;"></sl-icon>
                        <h3>Sample Output Coming Soon</h3>
                        <p>We're preparing example outputs for this prompt version.</p>
                        <p class="placeholder-note">You can copy and test the prompt yourself in the meantime.</p>
                     </div>`
                }

                <div class="output-footer">
                    <p class="output-note">
                        This sample was generated using a screenshot of Airbnb's checkout flow. 
                        Results may vary depending on the interface and image quality.
                    </p>
                </div>
            </div>
        `;
    }

    renderNotFound() {
        this.innerHTML = `
            <div>
                <div class="not-found">
                    <sl-icon name="exclamation-triangle" style="font-size: 3rem; color: var(--sl-color-warning-600); margin-bottom: 1rem;"></sl-icon>
                    <h2>Prompt Not Found</h2>
                    <p>The prompt you're looking for doesn't exist or may have been moved.</p>
                    <sl-button variant="primary" href="#prompts">
                        <sl-icon slot="prefix" name="arrow-left"></sl-icon>
                        Back to Prompts
                    </sl-button>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Handle version selector changes
        const versionSelect = this.querySelector('#version-select');
        if (versionSelect) {
            versionSelect.addEventListener('sl-change', (e) => {
                const selectedId = e.target.value;
                this.selectedVersion = this.prompt.versions.find(v => v.id === selectedId);
                this.updateTabContent();
            });
        }

        // Handle copy events
        const copyButton = this.querySelector('sl-copy-button');
        if (copyButton) {
            copyButton.addEventListener('sl-copy', () => {
                console.log('Prompt copied:', this.selectedVersion.name || this.prompt.name);
            });
        }
    }

    updateTabContent() {
        // Update both tab panels with new version content
        const detailsPanel = this.querySelector('sl-tab-panel[name="details"]');
        const outputPanel = this.querySelector('sl-tab-panel[name="output"]');
        
        if (detailsPanel) {
            detailsPanel.innerHTML = this.renderPromptDetails();
        }
        
        if (outputPanel) {
            outputPanel.innerHTML = this.renderSampleOutput();
        }

        // Re-attach listeners for the new content
        this.attachEventListeners();
    }

    getWordCount() {
        const content = this.selectedVersion.prompt || this.selectedVersion.content || '';
        return content.trim().split(/\s+/).length;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

customElements.define('prompt-detail', PromptDetail);