# Adding New Tasks to React Live Coding Practice

This guide explains how to add new practice tasks to the project.

## Task File Structure

Tasks are markdown files located in `src/content/tasks/`. Each file must follow this exact structure:

## Required Schema

```yaml
---
title: Task Title Here
description: Brief one-line description
tags:
  - tag1
  - tag2
  - tag3
difficulty: easy|medium|hard
timeEstimate: 15-40
learningGoals:
  - First learning goal
  - Second learning goal
  - Third learning goal
hints:
  - First hint (guide without spoiling)
  - Second hint
  - Third hint (optional)
starterCode: |
  import { useState } from 'react';

  export default function App() {
    // TODO: Implement the task
    return <div>Start here</div>;
  }
---

## Task Description

Write a detailed description of what the user needs to build...

### Requirements

- Requirement 1
- Requirement 2
- Requirement 3

### Example Behavior

Describe how the completed solution should behave...
```

## Field Requirements

### `title` (string, required)
- Clear, descriptive title
- Should indicate what will be built
- Example: "Counter with useState"

### `description` (string, required)
- One-line summary
- Used in meta tags and task cards
- Keep under 160 characters
- Example: "Build a simple counter with increment, decrement and reset buttons"

### `tags` (array of strings, required)
- Relevant React concepts
- Lowercase, hyphenated
- Common tags: `useState`, `useEffect`, `useReducer`, `forms`, `performance`, `accessibility`
- Include 2-5 tags per task

### `difficulty` (enum, required)
- Must be exactly one of: `easy`, `medium`, `hard`
- **Easy**: Basic concepts, straightforward implementation (15-20 min)
- **Medium**: Intermediate patterns, some complexity (20-30 min)
- **Hard**: Advanced patterns, complex logic (30-40 min)

### `timeEstimate` (number, required)
- Estimated completion time in minutes
- Range: 15-40 minutes
- Be realistic based on complexity

### `learningGoals` (array of strings, required)
- 3-5 specific learning outcomes
- Start with action verbs: "Learn", "Understand", "Practice", "Implement"
- Be specific about what concepts are covered
- Example: "Learn useState hook basics", "Handle button click events"

### `hints` (array of strings, required)
- 2-4 progressive hints
- Should guide without giving away the solution
- Start with high-level strategy, get more specific
- Example progression:
  - Hint 1: "Use useState to store the counter value"
  - Hint 2: "Create handler functions for increment/decrement"
  - Hint 3: "Don't forget to handle the reset functionality"

### `starterCode` (string, required)
- **MUST use `|` for multiline YAML string**
- Complete, valid React component
- Include necessary imports
- Add TODO comments where user should code
- Include mock data if needed
- Should compile without errors
- Example structure:
```javascript
import { useState } from 'react';

// Mock data if needed
const MOCK_DATA = [...];

export default function App() {
  // TODO: Add your implementation here

  return (
    <div>
      {/* Starter UI structure */}
    </div>
  );
}
```

## YAML Formatting Rules (CRITICAL)

### ✅ DO:
- Use `  - item` format for arrays (2 spaces + dash + space)
- Use `starterCode: |` for multiline code (pipe symbol)
- Quote strings with colons: `"text: with colon"`
- No quotes around plain strings
- Blank line after closing `---`

### ❌ DON'T:
- Don't use quotes around field names
- Don't use tabs, only spaces
- Don't forget the `|` after `starterCode:`
- Don't include `slug` field (auto-generated from filename)

## File Naming Convention

- Use kebab-case: `task-name-here.md`
- Descriptive but concise
- Should match the task purpose
- Examples:
  - `use-state-counter.md`
  - `use-effect-data-fetching.md`
  - `modal-dialog-accessible.md`

## Complete Example

```markdown
---
title: Counter with useState
description: Build a simple counter with increment, decrement and reset buttons
tags:
  - useState
  - events
  - basics
difficulty: easy
timeEstimate: 15
learningGoals:
  - Learn useState hook basics
  - Handle button click events
  - Update state immutably
  - Conditionally disable buttons
hints:
  - Start by importing useState from React
  - Initialize state with useState(0)
  - Create separate handler functions for each button
  - Use the setter function to update the count
starterCode: |
  import { useState } from 'react';

  export default function App() {
    // TODO: Add state for counter

    // TODO: Add handler functions

    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Counter</h1>
        <div style={{ fontSize: '48px', margin: '20px' }}>
          {/* TODO: Display count */}
          0
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => {}}>-</button>
          <button onClick={() => {}}>Reset</button>
          <button onClick={() => {}}>+</button>
        </div>
      </div>
    );
  }
---

## Task

Build a counter component with increment, decrement, and reset functionality.

### Requirements

- Display the current count
- Increment button increases count by 1
- Decrement button decreases count by 1
- Reset button sets count back to 0
- Style the buttons and display for good UX

### Bonus Challenges

- Prevent count from going below 0
- Add keyboard shortcuts (arrow keys)
- Add increment by 10 buttons
- Persist count to localStorage
```

## Common Mistakes to Avoid

1. **Missing `|` after `starterCode:`** - This will break YAML parsing
2. **Including `slug` field** - Astro generates this from filename
3. **Colons in hints without quotes** - Wrap in quotes: `"State: input and debouncedValue"`
4. **Invalid difficulty value** - Must be exactly `easy`, `medium`, or `hard`
5. **Empty or missing arrays** - All arrays must have at least 1 item
6. **Broken starter code** - Always test that the code compiles

## Testing Your Task

After creating a task file:

1. **Syntax check**: The dev server will show errors if YAML is invalid
2. **Visit the task**: Navigate to `/tasks/your-task-name`
3. **Test copy button**: Ensure code copies correctly
4. **Verify all content**: Check that all sections render properly
5. **Test hints**: Expand each hint to verify content

## Task Categories

Organize tasks by category:

- **Hooks Mastery**: useState, useEffect, useReducer, custom hooks
- **State Patterns**: lifting state, derived state, composition
- **Performance**: memo, useMemo, useCallback, virtualization
- **Real-world UIs**: modals, tables, forms, drag-drop

Choose difficulty based on category norms:
- Hooks basics: easy to medium
- State patterns: medium
- Performance: medium to hard
- Complex UIs: medium to hard

## Quick Checklist

Before committing a new task:

- [ ] File named with kebab-case in `src/content/tasks/`
- [ ] All required frontmatter fields present
- [ ] Tags are relevant and lowercase
- [ ] Difficulty matches actual complexity
- [ ] Time estimate is realistic (15-40 min)
- [ ] Learning goals are specific (3-5 items)
- [ ] Hints are progressive and helpful (2-4 items)
- [ ] Starter code uses `|` syntax and is complete
- [ ] No syntax errors in YAML
- [ ] Task description is clear and detailed
- [ ] Dev server runs without errors
- [ ] Task page renders correctly
