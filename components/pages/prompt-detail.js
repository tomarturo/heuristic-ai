// components/pages/prompt-detail.js - Inline version with TOC
import { prompts } from '../../data/prompts.js';
import '../../components/shared/details.js';
import { ScrollSpy } from '../../components/shared/scroll-spy.js';

const converter = new showdown.Converter({
    simpleLineBreaks: true,
});

export class PromptDetail extends HTMLElement {
    constructor() {
        super();
        this.prompt = null;
        this.selectedVersion = null;
        this.scrollSpy = null;
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
            <div class="two-col-layout">
                <!-- Main Content -->
                <div class="main-column">
                    ${this.renderOverview()}
                    ${this.renderPromptDetails()}
                    ${this.renderSampleOutput()}
                    ${this.renderUsage()}
                </div>
                
                <!-- Table of Contents Right Rail -->

                <div class="right-rail is-toc">
                    <h3 class="right-rail-header">On this page</h3>
                    <section class="toc-nav">
                        <ul class="toc-list">
                            <li><a href="#overview" class="toc-link">Overview</a></li>
                            <li><a href="#prompt-detail" class="toc-link">Prompt Details</a></li>
                            <li><a href="#sample-output" class="toc-link">Sample Output</a></li>
                            <li><a href="#usage" class="toc-link">Usage</a></li>
                        </ul>
                    </section>
                </div>
            </div>
        `;

        this.attachEventListeners();
        this.initializeScrollSpy();
    }

    renderOverview() {
        return `
            <section id="overview" class="page-section">
                <div class="page-header">
                    <h1>${this.prompt.title}</h1>
                    <p class="page-description">${this.prompt.description}</p>
                </div>
            </section>
        `;
    }

    // renderVersionSelector() {
    //     // Only show version selector if there are multiple versions
    //     if (!this.prompt.versions || this.prompt.versions.length <= 1) {
    //         return '';
    //     }

    //     return `
    //         <div class="version-selector">
    //             <sl-select id="version-select" value="${this.selectedVersion.id}" size="small">
    //                 ${this.prompt.versions.map(version => `
    //                     <sl-option value="${version.id}">${version.name}</sl-option>
    //                 `).join('')}
    //             </sl-select>
    //         </div>
    //     `;
    // }

    renderPromptDetails() {
        const htmlContent = converter.makeHtml(this.selectedVersion.prompt || this.selectedVersion.content);
        
        return `
            <section id="prompt-detail" class="page-section">
                <h2 class="section-title">Prompt Details</h2>
                <custom-details>
                    <div class="content-wrapper">
                        <div class="meta-wrapper">
                            <div class="prompt-tags">
                                <sl-tag size="small" variant="accent-purple">
                                    <sl-icon name="braces"></sl-icon>
                                    ${this.prompt.name}
                                </sl-tag>
                                <sl-tag size="small" variant="accent-purple">
                                    <sl-icon name="text-paragraph"></sl-icon>
                                    ${this.getWordCount()} words 
                                </sl-tag>
                                <sl-tag size="small" variant="accent-purple">
                                    <sl-icon name="database"></sl-icon>
                                    ${Math.ceil(this.getWordCount() * 1.3)} tokens
                                </sl-tag>
                            </div>
                            <sl-copy-button 
                                value="${this.escapeHtml(this.selectedVersion.prompt || this.selectedVersion.content)}"
                                copy-label="Copy prompt"
                                primary-label="Copied!">
                            </sl-copy-button>
                        </div>
                        
                        <div class="prompt-content">
                            ${htmlContent}
                        </div>
                    </div>
                </custom-details>
            </section>
        `;
    }

    renderSampleOutput() {
        const output = this.selectedVersion.output || this.prompt.output;
        
        return `
            <section id="sample-output" class="page-section">
                <h2 class="section-title">Sample Output</h2>

                <custom-details>
                    <div class="content-wrapper">
                        <div class="meta-wrapper">
                            <div class="model-info">
                                <sl-tag variant="accent-blue" size="small">
                                    <sl-icon name="cpu"></sl-icon>
                                    GPT-4 Vision
                                </sl-tag>
                                <sl-tag variant="accent-blue" size="small">
                                    <sl-icon name="currency-dollar"></sl-icon>
                                0.12
                                </sl-tag>
                                <sl-tag variant="accent-blue" size="small">
                                    <sl-icon name="clock"></sl-icon>
                                    15s
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
                </custom-details>
            </section>
        `;
    }

    renderUsage() {
        return `
            <section id="usage" class="page-section">
                <h2 class="section-title">Usage</h2>
                
                <div class="usage-wrapper">
                    <div class="usage-tips">
                        <h3>Best Practices</h3>
                        <ul class="usage-list">
                            <li>Works best with vision-capable models (GPT-4 Vision, Claude 3, etc.)</li>
                            <li>Attach high-resolution, clear screenshots for optimal analysis</li>
                            <li>Include the full interface for comprehensive evaluation</li>
                            <li>Consider the context and user goals when interpreting results</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3>Recommended Models</h3>
                        <div class="model-recommendations">
                            <div class="model-card">
                                <sl-tag variant="accent-purple" size="small">Recommended</sl-tag>
                                <strong>GPT-4 Vision</strong>
                                <p>Excellent for detailed UI analysis and heuristic evaluation</p>
                            </div>
                            <div class="model-card">
                                <sl-tag variant="accent-purple" size="small">Recommended</sl-tag>
                                <strong>Claude 3 Opus/Sonnet</strong>
                                <p>Great for comprehensive UX insights and actionable feedback</p>
                            </div>
                            <div class="model-card">
                                <sl-tag variant="success" size="small">Limited</sl-tag>
                                <strong>Gemini Pro Vision</strong>
                                <p>Good for basic analysis, may miss nuanced usability issues</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderNotFound() {
        this.innerHTML = `
            <div class="two-col-layout">
                <div class="main-column">
                    <div class="not-found">
                        <sl-icon name="exclamation-triangle" style="font-size: 3rem; color: var(--sl-color-warning-600); margin-bottom: 1rem;"></sl-icon>
                        <h2>Prompt Not Found</h2>
                        <p>The prompt you're looking for doesn't exist or may have been moved.</p>
                        <sl-button variant="accent-purple" href="#prompts">
                            <sl-icon slot="prefix" name="arrow-left"></sl-icon>
                            Back to Prompts
                        </sl-button>
                    </div>
                </div>
                <div class="right-rail"></div>
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
                this.updateContent();
            });
        }

        // Handle copy events
        const copyButton = this.querySelector('sl-copy-button');
        if (copyButton) {
            copyButton.addEventListener('sl-copy', () => {
                console.log('Prompt copied:', this.selectedVersion.name || this.prompt.name);
            });
        }

        // TOC functionality is now handled by ScrollSpy component
    }

    initializeScrollSpy() {
        // Initialize ScrollSpy with default options (matches original behavior)
        this.scrollSpy = new ScrollSpy(this, {
            sectionsSelector: '.page-section',
            tocLinksSelector: '.toc-link',
            activeClass: 'active',
            rootMargin: '-20% 0px -80% 0px',
            initializeFirstActive: false // Don't auto-initialize first section
        });
    }

    disconnectedCallback() {
        // Clean up ScrollSpy when component is removed
        if (this.scrollSpy) {
            this.scrollSpy.destroy();
            this.scrollSpy = null;
        }
    }

    updateContent() {
        // Update the prompt details section
        const promptSection = this.querySelector('#prompt-detail');
        if (promptSection) {
            promptSection.innerHTML = this.renderPromptDetails().replace('<section id="prompt-detail" class="page-section">', '').replace('</section>', '');
        }
        
        // Update the sample output section
        const outputSection = this.querySelector('#sample-output');
        if (outputSection) {
            outputSection.innerHTML = this.renderSampleOutput().replace('<section id="sample-output" class="page-section">', '').replace('</section>', '');
        }

        // Re-attach listeners for the new content
        this.attachEventListeners();
        
        // Reinitialize ScrollSpy for updated content
        if (this.scrollSpy) {
            this.scrollSpy.destroy();
        }
        this.initializeScrollSpy();
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