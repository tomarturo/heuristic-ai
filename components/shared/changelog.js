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
                <h3 class="right-rail-header">Activity</h3>
                <div class="changelog-wrapper">
                    ${changes.map(change => this.renderChangelogItem(change)).join('')}
                </div>
        `;
    }

    renderChangelogItem(change) {
        return `
            <div class="changelog-item-wrapper">
                <text class="changelog-date">${change.date}</text>
                <p class="text-muted">${change.description}</p>
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