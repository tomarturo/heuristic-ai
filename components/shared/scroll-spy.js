/**
 * ScrollSpy - A reusable utility for managing table of contents scroll behavior
 * 
 * Features:
 * - Smooth scrolling to sections when TOC links are clicked
 * - Automatic highlighting of active TOC links based on scroll position
 * - Intersection Observer for efficient scroll detection
 * - Configurable options for different use cases
 */

export class ScrollSpy {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            sectionsSelector: '.page-section',
            tocLinksSelector: '.toc-link',
            activeClass: 'active',
            rootMargin: '-20% 0px -80% 0px',
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
            initializeFirstActive: true,
            useAdvancedDetection: false,
            ...options
        };
        
        this.observer = null;
        this.sections = [];
        this.tocLinks = [];
        this.isScrolling = false;
        this.scrollTimeout = null;
        
        this.init();
    }

    init() {
        this.sections = this.container.querySelectorAll(this.options.sectionsSelector);
        this.tocLinks = this.container.querySelectorAll(this.options.tocLinksSelector);
        
        if (this.sections.length === 0 || this.tocLinks.length === 0) {
            console.warn('ScrollSpy: No sections or TOC links found');
            return;
        }

        this.setupClickListeners();
        this.setupIntersectionObserver();
        
        if (this.options.initializeFirstActive) {
            this.initializeFirstActive();
        }
    }

    setupClickListeners() {
        this.container.addEventListener('click', (event) => {
            const tocLink = event.target.closest(this.options.tocLinksSelector);
            if (!tocLink) return;

            event.preventDefault();
            
            const targetId = tocLink.getAttribute('href').substring(1);
            const targetElement = this.container.querySelector(`#${targetId}`);
            
            if (targetElement) {
                // Immediately set active state for clicked link
                this.updateActiveState(tocLink);
                
                // Disable scroll spy during programmatic scrolling
                this.disableScrollSpy();
                
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Re-enable scroll spy after scrolling completes
                this.enableScrollSpyAfterDelay();
            }
        });
    }

    setupIntersectionObserver() {
        const callback = this.options.useAdvancedDetection 
            ? this.advancedIntersectionCallback.bind(this)
            : this.basicIntersectionCallback.bind(this);

        this.observer = new IntersectionObserver(callback, {
            rootMargin: this.options.rootMargin,
            threshold: this.options.threshold
        });

        this.sections.forEach(section => this.observer.observe(section));
    }

    basicIntersectionCallback(entries) {
        // Skip if scroll spy is disabled during programmatic scrolling
        if (this.isScrolling) return;
        
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = this.container.querySelector(`${this.options.tocLinksSelector}[href="#${id}"]`);
                if (activeLink) {
                    this.updateActiveState(activeLink);
                }
            }
        });
    }

    advancedIntersectionCallback(entries) {
        // Skip if scroll spy is disabled during programmatic scrolling
        if (this.isScrolling) return;
        
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
            // Get the most visible section (highest intersection ratio)
            const mostVisible = visibleEntries.reduce((prev, current) => {
                return current.intersectionRatio > prev.intersectionRatio ? current : prev;
            });
            
            const id = mostVisible.target.getAttribute('id');
            const activeLink = this.container.querySelector(`${this.options.tocLinksSelector}[href="#${id}"]`);
            if (activeLink) {
                this.updateActiveState(activeLink);
            }
        }
    }

    updateActiveState(activeLink) {
        // Remove active class from all TOC links
        this.tocLinks.forEach(link => link.classList.remove(this.options.activeClass));
        
        // Add active class to current link
        activeLink.classList.add(this.options.activeClass);
    }

    initializeFirstActive() {
        requestAnimationFrame(() => {
            const firstSection = this.sections[0];
            if (firstSection) {
                const firstId = firstSection.getAttribute('id');
                const firstLink = this.container.querySelector(`${this.options.tocLinksSelector}[href="#${firstId}"]`);
                if (firstLink) {
                    this.updateActiveState(firstLink);
                }
            }
        });
    }

    disableScrollSpy() {
        this.isScrolling = true;
        
        // Clear any existing timeout
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
    }

    enableScrollSpyAfterDelay() {
        // Clear any existing timeout
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        
        // Re-enable scroll spy after smooth scrolling completes
        // Smooth scrolling typically takes 500-1000ms depending on distance
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 1000);
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = null;
        }
        
        // Note: We don't remove click listeners as they're bound to the container
        // and will be cleaned up when the container is removed from DOM
    }

    // Public method to manually set active section
    setActiveSection(sectionId) {
        const activeLink = this.container.querySelector(`${this.options.tocLinksSelector}[href="#${sectionId}"]`);
        if (activeLink) {
            this.updateActiveState(activeLink);
        }
    }

    // Public method to scroll to section
    scrollToSection(sectionId) {
        const targetElement = this.container.querySelector(`#${sectionId}`);
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}