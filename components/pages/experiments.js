   export class ExperimentsPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <section class="two-col-layout">
                <div class="main-column">
                    <div class="page-header">
                        <h1>Experiments Overview</h1>
                        <p class="page-description">Systematic evaluation of AI models performing UX heuristic analysis.</p>
                    </div>
                <div>   
                    <h2>
                        <a href="#experiments/models" class="btn-link">
                            <sl-icon name="speedometer2"></sl-icon>
                            Model Performance
                        </a>
                    </h2>
                    <p class="text-muted">Compare how different AI models perform at identifying usability issues.</p>
                </div>
                <sl-divider></sl-divider>
                <div>
                    <h2>
                        <a href="#experiments/interfaces" class="btn-link">
                        <sl-icon name="collection"></sl-icon>
                        Interface Evaluations
                        </a>
                    </h2>
                    <p class="text-muted">See detailed breakdowns of heuristic violations found in test interfaces.</p>
                </div>
                <sl-divider></sl-divider>
                <div>
                    <h2>
                        <a href="#experiments/interfaces" class="btn-link">
                        <sl-icon name="folder-check"></sl-icon>
                        All Results
                        </a>
                    </h2>
                    <p class="text-muted">Interactive dashboard to explore all experimental findings.</p>
                </div>
                </div>
                
                <!-- Right Rail -->
                <div class="right-rail">
                    <div class="toc-header">
                        <h3>Quick Links</h3>
                    </div>
                    <section class="toc-nav">
                        <ul class="toc-list">
                            <li><a href="#experiments/models" class="toc-link">Model Performance</a></li>
                            <li><a href="#experiments/interfaces" class="toc-link">Interface Evaluations</a></li>
                            <li><a href="#experiments/results" class="toc-link">All Results</a></li>
                        </ul>
                    </section>
                </div>
            </section>
        `;
    }
}

customElements.define('experiments-page', ExperimentsPage);