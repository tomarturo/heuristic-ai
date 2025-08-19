export class ExperimentsPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
          <section class="two-col-layout">
                          <div class="main-column">
                              <h1>Experiments Overview</h1>
                        <p class="page-description">Systematic evaluation of AI models performing UX heuristic analysis.</p>

                              <div>
                                  <p>A few posts on LinkedIn got me thinking about this question. Most of the attempts I read about were not particularly methodical, more or less attaching a screenshot to a prompt and blithely asking the model for a UX heuristic analysis based on its default dearth of information.</p>
                                  <p>It struck me as a worthwhile task, seeing how far we could get a model to perform this tried and true UX task.</p>
                                  <p>The timing was opportune as well. I needed a compelling subject to motivate me to,</p>
                                  <ul>
                                      <li>Dig more methodically into prompting</li>
                                      <li>Explore, think about how to document, and then document the results of different prompt strategies and methods</li>
                                      <li>Illustrate to other product designers what it looks like to design deeply with LLMs</li>
                                  </ul>
                              </div>
                              
                              <sl-divider style="--spacing: 4rem;"></sl-divider>
                              
                          </div>
                          <!-- Right Rail -->
                <div class="right-rail">
                        <h3 class="right-rail-header">Quick Links</h3>
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

