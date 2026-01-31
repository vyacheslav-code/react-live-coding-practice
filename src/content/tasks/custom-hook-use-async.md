---
title: Custom Hook - useAsync with Cancellation
description: Build an advanced async hook with request cancellation, retry logic, and race condition prevention
tags:
  - custom hooks
  - useEffect
  - async
  - advanced
  - performance
difficulty: hard
category: pet-projects
timeEstimate: 35
learningGoals:
  - Implement request cancellation with AbortController
  - Handle race conditions in async operations
  - Build retry logic with exponential backoff
  - Manage complex async state transitions
  - Prevent memory leaks from unmounted components
hints:
  - Use AbortController to cancel in-flight requests
  - Track request ID to prevent race conditions
  - Implement retry with increasing delays (exponential backoff)
  - Clean up abort controller in useEffect cleanup
  - Consider all possible states - idle, loading, success, error
starterCode: |
  import { useState, useEffect, useCallback, useRef } from 'react';

  // TODO: Implement useAsync hook
  function useAsync(asyncFunction, immediate = true) {
    // TODO: Manage states: idle, loading, data, error
    // TODO: Implement execute function with cancellation
    // TODO: Implement retry logic with exponential backoff
    // TODO: Prevent race conditions

    return {
      execute: () => {},
      data: null,
      loading: false,
      error: null,
      retry: () => {},
    };
  }

  // Mock API function that can fail
  const fetchUserData = async (userId, signal) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      { signal }
    );

    if (!response.ok) throw new Error('Failed to fetch');

    // Simulate slow network
    await new Promise(resolve => setTimeout(resolve, 1000));

    return response.json();
  };

  export default function App() {
    const [userId, setUserId] = useState(1);

    // TODO: Use useAsync hook with fetchUserData
    // const { data, loading, error, execute, retry } = useAsync(
    //   () => fetchUserData(userId),
    //   true
    // );

    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Advanced useAsync Hook</h1>

        <div style={{ marginBottom: '20px' }}>
          <label>
            User ID:
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              min="1"
              max="10"
            />
          </label>
          <button style={{ marginLeft: '10px' }}>
            Load User
          </button>
        </div>

        {/* TODO: Show loading state */}
        {/* TODO: Show error with retry button */}
        {/* TODO: Show user data */}

        <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
          <h3>Test Scenarios:</h3>
          <ul>
            <li>Rapidly change user IDs - previous requests should cancel</li>
            <li>Use invalid ID (11+) to test error handling</li>
            <li>Test retry functionality</li>
          </ul>
        </div>
      </div>
    );
  }
---

Build a production-ready `useAsync` hook that handles the complexity of async operations including request cancellation, retry logic, and race condition prevention.

## Requirements

### Core Functionality
- Accept an async function and optional `immediate` flag
- Return `{ data, loading, error, execute, retry }` interface
- Support manual execution via `execute()` function
- Implement `retry()` to re-run failed requests

### Request Cancellation
- Use AbortController to cancel in-flight requests
- Cancel previous request when new one starts
- Clean up on component unmount
- Handle AbortError gracefully (don't show as error)

### Race Condition Prevention
- Prevent stale data from appearing after newer request completes
- Track request IDs or timestamps
- Ignore responses from cancelled requests

### Retry Logic
- Implement exponential backoff (1s, 2s, 4s, 8s...)
- Track retry count
- Max retries limit (e.g., 3 attempts)
- Reset retry count on successful request

### State Management
- Proper state transitions: idle → loading → success/error
- Don't show stale data during loading
- Preserve previous data until new data arrives (optional)

## Bonus Challenges

- Add `refetch()` method to reload current request
- Implement polling/auto-refresh option
- Add request timeout configuration
- Cache responses by function signature
- Support dependent queries (wait for previous to complete)

## Real-World Use Cases

This pattern is used in:
- Data fetching libraries (React Query, SWR)
- Form submissions with retry
- Real-time data synchronization
- Image/file uploads with progress

## Testing Checklist

- [ ] Rapid ID changes don't cause race conditions
- [ ] Previous requests cancel when new one starts
- [ ] Invalid IDs show error with retry option
- [ ] Retry uses exponential backoff
- [ ] No memory leaks on unmount
- [ ] AbortError doesn't show as user error
