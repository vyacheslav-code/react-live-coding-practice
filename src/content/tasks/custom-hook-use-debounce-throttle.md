---
title: Custom Hook - useDebounce & useThrottle
description: Build composable debounce and throttle hooks for search input and scroll performance optimization
tags:
  - custom hooks
  - useEffect
  - performance
  - debounce
  - throttle
difficulty: hard
timeEstimate: 35
learningGoals:
  - Understand difference between debounce and throttle
  - Implement debounce with cleanup for delayed execution
  - Implement throttle with rate limiting
  - Build real-world search with API calls
  - Prevent excessive re-renders and API calls
  - Handle cleanup to avoid memory leaks
hints:
  - Debounce waits for pause in changes before executing
  - Throttle executes at most once per time interval
  - Use setTimeout with cleanup in useEffect
  - Clear timeout on value change or unmount
  - Throttle needs to track last execution time
  - Consider both value debouncing and callback debouncing
starterCode: |
  import { useState, useEffect, useRef, useCallback } from 'react';

  // TODO: Implement useDebounce hook for values
  function useDebounce(value, delay) {
    // TODO: Return debounced value that only updates after delay
    // TODO: Clear timeout on value change or unmount

    return value;
  }

  // TODO: Implement useDebouncedCallback hook
  function useDebouncedCallback(callback, delay) {
    // TODO: Return debounced function
    // TODO: Clear pending execution on unmount

    return callback;
  }

  // TODO: Implement useThrottle hook
  function useThrottle(value, limit) {
    // TODO: Return throttled value that updates at most once per limit
    // TODO: Track last update time

    return value;
  }

  // TODO: Implement useThrottledCallback hook
  function useThrottledCallback(callback, limit) {
    // TODO: Return throttled function
    // TODO: Ensure callback runs at most once per limit period

    return callback;
  }

  // Search component with debounced API calls
  function SearchWithDebounce() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // TODO: Debounce search term
    // const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Search API call
    useEffect(() => {
      // TODO: Only search when debouncedSearchTerm changes
      // TODO: Show loading state
      // TODO: Fetch from API

      // if (!debouncedSearchTerm) {
      //   setResults([]);
      //   return;
      // }

      // Example API call
      // fetch(`https://jsonplaceholder.typicode.com/users?name_like=${debouncedSearchTerm}`)
      //   .then(res => res.json())
      //   .then(data => setResults(data));

    }, [/* debouncedSearchTerm */]);

    return (
      <div style={{ padding: '20px' }}>
        <h2>Debounced Search</h2>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '4px',
          }}
        />

        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          {/* TODO: Show immediate vs debounced value */}
          Typing: {searchTerm}
          <br />
          Searching: {/* TODO: show debounced value */}
        </div>

        {isSearching && (
          <div style={{ marginTop: '20px' }}>Searching...</div>
        )}

        <div style={{ marginTop: '20px' }}>
          {results.map((user) => (
            <div
              key={user.id}
              style={{
                padding: '10px',
                border: '1px solid #ddd',
                marginBottom: '10px',
                borderRadius: '4px',
              }}
            >
              {user.name} - {user.email}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Scroll position tracker with throttle
  function ScrollTracker() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [renderCount, setRenderCount] = useState(0);

    // TODO: Create throttled scroll handler
    // const handleScroll = useThrottledCallback(() => {
    //   setScrollPosition(window.scrollY);
    // }, 100);

    useEffect(() => {
      // TODO: Add scroll listener
      // window.addEventListener('scroll', handleScroll);
      // return () => window.removeEventListener('scroll', handleScroll);
    }, [/* handleScroll */]);

    useEffect(() => {
      setRenderCount((c) => c + 1);
    });

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '15px',
          borderRadius: '0 0 0 8px',
          fontSize: '14px',
        }}
      >
        <div>Scroll: {Math.round(scrollPosition)}px</div>
        <div>Renders: {renderCount}</div>
      </div>
    );
  }

  // Window resize handler with debounce
  function ResponsiveBox() {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // TODO: Create debounced resize handler
    // const handleResize = useDebouncedCallback(() => {
    //   setWindowSize({
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    //   });
    // }, 250);

    useEffect(() => {
      // TODO: Add resize listener
      // window.addEventListener('resize', handleResize);
      // return () => window.removeEventListener('resize', handleResize);
    }, [/* handleResize */]);

    return (
      <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px' }}>
        <h3>Window Size (Debounced)</h3>
        <p>
          Width: {windowSize.width}px × Height: {windowSize.height}px
        </p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Resize window - updates after you stop resizing (250ms delay)
        </p>
      </div>
    );
  }

  // API call tracker
  function APICallCounter() {
    const [callCount, setCallCount] = useState(0);

    return (
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: '#4caf50',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          fontWeight: 'bold',
        }}
      >
        API Calls: {callCount}
      </div>
    );
  }

  export default function App() {
    return (
      <div style={{ fontFamily: 'sans-serif', paddingBottom: '1000px' }}>
        <h1 style={{ padding: '20px' }}>Debounce & Throttle Hooks</h1>

        <div style={{ padding: '20px', background: '#e3f2fd', margin: '20px' }}>
          <h3>Concepts:</h3>
          <ul>
            <li><strong>Debounce:</strong> Wait for pause before executing (search input)</li>
            <li><strong>Throttle:</strong> Execute at most once per interval (scroll handler)</li>
          </ul>
        </div>

        <SearchWithDebounce />
        <ResponsiveBox />

        <ScrollTracker />
        <APICallCounter />

        <div style={{ padding: '20px' }}>
          <h3>Scroll down to test throttling</h3>
          <p>Watch the scroll position update at most once per 100ms</p>
        </div>
      </div>
    );
  }
