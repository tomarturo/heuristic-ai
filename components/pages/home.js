import { prompts } from '../../data/prompts.js';
import { changes } from '../../data/changelog.js';
import '../../components/shared/changelog.js';

export class HomePage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <section class="two-col-layout">
                <div class="main-column">
                    <h1>Can artificial intelligence conduct UX heuristic analyses?</h1>
                    <p class="page-description">UX heuristic analysis is a well-documented, circumscribed framework that brings measurable rigor to interface evaluation. Positioned at the convergence of aesthetic judgments and usability practicalities, it provides a unique context for evaluating AI capabilities.</p>
                    
                    <div>
                        <p>Most of the attempts I read about were not particularly methodical, more or less attaching a screenshot to a prompt and blithely asking the model for a UX heuristic analysis based on its default dearth of information.</p>
                        <p>It struck me as a worthwhile task, seeing how far we could get a model to perform this tried and true UX task.</p>
                        <p>The timing was opportune as well. I needed a compelling subject to motivate me to,</p>
                        <ul>
                            <li>Dig more methodically into prompting</li>
                            <li>Explore, think about how to document, and then document the results of different prompt strategies and methods</li>
                            <li>Illustrate to other product designers what it looks like to design deeply with LLMs</li>
                        </ul>
                        <p>So far there are ${prompts.length} prompts and 0 experiments</p>
                    </div>
                    
                    <sl-divider style="--spacing: 4rem;"></sl-divider>
                    
                    ${this.renderProjectOverview()}
                    <sl-divider style="--spacing: 4rem;"></sl-divider>
                    ${this.renderTechnicalApproach()}
                    <sl-divider style="--spacing: 4rem;"></sl-divider>
                    ${this.renderImplementationArchitecture()}
                    <sl-divider style="--spacing: 4rem;"></sl-divider>
                    ${this.renderKeyDecisions()}
                    <sl-divider style="--spacing: 4rem;"></sl-divider>
                    ${this.renderSuccessCriteria()}
                </div>

                <!-- Changelog Right Rail -->

                <div class="right-rail">
                    <changelog-component></changelog-component>
                </div>
            </section>
        `;
    }

    renderProjectOverview() {
        return `
            <div class="page-section" id="project-overview">
                <h2 class="section-title">Project Overview</h2>
                <p><strong>Goal:</strong> Create a sophisticated ML/AI case study exploring automated UI/UX evaluation, demonstrating deep understanding of models, prompting techniques, and evaluation methodologies.</p>
                <p><strong>Core Concept:</strong> Build an automated system that evaluates UI/UX using multiple AI models and techniques, comparing their effectiveness at identifying usability heuristic violations.</p>
            </div>
        `;
    }

    renderTechnicalApproach() {
        return `
            <div class="page-section" id="technical-approach">
                <h2 class="section-title">Technical Approach</h2>
                
                <h3>Experiment Design</h3>
                <ul>
                    <li><strong>Static Analysis:</strong> Multiple models analyze screenshots against Nielsen's usability heuristics</li>
                    <li><strong>Prompt Engineering:</strong> Test various prompting techniques (zero-shot, few-shot, chain-of-thought)</li>
                    <li><strong>Model Comparison:</strong> Evaluate open source vs. proprietary models</li>
                    <li><strong>Future Enhancement:</strong> Compare static screenshot analysis vs. computer-use agent navigation</li>
                </ul>

                <h3>Evaluation Framework</h3>
                    <h4>Detection Metrics</h4>
                    <ul>
                        <li><strong>Precision:</strong> Percentage of flagged issues that are legitimate</li>
                        <li><strong>Recall:</strong> Percentage of known issues found</li>
                        <li><strong>Coverage:</strong> Which heuristics each model evaluates well</li>
                        <li><strong>Hallucination rate:</strong> False positive identification</li>
                    </ul>
                    <h4>Quality Metrics</h4>
                    <ul>
                        <li><strong>Heuristic assignment accuracy:</strong> Correct categorization of issues</li>
                        <li><strong>Severity calibration:</strong> Alignment with expert severity ratings</li>
                        <li><strong>Explanation quality:</strong> Specificity and actionability of recommendations</li>
                        <li><strong>Consistency:</strong> Same issues identified across similar interfaces</li>
                    </ul>
                    <h4>Comparative Analysis</h4>
                    <ul>
                        <li><strong>Model agreement scores:</strong> Consensus between different models</li>
                        <li><strong>Cost efficiency curves:</strong> Issues found per dollar spent</li>
                        <li><strong>Unique findings:</strong> What each model/technique uniquely identifies</li>
                    </ul>
            </div>
        `;
    }

    renderImplementationArchitecture() {
        return `

            <div class="page-section" id="implementation">
                <h2 class="section-title">Implementation Architecture</h2>
                
                <h3>Hybrid Repository Structure</h3>
                <div style="background-color: var(--sl-color-neutral-50); border: 1px solid var(--sl-color-neutral-200); border-radius: var(--sl-border-radius-medium); padding: var(--sl-spacing-medium); margin: var(--sl-spacing-medium) 0; font-family: var(--sl-font-mono);">
