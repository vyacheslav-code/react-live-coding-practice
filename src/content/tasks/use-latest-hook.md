---
title: useLatest Hook Pattern
description: Create useLatest to maintain refs with current values for stable callbacks and avoid stale closures
tags:
  - custom hooks
  - useRef
  - advanced patterns
  - performance
  - closures
difficulty: hard
timeEstimate: 30
learningGoals:
  - Understand stale closure problems in React
  - Use refs to always access latest values
  - Build stable callbacks without useCallback
  - Prevent memory leaks in async operations
  - Master the useLatest pattern for production code
hints:
  - useRef doesn't trigger re-renders
  - Update ref.current during render (not in useEffect)
  - Return the ref itself, not ref.current
  - Consumers access ref.current to get latest value
  - Useful in effects, intervals, and event handlers
starterCode: |
  import { useState, useEffect, useRef, useCallback } from 'react';

  // TODO: Implement useLatest hook
  function useLatest(value) {
    // TODO: Store value in ref
    // TODO: Update ref.current immediately (during render)
    // TODO: Return the ref (not ref.current)
    return { current: value };
  }

  // Example 1: Interval with stale closure
  function CounterWithInterval() {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);

    // TODO: Problem - this captures initial count value
    useEffect(() => {
      const id = setInterval(() => {
        // BUG: count is stale! Always logs initial value
        console.log('Current count (stale):', count);
        setCount(count + 1); // Always adds to initial value
      }, delay);

      return () => clearInterval(id);
    }, [delay]); // Can't add count - would restart interval

    // TODO: Fix with useLatest
    // const countRef = useLatest(count);
    // Use countRef.current in the interval

    return (
      <div style={{ padding: '20px', background: '#ffebee' }}>
        <h2>Interval with Stale Closure (Broken)</h2>
        <p style={{ fontSize: '32px' }}>Count: {count}</p>
        <p style={{ color: 'red' }}>Bug: Count increments wrong!</p>

        <div>
          <label>
            Delay: {delay}ms
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              style={{ marginLeft: '10px', width: '200px' }}
            />
          </label>
        </div>

        <button onClick={() => setCount(0)} style={{ marginTop: '10px' }}>
          Reset
        </button>

        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          <p>Open console - notice stale count value</p>
          <p>Change delay - interval uses wrong count</p>
        </div>
      </div>
    );
  }

  // Example 2: Async operation with stale state
  function SearchWithDebounce() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searchCount, setSearchCount] = useState(0);

    // TODO: This search function has stale closure issues
    useEffect(() => {
      if (!query) {
        setResults([]);
        return;
      }

      const timeoutId = setTimeout(() => {
        // BUG: searchCount is stale
        console.log('Searching with count:', searchCount);

        // Simulate API call
        fetch(`/api/search?q=${query}`)
          .then(() => {
            // BUG: By the time this resolves, searchCount might be different
            setResults([`Result for "${query}" (search #${searchCount})`]);
          });
      }, 500);

      return () => clearTimeout(timeoutId);
    }, [query]); // Can't add searchCount - would break debounce

    // TODO: Fix with useLatest
    // const searchCountRef = useLatest(searchCount);

    return (
      <div style={{ padding: '20px', background: '#e3f2fd' }}>
        <h2>Debounced Search with Stale State</h2>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search..."
          style={{ padding: '8px', width: '300px' }}
        />

        <button
          onClick={() => setSearchCount(searchCount + 1)}
          style={{ marginLeft: '10px' }}
        >
          Increment Search Count ({searchCount})
        </button>

        <div style={{ marginTop: '10px' }}>
          {results.map((result, idx) => (
            <div key={idx} style={{ padding: '5px', background: 'white', margin: '5px' }}>
              {result}
            </div>
          ))}
        </div>

        <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          <p>Type something, then quickly click increment</p>
          <p>Notice search uses stale count value</p>
        </div>
      </div>
    );
  }

  // Example 3: Event handler with latest props
  function WebSocketComponent({ onMessage, config }) {
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);

    // TODO: Problem - onMessage might be stale in effect
    useEffect(() => {
      // Simulate WebSocket
      console.log('Connecting with config:', config);
      setConnected(true);

      const interval = setInterval(() => {
        const msg = `Message at ${new Date().toLocaleTimeString()}`;

        // BUG: onMessage might be stale
        onMessage(msg);

        setMessages(prev => [...prev, msg]);
      }, 2000);

      return () => {
        clearInterval(interval);
        setConnected(false);
      };
    }, [config]); // Can't add onMessage - would reconnect

    // TODO: Fix with useLatest
    // const onMessageRef = useLatest(onMessage);
    // Call onMessageRef.current(msg) in the interval

    return (
      <div style={{ padding: '20px', background: '#f1f8e9' }}>
        <h2>WebSocket with Stale Callback</h2>
        <p>Status: {connected ? '🟢 Connected' : '🔴 Disconnected'}</p>

        <div style={{ marginTop: '10px', maxHeight: '150px', overflow: 'auto' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ padding: '3px', fontSize: '12px' }}>
              {msg}
            </div>
          ))}
        </div>

        <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          <p>Messages received: {messages.length}</p>
          <p>Check console for onMessage calls</p>
        </div>
      </div>
    );
  }

  // Example 4: Cleanup with latest state
  function AutoSave({ data }) {
    const [saveCount, setSaveCount] = useState(0);
    const [lastSaved, setLastSaved] = useState(null);

    // TODO: Problem - cleanup needs latest saveCount
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        console.log('Auto-saving...');
        setLastSaved(new Date().toLocaleTimeString());
        setSaveCount(prev => prev + 1);
      }, 2000);

      return () => {
        // BUG: saveCount is stale in cleanup
        console.log('Cleanup - Save count was:', saveCount);
        // If we need to cancel pending operations based on count, we're in trouble
      };
    }, [data]);

    // TODO: Fix with useLatest
    // const saveCountRef = useLatest(saveCount);

    return (
      <div style={{ padding: '20px', background: '#fff9c4' }}>
        <h2>Auto-Save with Stale Cleanup</h2>
        <p>Save Count: {saveCount}</p>
        <p>Last Saved: {lastSaved || 'Never'}</p>

        <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          <p>Data changes trigger save after 2s</p>
          <p>Check console - cleanup has stale count</p>
        </div>
      </div>
    );
  }

  export default function App() {
    const [messageHandler, setMessageHandler] = useState(() => (msg) => {
      console.log('[Handler v1]', msg);
    });
    const [wsConfig, setWsConfig] = useState({ url: 'ws://localhost', v: 1 });
    const [autoSaveData, setAutoSaveData] = useState({ text: 'Hello' });

    return (
      <div style={{ fontFamily: 'sans-serif' }}>
        <h1 style={{ padding: '20px' }}>useLatest Hook Pattern</h1>

        <div style={{ padding: '20px', background: '#e0e0e0', margin: '20px' }}>
          <h3>Why useLatest Matters</h3>
          <p>Effects capture values from their render. When effects don't re-run (intentionally),
          they use stale values. useLatest lets you access current values without re-running effects.</p>
        </div>

        <div style={{ display: 'grid', gap: '20px', padding: '20px' }}>
          <CounterWithInterval />
          <SearchWithDebounce />
          <WebSocketComponent
            onMessage={messageHandler}
            config={wsConfig}
          />
          <AutoSave data={autoSaveData} />
        </div>

        <div style={{ padding: '20px', background: '#f5f5f5', margin: '20px' }}>
          <h3>Test Controls</h3>
          <button
            onClick={() => {
              setMessageHandler(() => (msg) => {
                console.log('[Handler v2]', msg);
              });
            }}
          >
            Update Message Handler
          </button>
          <button
            onClick={() => setWsConfig({ url: 'ws://localhost', v: wsConfig.v + 1 })}
            style={{ marginLeft: '10px' }}
          >
            Update WS Config
          </button>
          <button
            onClick={() => setAutoSaveData({ text: `Update ${Date.now()}` })}
            style={{ marginLeft: '10px' }}
          >
            Update Auto-Save Data
          </button>
        </div>
      </div>
    );
  }
