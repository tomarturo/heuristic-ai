export class SimpleRouter {
    constructor() {
        this.routes = new Map();
        this.listeners = new Set();
        this.currentState = this.parseHash();
        
        window.addEventListener('hashchange', () => this.handleHashChange());
    }

    parseHash() {
        const hash = window.location.hash.slice(1);
        
        if (!hash || hash === 'home') {
            return { section: 'home', view: 'home', params: {} };
        } else if (hash === 'prompts') {
            return { section: 'prompts', view: 'prompts-overview', params: {} };
        } else if (hash.startsWith('prompts/')) {
            const promptId = hash.split('/')[1];
            return { section: 'prompts', view: 'prompt-detail', params: { promptId } };
        } else if (hash === 'experiments') {
            return { section: 'experiments', view: 'experiments-overview', params: {} };
        } else if (hash.startsWith('experiments/')) {
            const section = hash.split('/')[1];
            return { section: 'experiments', view: 'experiment-detail', params: { section } };
        }
        
        return { section: 'home', view: 'home', params: {} };
    }

    handleHashChange() {
        const oldState = this.currentState;
        this.currentState = this.parseHash();
        
        this.notifyListeners(this.currentState, oldState);
    }

    addListener(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    notifyListeners(newState, oldState) {
        this.listeners.forEach(callback => {
            try {
                callback(newState, oldState);
            } catch (error) {
                console.error('Router listener error:', error);
            }
        });
    }

    navigate(hash) {
        window.location.hash = hash;
    }

    getCurrentState() {
        return this.currentState;
    }
}

export const router = new SimpleRouter();