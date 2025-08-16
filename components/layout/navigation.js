import { router } from '../../utils/router.js';

export class TopNavigation extends HTMLElement {
    constructor() {
        super();
        this.currentSection = 'home';
    }

    connectedCallback() {
        // Get initial state from router or URL
        this.initializeCurrentSection();
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

    initializeCurrentSection() {
        // Get current section from router
        const routerState = router.getCurrentState();
        if (routerState && routerState.section) {
            this.currentSection = routerState.section;
        } else {
            // This shouldn't happen with your router, but just in case
            this.currentSection = 'home';
        }
    }

    render() {
        this.innerHTML = `
            <nav class="top-nav">
                <div class="nav-brand-wrapper">
                    <a href="#" class="nav-brand" data-section="home">
                        AI for Heuristics
                    </a>
                </div>
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
        
        // Update active states after rendering
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

        // Also listen for hashchange events as a backup
        // (This is redundant since router already handles hashchange, 
        //  but kept as extra safety)
        window.addEventListener('hashchange', () => {
            const routerState = router.getCurrentState();
            if (routerState.section !== this.currentSection) {
                this.currentSection = routerState.section;
                this.updateActiveStates();
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