export class AppState {
    constructor() {
        this.state = {
            currentSection: 'home',
            currentView: 'home',
            selectedPrompt: null
        };
        this.listeners = new Map();
    }

    update(newState) {
        const oldState = { ...this.state };
        this.state = { ...this.state, ...newState };
        
        // Notify specific listeners
        Object.keys(newState).forEach(key => {
            if (this.listeners.has(key)) {
                this.listeners.get(key).forEach(callback => {
                    callback(this.state[key], oldState[key]);
                });
            }
        });
    }

    subscribe(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set());
        }
        this.listeners.get(key).add(callback);
        
        // Return unsubscribe function
        return () => this.listeners.get(key).delete(callback);
    }

    get(key) {
        return this.state[key];
    }

    getAll() {
        return { ...this.state };
    }
}

export const appState = new AppState();