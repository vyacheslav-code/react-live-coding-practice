---
title: useMemo for Expensive Calculations
description: Optimize expensive calculations using useMemo
tags:
  - performance
  - useMemo
  - optimization
difficulty: easy
timeEstimate: 20
learningGoals:
  - Understand useMemo purpose
  - Memoize expensive calculations
  - Specify correct dependencies
  - Measure performance impact
hints:
  - Wrap expensive calculation with useMemo
  - Add dependencies array
  - Add console.log to see when calculation runs
  - Only memoize truly expensive operations
starterCode: |
  import { useState, useMemo } from 'react';

  function expensiveCalculation(num) {
    console.log('Running expensive calculation...');
    // Simulate expensive operation
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += i;
    }
    return num * 2;
  }

  export default function App() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    // TODO: Memoize this calculation
    const doubled = expensiveCalculation(count);

    return (
      <div>
        <h1>useMemo Demo</h1>

        <div>
          <button onClick={() => setCount(count + 1)}>
            Increment Count
          </button>
          <p>Count: {count}</p>
          <p>Doubled: {doubled}</p>
        </div>

        <div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something (notice lag without useMemo)..."
          />
          <p>Text: {text}</p>
        </div>

        <div>
          <p>Open console to see calculation frequency</p>
          <p>Without useMemo, typing causes calculation to re-run</p>
        </div>
      </div>
    );
  }
---

Learn to optimize expensive calculations using useMemo to prevent unnecessary recalculations.

## Requirements

- Memoize the expensive calculation with useMemo
- Calculation should only run when count changes
- Typing in input should not trigger calculation
- Add console.log to verify optimization
- Use correct dependency array

## Expected Behavior

**Before useMemo:**
- Typing is laggy because calculation runs on every keystroke
- Console shows calculation running constantly

**After useMemo:**
- Typing is smooth
- Calculation only runs when count changes
- Console shows calculation only on increment

## Learning Objectives

This exercise teaches useMemo, which memoizes the result of expensive calculations. You'll learn when to use it, how to specify dependencies correctly, and how to verify performance improvements.

## useMemo vs useCallback

- **useMemo:** Memoizes a value (result of calculation)
- **useCallback:** Memoizes a function

## When to Use useMemo

- Calculation is actually expensive (profile first)
- Calculation runs on every render
- Value is used as dependency in other hooks
- Don't over-optimize - most calculations are fast enough
