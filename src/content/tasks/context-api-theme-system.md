---
title: Context API Theme System
description: Build a complete theme system with light/dark mode using Context API and localStorage persistence
tags:
  - context
  - useContext
  - state management
  - localStorage
difficulty: hard
timeEstimate: 35
learningGoals:
  - Implement Context API for global state management
  - Create custom theme provider with multiple contexts
  - Optimize context consumers to prevent unnecessary renders
  - Persist theme preferences to localStorage
  - Handle nested context consumers efficiently
hints:
  - Create separate ThemeContext and ThemeUpdateContext to prevent unnecessary rerenders
  - Use useMemo to memoize theme object values
  - Implement useEffect to sync theme changes with localStorage
  - Consider creating a custom useTheme hook for cleaner consumption
  - Use CSS variables or inline styles to apply theme dynamically
starterCode: |
  import { useState, createContext, useContext } from 'react';

  // TODO: Create ThemeContext and ThemeUpdateContext

  // TODO: Create ThemeProvider component
  export function ThemeProvider({ children }) {
    // TODO: Implement theme state (light/dark)
    // TODO: Load initial theme from localStorage
    // TODO: Sync theme changes to localStorage
    // TODO: Provide theme and update function via context

    return <div>{children}</div>;
  }

  // TODO: Create custom useTheme hook
  export function useTheme() {
    // TODO: Consume contexts and return theme utilities
  }

  // Sample component that uses theme
  function Header() {
    // TODO: Use theme context

    return (
      <header style={{ padding: '20px', borderBottom: '1px solid' }}>
        <h1>Theme System Demo</h1>
        <button>Toggle Theme</button>
      </header>
    );
  }

  function Card({ title, content }) {
    // TODO: Use theme context for styling

    return (
      <div style={{ padding: '20px', margin: '20px', borderRadius: '8px' }}>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    );
  }

  function ThemeToggle() {
    // TODO: Use theme context to toggle

    return (
      <button style={{ padding: '10px 20px', borderRadius: '4px' }}>
        Switch to Dark Mode
      </button>
    );
  }

  export default function App() {
    return (
      <div>
        <p>Wrap with ThemeProvider</p>
        <Header />
        <ThemeToggle />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
          <Card title="Card 1" content="This card should respond to theme changes" />
          <Card title="Card 2" content="Theme should persist across page refreshes" />
          <Card title="Card 3" content="No unnecessary rerenders!" />
        </div>
      </div>
    );
  }
---

Build a production-ready theme system using Context API that supports light/dark modes, persists preferences, and optimizes performance.

## Requirements

- Create ThemeProvider that wraps the entire app
- Support light and dark theme modes
- Provide theme object with colors, backgrounds, and text colors
- Create theme toggle functionality
- Persist theme preference to localStorage
- Load theme from localStorage on mount
- Apply theme styles to all components
- Prevent unnecessary component rerenders
- Create custom useTheme hook for consuming theme
- Handle cases where components use context outside provider

## Theme Structure

Each theme should include:
- `mode`: 'light' or 'dark'
- `colors`: object with primary, secondary, background, text, border
- `spacing`: consistent spacing values
- `borderRadius`: consistent border radius values

## Performance Optimization

- Split context into value and update contexts
- Memoize theme objects
- Only rerender components that actually use theme values
- Test with React DevTools Profiler

## Edge Cases

- Handle initial render before localStorage loads
- Provide fallback when context is used outside provider
- Validate theme mode from localStorage (could be corrupted)
- Support system preference detection (bonus)

## Learning Objectives

Master Context API for global state management, understand context splitting patterns to prevent rerenders, and learn localStorage integration with React state. This pattern is fundamental for real-world applications.
