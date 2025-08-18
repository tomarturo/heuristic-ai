import { prompts } from '../../data/prompts.js';
import { methods } from '../../data/methods.js';
import '../shared/prompt-card.js';
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
                        <div class="method-section page-section" id="${method.type}">
                            <h2 class="section-title">${method.title}</h2>
                            <p class="text-muted">${method.description}</p>
                            <p class="prompt-count">Prompts found: ${prompts.filter(prompt => prompt.type === method.type).length}</p>
                            
                            <!-- Placeholder content for testing scroll spy -->
                            <div style="margin-bottom: var(--sl-spacing-large);">
                                <h3>Methodology Overview</h3>
                                <p>This approach represents a systematic methodology for conducting UX heuristic evaluations using large language models. The core principle involves leveraging the inherent knowledge that these models possess about usability principles and user experience design patterns.</p>
                                
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                
                                <h4>Key Benefits</h4>
                                <ul>
                                    <li>Consistent evaluation criteria across different interface types</li>
                                    <li>Scalable approach for large-scale usability assessments</li>
                                    <li>Reproducible results with documented methodologies</li>
                                    <li>Integration with existing design workflows</li>
                                </ul>
                                
                                <h4>Implementation Considerations</h4>
                                <p>When implementing this methodology, several factors should be considered to ensure optimal results. The quality of input images, the specificity of instructions, and the context provided to the model all play crucial roles in the effectiveness of the evaluation.</p>
                                
                                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
                                
                                <h4>Performance Metrics</h4>
                                <p>To measure the effectiveness of this approach, we track several key performance indicators including accuracy of heuristic violation detection, consistency across multiple evaluations of the same interface, and time efficiency compared to human evaluators.</p>
                                
                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
                            </div>
                            
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
                            
                            <!-- Additional placeholder content -->
                            <div style="margin-top: var(--sl-spacing-large);">
                                <h3>Research Findings</h3>
                                <p>Our research has revealed interesting patterns in how different AI models approach heuristic evaluation tasks. Some models excel at identifying obvious usability violations, while others demonstrate more nuanced understanding of subtle interaction design issues.</p>
                                
                                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
                                
                                <h4>Comparative Analysis</h4>
                                <p>When compared to traditional heuristic evaluation methods, AI-assisted approaches show both strengths and limitations. The consistency and speed advantages are significant, but human oversight remains crucial for contextual understanding and domain-specific considerations.</p>
                                
                                <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.</p>
                            </div>
                        </div>
                    `).join('')}
                    </div>
                </div>

                <!-- Table of Contents Right Rail -->

                <div class="right-rail">
                    <h3 class="right-rail-header">Methods</h3>
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