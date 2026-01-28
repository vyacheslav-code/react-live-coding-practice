---
title: Functional setState for Stable Callbacks
description: Use functional setState updates to avoid recreating callbacks and prevent re-renders
tags:
  - performance
  - useState
  - useCallback
  - optimization
difficulty: medium
timeEstimate: 25
learningGoals:
  - Understand functional setState pattern
  - Remove state from callback dependencies
  - Create stable callback references
  - Prevent unnecessary child re-renders
hints:
  - Use setState(prev => prev + 1) instead of setState(count + 1)
  - Remove state variables from useCallback dependencies
  - Callbacks become stable (same reference)
  - Memoized children won't re-render
starterCode: |
  import { useState, useCallback, memo } from 'react';

  const Counter = memo(({ onIncrement, onDecrement, onReset, label }) => {
    console.log(`Counter "${label}" rendered`);
    return (
      <div style={{ border: '1px solid gray', padding: 10, margin: 10 }}>
        <h3>{label}</h3>
        <button onClick={onIncrement}>+1</button>
        <button onClick={onDecrement}>-1</button>
        <button onClick={onReset}>Reset</button>
      </div>
    );
  });

  export default function App() {
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);

    // Problem: These callbacks depend on state
    // They recreate on every render when count changes
    const incrementA = useCallback(() => {
      setCountA(countA + 1);
    }, [countA]); // Dependency on countA

    const decrementA = useCallback(() => {
      setCountA(countA - 1);
    }, [countA]);

    const resetA = useCallback(() => {
      setCountA(0);
    }, []); // This one is already stable

    // TODO: Fix these to use functional updates
    const incrementB = useCallback(() => {
      setCountB(countB + 1);
    }, [countB]);

    const decrementB = useCallback(() => {
      setCountB(countB - 1);
    }, [countB]);

    const resetB = useCallback(() => {
      setCountB(0);
    }, []);

    return (
      <div>
        <h1>Functional setState Demo</h1>

        <div>
          <h2>Count A: {countA}</h2>
          <Counter
            label="Counter A (non-optimal)"
            onIncrement={incrementA}
            onDecrement={decrementA}
            onReset={resetA}
          />
        </div>

        <div>
          <h2>Count B: {countB}</h2>
          <Counter
            label="Counter B (optimize this)"
            onIncrement={incrementB}
            onDecrement={decrementB}
            onReset={resetB}
          />
        </div>

        <p>Open console to see render logs</p>
        <p>Notice: Counter components re-render when their callbacks change</p>
        <p>Goal: Make callbacks stable so Counter only renders once</p>
      </div>
    );
  }
---

Master functional setState updates to create stable callbacks and prevent unnecessary re-renders.

## Requirements

- Convert all setState calls to functional form
- Remove state dependencies from useCallback arrays
- Keep Counter components wrapped with memo
- Verify Counter components only render once (initial render)
- Clicking buttons should NOT re-render Counter components
- Add console.log to track render behavior

## Expected Behavior

**Before optimization:**
- Clicking +1 on Counter A recreates incrementA callback
- Counter A re-renders even though it's memoized
- Props change (new callback reference) triggers re-render
- Same problem occurs for Counter B

**After optimization:**
- All callbacks use functional updates: `setState(prev => ...)`
- Callbacks have empty dependency arrays
- Callbacks are stable (same reference across renders)
- Counter components render once and never again

## Performance Impact

**Problem:** When callbacks depend on state, they must be recreated every time that state changes. Even with React.memo, child components re-render because they receive new callback references.

**Solution:** Functional updates `setState(prev => prev + 1)` don't need current state in scope. Callbacks become stable with empty dependencies. Memoized children won't re-render.

**Real-world savings:** Forms with many inputs, lists with many items, or components with multiple callbacks can see 70-90% reduction in child re-renders.

## Learning Objectives

This exercise teaches functional setState - a pattern that enables truly stable callbacks. You'll learn to remove state from callback dependencies, understand referential equality, and see how stable callbacks prevent re-renders in memoized children.

## Pattern Comparison

```javascript
// Non-optimal: callback depends on state
const increment = useCallback(() => {
  setCount(count + 1); // needs count in scope
}, [count]); // must recreate when count changes

// Optimal: functional update
const increment = useCallback(() => {
  setCount(prev => prev + 1); // uses prev value
}, []); // stable forever
```

## When to Use Functional Updates

- Callback passed to memoized child component
- Multiple setState calls need current value
- Event handlers in lists or forms
- Timer/interval callbacks that update state
- Any callback that should be stable
