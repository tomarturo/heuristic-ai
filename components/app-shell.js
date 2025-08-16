// components/app-shell.js - Now much smaller!
import { router } from '../utils/router.js';
import './layout/navigation.js';
import './layout/sidebar.js';
import './pages/home.js';
import './pages/prompts.js';
import './pages/prompt-detail.js';
import './pages/experiments.js';
import './pages/experiment-detail.js';

export class AppShell extends HTMLElement {
    constructor() {
        super();
        this.currentPage = null;
    }

    connectedCallback() {
        this.createLayout();
        this.setupRouting();
        
        // Initial route
        this.handleRoute(router.getCurrentState());
    }

    createLayout() {
        this.innerHTML = `
            <div class="app-layout">
                <div class="top-nav-wrapper">
                    <top-navigation></top-navigation>
                </div>
                
                <main class="main-content">
                    <app-sidebar></app-sidebar>
                    <div class="content-area">
                        <div class="content-wrapper">
                            <!-- Page content goes here -->
                        </div>
                    </div>
                </main>
            </div>
        `;

        this.contentWrapper = this.querySelector('.content-wrapper');
        this.mainContent = this.querySelector('.main-content');
    }

    setupRouting() {
        this.unsubscribe = router.addListener((newState, oldState) => {
            this.handleRoute(newState, oldState);
        });
    }

    disconnectedCallback() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    handleRoute(newState, oldState) {
        // Update layout classes based on section
        const needsSidebar = newState.section !== 'home';
        this.mainContent.className = needsSidebar ? 
            'main-content with-sidebar' : 
            'main-content no-sidebar';

        // Update content area classes
        const contentArea = this.querySelector('.content-area');
        contentArea.className = needsSidebar ? 
            'content-area' : 
            'content-area full-width';

        // Load appropriate page component
        this.loadPage(newState);
    }

    loadPage(state) {
        // Remove current page
        if (this.currentPage) {
            this.currentPage.remove();
        }

        // Create new page component
        let pageElement;
        
        switch (state.view) {
            case 'home':
                pageElement = document.createElement('home-page');
                break;
                
            case 'prompts-overview':
                pageElement = document.createElement('prompts-page');
                break;
                
            case 'prompt-detail':
                pageElement = document.createElement('prompt-detail');
                pageElement.setAttribute('prompt-id', state.params.promptId);
                break;
                
            case 'experiments-overview':
                pageElement = document.createElement('experiments-page');
                break;
                
            default:
                pageElement = document.createElement('div');
                pageElement.innerHTML = '<div class="panel-content">Page not found</div>';
        }

        this.currentPage = pageElement;
        this.contentWrapper.appendChild(pageElement);
    }
}

customElements.define('app-shell', AppShell);