---

Build production-ready `useDebounce` and `useThrottle` hooks to optimize performance in search inputs, scroll handlers, and window resize events.

## Requirements

### useDebounce Hook (Value Debouncing)
- Accept value and delay in milliseconds
- Return debounced value that updates after delay
- Reset timer on every value change
- Only update when user stops typing for `delay` ms
- Clean up timeout on unmount

### useDebouncedCallback Hook (Function Debouncing)
- Accept callback and delay
- Return debounced version of callback
- Cancel pending execution if called again
- Maintain stable function reference with useCallback
- Clean up on unmount

### useThrottle Hook (Value Throttling)
- Accept value and limit in milliseconds
- Return throttled value that updates at most once per limit
- Track last update timestamp
- First call executes immediately
- Subsequent calls wait for limit period

### useThrottledCallback Hook (Function Throttling)
- Accept callback and limit
- Return throttled version of callback
- Execute immediately on first call
- Ignore calls within limit period
- Track last execution time

### Real-World Implementations

#### Debounced Search
- Search input with API calls
- Show immediate value vs debounced value
- Display loading state
- Count API calls saved
- Typical delay: 300-500ms

#### Throttled Scroll
- Track scroll position
- Update at most once per interval
- Show render count reduction
- Fixed position indicator
- Typical limit: 100-200ms

#### Debounced Resize
- Window resize handler
- Update layout after resizing stops
- Prevent layout thrashing
- Typical delay: 250ms

## Debounce vs Throttle

### Debounce
```
User types: a-b-c-d-e-f (wait 500ms)
API calls:  ..................x (1 call)
```
Waits for **pause** in activity

### Throttle
```
User scrolls: ████████████████████
Updates:      x...x...x...x (limited rate)
```
Executes at **fixed intervals**

## Implementation Patterns

### Debounce Pattern
```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    // Execute after delay
  }, delay);

  return () => clearTimeout(timer); // Cleanup
}, [value, delay]);
```

### Throttle Pattern
```javascript
const lastRun = useRef(Date.now());

useEffect(() => {
  const now = Date.now();
  if (now - lastRun.current >= limit) {
    lastRun.current = now;
    // Execute
  }
}, [value, limit]);
```

## Bonus Challenges

- Add leading/trailing options for debounce
- Implement maxWait option (call after max time even if still changing)
- Add immediate option for throttle (execute on leading edge)
- Create useThrottleDebounce combining both patterns
- Add TypeScript generics for type safety
- Implement cancel method to abort pending execution

## Real-World Use Cases

### Debounce
- Search autocomplete
- Form validation
- API calls on input change
- Save to localStorage
- Window resize handlers

### Throttle
- Scroll position tracking
- Mouse move events
- Window resize for simple updates
- Animation frame callbacks
- API polling

## Performance Metrics

Track in your implementation:
- Number of renders saved
- API calls prevented
- Input value vs debounced value lag
- Throttle interval accuracy

## Testing Checklist

- [ ] Debounce waits for pause before updating
- [ ] Throttle limits update frequency
- [ ] Search only calls API after typing stops
- [ ] Scroll handler updates at fixed rate
- [ ] Resize handler waits until resizing stops
- [ ] Cleanup prevents memory leaks
- [ ] Works correctly on rapid value changes
- [ ] First throttle call executes immediately
- [ ] Debounce cancels pending on unmount
- [ ] Render count significantly reduced
