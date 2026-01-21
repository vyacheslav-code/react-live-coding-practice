---
title: Debounced Search Input
description: Implement input debouncing to optimize search performance
tags:
  - performance
  - debounce
  - search
  - useEffect
difficulty: medium
timeEstimate: 25
learningGoals:
  - Understand debouncing concept
  - Implement debounce with useEffect
  - Optimize API calls
  - Clean up timers properly
hints:
  - Use setTimeout in useEffect
  - Clear timeout in cleanup function
  - "Keep two state variables: input and debouncedValue"
  - Trigger search only when debouncedValue changes
starterCode: |
  import { useState, useEffect } from 'react';

  const USERS = [
    'Alice Johnson', 'Bob Smith', 'Charlie Brown',
    'David Wilson', 'Emma Davis', 'Frank Miller',
    'Grace Lee', 'Henry Taylor', 'Ivy Chen',
    'Jack Anderson', 'Kate Martinez', 'Leo Garcia',
  ];

  export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [searchCount, setSearchCount] = useState(0);

    // TODO: Implement debounce effect
    // Update debouncedTerm after 500ms delay

    // TODO: Implement search effect
    // Only trigger when debouncedTerm changes

    const results = USERS.filter(user =>
      user.toLowerCase().includes(debouncedTerm.toLowerCase())
    );

    return (
      <div>
        <h1>Debounced Search</h1>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          style={{ width: '300px', padding: '10px' }}
        />

        <div>
          <p>Search term: {searchTerm}</p>
          <p>Debounced term: {debouncedTerm}</p>
          <p>Search executed: {searchCount} times</p>
        </div>

        <div>
          <h2>Results ({results.length})</h2>
          <ul>
            {results.map((user, i) => (
              <li key={i}>{user}</li>
            ))}
          </ul>
        </div>

        <div>
          <p>Try typing quickly - notice search only runs after you stop typing</p>
        </div>
      </div>
    );
  }
---

Implement a search input that debounces user input to avoid excessive searches.

## Requirements

- Search input that filters user list
- Debounce search by 500ms
- Show both immediate input value and debounced value
- Count how many times search actually runs
- Display filtered results
- Properly clean up timers

## Expected Behavior

- User types "alice"
- Input shows each character immediately: "a", "al", "ali", "alic", "alice"
- Search only executes once, 500ms after user stops typing
- Search count increments only once

## Learning Objectives

This exercise teaches debouncing, a critical optimization for expensive operations like API calls. Instead of executing on every keystroke, debounced functions wait for a pause in input. This dramatically reduces unnecessary work.

## Debouncing Pattern

```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    // Do expensive operation
  }, delay);

  return () => clearTimeout(timer);
}, [value]);
```

## Use Cases

- Search inputs
- API calls
- Auto-save functionality
- Resize handlers
- Scroll handlers
