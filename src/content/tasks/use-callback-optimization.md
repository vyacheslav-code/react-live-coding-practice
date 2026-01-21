---
title: useCallback for Performance
description: Optimize child component renders using useCallback to memoize functions
tags:
  - useCallback
  - performance
  - React.memo
difficulty: medium
timeEstimate: 25
learningGoals:
  - Understand useCallback purpose
  - Prevent unnecessary re-renders
  - Combine useCallback with React.memo
  - Learn about referential equality
hints:
  - Wrap event handlers with useCallback
  - Use React.memo on child components
  - Add proper dependencies to useCallback
  - Console.log in child to see render count
starterCode: |
  import { memo } from 'react';

  // TODO: Memoize this component
  const TodoItem = ({ todo, onToggle, onDelete }) => {
    console.log('TodoItem rendered:', todo.id);
    return (
      <li>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        {todo.text}
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </li>
    );
  };

  export default function App() {
    // TODO: Add state for todos
    // TODO: Wrap handlers with useCallback

    return (
      <div>
        <h1>Optimized Todo List</h1>
        <button>Add Todo</button>
        <ul>
          {/* TODO: Render TodoItems */}
        </ul>
      </div>
    );
  }
---

Build a todo list that demonstrates performance optimization using useCallback and React.memo.

## Requirements

- Todo list with add, toggle, and delete functionality
- TodoItem component wrapped with React.memo
- Event handlers wrapped with useCallback
- Console logging to show render behavior
- Adding a todo should only render the new item
- Toggling a todo should only re-render that item

## Learning Objectives

This exercise demonstrates how useCallback prevents unnecessary re-renders by memoizing callback functions. You'll learn about referential equality, when useCallback is beneficial, and how to combine it with React.memo for optimal performance.

## Performance Goal

Without optimization, changing one todo re-renders all todos. With proper useCallback usage, only the affected todo should re-render.
