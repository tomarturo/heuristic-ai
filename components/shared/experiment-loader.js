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

  renderExperimentCard(experiment) {
    const issues = experiment.parsed_issues?.issues || [];
    const metrics = experiment.metrics;

    return `
      <sl-card class="experiment-card">
        <div slot="header">
          <h3>${experiment.interface_id}</h3>
          <sl-badge variant="primary">${experiment.model}</sl-badge>
        </div>
        
        <div class="experiment-meta">
          <sl-details summary="Performance Metrics">
            <div class="metrics-grid">
              <div class="metric">
                <strong>Duration:</strong> ${metrics.duration_seconds}s
              </div>
              <div class="metric">
                <strong>Output Tokens:</strong> ${metrics.output_tokens}
              </div>
              <div class="metric">
                <strong>Tokens/sec:</strong> ${metrics.tokens_per_second}
              </div>
              <div class="metric">
                <strong>Total Tokens:</strong> ${metrics.total_tokens}
              </div>
            </div>
          </sl-details>
        </div>

        <div class="issues-summary">
          <h4>Found ${issues.length} Issues</h4>
          ${this.renderSeverityBreakdown(issues)}
        </div>

        <div class="issues-list">
          ${issues.map(issue => this.renderIssue(issue)).join('')}
        </div>
      </sl-card>
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

  renderIssue(issue) {
    return `
      <sl-details class="issue-detail">
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
      </sl-details>
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
      .map(exp => experimentLoader.renderExperimentCard(exp))
      .join('');
  } else if (container) {
    container.innerHTML = '<p>No experiments found.</p>';
  }
  
}
console.log('experiment-loader.js loaded');
export const test = 'hello';

// Export for use in your router/page system
window.experimentLoader = experimentLoader;
window.displayExperiments = displayExperiments;