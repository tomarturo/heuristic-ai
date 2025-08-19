// data/tags.js
export const tags = {
  // Current tags
  "design": {
    icon: "palette",
    context: "Visual systems & user experience"
  },
  "data": {
    icon: "bar-chart",
    context: "Structure & processing"
  },
  "planning": {
    icon: "kanban",
    context: "Strategic roadmapping"
  },
  "research": {
    icon: "binoculars",
    context: "User insights & validation"
  },
  "prompting": {
    icon: "chat-text",
    context: "AI interaction design"
  },

  // Refined current tags
  "frontend": {
    icon: "code",
    context: "Frontend implementation"
  },
  "backend": {
    icon: "database",
    context: "Server & API development"
  },
  "data-viz": {
    icon: "pie-chart",
    context: "Visual data representation"
  },

  // Technical/AI tags
  "ml-ops": {
    icon: "cpu",
    context: "Model orchestration & APIs"
  },
  "evaluation": {
    icon: "award",
    context: "Metrics design & validation"
  },
  "automation": {
    icon: "magic",
    context: "Workflow optimization"
  },

  // Product/Strategy tags
  "product-strategy": {
    icon: "compass",
    context: "Feature prioritization"
  },
  "systems-thinking": {
    icon: "bezier2",
    context: "Architecture & scalability"
  },
  "optimization": {
    icon: "rocket",
    context: "Performance & efficiency"
  },

  // Design tags
  "information design": {
    icon: "layers",
    context: "Site architecture and hierarchy"
  },
  "interaction design": {
    icon: "cursor",
    context: "User flow & patterns"
  },
  "storytelling": {
    icon: "chat-quote",
    context: "Narrative construction"
  },

  // Research/Analysis tags
  "comparative-analysis": {
    icon: "arrows-expand",
    context: "Model benchmarking"
  },
  "methodology": {
    icon: "list-check",
    context: "Framework design"
  },
  "insights": {
    icon: "lightbulb",
    context: "Pattern recognition"
  },

  // Implementation tags
  "deployment": {
    icon: "rocket-takeoff",
    context: "Production systems"
  },
  "documentation": {
    icon: "journal-text",
    context: "Knowledge transfer"
  }
};

// Helper function to get tag data
export const getTagData = (tagName) => {
  return tags[tagName] || {
    icon: "tag",
    context: "General activity"
  };
};