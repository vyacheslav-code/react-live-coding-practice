---
title: Todo List with useReducer
description: Build a todo list using useReducer for complex state management
tags:
  - useReducer
  - state management
  - forms
difficulty: medium
timeEstimate: 30
learningGoals:
  - Understand useReducer for complex state
  - Implement reducer functions with multiple actions
  - Manage arrays in state immutably
  - Work with action creators pattern
hints:
  - Define action types as constants
  - Reducer should handle ADD, TOGGLE, DELETE actions
  - Use array methods like map and filter immutably
  - Generate unique IDs for todos
starterCode: |
  export default function App() {
    // TODO: Define reducer function
    // TODO: Initialize useReducer with empty array

    return (
      <div>
        <h1>Todo List</h1>
        <form>
          <input type="text" placeholder="Add todo..." />
          <button type="submit">Add</button>
        </form>
        <ul>
          {/* TODO: Map over todos */}
        </ul>
      </div>
    );
  }
---

Create a fully functional todo list application using useReducer for state management.

## Requirements

- Add new todos with a form input
- Display all todos in a list
- Toggle todo completion status on click
- Delete todos with a delete button
- Each todo shows completed state (strikethrough or checkbox)
- Input clears after adding todo

## Reducer Actions

Implement these action types:
- ADD_TODO: Add new todo to list
- TOGGLE_TODO: Toggle completed status
- DELETE_TODO: Remove todo from list

## Learning Objectives

This exercise introduces useReducer, which is ideal for managing complex state logic. You'll learn when to choose useReducer over useState, how to structure reducer functions, and how to dispatch actions to update state predictably.
