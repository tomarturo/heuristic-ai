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
                    <h1>LLMs & UX Heuristic Analysis</h1>
                    <h3>Can large language models reliably conduct a UX heuristic analysis?</h3>
                    <p>A few posts on LinkedIn got me thinking about this question. Most of the attempts I read about were not particularly methodical, more or less attaching a screenshot to a prompt and blithely asking the model for a UX heuristic analysis based on its default dearth of information.</p>
                    <p>It struck me as a worthwhile task, seeing how far we could get a model to perform this tried and true UX task.</p>
                    <p>The timing was opportune as well. I needed a compelling subject to motivate me to,</p>
                    <ul>
                    <li>Dig more methodically into prompting</li>
                    <li>Explore, think about how to document, and then document the results of different prompt strategies and methods</li>
                    <li>Illustrate to other product desigkners what it looks like to design deeply with LLMS</li>
                    </ul>
                    <p>A collection of ${prompts.length} curated AI prompts.</p>
                    <p>Start by exploring the <a href="#prompts">prompts</a> or <a href="#experiments">experiments</a> above.</p>
                </div>

                <!-- Changelog Right Rail -->

                <div class="right-rail">
                    <changelog-component></changelog-component>
                </div>
            </section>
        `;
    }
}

customElements.define('home-page', HomePage);