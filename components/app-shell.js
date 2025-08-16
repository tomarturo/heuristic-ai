// components/app-shell.js - Simplified!
import { router } from '../utils/router.js';
import './layout/navigation.js';
import './layout/sidebar.js';
import './layout/content-area.js';

export class AppShell extends HTMLElement {
    constructor() {
        super();
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
                    <content-area></content-area>
                </main>
            </div>
        `;

        this.contentArea = this.querySelector('content-area');
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
        this.contentArea.updateContent(newState);
    }
}

customElements.define('app-shell', AppShell);