---

Master the useLatest pattern to solve stale closure problems in effects, intervals, and async operations without breaking dependency arrays.

## Requirements

### Implement useLatest Hook
- Accept any value (state, props, callbacks)
- Store value in a ref
- Update ref.current during render (synchronously)
- Return the ref object itself
- No useEffect needed (update during render is safe)
- Type-safe with TypeScript generics

### Fix CounterWithInterval
- Current bug: count is stale in setInterval
- Can't add count to deps (would restart interval)
- Use useLatest(count) to get fresh value
- Use functional setState: setCount(countRef.current + 1)
- Verify console logs show correct count
- Changing delay shouldn't break count

### Fix SearchWithDebounce
- Current bug: searchCount stale in async callback
- Can't add searchCount to deps (breaks debounce)
- Use useLatest(searchCount) for fresh value
- Access searchCountRef.current in fetch callback
- Results should show current search count
- Multiple rapid searches should use latest count

### Fix WebSocketComponent
- Current bug: onMessage callback is stale
- Can't add onMessage to deps (would reconnect)
- Use useLatest(onMessage) for fresh callback
- Call onMessageRef.current(msg) in interval
- Verify updated handlers are called
- Connection shouldn't restart when handler changes

### Fix AutoSave
- Current bug: cleanup has stale saveCount
- Use useLatest(saveCount) for cleanup logic
- Cleanup should see current count
- Useful for canceling operations based on latest state
- Demonstrate proper cleanup with fresh values

## Key Concepts

### The Stale Closure Problem
```javascript
// BUG: count is captured from render
useEffect(() => {
  setInterval(() => {
    console.log(count); // Always logs initial value
  }, 1000);
}, []); // Empty deps = effect runs once = stale forever

// FIX: Use ref to access latest value
const countRef = useLatest(count);
useEffect(() => {
  setInterval(() => {
    console.log(countRef.current); // Always latest!
  }, 1000);
}, []); // Can keep empty deps
```

