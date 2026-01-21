# React Live Coding Practice

A comprehensive collection of 30 React practice challenges designed to sharpen your skills through hands-on coding. Built with Astro, Tailwind CSS, and React.

## Features

- **30 Curated Tasks** - Covering hooks, state management, performance, and real-world UI patterns
- **Progressive Difficulty** - Easy, medium, and hard challenges (15-30 minutes each)
- **Complete Starter Code** - Every task includes a ready-to-use App.tsx with mock data
- **Learning Goals** - Clear objectives for each challenge
- **Progressive Hints** - Get unstuck without spoiling the solution
- **Clean UI** - Dark theme, syntax highlighting (Shiki), and responsive design
- **Easy Navigation** - Previous/Next/Random buttons to explore tasks

## Quick Start

```bash
# Install dependencies
bun install

# Start dev server
bun dev

# Build for production
bun run build
```

Visit `http://localhost:4321/` and you'll be redirected to a random task.

## Project Structure

```
/
├── src/
│   ├── content/
│   │   ├── config.ts          # Content collection schema
│   │   └── tasks/             # 30 markdown task files
│   ├── layouts/
│   │   └── BaseLayout.astro   # Base HTML layout
│   ├── components/
│   │   ├── TaskHeader.astro   # Navigation header
│   │   ├── CopyButton.tsx     # Copy-to-clipboard button
│   │   └── HintAccordion.tsx  # Expandable hints
│   └── pages/
│       ├── index.astro        # Homepage (random redirect)
│       └── tasks/
│           └── [slug].astro   # Dynamic task pages
├── tailwind.config.mjs
└── astro.config.mjs
```

## Task Categories

### Hooks Mastery (8 tasks)
- useState basics & patterns
- useEffect & cleanup
- useReducer for complex state
- Custom hooks creation

### State Patterns (8 tasks)
- Lifting state up
- Derived state vs stored state
- State composition
- Form state management

### Performance (6 tasks)
- React.memo & useMemo
- useCallback optimization
- List virtualization
- Debouncing & lazy loading

### Real-world UIs (8 tasks)
- Complex forms & wizards
- Data tables (sorting, filtering)
- Modals & accessible dialogs
- Drag and drop

## How to Use

1. **Open the site** in one browser window
2. **Open your sandbox** (CodeSandbox, StackBlitz, etc.) in another window
3. **Copy the starter code** using the copy button
4. **Paste into your sandbox** and start coding
5. **Use hints** if you get stuck
6. **Navigate** to the next challenge when done

## Adding New Tasks

Create a new markdown file in `src/content/tasks/`:

```markdown
---
title: Your Task Title
description: Brief description
tags:
  - useState
  - forms
difficulty: medium
timeEstimate: 25
learningGoals:
  - Learn concept A
  - Practice pattern B
hints:
  - First hint
  - Second hint
starterCode: |
  export default function App() {
    return <div>Start here</div>;
  }
---

## Task Description

Your detailed task description goes here...
```

## Tech Stack

- **Astro 5** - Static site generator
- **React 19** - UI library
- **Tailwind CSS 3** - Styling
- **Shiki** - Syntax highlighting
- **Bun** - JavaScript runtime & package manager

## Commands

| Command | Description |
|---------|-------------|
| `bun install` | Install dependencies |
| `bun dev` | Start dev server at localhost:4321 |
| `bun run build` | Build for production |
| `bun preview` | Preview production build |

## License

MIT
