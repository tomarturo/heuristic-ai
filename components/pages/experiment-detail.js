import { ScrollSpy } from '../shared/scroll-spy.js';
import { experimentLoader } from '../shared/experiment-loader.js';
import { test } from '../shared/experiment-loader.js';
console.log('test import:', test);

export class ExperimentDetailPage {
  constructor(params = {}) {
    this.params = params;
    this.experimentId = params.section;
    this.experiment = null; 
    this.ScrollSpy = null;
  }

  render() {
    return `
      <div class="two-col-layout">
      <!-- Main Content -->
        <div class="main-column">
            <div class="page-content">
              <div class="page-header">
              <sl-breadcrumb>
                <sl-breadcrumb-item href="#experiments">Experiments</sl-breadcrumb-item>
                <sl-breadcrumb-item>${this.experimentId}</sl-breadcrumb-item>
              </sl-breadcrumb>
              <h1 class="page-section" id="overview">Brief on SampleUI with Llava</h1>
              <p class="page-description">This experiment uses the <a href="#" class="inline-link">Brief Eval Prompt</a> and a screenshot of <a href="#" class="inline-link">Sample UI<a/> with the <a href="#" class="inline-link">LLava multi-modal</a> model.</p>
              </div>
          <div id="experiments-container">
            <div class="loading-state">
              <sl-spinner></sl-spinner>
              <p>Loading experiment data...</p>
            </div>
        </div>
      </div>
    </div>
                
    <!-- Table of Contents Right Rail -->
          <div class="right-rail is-toc">
            <h3 class="right-rail-header">On this page</h3>
            <section class="toc-nav" id="toc-container">
                <!-- TOC will be populated after data loads -->
                <div class="loading-state">
                  <sl-spinner></sl-spinner>
                </div>
            </section>
          </div>
      </div>
    `;
  }

  generateTOC(experiment) {
    const issues = experiment.parsed_issues?.issues || [];
    
    return `
      <ul class="toc-list">
        <li><a href="#overview" class="toc-link">Overview</a></li>
        ${issues.map((issue, index) => `
          <li class="toc-issue">
            <a href="#issue-${index}" class="toc-link issue-link">
              ${this.truncateTitle(issue.title, 30)}
            </a>
          </li>
        `).join('')}
      </ul>
    `;
  }

  truncateTitle(title, maxLength) {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  }

  getSeverityVariant(severity) {
    if (severity >= 4) return 'danger';
    if (severity >= 3) return 'warning';
    return 'neutral';
  }

  async afterRender() {
    try {
      this.experiment = await experimentLoader.loadExperiment(this.experimentId);
      const container = document.querySelector('#experiments-container');
      const tocContainer = document.querySelector('#toc-container');
      
      if (this.experiment && container) {
        // Update main content
        container.innerHTML = experimentLoader.renderExperimentContent(this.experiment);
        
        // Update TOC with dynamic issue links
        if (tocContainer) {
          tocContainer.innerHTML = this.generateTOC(this.experiment);
        }
        if (this.experiment) {
        // Initialize ScrollSpy
        this.scrollSpy = new ScrollSpy(document, {
          sectionsSelector: '.page-section, [id^="issue-"]', // Target both sections and issues
          tocLinksSelector: '.toc-link',
          activeClass: 'active',
          rootMargin: '-20% 0px -80% 0px'
      });
    }
      } else if (container) {
        container.innerHTML = `
          <sl-alert variant="warning" open>
            <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
            <strong>Experiment not found</strong><br>
            Could not load experiment: ${this.experimentId}
          </sl-alert>
        `;
        
        // Show error in TOC too
        if (tocContainer) {
          tocContainer.innerHTML = '<p class="toc-error">Could not load table of contents</p>';
        }
      }
    } catch (error) {
      console.error('Failed to load experiment:', error);
      const container = document.querySelector('#experiments-container');
      const tocContainer = document.querySelector('#toc-container');
      
      if (container) {
        container.innerHTML = `
          <sl-alert variant="danger" open>
            <sl-icon slot="icon" name="x-circle"></sl-icon>
            <strong>Error loading experiment</strong><br>
            ${error.message}
          </sl-alert>
        `;
      }
      
      if (tocContainer) {
        tocContainer.innerHTML = '<p class="toc-error">Error loading table of contents</p>';
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
