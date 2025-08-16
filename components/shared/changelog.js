import { changes } from '../../data/changelog.js';

const tagIcons = {
  "design": "palette",
  "development": "code", 
  "data": "database",
  "planning": "journal-text",
  "research": "search",
  "prompting": "braces"
};

export class ChangelogComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div>
                <h1>Changelog</h1>
                <sl-divider></sl-divider>
                <div class="changelog-wrapper">
                    ${changes.map(change => this.renderChangelogItem(change)).join('')}
                </div>
            </div>
        `;
    }

    renderChangelogItem(change) {
        return `
            <div class="changelog-item">
                <sl-tag pill size="medium" variant="neutral">${change.date}</sl-tag>
                <p>${change.description}</p>
                <div class="changelog-item-tags">
                    ${change.tags.map(tag => `
                        <sl-tag size="small" variant="neutral">
                            <sl-icon name="${tagIcons[tag] || 'tag'}"></sl-icon>
                            ${tag}
                        </sl-tag>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('changelog-component', ChangelogComponent);