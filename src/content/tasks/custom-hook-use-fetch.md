---
title: Custom Hook - useFetch
description: Create a reusable custom hook for data fetching with loading and error states
tags:
  - custom hooks
  - useEffect
  - fetching
  - reusability
difficulty: medium
timeEstimate: 30
learningGoals:
  - Create custom hooks following naming convention
  - Extract reusable logic from components
  - Return multiple values from hooks
  - Manage complex async state
hints:
  - Custom hooks must start with 'use'
  - Return an object with data, loading, error
  - Use useEffect inside your custom hook
  - Make the hook accept a URL parameter
starterCode: |
  // TODO: Create useFetch custom hook
  function useFetch(url) {
    // TODO: Implement fetch logic with loading/error states
  }

  export default function App() {
    // TODO: Use your custom hook
    // const { data, loading, error } = useFetch('...');

    return (
      <div>
        <h1>Posts</h1>
        <button>Load Posts</button>
        <button>Load Users</button>
        {/* TODO: Display data, loading, or error */}
      </div>
    );
  }
---

Create a reusable custom hook for data fetching that can be used across multiple components.

## Requirements

- Implement useFetch custom hook that accepts a URL
- Return data, loading, and error states
- Handle fetch lifecycle (loading, success, error)
- Create a UI that uses the hook for two different endpoints
- Add buttons to switch between fetching posts and users
- Display appropriate states (loading, error, data)

## API Endpoints to Use

```
https://jsonplaceholder.typicode.com/posts
https://jsonplaceholder.typicode.com/users
```

## Learning Objectives

This exercise teaches how to extract reusable logic into custom hooks. You'll learn the rules of hooks, how to compose built-in hooks into custom ones, and how to design flexible APIs for your hooks.

## Custom Hook Requirements

Your useFetch hook should:
- Accept a URL parameter
- Manage loading, data, and error states internally
- Fetch data when URL changes
- Clean up properly on unmount
