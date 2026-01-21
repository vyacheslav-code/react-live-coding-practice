---
title: useCallback for Stable References
description: Use useCallback to maintain stable function references across renders
tags:
  - performance
  - useCallback
  - optimization
  - React.memo
difficulty: medium
timeEstimate: 25
learningGoals:
  - Understand function reference stability
  - Combine useCallback with React.memo
  - Prevent unnecessary child re-renders
  - Manage callback dependencies
hints:
  - Wrap callbacks with useCallback
  - Combine with React.memo on children
  - Include necessary dependencies
  - Add console.log to verify optimization
starterCode: |
  import { useState, useCallback, memo } from 'react';

  // TODO: Memoize this component
  const ListItem = ({ item, onToggle, onDelete }) => {
    console.log('ListItem rendered:', item.id);
    return (
      <li>
        <input
          type="checkbox"
          checked={item.done}
          onChange={() => onToggle(item.id)}
        />
        <span style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
          {item.text}
        </span>
        <button onClick={() => onDelete(item.id)}>Delete</button>
      </li>
    );
  };

  export default function App() {
    const [todos, setTodos] = useState([
      { id: 1, text: 'Learn React', done: false },
      { id: 2, text: 'Build project', done: false },
      { id: 3, text: 'Deploy app', done: false },
    ]);
    const [text, setText] = useState('');

    // TODO: Wrap these with useCallback
    const handleToggle = (id) => {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ));
    };

    const handleDelete = (id) => {
      setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleAdd = () => {
      if (text.trim()) {
        setTodos([...todos, { id: Date.now(), text, done: false }]);
        setText('');
      }
    };

    return (
      <div>
        <h1>Optimized Todo List</h1>
        <div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="New todo..."
          />
          <button onClick={handleAdd}>Add</button>
        </div>
        <ul>
          {todos.map(todo => (
            <ListItem
              key={todo.id}
              item={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
        <p>Open console and type in input to see render behavior</p>
      </div>
    );
  }
---

Optimize a todo list by using useCallback to maintain stable function references.

## Requirements

- Wrap ListItem with React.memo
- Wrap event handlers with useCallback
- Use correct dependency arrays
- Verify that typing doesn't re-render list items
- Verify that toggling one item doesn't re-render others
- Add console.log to demonstrate optimization

## Expected Behavior

**Before optimization:**
- Typing in input re-renders all list items
- Toggling one item re-renders all items

**After optimization:**
- Typing in input doesn't re-render list items
- Toggling item only re-renders that specific item
- Console shows minimal re-renders

## Learning Objectives

This exercise demonstrates why useCallback is necessary when passing callbacks to memoized children. Without it, callbacks get new references on every render, breaking React.memo optimization. You'll learn proper dependency management and how to verify optimization.

## Common Pitfall

```javascript
// BAD: New function every render breaks memo
const handleClick = (id) => { ... };

// GOOD: Stable reference preserves memo
const handleClick = useCallback((id) => { ... }, [deps]);
```
