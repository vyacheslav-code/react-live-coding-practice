---
title: Counter with useState
description: Build a simple counter with increment, decrement and reset buttons
tags:
  - useState
  - events
difficulty: easy
timeEstimate: 15
learningGoals:
  - Learn useState hook basics
  - Handle click events
  - Update state immutably
hints:
  - Start with useState(0)
  - Create handler functions for each button
  - Use the current state value in your handlers
starterCode: |
  export default function App() {
    // TODO: Add state for counter
    // TODO: Create increment, decrement, and reset handlers

    return (
      <div>
        <h1>Counter: {/* display count */}</h1>
        <button>Increment</button>
        <button>Decrement</button>
        <button>Reset</button>
      </div>
    );
  }
---

Create a counter application that displays a number and provides three buttons to manipulate it.

## Requirements

- Display the current count value
- Implement an increment button that adds 1 to the count
- Implement a decrement button that subtracts 1 from the count
- Implement a reset button that sets the count back to 0
- The counter should start at 0

## Learning Objectives

This exercise teaches the fundamentals of React state management using the useState hook. You'll learn how to declare state, read its value, and update it through event handlers.
