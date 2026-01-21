---
title: Solving Prop Drilling
description: Refactor deeply nested components to avoid prop drilling
tags:
  - state management
  - context
  - component design
difficulty: medium
timeEstimate: 30
learningGoals:
  - Recognize prop drilling problem
  - Use Context API as solution
  - Create and consume context
  - Compare with prop passing
hints:
  - Create context with React.createContext
  - Wrap tree with Provider
  - Use useContext in deep components
  - Eliminate intermediate prop passing
starterCode: |
  import { createContext, useContext } from 'react';

  // TODO: Create theme context

  export default function App() {
    // TODO: Create state for theme
    // TODO: Wrap with Provider

    return (
      <div>
        <Header />
        <MainContent />
      </div>
    );
  }

  function Header() {
    // This component doesn't use theme, just passes it down
    return (
      <header>
        <Navigation />
      </header>
    );
  }

  function Navigation() {
    return (
      <nav>
        <ThemeToggle />
      </nav>
    );
  }

  function ThemeToggle() {
    // TODO: Use context here instead of props
    return <button>Toggle Theme</button>;
  }

  function MainContent() {
    return (
      <main>
        <Article />
      </main>
    );
  }

  function Article() {
    return (
      <article>
        <ArticleText />
      </article>
    );
  }

  function ArticleText() {
    // TODO: Use context here to access theme
    return <p>Article content...</p>;
  }
---

Refactor a component tree with prop drilling by implementing React Context.

## Requirements

- Implement theme system (light/dark mode)
- Theme state at top level
- ThemeToggle button deep in tree needs to update theme
- ArticleText deep in tree needs to read theme
- Use Context to avoid passing props through intermediate components
- Apply actual styling based on theme

## Component Tree

```
App (has state)
├── Header
│   └── Navigation
│       └── ThemeToggle (needs setState)
└── MainContent
    └── Article
        └── ArticleText (needs state)
```

## Learning Objectives

This exercise demonstrates the prop drilling problem and how Context API solves it. You'll learn when Context is appropriate, how to create and provide context, and how to consume it in deeply nested components.

## Prop Drilling vs Context

**Prop Drilling:** Passing props through components that don't use them
**Context:** Direct access to values anywhere in the tree
