import { router } from '../../utils/router.js';

export class TopNavigation extends HTMLElement {
    constructor() {
        super();
        this.currentSection = 'home';
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        
        // Listen for route changes
        this.unsubscribe = router.addListener((newState) => {
            if (newState.section !== this.currentSection) {
                this.currentSection = newState.section;
                this.updateActiveStates();
            }
        });
    }

    disconnectedCallback() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    render() {
        this.innerHTML = `
            <nav class="top-nav">
                <a href="#" class="nav-brand" data-section="home">
                    AI for Heuristics
                </a>
                <div class="nav-link-wrapper">
                    <a href="#prompts" class="nav-link" data-section="prompts">
                        <sl-icon name="terminal-fill"></sl-icon>
                        Prompts
                    </a>
                    <a href="#experiments" class="nav-link" data-section="experiments">
                        <sl-icon name="transparency"></sl-icon>
                        Experiments
                    </a>
                    <a href="#future" class="nav-link">
                        <sl-icon name="arrow-up-right-circle-fill"></sl-icon>
                        Future
                    </a>
                </div>
            </nav>
        `;
        
        this.updateActiveStates();
    }

    setupEventListeners() {
        this.addEventListener('click', (event) => {
            const link = event.target.closest('a[href]');
            if (!link || link.classList.contains('disabled')) return;
            
            // Let hash navigation work naturally
            if (link.getAttribute('href').startsWith('#')) {
                // Navigation will be handled by router
            } else {
                event.preventDefault();
            }
        });
    }

    updateActiveStates() {
        this.querySelectorAll('.nav-link, .nav-brand').forEach(link => {
            const section = link.getAttribute('data-section');
            const isActive = section === this.currentSection;
            link.classList.toggle('active', isActive);
        });
    }
}

customElements.define('top-navigation', TopNavigation);