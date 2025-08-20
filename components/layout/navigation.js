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
                <div class="top-nav-left">
                    <div class="nav-brand-wrapper">
                        <a href="#" class="nav-brand" data-section="home">
                        <sl-icon name="transparency"></sl-icon>
                            AI for Heuristics
                        </a>
                    </div>
                    <div class="nav-link-wrapper">
                        <a href="#prompts" class="nav-link" data-section="prompts">
                            <sl-icon name="shadows"></sl-icon>
                            Methodology
                        </a>
                        <a href="#experiments" class="nav-link" data-section="experiments">
                            <sl-icon name="shadows" style="transform: rotate(90deg)"></sl-icon>
                            Evaluation
                            </a>
                        <a href="#insights" class="nav-link">
                            <sl-icon name="shadows" style="transform: rotate(180deg)"></sl-icon>    
                            Insights
                        </a>
                    </div>
                </div>
                <div class="social-link-wrapper">
                    <a href="https://github.com/tomarturo" class="social-link" target="blank">
                        <sl-icon name="github"></sl-icon>
                    </a>
                    <a href="https://www.linkedin.com/in/tomkurzeka" class="social-link" target="blank">
                        <sl-icon name="linkedin"></sl-icon>
                    </a>
                </div>
                <sl-dropdown class="mobile-menu-dropdown">
                    <sl-button slot="trigger" size="small" outline>
                        <sl-icon slot="prefix" name="list"></sl-icon>
                        Menu
                    </sl-button>
                    <sl-menu>
                        <sl-menu-item href="#prompts" data-section="prompts">
                            <sl-icon slot="prefix" name="shadows"></sl-icon>
                            Methodology
                        </sl-menu-item>
                        <sl-menu-item href="#experiments" data-section="experiments">
                            <sl-icon slot="prefix" name="shadows" style="transform: rotate(90deg)"></sl-icon>
                            Evaluation
                        </sl-menu-item>
                        <sl-menu-item href="#insights">
                            <sl-icon slot="prefix" name="shadows" style="transform: rotate(180deg)"></sl-icon>
                            Insights
                        </sl-menu-item>
                        <sl-divider></sl-divider>
                        <sl-menu-item href="https://github.com/tomarturo" target="_blank">
                            <sl-icon slot="prefix" name="github"></sl-icon>
                            GitHub
                        </sl-menu-item>
                        <sl-menu-item href="https://www.linkedin.com/in/tomkurzeka" target="_blank">
                            <sl-icon slot="prefix" name="linkedin"></sl-icon>
                            LinkedIn
                        </sl-menu-item>
                    </sl-menu>
                </sl-dropdown>
            </nav>
        `;
        
        // Update active states after rendering
        this.updateActiveStates();
    }

    setupEventListeners() {
        this.addEventListener('click', (event) => {
            const link = event.target.closest('a[href]');
            
            // Handle navigation links
            if (!link || link.classList.contains('disabled')) return;
            
            // Let hash navigation work naturally
            if (link.getAttribute('href').startsWith('#')) {
                // Navigation will be handled by router
            } else {
                event.preventDefault();
            }
        });

        // Handle Shoelace menu item clicks
        this.addEventListener('sl-select', (event) => {
            const menuItem = event.detail.item;
            const href = menuItem.getAttribute('href');
            
            if (href) {
                if (href.startsWith('#')) {
                    // Internal navigation - let router handle
                    window.location.hash = href;
                } else {
                    // External link
                    window.open(href, menuItem.getAttribute('target') || '_self');
                }
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
        // Update nav links
        this.querySelectorAll('.nav-link, .nav-brand').forEach(link => {
            const section = link.getAttribute('data-section');
            const isActive = section === this.currentSection;
            link.classList.toggle('active', isActive);
        });
        
        // Update menu items
        this.querySelectorAll('sl-menu-item').forEach(item => {
            const section = item.getAttribute('data-section');
            const isActive = section === this.currentSection;
            item.checked = isActive;
        });
    }
}

customElements.define('top-navigation', TopNavigation);