// Fetch and display experiment results in your frontend

export class ExperimentLoader {
  constructor() {
    this.experiments = [];
  }

  async loadExperiment(experimentId) {
    try {
      const response = await fetch(`./public/raw/experiment_${experimentId}.json`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const experiment = await response.json();
      
      // Clean up the raw response if it has markdown formatting
      if (experiment.raw_response.includes('```json')) {
        experiment.parsed_issues = this.parseMarkdownJSON(experiment.raw_response);
      } else {
        experiment.parsed_issues = JSON.parse(experiment.raw_response);
      }
      
      return experiment;
    } catch (error) {
      console.error('Failed to load experiment:', error);
      return null;
    }
  }

  parseMarkdownJSON(rawResponse) {
    try {
      // Extract JSON from markdown code blocks
      const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]);
      }
      // Fallback: try parsing the whole response
      return JSON.parse(rawResponse);
    } catch (error) {
      console.error('Failed to parse JSON from response:', error);
      return { issues: [] };
    }
  }

  async loadAllExperiments() {
    // You'll need to either:
    // 1. Maintain a list of experiment IDs
    // 2. Use a directory listing API
    // 3. Have your Python script generate an index file
    
    // For now, let's load the specific one you just created:
    const experimentId = 'exp_20250819_172552';
    const experiment = await this.loadExperiment(experimentId);
    
    if (experiment) {
      this.experiments = [experiment];
      return this.experiments;
    }
    return [];
  }

  renderExperimentContent(experiment) {
    const issues = experiment.parsed_issues?.issues || [];
    const metrics = experiment.metrics;

    return `
      <div class="page-section">
          <div class="metrics-grid">
            <div class="metric-wrapper">
              <div class="metric-top">
                <text class="metric">${issues.length}</text>
                <sl-icon name="cone-striped" class="metric-icon"></sl-icon>
              </div>
              <text class="metric-label">Issues found</text>
            </div>
            <div class="metric-wrapper">
              <div class="metric-top">
                <text class="metric">${metrics.duration_seconds}s</text>
                <sl-icon name="hourglass-split" class="metric-icon"></sl-icon>
              </div>
              <text class="metric-label">Response time</text>
            </div>
            <div class="metric-wrapper">
              <div class="metric-top">
                <text class="metric">${metrics.output_tokens}</text>
                <sl-icon name="database-fill" class="metric-icon"></sl-icon>
              </div>
              <text class="metric-label">Output Tokens</text>
            </div>
            <div class="metric-wrapper">
              <div class="metric-top">
                <text class="metric">${metrics.tokens_per_second}</text>
                <sl-icon name="speedometer" class="metric-icon"></sl-icon>
              </div>
              <text class="metric-label">Tokens/second</text>
            </div>
          </div>
      </div>
      <div class="issues-summary">
        ${this.renderSeverityBreakdown(issues)}
      </div>

      <div class="issues-list">
        ${issues.map((issue, index) => this.renderIssue(issue, index)).join('')}
      </div>
    `;
  }

  renderSeverityBreakdown(issues) {
    const severityCounts = issues.reduce((acc, issue) => {
      acc[issue.severity] = (acc[issue.severity] || 0) + 1;
      return acc;
    }, {});

    return `
      <div class="severity-breakdown">
        ${Object.entries(severityCounts)
          .sort(([a], [b]) => b - a)
          .map(([severity, count]) => `
            <sl-badge variant="${this.getSeverityVariant(severity)}">
              Severity ${severity}: ${count}
            </sl-badge>
          `).join('')}
      </div>
    `;
  }

  renderIssue(issue, index) {
    return `
      <div class="issue-detail page-section" id="issue-${index}">
        <span slot="summary">
          <sl-badge variant="${this.getSeverityVariant(issue.severity)}">
            ${issue.severity}
          </sl-badge>
          ${issue.title}
        </span>
        
        <div class="issue-content">
          <p><strong>Heuristic:</strong> ${issue.heuristic}</p>
          <p><strong>Location:</strong> ${issue.location}</p>
          <p><strong>Recommendation:</strong> ${issue.recommendation}</p>
        </div>
      </div>
    `;
  }

  getSeverityVariant(severity) {
    if (severity >= 4) return 'danger';
    if (severity >= 3) return 'warning';
    return 'neutral';
  }
}

// Usage in your app
export const experimentLoader = new ExperimentLoader();

// Load and display experiments
export async function displayExperiments() {
  const experiments = await experimentLoader.loadAllExperiments();
  
  const container = document.querySelector('#experiments-container');
  if (container && experiments.length > 0) {
    container.innerHTML = experiments
      .map(exp => experimentLoader.renderExperimentContent(exp))
      .join('');

  if (tocContainer) {
      tocContainer.innerHTML = this.generateTOC(this.experiment);
    }
  } else if (container) {
    container.innerHTML = '<p>No experiments found.</p>';
  }
  
}
console.log('experiment-loader.js loaded');
export const test = 'hello';

// Export for use in your router/page system
window.experimentLoader = experimentLoader;
window.displayExperiments = displayExperiments;