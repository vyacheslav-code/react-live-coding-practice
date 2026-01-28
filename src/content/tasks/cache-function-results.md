---
title: Cache Function Results
description: Cache expensive function results in module-level Map for performance
tags:
  - performance
  - javascript
  - memoization
  - caching
difficulty: medium
timeEstimate: 25
learningGoals:
  - Implement function result caching
  - Use Map for cache storage
  - Create cache keys for complex arguments
  - Measure caching effectiveness
hints:
  - Store results in Map outside component
  - Use JSON.stringify for complex cache keys
  - Check cache before computing
  - Clear cache when needed
starterCode: |
  import { useState } from 'react';

  // Expensive computation that we want to cache
  function fibonacci(n) {
    console.log(`Computing fibonacci(${n})`);
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  // Expensive string processing
  function processText(text, options) {
    console.log(`Processing text: "${text.substring(0, 20)}..."`);
    let result = text;

    // Simulate expensive operations
    for (let i = 0; i < 100000; i++) {
      result = result.split('').map(c => c).join('');
    }

    if (options.uppercase) result = result.toUpperCase();
    if (options.reverse) result = result.split('').reverse().join('');
    if (options.repeat) result = result.repeat(options.repeat);

    return result;
  }

  // TODO: Create cache Maps outside components (module-level)
  // const fibCache = new Map();
  // const textCache = new Map();

  // TODO: Create cached versions of functions
  function cachedFibonacci(n) {
    // Check cache first
    // If not in cache, compute and store
    // Return result
    return fibonacci(n); // Replace with cached version
  }

  function cachedProcessText(text, options) {
    // Create cache key from arguments
    // Check cache
    // If not in cache, compute and store
    // Return result
    return processText(text, options); // Replace with cached version
  }

  export default function App() {
    const [fibInput, setFibInput] = useState('10');
    const [fibResult, setFibResult] = useState(null);
    const [textInput, setTextInput] = useState('Hello World!');
    const [textOptions, setTextOptions] = useState({
      uppercase: false,
      reverse: false,
      repeat: 1
    });
    const [textResult, setTextResult] = useState(null);
    const [stats, setStats] = useState({ uncached: 0, cached: 0, hits: 0, misses: 0 });

    const computeFibUncached = () => {
      console.clear();
      const start = performance.now();
      const result = fibonacci(parseInt(fibInput));
      const duration = performance.now() - start;

      setFibResult({ value: result, time: duration.toFixed(2), cached: false });
      setStats(prev => ({ ...prev, uncached: duration.toFixed(2) }));
    };

    const computeFibCached = () => {
      console.clear();
      const start = performance.now();
      const result = cachedFibonacci(parseInt(fibInput));
      const duration = performance.now() - start;

      setFibResult({ value: result, time: duration.toFixed(2), cached: true });
      setStats(prev => ({ ...prev, cached: duration.toFixed(2) }));
    };

    const processTextUncached = () => {
      console.clear();
      const start = performance.now();
      const result = processText(textInput, textOptions);
      const duration = performance.now() - start;

      setTextResult({ value: result, time: duration.toFixed(2), cached: false });
      setStats(prev => ({ ...prev, uncached: duration.toFixed(2) }));
    };

    const processTextCached = () => {
      console.clear();
      const start = performance.now();
      const result = cachedProcessText(textInput, textOptions);
      const duration = performance.now() - start;

      setTextResult({ value: result, time: duration.toFixed(2), cached: true });
      setStats(prev => ({ ...prev, cached: duration.toFixed(2) }));
    };

    const clearCaches = () => {
      // TODO: Clear both cache Maps
      console.log('Caches cleared');
      setStats({ uncached: 0, cached: 0, hits: 0, misses: 0 });
    };

    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px' }}>
        <h1>Function Result Caching</h1>
        <p>Open console to see cache hits/misses</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Fibonacci Example */}
          <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
            <h3>Fibonacci Calculation</h3>
            <input
              type="number"
              value={fibInput}
              onChange={(e) => setFibInput(e.target.value)}
              placeholder="Enter number (e.g., 35)"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <button
                onClick={computeFibUncached}
                style={{ flex: 1, padding: '8px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Compute (Uncached)
              </button>
              <button
                onClick={computeFibCached}
                style={{ flex: 1, padding: '8px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Compute (Cached)
              </button>
            </div>
            {fibResult && (
              <div style={{ padding: '10px', background: fibResult.cached ? '#d1fae5' : '#fee2e2', borderRadius: '4px' }}>
                <p><strong>Result:</strong> {fibResult.value}</p>
                <p><strong>Time:</strong> {fibResult.time}ms</p>
                <p><strong>Method:</strong> {fibResult.cached ? 'Cached' : 'Uncached'}</p>
              </div>
            )}
          </div>

          {/* Text Processing Example */}
          <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
            <h3>Text Processing</h3>
            <input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  checked={textOptions.uppercase}
                  onChange={(e) => setTextOptions({ ...textOptions, uppercase: e.target.checked })}
                />
                {' '}Uppercase
              </label>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  checked={textOptions.reverse}
                  onChange={(e) => setTextOptions({ ...textOptions, reverse: e.target.checked })}
                />
                {' '}Reverse
              </label>
              <label style={{ display: 'block' }}>
                Repeat:{' '}
                <input
                  type="number"
                  value={textOptions.repeat}
                  onChange={(e) => setTextOptions({ ...textOptions, repeat: parseInt(e.target.value) || 1 })}
                  min="1"
                  max="5"
                  style={{ width: '60px', padding: '4px' }}
                />
              </label>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <button
                onClick={processTextUncached}
                style={{ flex: 1, padding: '8px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Process (Uncached)
              </button>
              <button
                onClick={processTextCached}
                style={{ flex: 1, padding: '8px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Process (Cached)
              </button>
            </div>
            {textResult && (
              <div style={{ padding: '10px', background: textResult.cached ? '#d1fae5' : '#fee2e2', borderRadius: '4px' }}>
                <p><strong>Result:</strong> {textResult.value.substring(0, 50)}{textResult.value.length > 50 ? '...' : ''}</p>
                <p><strong>Time:</strong> {textResult.time}ms</p>
                <p><strong>Method:</strong> {textResult.cached ? 'Cached' : 'Uncached'}</p>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '15px', background: '#eff6ff', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>Performance Stats</h3>
          {stats.uncached > 0 && stats.cached > 0 && (
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e40af' }}>
              Cached is {(stats.uncached / stats.cached).toFixed(1)}x faster
            </p>
          )}
          <button
            onClick={clearCaches}
            style={{ padding: '8px 16px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Clear All Caches
          </button>
        </div>

        <div style={{ padding: '15px', background: '#fef3c7', borderRadius: '8px' }}>
          <h3>How Caching Works</h3>
          <ol style={{ fontSize: '14px' }}>
            <li>Create a Map outside component (module-level)</li>
            <li>Before computing, check if result exists in Map</li>
            <li>If exists (cache hit), return cached result immediately</li>
            <li>If not (cache miss), compute result and store in Map</li>
            <li>Use JSON.stringify for complex argument cache keys</li>
          </ol>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>
            <strong>Try this:</strong> Compute fibonacci(35) uncached (slow), then cached (instant!)
          </p>
        </div>
      </div>
    );
  }
---

Learn to cache expensive function results using module-level Map for dramatic performance improvements.

## Requirements

- Create module-level cache Maps (outside component)
- Implement cachedFibonacci with cache lookup
- Implement cachedProcessText with complex cache keys
- Use JSON.stringify for multi-argument cache keys
- Display performance comparison (uncached vs cached)
- Implement cache clearing functionality
- Add console logs showing cache hits/misses

## Expected Behavior

**First Call (Cache Miss):**
- Function computes result normally
- Result stored in cache Map
- Console shows "Computing..."
- Takes normal time to execute

**Subsequent Calls (Cache Hit):**
- Cache checked before computation
- Cached result returned immediately
- No console log for computation
- Near-instant execution (1000x+ faster)

**Complex Arguments:**
- Text processing with options object
- Cache key created from all arguments
- Same inputs = cache hit
- Different inputs = cache miss

**Performance:**
- fibonacci(35): ~500ms uncached, <1ms cached
- Text processing: ~100ms uncached, <1ms cached
- Clear demonstration of caching benefit

## Learning Objectives

This exercise teaches function memoization at the module level. You'll learn when to cache, how to create cache keys for complex arguments, and measure the dramatic performance improvements caching provides.

## Cache Key Strategies

**Simple Arguments:**
```javascript
const cache = new Map();
function cached(n) {
  if (cache.has(n)) return cache.get(n);
  const result = expensive(n);
  cache.set(n, result);
  return result;
}
```

**Complex Arguments:**
```javascript
const cache = new Map();
function cached(text, options) {
  const key = JSON.stringify([text, options]);
  if (cache.has(key)) return cache.get(key);
  const result = expensive(text, options);
  cache.set(key, result);
  return result;
}
```

## When to Cache

**Good candidates:**
- Pure functions (same input = same output)
- Expensive computations
- Frequently called with same inputs
- API responses
- Complex calculations

**Bad candidates:**
- Functions with side effects
- Rarely called functions
- Functions with large result objects
- Time-sensitive data
- Random/non-deterministic functions

## Cache Management

**Strategies:**
- **LRU Cache:** Limit size, evict least recently used
- **TTL Cache:** Expire entries after time
- **Manual Clear:** Clear on specific events
- **Weak Cache:** Use WeakMap for object keys (auto garbage collection)

## Module-Level vs useMemo

**Module-level cache:**
- Shared across all component instances
- Persists between renders and mounts
- Better for pure functions
- No React-specific features needed

**useMemo:**
- Per-component instance
- Resets on unmount
- Integrated with React lifecycle
- Better for component-specific calculations
