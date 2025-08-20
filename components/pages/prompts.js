import { prompts } from '../../data/prompts.js';
import { methods } from '../../data/methods.js';
import { ScrollSpy } from '../shared/scroll-spy.js';

export class PromptsPage extends HTMLElement {
    constructor() {
        super();
        this.scrollSpy = null;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.initializeScrollSpy();
    }

    truncateText(text, maxLength = 100) {
        if (text.length <= maxLength) return text.trim();
        return text.substring(0, maxLength).trim() + '...';
    }

    render() {
        this.innerHTML = `
            <section class="two-col-layout" id="overview" >
                <div class="main-column">
                    <div class="page-section" id="overview-section">
                        <div class="page-header">
                            <h1>Methodology</h1>
                            <p class="page-description">I explore four methodologies for directing large language models to conduct comprehensive heuristic assessments of user interfaces. Within each methodology I test multiple prompts and prompt iterations.</p>
                        </div>
                    </div>
                    <div>
                    ${methods.map(method => `
                        <div class="method-section page-section" id="${method.type}">
                            <h2 class="section-title">${method.title}</h2>
                            <p>${method.description}</p>
                            <div class="prompts-list-wrapper">
                                ${prompts
                                    .filter(prompt => prompt.type === method.type)
                                    .map(prompt => `
                                        <div class="prompt-card" data-prompt-id="${prompt.id}">
                                            <div class="prompt-card-title">
                                            <h3>${prompt.title}</h3>
                                            </div>
                                            <p class="prompt-card-description">${this.truncateText(prompt.description)}</p>
                                            ${prompt.versions ? 
                                                `<sl-tag size="small" variant="neutral" style="width: fit-content; margin-top: var(--sl-spacing-x-small);">
                                                    <sl-icon name="layers"></sl-icon>
                                                    ${prompt.versions.length} versions
                                                </sl-tag>` : ''
                                            }
                                        </div>
                                    `).join('')}
                            </div>
                        </div>
                    `).join('')}
                    </div>
                </div>

                <!-- Table of Contents Right Rail -->

                <div class="right-rail is-toc">
                    <h3 class="right-rail-header">On this page</h3>
                    <section class="toc-nav">
                        <ul class="toc-list">
                        <li><a href="#overview-section" class="toc-link">Overview</a></li>
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
                    return;
                }
            }

            // Handle TOC link clicks for smooth scrolling
            const tocLink = event.target.closest('.toc-link');
            if (tocLink) {
                event.preventDefault();
                const targetId = tocLink.getAttribute('href').substring(1);
                const targetElement = this.querySelector(`#${targetId}`);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active state
                    this.updateActiveTocItem(tocLink);
                }
            }
        });
    }

    initializeScrollSpy() {
        // Initialize ScrollSpy with enhanced options for better first-section detection
        this.scrollSpy = new ScrollSpy(this, {
            sectionsSelector: '.page-section',
            tocLinksSelector: '.toc-link',
            activeClass: 'active',
            rootMargin: '-10% 0px -70% 0px',
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
            useAdvancedDetection: true, // Use the enhanced visibility logic
            initializeFirstActive: true // Auto-initialize first section
        });
    }

    updateActiveTocItem(activeLink) {
        // Remove active class from all TOC links
        const tocLinks = this.querySelectorAll('.toc-link');
        tocLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current link
        activeLink.classList.add('active');
    }

    disconnectedCallback() {
        // Clean up ScrollSpy when component is removed
        if (this.scrollSpy) {
            this.scrollSpy.destroy();
            this.scrollSpy = null;
        }
    }
}

customElements.define('prompts-page', PromptsPage);