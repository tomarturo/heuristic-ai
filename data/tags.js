// data/tags.js
export const tags = {
  // Current tags
  "design": {
    icon: "palette",
    context: "Visual systems & user experience"
  },
  "research": {
    icon: "binoculars",
    context: "User insights & validation"
  },
  "frontend": {
    icon: "code",
    context: "Frontend implementation"
  },
  "backend": {
    icon: "database",
    context: "Server & API development"
  },
  "ml-ops": {
    icon: "cpu",
    context: "Model orchestration & APIs"
  },
  "analysis": {
    icon: "lightbulb",
    context: "Pattern recognition"
  },
};

// Helper function to get tag data
export const getTagData = (tagName) => {
  return tags[tagName] || {
    icon: "tag",
    context: "General activity"
  };
};