### Why Update During Render
```javascript
// WRONG: Too late, might miss updates
function useLatest(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value; // Updated after render
  });
  return ref;
}

// CORRECT: Immediate, no missed updates
function useLatest(value) {
  const ref = useRef(value);
  ref.current = value; // Updated during render
  return ref;
}
```

### Return Ref vs Ref.current
```javascript
// WRONG: Returns primitive, not reactive
function useLatest(value) {
  const ref = useRef(value);
  ref.current = value;
  return ref.current; // Just a number/string/etc
}

// CORRECT: Returns ref object
function useLatest(value) {
  const ref = useRef(value);
  ref.current = value;
  return ref; // Object with .current property
}
```

## Implementation Pattern

```javascript
function useLatest(value) {
  const ref = useRef(value);

  // Update ref during render (safe because we return ref object)
  ref.current = value;

  return ref;
}

// Usage
const callback = () => { /* uses state */ };
const callbackRef = useLatest(callback);

useEffect(() => {
  const id = setInterval(() => {
    callbackRef.current(); // Always calls latest version
  }, 1000);
  return () => clearInterval(id);
}, []); // No deps needed!
```

## When to Use useLatest

Use useLatest when:
- Effects with intentionally sparse dependencies
- setInterval/setTimeout with changing callbacks
- Async operations that need latest state
- WebSocket/SSE handlers that shouldn't reconnect
- Event listeners that need fresh callbacks
- Cleanup functions that need latest values
- Third-party library callbacks

Don't use when:
- Effect should re-run when value changes
- You can use functional setState
- Value is already stable (useCallback)
- Premature optimization

## Common Pitfalls

### Pitfall 1: Returning ref.current
```javascript
// WRONG: Not reactive
return ref.current;

// CORRECT: Return ref object
return ref;
```

### Pitfall 2: Using useEffect to Update
```javascript
// PROBLEMATIC: Updates after render
useEffect(() => {
  ref.current = value;
});

// BETTER: Updates during render
ref.current = value;
```

### Pitfall 3: Not Using Functional setState
```javascript
// STILL WRONG: setCount uses stale count
const countRef = useLatest(count);
setCount(countRef.current + 1);

// CORRECT: Functional update gets latest
setCount(prev => prev + 1);

// OR if you need the ref value:
setCount(countRef.current + 1); // Only if you logged it or something
```

## Real-World Use Cases

1. **Intervals/Timers**: Stable intervals with changing callbacks
2. **WebSocket Handlers**: Connection persists, handlers update
3. **Debounced Functions**: Latest callback without resetting debounce
4. **Third-party Libraries**: Pass callbacks that need fresh state
5. **Event Listeners**: Avoid add/remove cycle on every change
6. **Async Operations**: Fetch/promises that need latest state
7. **Animation Frames**: requestAnimationFrame with fresh values
8. **Effect Cleanup**: Access latest state during unmount

## Comparison with Alternatives

### vs useCallback
```javascript
// useCallback: Recreates when deps change
const fn = useCallback(() => {
  doSomething(a, b, c);
}, [a, b, c]); // New function on any change

// useLatest: Never recreates
const fn = () => {
  doSomething(a, b, c);
};
const fnRef = useLatest(fn);
// fnRef.current() always calls latest version
```

### vs useEffect Dependency
```javascript
// Adding dep: Effect re-runs (often undesirable)
useEffect(() => {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}, [callback]); // Restarts interval on every callback change

// useLatest: Effect runs once, always fresh callback
const callbackRef = useLatest(callback);
useEffect(() => {
  const id = setInterval(() => callbackRef.current(), 1000);
  return () => clearInterval(id);
}, []); // Runs once, no restarts
```

## TypeScript Implementation

```typescript
import { useRef } from 'react';

function useLatest<T>(value: T): { readonly current: T } {
  const ref = useRef<T>(value);
  ref.current = value;
  return ref;
}

// Usage with type inference
const [count, setCount] = useState(0);
const countRef = useLatest(count); // Type: { readonly current: number }
```

## Bonus Challenges

- Add TypeScript generics with proper types
- Implement useEvent from React RFC (similar concept)
- Create useLatestCallback that wraps functions automatically
- Build useStableEffect that auto-applies useLatest to all deps
- Compare bundle size vs useCallback
- Write tests for concurrent mode safety
- Implement useLatestAsync for async functions
- Create devtools to visualize stale vs fresh values

## Testing Checklist

- [ ] Interval uses latest count value
- [ ] Changing delay doesn't break count increment
- [ ] Debounced search uses latest searchCount
- [ ] WebSocket callback receives updated handler
- [ ] Changing handler doesn't reconnect WebSocket
- [ ] Cleanup functions see latest state
- [ ] Console logs show fresh values (not stale)
- [ ] No unnecessary effect re-runs
- [ ] Async callbacks access latest state
- [ ] All stale closure bugs are fixed

## Learning Objectives

This advanced pattern is essential for production React apps. You'll understand why closures become stale, when to use refs vs state, and how to build performant effects that don't re-run unnecessarily. This pattern is used extensively in React libraries like `useEvent` RFC and modern hooks libraries. Master this to write correct, performant async code in React.
