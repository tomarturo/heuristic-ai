   export class ExperimentsPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML =  `
            <h1>Experiments Overview</h1>
            <sl-divider></sl-divider>
            <p>Systematic evaluation of AI models performing UX heuristic analysis.</p>
            
            <div class="experiment-sections">
                <div class="experiment-card">
                    <h3>Model Performance</h3>
                    <p>Compare how different AI models perform at identifying usability issues.</p>
                    <a href="#experiments/models" class="btn-link">View Comparison →</a>
                </div>
                
                <div class="experiment-card">
                    <h3>Interface Evaluations</h3>
                    <p>See detailed breakdowns of heuristic violations found in test interfaces.</p>
                    <a href="#experiments/interfaces" class="btn-link">Browse Interfaces →</a>
                </div>
                
                <div class="experiment-card">
                    <h3>Methodology</h3>
                    <p>Learn about our experimental design and evaluation framework.</p>
                    <a href="#experiments/methodology" class="btn-link">Read Methodology →</a>
                </div>
            </div>
        `;
    }
}

customElements.define('experiments-page', ExperimentsPage);