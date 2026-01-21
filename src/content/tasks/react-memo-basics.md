---
title: React.memo Basics
description: Prevent unnecessary re-renders using React.memo
tags:
  - performance
  - React.memo
  - optimization
difficulty: easy
timeEstimate: 20
learningGoals:
  - Understand when components re-render
  - Use React.memo to skip re-renders
  - Observe render behavior with console logs
  - Learn when memo is beneficial
hints:
  - Wrap child components with memo()
  - Add console.log to see renders
  - Component re-renders when parent re-renders by default
  - Memo only helps if props don't change
starterCode: |
  import { memo, useState } from 'react';

  // TODO: Memoize these components
  const ExpensiveComponent = ({ data }) => {
    console.log('ExpensiveComponent rendered');
    // Simulate expensive operation
    const result = data.map(item => item * 2);
    return <div>Processed {result.length} items</div>;
  };

  const StaticComponent = () => {
    console.log('StaticComponent rendered');
    return <div>I never change</div>;
  };

  const CountDisplay = ({ count }) => {
    console.log('CountDisplay rendered');
    return <div>Count: {count}</div>;
  };

  export default function App() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    const data = [1, 2, 3, 4, 5];

    return (
      <div>
        <h1>React.memo Demo</h1>

        <div>
          <button onClick={() => setCount(count + 1)}>Increment</button>
          <CountDisplay count={count} />
        </div>

        <div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something..."
          />
        </div>

        <StaticComponent />
        <ExpensiveComponent data={data} />

        <div>
          <p>Open console to see render logs</p>
          <p>Notice which components re-render when you type or click</p>
        </div>
      </div>
    );
  }
---

Learn to optimize performance by preventing unnecessary component re-renders using React.memo.

## Requirements

- Wrap appropriate components with memo
- Add console.log to observe render behavior
- StaticComponent should only render once
- ExpensiveComponent should only re-render when data changes
- CountDisplay should only re-render when count changes
- Verify optimization with console logs

## Expected Behavior

**Before memo:**
- Typing in input re-renders all components
- Clicking increment re-renders all components

**After memo:**
- Typing in input only re-renders App
- Clicking increment only re-renders App and CountDisplay
- StaticComponent renders once and never again

## Learning Objectives

This exercise teaches React.memo, a performance optimization that prevents re-renders when props haven't changed. You'll learn when memo is beneficial, how to apply it, and how to verify its effectiveness.

## When to Use memo

- Component renders often with same props
- Component is expensive to render
- Component is purely presentational
- Don't over-optimize - measure first
