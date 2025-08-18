import { router } from '../../utils/router.js';
import { prompts } from '../../data/prompts.js';
import { methods } from '../../data/methods.js';

const renderMethodSubhead = (method) => `
    <sl-tooltip content="${method.description}" placement="right">
        <div class="sidebar-subhead-wrapper">
            <h3 class="sidebar-subhead">${method.title}</h3>
            <sl-icon name="info-circle" aria-hidden="true"></sl-icon>
        </div>
    </sl-tooltip>
`;

export class AppSidebar extends HTMLElement {
    constructor() {
        super();
        this.currentSection = null;
        this.currentHash = '';
    }

    connectedCallback() {
        this.setupEventListeners();
        
        // Listen for route changes
        this.unsubscribe = router.addListener((newState, oldState) => {
            if (newState.section !== oldState?.section) {
                this.currentSection = newState.section;
                this.render();
            } else {
                // Section didn't change, just update active states
                this.updateActiveStates();
            }
        });

        // Initial render
        const state = router.getCurrentState();
        this.currentSection = state.section;
        this.render();
        
        // Update active states after initial render
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
            this.updateActiveStates();
        });
    }

    disconnectedCallback() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    setupEventListeners() {
        this.addEventListener('click', (event) => {
            const link = event.target.closest('a[href]');
            if (link) {
                // Let hash navigation work naturally
                requestAnimationFrame(() => this.updateActiveStates());
            }
        });
    }

    render() {
        if (!this.shouldShow()) {
            this.style.display = 'none';
            return;
        }

        this.style.display = 'block';
        this.innerHTML = `
            <div class="sidebar-content tooltip-hoist">
                ${this.renderSidebarContent()}
            </div>
        `;
        
        // Update active states after rendering new content
        requestAnimationFrame(() => {
            this.updateActiveStates();
        });
    }

    shouldShow() {
        return this.currentSection === 'prompts' || this.currentSection === 'experiments';
    }

    renderSidebarContent() {
        switch (this.currentSection) {
            case 'prompts':
                return this.renderPromptsSidebar();
            case 'experiments':
                return this.renderExperimentsSidebar();
            default:
                return '';
        }
    }

    renderPromptsSidebar() {
        return `
            <div class="sidebar-section tooltip-hoist">
                ${renderMethodSubhead(methods[0])}
                ${prompts.map(prompt => `
                    <a href="#prompts/${prompt.id}" class="sidebar-link">
                        ${prompt.title}
                    </a>
                `).join('')}
            </div>
            
            <div class="sidebar-section tooltip-hoist">
                ${renderMethodSubhead(methods[1])}
            </div>
            
            <div class="sidebar-section tooltip-hoist">
                ${renderMethodSubhead(methods[2])}
            </div>
            
            <div class="sidebar-section tooltip-hoist">
                ${renderMethodSubhead(methods[3])}
            </div>
        `;
    }

    renderExperimentsSidebar() {
        return `
        <div class="sidebar-section">
            <a href="#experiments/results" class="sidebar-link">
                Results
            </a>
            <a href="#experiments/models" class="sidebar-link">
                Model Comparison
            </a>
            <a href="#experiments/interfaces" class="sidebar-link">
                Interfaces
            </a>
        </div>
        `;
    }

    updateActiveStates() {
        this.querySelectorAll('.sidebar-link').forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === window.location.hash;
            link.classList.toggle('active', isActive);
        });
    }
}

customElements.define('app-sidebar', AppSidebar);