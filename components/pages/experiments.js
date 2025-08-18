   export class ExperimentsPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML =  `
        <section style="max-width: 856px;">
                <div style="margin-bottom: var(--sl-spacing-2x-large); max-width: 856px;">
                    <h1>Experiments Overview</h1>
                    <p class="sub-copy">Systematic evaluation of AI models performing UX heuristic analysis.</p>
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
            </section>
            
        `;
    }
}

customElements.define('experiments-page', ExperimentsPage);