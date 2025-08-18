import "../pages/home.js";
import "../pages/prompt-detail.js"; 
import "../pages/prompts.js";
import "../pages/experiments.js";
import "../pages/experiment-detail.js"
import "../pages/not-found-page.js"

export class ContentArea extends HTMLElement {
    constructor() {
        super();
        this.currentState = null;
    }

    connectedCallback() {
        this.className = 'content-area';
    }

    updateContent(state) {
        // Only re-render if the view actually changed
        if (this.currentState?.view !== state.view || 
            this.currentState?.params?.promptId !== state.params?.promptId) {
            
            this.currentState = state;
            this.render();
            
            // Scroll to top when navigating to a new page
            this.scrollToTop();
        }
    }

    render() {
        // Clear existing content
        this.innerHTML = '';
        
        // Create the appropriate component based on state
        const component = this.createComponentForState(this.currentState);
        if (component) {
            this.appendChild(component);
        }
    }

    createComponentForState(state) {
        console.log('Creating component for view:', state.view);
        switch (state.view) {
            case 'home-page':
                return this.createHomeComponent();
                
            case 'prompts-page':
                return this.createPromptsOverviewComponent();
                
            case 'prompt-detail':
                return this.createPromptDetailComponent(state.params.promptId);
                
            case 'experiments-page':
                return this.createExperimentsOverviewComponent();
                
            default:
                return this.createNotFoundComponent();
        }
    }

    createHomeComponent() {
        const homeView = document.createElement('home-page');
        return homeView;
    }

    createPromptsOverviewComponent() {
        const promptsOverview = document.createElement('prompts-page');
        return promptsOverview;
    }

    createPromptDetailComponent(promptId) {
        const promptDetail = document.createElement('prompt-detail');
        promptDetail.setAttribute('prompt-id', promptId);
        return promptDetail;
    }

    createExperimentsOverviewComponent() {
        const experimentsOverview = document.createElement('experiments-page');
        return experimentsOverview;
    }

    createNotFoundComponent() {
        const notFound = document.createElement('not-found-view');
        return notFound;
    }

    scrollToTop() {
        // Jump to top of the page instantly
        window.scrollTo(0, 0);
    }
}

customElements.define('content-area', ContentArea);