import { experimentLoader } from '../shared/experiment-loader.js';
import { test } from '../shared/experiment-loader.js';
console.log('test import:', test);

export class ExperimentDetailPage {
  constructor(params = {}) {
    this.params = params;
    this.experimentId = params.section;
  }

  render() {
    return `
      <div class="page-content">
        <header class="page-header">
          <h1>Experiment Detail</h1>
          <sl-breadcrumb>
            <sl-breadcrumb-item href="#experiments">Experiments</sl-breadcrumb-item>
            <sl-breadcrumb-item>${this.experimentId}</sl-breadcrumb-item>
          </sl-breadcrumb>
        </header>

        <div id="experiments-container">
          <div class="loading-state">
            <sl-spinner></sl-spinner>
            <p>Loading experiment data...</p>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    try {
      const experiment = await experimentLoader.loadExperiment(this.experimentId);
      const container = document.querySelector('#experiments-container');
      
      if (experiment && container) {
        container.innerHTML = experimentLoader.renderExperimentCard(experiment);
      } else if (container) {
        container.innerHTML = `
          <sl-alert variant="warning" open>
            <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
            <strong>Experiment not found</strong><br>
            Could not load experiment: ${this.experimentId}
          </sl-alert>
        `;
      }
    } catch (error) {
      console.error('Failed to load experiment:', error);
      const container = document.querySelector('#experiments-container');
      if (container) {
        container.innerHTML = `
          <sl-alert variant="danger" open>
            <sl-icon slot="icon" name="x-circle"></sl-icon>
            <strong>Error loading experiment</strong><br>
            ${error.message}
          </sl-alert>
        `;
      }
    }
  }
}

class ExperimentDetailElement extends HTMLElement {
  connectedCallback() {
    const experimentId = this.getAttribute('experiment-id');
    const page = new ExperimentDetailPage({ section: experimentId });
    this.innerHTML = page.render();
    page.afterRender();
  }
}

customElements.define('experiment-detail', ExperimentDetailElement);
