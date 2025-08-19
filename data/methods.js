export const methods = [
    {
        title: "Single Prompt + Image",
        type: "single-prompt",
        description: "A comprehensive prompt containing all Nielsen's 10 usability heuristics and evaluation instructions is sent with the interface screenshot to generate a complete heuristic evaluation in one model response."
    }, 
    {
        title: "Multi-Prompt + Image",
        type: "multi-prompt",
        description: "Nielsen's 10 usability heuristics and evalution instructions are broken into separate prompts (5 per prompt, 1 per prompt) with the same interface image, allowing for more focused analysis and potentially reducing cognitive load per evaluation round."
    },
    {
        title: "Browser-Use Agent",
        type: "browser-use",
        description: "An AI agent navigates a live web interface through browser automation, dynamically interacting with elements and evaluating usability heuristics based on real-time responses and state changes."
    },
    {
        title: "Computer-Use Agent",
        type: "computer-use",
        description: "An AI agent operates the interface through simulated user interactions (clicks, typing, scrolling) on the actual application, experiencing the interface as a user would to identify heuristic violations through direct manipulation and observation of system responses."
    },
]