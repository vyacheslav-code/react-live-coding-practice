---
title: Lazy State Initialization
description: Optimize initial render performance by passing functions to useState for expensive computations
tags:
  - performance
  - useState
  - optimization
  - initialization
difficulty: medium
timeEstimate: 20
learningGoals:
  - Understand lazy initialization pattern
  - Prevent expensive computation on every render
  - Use function form of useState
  - Measure performance impact
hints:
  - Pass a function to useState instead of a value
  - Function only runs once during initial render
  - Use () => expensive() not expensive()
  - Add performance measurements to verify
starterCode: |
  import { useState } from 'react';

  // Expensive operations (simulate real-world scenarios)
  function parseLocalStorage(key) {
    console.log('📦 Parsing localStorage...');
    const start = performance.now();

    const data = localStorage.getItem(key);
    // Simulate expensive parsing
    let result = data ? JSON.parse(data) : [];
    for (let i = 0; i < 1000000; i++) {
      result = [...result];
    }

    const duration = performance.now() - start;
    console.log(`⏱️  Parsing took ${duration.toFixed(2)}ms`);
    return result;
  }

  function generateInitialData() {
    console.log('🔄 Generating initial data...');
    const start = performance.now();

    const items = [];
    for (let i = 0; i < 10000; i++) {
      items.push({
        id: i,
        value: Math.random(),
        timestamp: Date.now()
      });
    }

    const duration = performance.now() - start;
    console.log(`⏱️  Generation took ${duration.toFixed(2)}ms`);
    return items;
  }

  function computeFromProps(initialValue) {
    console.log('🧮 Computing from props...');
    const start = performance.now();

    let result = initialValue;
    for (let i = 0; i < 5000000; i++) {
      result = result + i - i; // Expensive no-op
    }

    const duration = performance.now() - start;
    console.log(`⏱️  Computation took ${duration.toFixed(2)}ms`);
    return result;
  }

  function ExpensiveComponent({ initialValue }) {
    // Problem: This runs on EVERY render, not just initial
    const [data] = useState(generateInitialData());
    const [cache] = useState(parseLocalStorage('app-cache'));
    const [computed] = useState(computeFromProps(initialValue));
    const [counter, setCounter] = useState(0);

    return (
      <div>
        <h3>Expensive Component</h3>
        <p>Data items: {data.length}</p>
        <p>Cache items: {cache.length}</p>
        <p>Computed value: {computed}</p>
        <p>Counter: {counter}</p>
        <button onClick={() => setCounter(counter + 1)}>
          Increment (watch console)
        </button>
      </div>
    );
  }

  export default function App() {
    const [showComponent, setShowComponent] = useState(false);
    const [renderCount, setRenderCount] = useState(0);

    return (
      <div>
        <h1>Lazy Initialization Demo</h1>

        <div>
          <button onClick={() => setShowComponent(!showComponent)}>
            {showComponent ? 'Hide' : 'Show'} Component
          </button>

          <button onClick={() => setRenderCount(renderCount + 1)}>
            Force App Re-render ({renderCount})
          </button>
        </div>

        {showComponent && <ExpensiveComponent initialValue={100} />}

        <div style={{ marginTop: 20, padding: 10, background: '#f0f0f0' }}>
          <h3>Instructions:</h3>
          <ol>
            <li>Open browser console</li>
            <li>Click "Show Component" - see expensive operations</li>
            <li>Click "Increment" in component - operations run again! ❌</li>
            <li>Fix with lazy initialization</li>
            <li>After fix, increment should NOT run expensive operations ✅</li>
          </ol>
        </div>
      </div>
    );
  }
---

Learn to optimize expensive initial state computations using lazy initialization pattern.

## Requirements

- Convert all useState calls to lazy initialization
- Pass functions to useState instead of direct values
- Ensure expensive operations only run on mount
- Add performance logging to verify optimization
- Component should work identically after optimization
- Clicking "Increment" should NOT trigger expensive operations

## Expected Behavior

**Before optimization:**
- Expensive functions run during initial render ✅
- Expensive functions also run on EVERY re-render ❌
- Clicking "Increment" re-runs all expensive operations
- Console shows operations running multiple times
- Performance degrades significantly

**After optimization:**
- Expensive functions only run during initial render ✅
- Re-renders do NOT trigger expensive operations ✅
- Clicking "Increment" shows no expensive operation logs
- Console logs appear only once per component mount
- Performance is optimal

## Performance Impact

**Problem:** When you write `useState(expensive())`, React calls `expensive()` on every render, even though it only uses the result during initial render. The returned value is ignored on subsequent renders, but the computation still happens.

**Solution:** Lazy initialization `useState(() => expensive())` ensures the function only runs once. React recognizes the function form and only invokes it during the initial render.

**Real-world savings:**
- Reading localStorage: 50-200ms saved per re-render
- Parsing JSON: 100-500ms saved per re-render
- Computing from props: 20-100ms saved per re-render
- Can improve app responsiveness by 200-800ms on repeated renders

## Learning Objectives

This exercise teaches lazy state initialization - a critical pattern for expensive initial values. You'll learn the difference between eager and lazy initialization, when to use each pattern, and how to measure the performance impact.

## Pattern Comparison

```javascript
// ❌ Eager: runs on every render (wasteful)
const [data] = useState(expensiveOperation());

// ✅ Lazy: runs only once (optimal)
const [data] = useState(() => expensiveOperation());
```

## When to Use Lazy Initialization

- Reading from localStorage/sessionStorage
- Parsing large JSON data
- Computing initial value from props
- Generating large datasets
- Any expensive synchronous operation
- Don't optimize trivial operations
