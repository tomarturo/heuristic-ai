export const prompts = [
    {
        id: "1",
        name: "ux_eval_brief",
        title: "Brief Evaluation",
        description: `
        This streamlined methodology serves as a crucial experimental control to test fundamental assumptions about prompt engineering and model behavior. By reducing cognitive load and potential overthinking, the Brief version aims to determine whether AI models can effectively leverage their inherent knowledge with minimal guidance, whether shorter prompts actually produce more focused and accurate evaluations, and whether simplicity reduces the risk of hallucination or analytical drift that might occur with more complex instructions.
        `,
        system: "You are a UX evaluation expert familiar with Nielsen's heuristics. Provide clear, actionable feedback.",
        prompt: 
`Evaluate this interface using Jakob Nielsen's 10 Usability Heuristics:

**1. Visibility of System Status**
Keep users informed through appropriate, timely feedback.

**2. Match between System and Real World**
Use familiar words and concepts, not internal jargon.

**3. User Control and Freedom**
Provide clearly marked "emergency exits" for mistaken actions.

**4. Consistency and Standards**
Follow platform conventions; users shouldn't wonder if different things mean the same.

**5. Error Prevention**
Prevent problems from occurring rather than just good error messages.

**6. Recognition Rather Than Recall**
Make elements visible; don't make users remember information.

**7. Flexibility and Efficiency of Use**
Provide shortcuts for expert users while supporting novices.

**8. Aesthetic and Minimalist Design**
Remove irrelevant information that competes with essential content.

**9. Recognize, Diagnose, and Recover from Errors**
Express errors in plain language with clear solutions.

**10. Help and Documentation**
Provide necessary documentation to help users complete tasks.

---

For each violation found, state:
- Which heuristic (#)
- The specific problem
- Where it occurs
- How to fix it

Focus on significant usability issues only.     
`,
        output: "This is test output"
    },
    {
        id: "2", 
        name: "ux_eval_simple",
        title: "Simple Evaluation",
        description: `
        This approach uses a straightforward checklist format that walks through each of Nielsen's 10 usability heuristics with simple "Check:" questions for each one. It provides a basic framework for identifying issues with minimal complexity, making it accessible but potentially less thorough in its analysis.
        `,
        name: "ux_simple_brief",
        prompt: 
`You will evaluate the provided interface screenshot using Jakob Nielsen's 10 Usability Heuristics. For each heuristic, identify specific places where the interface fails to adhere to the guideline and provide recommendations.

**Interface Being Evaluated:** [Screenshot]
**Primary Task:** [Infer the main user task from the interface]

---

### 1. Visibility of System Status
*The design should always keep users informed about what is going on, through appropriate feedback within a reasonable amount of time.*

Check:
- Does the design clearly communicate its state?
- Is feedback presented quickly after user actions?

### 2. Match Between System and the Real World
*The design should speak the users' language. Use familiar words, phrases, and concepts rather than internal jargon.*

Check:
- Will users be familiar with the terminology used?
- Do the controls follow real-world conventions?

### 3. User Control and Freedom
*Users need a clearly marked "emergency exit" to leave unwanted actions without an extended process.*

Check:
- Can users go back a step in the process?
- Are exit links easily discoverable?
- Can users easily cancel an action?
- Is Undo and Redo supported?

### 4. Consistency and Standards
*Users should not wonder whether different words, situations, or actions mean the same thing.*

Check:
- Does the design follow industry conventions?
- Are visual treatments used consistently throughout?

### 5. Error Prevention
*The best designs carefully prevent problems from occurring in the first place.*

Check:
- Does the design prevent slips using helpful constraints?
- Does it warn users before risky actions?

### 6. Recognition Rather Than Recall
*Minimize memory load by making elements, actions, and options visible.*

Check:
- Does the design keep important information visible?
- Does it offer help in-context?

### 7. Flexibility and Efficiency of Use
*Shortcuts may speed up interaction for expert users while catering to novices.*

Check:
- Are there accelerators like keyboard shortcuts?
- Is content personalized for individual users?

### 8. Aesthetic and Minimalist Design
*Interfaces should not contain irrelevant or rarely needed information.*

Check:
- Is the visual design focused on essentials?
- Have distracting, unnecessary elements been removed?

### 9. Help Users Recognize, Diagnose, and Recover from Errors
*Error messages should be in plain language, indicate the problem, and suggest solutions.*

Check:
- Does it use traditional error visuals (bold, red text)?
- Does it offer solutions that solve errors immediately?

### 10. Help and Documentation
*It's best if the system doesn't need explanation, but documentation may be necessary.*

Check:
- Is help documentation easy to search?
- Is help provided in context when needed?

---

## EVALUATION FORMAT

For each heuristic violation found, provide:

**Issue:** [Specific description and location]
**Recommendation:** [Specific fix]
`,
        output: "Another test output"
    },
    {
        id: "3", 
        name: "ux_eval_detailed",
        title: "Detailed Evalution",
        description: "This version provides extensive definitions, key principles, and specific guidance for each heuristic, along with a structured severity rating system (1-4 scale). It emphasizes thoroughness and educational value, offering detailed explanations of what to look for and how to categorize findings with justification.",
        prompt: 
        `You will conduct a heuristic evaluation of the provided user interface screenshot using Jakob Nielsen's 10 Usability Heuristics, as defined by Nielsen Norman Group.

## HEURISTIC EVALUATION FRAMEWORK

### 1. Visibility of System Status
**Definition:** The design should always keep users informed about what is going on, through appropriate feedback within a reasonable amount of time.
**Key Principles:**
- Communicate clearly to users what the system's state is
- Present feedback as quickly as possible
- Build trust through open and continuous communication
**Examples to look for:** Progress indicators, loading states, form submission feedback, active state indicators

### 2. Match between System and the Real World  
**Definition:** The design should speak the users' language. Use words, phrases, and concepts familiar to the user, rather than internal jargon. Follow real-world conventions, making information appear in a natural and logical order.
**Key Principles:**
- Ensure users understand meaning without looking up definitions
- Never assume your understanding matches users'
- Use familiar terminology from user research
**Examples to look for:** Technical jargon, unfamiliar icons, unnatural information ordering

### 3. User Control and Freedom
**Definition:** Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted action without having to go through an extended process.
**Key Principles:**
- Support Undo and Redo
- Show clear exits like Cancel buttons
- Make exits clearly labeled and discoverable
**Examples to look for:** Missing undo, no cancel options, trapped in workflows

### 4. Consistency and Standards
**Definition:** Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions.
**Key Principles:**
- Maintain internal consistency (within product)
- Follow external consistency (industry standards)
- Remember Jakob's Law: users spend most time on other sites
**Examples to look for:** Inconsistent terminology, non-standard UI patterns, varying styles

### 5. Error Prevention
**Definition:** Good error messages are important, but the best designs carefully prevent problems from occurring in the first place.
**Key Principles:**
- Prevent high-cost errors first
- Avoid slips through constraints and good defaults
- Prevent mistakes by reducing memory burden
**Note:** Distinguish between slips (unconscious errors) and mistakes (conscious errors from mismatched mental models)
**Examples to look for:** Missing confirmation dialogs, no input validation, ambiguous actions

### 6. Recognition Rather Than Recall
**Definition:** Minimize the user's memory load by making elements, actions, and options visible. Users should not have to remember information from one part of the interface to another.
**Key Principles:**
- Let people recognize information rather than recall it
- Offer help in-context instead of memorized tutorials
- Reduce information users must remember
**Examples to look for:** Hidden options, information needed from other screens, no visible cues

### 7. Flexibility and Efficiency of Use
**Definition:** Shortcuts — hidden from novice users — may speed up the interaction for expert users. Allow users to tailor frequent actions.
**Key Principles:**
- Provide accelerators (keyboard shortcuts, gestures)
- Enable personalization for individual users
- Allow customization of workflows
**Examples to look for:** No shortcuts available, rigid workflows, no personalization options

### 8. Aesthetic and Minimalist Design
**Definition:** Interfaces should not contain information which is irrelevant or rarely needed. Every extra unit of information competes with relevant units and diminishes their relative visibility.
**Key Principles:**
- Keep content and visual design focused on essentials
- Don't let unnecessary elements distract users
- Prioritize content to support primary goals
**Note:** This isn't about flat design—it's about focused communication
**Examples to look for:** Visual clutter, decorative elements that distract, irrelevant information

### 9. Help Users Recognize, Diagnose, and Recover from Errors
**Definition:** Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.
**Key Principles:**
- Use traditional error visuals (bold, red text)
- Tell users what went wrong in their language
- Offer solutions or immediate fixes
**Examples to look for:** Cryptic error codes, vague messages, no recovery suggestions

### 10. Help and Documentation
**Definition:** It's best if the design doesn't need any additional explanation. However, it may be necessary to provide documentation to help users complete their tasks.
**Key Principles:**
- Make help easy to search
- Present documentation in-context when needed
- List concrete steps to carry out
**Examples to look for:** Missing help options, inaccessible documentation, vague instructions

## EVALUATION INSTRUCTIONS

Analyze the provided screenshot systematically:

1. **First Pass - Identify Issues:**
   For each heuristic violation you find, document:
   - Heuristic number and name violated
   - Specific description of the problem
   - Location in the interface (be specific)
   - Why this violates the heuristic (connect to definition)

2. **Severity Rating:**
   Assign severity using this scale:
   - **1 - Cosmetic:** Doesn't affect functionality; fix if time available
   - **2 - Minor:** Users can work around; low priority fix  
   - **3 - Major:** Significant impact on users; important to fix
   - **4 - Catastrophe:** Must fix before release; blocks critical tasks
   
   Consider three factors:
   - Frequency: How often will users encounter this?
   - Impact: How much does it slow/confuse users?
   - Persistence: One-time learning issue or repeated problem?

3. **Recommendations:**
   Provide specific, actionable fixes for each issue.

Focus on substantive issues (severity 2+). Report your findings in order of severity, highest first.
        
        `,
        output: "Another test output"
    },
    {
        id: "4", 
        name: "ux_eval_conceptual_chain",
        title: "Conceptual Chain",
        description: "This approach uses arrow notation (→) to show logical dependencies and cause-effect relationships between UI issues and heuristic violations. It focuses on connecting concepts sequentially while minimizing verbosity, creating a more analytical framework that traces problems from root causes through to user consequences.",
        prompt: 
`You will conduct a heuristic evaluation of the provided user interface screenshot using Jakob Nielsen's 10 Usability Heuristics, applying **Conceptual Chaining** methodology for efficient analysis.

## Conceptual Chaining Evaluation Method

**Approach:** Extract key concepts → Link sequentially → Minimize verbosity → Focus on essential connections

**Format:** Use arrows (→) to show logical dependencies between UI issues and heuristic violations

## Heuristic Evaluation Framework

### 1. Visibility of System Status
- **Chain:** User action → System feedback → Trust building
- **Look for:** Loading states → Progress indicators → Status communication
- **Violations:** Hidden processes → No feedback → User uncertainty

### 2. Match between System and Real World  
- **Chain:** Real world concepts → UI language → User understanding
- **Look for:** Familiar terms → Logical ordering → Natural flow
- **Violations:** Technical jargon → Confusing icons → Unnatural sequences

### 3. User Control and Freedom
- **Chain:** User mistake → Exit mechanism → Recovery
- **Look for:** Undo options → Cancel buttons → Clear exits
- **Violations:** No escape routes → Trapped workflows → Missing undo

### 4. Consistency and Standards
- **Chain:** User expectation → Standard patterns → Predictable behavior
- **Look for:** Consistent terminology → Standard UI patterns → Familiar conventions
- **Violations:** Mixed patterns → Non-standard elements → Inconsistent labeling

### 5. Error Prevention
- **Chain:** Potential error → Prevention mechanism → Safe interaction
- **Look for:** Input validation → Confirmation dialogs → Smart defaults
- **Violations:** No validation → Risky actions → Error-prone design

### 6. Recognition Rather Than Recall
- **Chain:** Information need → Visual availability → Reduced memory load
- **Look for:** Visible options → Contextual help → Available cues
- **Violations:** Hidden information → Memory requirements → Missing context

### 7. Flexibility and Efficiency of Use
- **Chain:** User expertise → Shortcuts/customization → Faster completion
- **Look for:** Keyboard shortcuts → Personalization → Multiple paths
- **Violations:** Single workflow → No shortcuts → Rigid interface

### 8. Aesthetic and Minimalist Design
- **Chain:** Visual elements → Essential focus → Clear hierarchy
- **Look for:** Clean layout → Focused content → Clear priorities
- **Violations:** Visual clutter → Decorative distractions → Information overload

### 9. Help Users Recognize, Diagnose, and Recover from Errors
- **Chain:** Error occurs → Clear message → Recovery path
- **Look for:** Plain language → Specific problems → Solution suggestions
- **Violations:** Cryptic messages → Vague errors → No recovery help

### 10. Help and Documentation
- **Chain:** User confusion → Available help → Task completion
- **Look for:** Searchable help → Contextual assistance → Step-by-step guides
- **Violations:** Missing help → Inaccessible docs → Vague instructions

## Evaluation Process

### Phase 1: Issue Identification
**Chain:** Screenshot → Heuristic scan → Violation identification

For each issue found:
- **Heuristic:** #Number → Name
- **Problem:** Specific issue → Location → Impact
- **Chain:** Root cause → Violation → User consequence

### Phase 2: Severity Assessment
**Chain:** Issue frequency → User impact → Priority level

**Severity Scale:**
- **4-Catastrophe:** Critical blocker → Must fix → Release dependency
- **3-Major:** Significant impact → Important fix → User frustration  
- **2-Minor:** Workaround exists → Low priority → Minor inconvenience
- **1-Cosmetic:** No functionality impact → Time permitting → Polish item

**Assessment Chain:** Frequency → Impact → Persistence → Severity rating

### Phase 3: Solution Recommendations
**Chain:** Identified problem → Root cause → Specific solution → Expected outcome

## Output Format

DO NOT USE TABLES; Use Conceptual Chaining structure for findings:

### Issue Template
**Issue [#]:** Heuristic violation → Specific problem → User impact Location: UI element → Screen area → Context Chain: Cause → Effect → Consequence
**Severity:** [1-4] → Reasoning **Fix:** Current state → Recommended change → Expected result

### Analysis Guidelines
- **Analysis Order:** Severity 4 → 3 → 2 → (1 if time permits)
- **Focus:** Substantive issues → Clear chains → Actionable solutions
        `,
        output: "Another test output"
    }
];