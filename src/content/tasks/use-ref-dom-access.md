---
title: DOM Access with useRef
description: Use useRef to focus inputs and manage DOM elements imperatively
tags:
  - useRef
  - DOM
  - focus management
difficulty: easy
timeEstimate: 15
learningGoals:
  - Understand useRef for DOM references
  - Implement imperative focus management
  - Learn when to use refs vs state
  - Access DOM properties directly
hints:
  - Create ref with useRef(null)
  - Attach ref to input with ref prop
  - Call .focus() on ref.current
  - Use refs for actions that don't require re-renders
starterCode: |
  export default function App() {
    // TODO: Create refs for inputs

    return (
      <div>
        <h1>Login Form</h1>
        <div>
          <label>Username:</label>
          <input type="text" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" />
        </div>
        <div>
          <button>Focus Username</button>
          <button>Focus Password</button>
          <button>Clear All</button>
        </div>
      </div>
    );
  }
---

Create a login form that demonstrates imperative DOM manipulation using useRef.

## Requirements

- Two input fields: username and password
- Button to focus username field
- Button to focus password field
- Button to clear both fields
- Clicking focus buttons should move cursor to that input
- Use refs for all DOM manipulation

## Learning Objectives

This exercise teaches the useRef hook, which provides a way to access DOM elements directly without triggering re-renders. You'll learn when imperative code is appropriate in React and how refs differ from state.
