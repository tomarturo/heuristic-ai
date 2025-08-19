// components/changelog/changelog.js
import { changes } from '../../data/changelog.js';
import { getTagData } from '../../data/tags.js';

export class ChangelogComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <h3 class="right-rail-header">Progress</h3>
            <div class="changelog-wrapper">
                ${changes.map(change => this.renderChangelogItem(change)).join('')}
            </div>
        `;
    }

    renderChangelogItem(change) {
        return `
            <div class="changelog-item-wrapper">
                <text class="changelog-date">${change.date}</text>
                <p class="changelog-description">${change.description}</p>
                <div class="changelog-item-tags">
                    ${change.tags.map(tag => {
                        const tagData = getTagData(tag);
                        return `
                            <sl-tooltip content="${tagData.context}" placement="bottom">
                                <sl-tag size="small" variant="neutral">
                                    <sl-icon name="${tagData.icon}"></sl-icon>
                                    ${tag}
                                </sl-tag>
                            </sl-tooltip>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('changelog-component', ChangelogComponent);