<pre>ux-evaluation-site/                    # Main repo
├── public/
│   └── data/                         # Processed results (committed)
├── src/                              # React/Next.js frontend
│   ├── components/                   # Reusable UI components
│   ├── styles/                       # Design system
│   └── pages/                        # Site structure
├── scripts/                          # Python experiment runners
│   ├── run_experiments.py            # Main experiment orchestration
│   ├── process_results.py            # Generate web-ready data
│   └── configs/
│       ├── models.yaml               # Model configurations
│       ├── prompts.yaml              # Prompt variations
│       └── interfaces.yaml           # Test interfaces
├── experiments/                      # Gitignored - raw outputs
│   └── raw_outputs/                  # API responses, cached locally
└── README.md                         # Focus on design & findings</pre>
                </div>

                <h3>Workflow Phases</h3>
                
                <h4>Phase 1: Local Experimentation</h4>
                <ul>
                    <li>Set up experiment runner with structured output</li>
                    <li>Test 3-5 models on 20-30 interfaces</li>
                    <li>Implement caching to avoid redundant API calls</li>
                    <li>Generate comprehensive JSON outputs</li>
                </ul>

                <h4>Phase 2: Data Processing</h4>
                <ul>
                    <li>Calculate all evaluation metrics</li>
                    <li>Generate model comparison matrices</li>
                    <li>Create visualization-ready data exports</li>
                    <li>Identify key insights and patterns</li>
                </ul>

                <h4>Phase 3: Frontend Development</h4>
                <ul>
                    <li>Design custom website with strong visual hierarchy</li>
                    <li>Build interactive data visualizations</li>
                    <li>Create compelling narrative flow</li>
                    <li>Implement smooth interactions and animations</li>
                </ul>

                <h4>Phase 4: Deployment</h4>
                <ul>
                    <li>Deploy frontend to Vercel/Netlify</li>
                    <li>Commit processed data to repo</li>
                    <li>Document methodology</li>
                    <li>Share results publicly</li>
                </ul>
            </div>
        `;
    }

    renderKeyDecisions() {
        return `
            <div class="page-section" id="key-decisions">
                <h2 class="section-title">Key Design Decisions</h2>
                
                <h3>For Technical Credibility</h3>
                <ul>
                    <li><strong>Version everything:</strong> Prompts, models, experiments</li>
                    <li><strong>Reproducible results:</strong> Include configs and documentation</li>
                    <li><strong>Rigorous evaluation:</strong> Multiple metrics, not just accuracy</li>
                    <li><strong>Cost awareness:</strong> Track and optimize API spending</li>
                </ul>

                <h3>For Design Excellence</h3>
                <ul>
                    <li><strong>Beautiful presentation:</strong> Custom site, not default templates</li>
                    <li><strong>Clear information hierarchy:</strong> Guide viewers through findings</li>
                    <li><strong>Interactive explorations:</strong> Let users discover insights</li>
                    <li><strong>Storytelling approach:</strong> Problem → Method → Findings → Impact</li>
                </ul>

                <h3>Budget Considerations</h3>
                    <ul style="margin: 0;">
                        <li><strong>One-time experiment run:</strong> Control costs with local execution</li>
                        <li><strong>Static results display:</strong> No ongoing API costs</li>
                        <li><strong>Cached examples:</strong> Pre-computed for demo purposes</li>
                        <li><strong>Open access:</strong> Public results for community benefit</li>
                    </ul>
            </div>
        `;
    }

    renderSuccessCriteria() {
        return `
            <div class="page-section" id="success-criteria">
                <h2 class="section-title">Success Criteria</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--sl-spacing-medium); margin: var(--sl-spacing-large) 0;">
                    <div style="background-color: var(--sl-color-blue-50); border: 1px solid var(--sl-color-blue-200); border-radius: var(--sl-border-radius-medium); padding: var(--sl-spacing-medium);">
                        <h4 style="color: var(--sl-color-blue-600); margin-top: 0;">Technical</h4>
                        <p style="margin-bottom: 0;">Demonstrates understanding of LLM capabilities and limitations</p>
                    </div>
                    
                    <div style="background-color: var(--sl-color-purple-50); border: 1px solid var(--sl-color-purple-200); border-radius: var(--sl-border-radius-medium); padding: var(--sl-spacing-medium);">
                        <h4 style="color: var(--sl-color-purple-600); margin-top: 0;">Design</h4>
                        <p style="margin-bottom: 0;">Shows ability to make complex data accessible and engaging</p>
                    </div>
                    
                    <div style="background-color: var(--sl-color-magenta-50); border: 1px solid var(--sl-color-magenta-200); border-radius: var(--sl-border-radius-medium); padding: var(--sl-spacing-medium);">
                        <h4 style="color: var(--sl-color-magenta-600); margin-top: 0;">Product Thinking</h4>
                        <p style="margin-bottom: 0;">Identifies practical applications and improvements</p>
                    </div>
                    
                    <div style="background-color: var(--sl-color-neutral-50); border: 1px solid var(--sl-color-neutral-200); border-radius: var(--sl-border-radius-medium); padding: var(--sl-spacing-medium);">
                        <h4 style="color: var(--sl-color-neutral-1000); margin-top: 0;">Research Rigor</h4>
                        <p style="margin-bottom: 0;">Follows reproducible, scientific methodology</p>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('home-page', HomePage);