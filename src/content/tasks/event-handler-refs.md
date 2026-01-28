---
title: Event Handler Refs Pattern
description: Store event handlers in refs to avoid re-creating callbacks and breaking memoization
tags:
  - performance
  - useRef
  - optimization
  - advanced patterns
difficulty: hard
timeEstimate: 30
learningGoals:
  - Understand the cost of re-creating callbacks
  - Use refs to store latest event handlers
  - Avoid useCallback dependency hell
  - Maintain stable function references without useCallback
  - Optimize deeply memoized component trees
hints:
  - Store the handler function in a ref
  - Create a stable wrapper function that calls ref.current
  - Update ref.current in useEffect or during render
  - The wrapper function never changes identity
  - No dependency array needed
starterCode: |
  import { useState, useCallback, useRef, useEffect, memo } from 'react';

  // Expensive child that should rarely re-render
  const ExpensiveChild = memo(({ onAction }) => {
    console.log('ExpensiveChild rendered');
    return (
      <div style={{ padding: '20px', background: '#f0f0f0', margin: '10px' }}>
        <h3>Expensive Component</h3>
        <button onClick={() => onAction('clicked')}>Trigger Action</button>
        <p>This component should only render when onAction identity changes</p>
      </div>
    );
  });

  // TODO: Implement useEventHandler hook
  function useEventHandler(handler) {
    // TODO: Store handler in ref
    // TODO: Return stable wrapper function
    // TODO: Wrapper calls ref.current with arguments
    return handler;
  }

  function SearchWithFilters() {
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({ category: 'all', sort: 'name' });
    const [results, setResults] = useState([]);

    // Complex state that changes frequently
    const [config, setConfig] = useState({ debounce: 300, maxResults: 10 });

    // TODO: This handler depends on multiple states
    // Problem: useCallback would need huge dependency array
    // Solution: Use useEventHandler instead
    const handleSearch = (searchQuery) => {
      console.log('Searching with:', {
        query: searchQuery,
        filters,
        config,
      });

      // Simulate API call with current state
      const mockResults = [
        `Result for "${searchQuery}" (${filters.category}, ${filters.sort})`,
        `Config: debounce=${config.debounce}ms, max=${config.maxResults}`,
      ];
      setResults(mockResults);
    };

    // TODO: Replace with useEventHandler
    // const stableHandleSearch = useEventHandler(handleSearch);

    return (
      <div style={{ padding: '20px' }}>
        <h2>Search with Complex Dependencies</h2>

        <div style={{ marginBottom: '10px' }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search..."
            style={{ padding: '8px', width: '300px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Category:
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              style={{ marginLeft: '10px' }}
            >
              <option value="all">All</option>
              <option value="posts">Posts</option>
              <option value="users">Users</option>
            </select>
          </label>

          <label style={{ marginLeft: '20px' }}>
            Sort:
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              style={{ marginLeft: '10px' }}
            >
              <option value="name">Name</option>
              <option value="date">Date</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => setConfig({ ...config, debounce: config.debounce + 100 })}>
            Increase Debounce ({config.debounce}ms)
          </button>
          <button
            onClick={() => setConfig({ ...config, maxResults: config.maxResults + 5 })}
            style={{ marginLeft: '10px' }}
          >
            More Results ({config.maxResults})
          </button>
        </div>

        {/* TODO: Pass stableHandleSearch instead of handleSearch */}
        <ExpensiveChild onAction={handleSearch} />

        <div style={{ marginTop: '20px' }}>
          <h4>Results:</h4>
          {results.map((result, idx) => (
            <div key={idx} style={{ padding: '5px', background: '#e3f2fd', margin: '5px' }}>
              {result}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <p>Watch console: ExpensiveChild should only render once</p>
          <p>Changing query/filters/config should NOT re-render ExpensiveChild</p>
        </div>
      </div>
    );
  }

  function FormWithValidation() {
    const [formData, setFormData] = useState({ email: '', password: '', age: '' });
    const [errors, setErrors] = useState({});
    const [submitCount, setSubmitCount] = useState(0);

    // Validation rules that might change
    const [minAge, setMinAge] = useState(18);

    // TODO: Complex validator with multiple dependencies
    const validateField = (field, value) => {
      console.log('Validating:', field, value);

      const newErrors = { ...errors };

      if (field === 'email' && !value.includes('@')) {
        newErrors.email = 'Invalid email';
      } else if (field === 'email') {
        delete newErrors.email;
      }

      if (field === 'password' && value.length < 8) {
        newErrors.password = `Min 8 characters (config: ${submitCount} attempts)`;
      } else if (field === 'password') {
        delete newErrors.password;
      }

      if (field === 'age' && parseInt(value) < minAge) {
        newErrors.age = `Must be ${minAge}+`;
      } else if (field === 'age') {
        delete newErrors.age;
      }

      setErrors(newErrors);
    };

    // TODO: Use useEventHandler to create stable reference
    // const stableValidateField = useEventHandler(validateField);

    return (
      <div style={{ padding: '20px' }}>
        <h2>Form with Validation</h2>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Min Age Requirement:
            <input
              type="number"
              value={minAge}
              onChange={(e) => setMinAge(Number(e.target.value))}
              style={{ marginLeft: '10px', width: '60px' }}
            />
          </label>
        </div>

        {/* TODO: Pass stableValidateField to child */}
        <ExpensiveChild onAction={(action) => {
          console.log('Form action:', action);
          setSubmitCount(submitCount + 1);
        }} />

        <div style={{ marginTop: '10px' }}>
          <p>Submit Count: {submitCount}</p>
          <p>Min Age: {minAge}</p>
          {Object.keys(errors).length > 0 && (
            <div style={{ color: 'red' }}>
              Errors: {JSON.stringify(errors)}
            </div>
          )}
        </div>
      </div>
    );
  }

  export default function App() {
    return (
      <div style={{ fontFamily: 'sans-serif' }}>
        <h1 style={{ padding: '20px' }}>Event Handler Refs Pattern</h1>
        <SearchWithFilters />
        <hr style={{ margin: '40px 20px' }} />
        <FormWithValidation />
      </div>
    );
  }
---

Learn the advanced event handler refs pattern to create stable callback references without useCallback's dependency array complexity.

## Requirements

### Implement useEventHandler Hook
- Accept a handler function as parameter
- Store handler in a ref
- Return a stable wrapper function (never changes identity)
- Wrapper function calls ref.current(...args)
- Update ref during render or in useEffect
- Pass all arguments and return value through

### Optimize SearchWithFilters
- handleSearch depends on query, filters, and config
- Using useCallback would need [query, filters, config] deps
- Every state change would recreate the callback
- Use useEventHandler to create stable reference
- ExpensiveChild should render only once
- Changing any state should NOT re-render ExpensiveChild

### Optimize FormWithValidation
- validateField depends on errors, submitCount, minAge
- Complex dependency array with useCallback
- Use useEventHandler for stable reference
- Validation logic always uses latest state
- No stale closures

## Key Concepts

### The Problem with useCallback
```javascript
// BAD: Huge dependency array, frequent recreation
const handler = useCallback(() => {
  doSomething(a, b, c, d, e);
}, [a, b, c, d, e]); // Re-creates on any change

// GOOD: Stable reference, always fresh values
const handler = useEventHandler(() => {
  doSomething(a, b, c, d, e);
}); // Never re-creates, no deps needed
```

### Why This Works
- Wrapper function has stable identity (created once)
- Ref stores latest handler (always up to date)
- No stale closures (ref.current always points to latest)
- No dependency array complexity
- Simpler than useCallback for complex cases

### Implementation Pattern
```javascript
function useEventHandler(handler) {
  const handlerRef = useRef(handler);

  // Update ref with latest handler
  handlerRef.current = handler;

  // Return stable wrapper (created once)
  const stableHandler = useRef((...args) => {
    return handlerRef.current(...args);
  });

  return stableHandler.current;
}
```

## Expected Behavior

**Before optimization:**
- ExpensiveChild re-renders on every state change
- Console shows "ExpensiveChild rendered" frequently
- Changing filters/config triggers re-render
- memo() is useless because callback keeps changing

**After optimization:**
- ExpensiveChild renders only once
- Changing query/filters/config doesn't re-render child
- Handler always has access to latest state
- No stale closure bugs
- Console shows single "ExpensiveChild rendered"

## When to Use This Pattern

Use event handler refs when:
- Handler depends on many state variables
- useCallback dependency array is complex
- You want to avoid the "dependency array game"
- Performance-critical memoized children
- Callbacks passed to deeply nested components
- Event handlers in custom hooks

Don't use when:
- Simple handlers with 1-2 dependencies
- useCallback is sufficient
- Handler doesn't need latest state
- Premature optimization

## Common Pitfalls

### Pitfall 1: Updating Ref During Render
```javascript
// RISKY: Updating ref during render
function useEventHandler(handler) {
  const ref = useRef();
  ref.current = handler; // Can cause issues
  return ref.current;
}

// SAFER: But loses wrapper stability
function useEventHandler(handler) {
  const ref = useRef(handler);
  useEffect(() => {
    ref.current = handler;
  });
  return () => ref.current();
}
```

### Pitfall 2: Not Preserving Arguments
```javascript
// BAD: Loses arguments
const wrapper = () => handlerRef.current();

// GOOD: Forwards all arguments
const wrapper = (...args) => handlerRef.current(...args);
```

### Pitfall 3: Not Preserving Return Value
```javascript
// BAD: Can't return values
const wrapper = (...args) => {
  handlerRef.current(...args);
};

// GOOD: Returns handler's return value
const wrapper = (...args) => {
  return handlerRef.current(...args);
};
```

## Real-World Use Cases

- Event handlers in reusable hooks
- Callbacks for deeply memoized component trees
- Form validation with complex rules
- WebSocket/SSE message handlers
- Animation frame callbacks
- Debounced/throttled handlers with fresh state
- Custom imperative handles (useImperativeHandle)

## Bonus Challenges

- Implement useEventCallback from React RFC
- Add TypeScript generic types for handler signature
- Create useStableCallback that memoizes result
- Build useEventHandlerWithCleanup for subscriptions
- Compare performance: useCallback vs useEventHandler
- Handle async handlers with proper error boundaries

## Testing Checklist

- [ ] ExpensiveChild renders only once initially
- [ ] Changing query doesn't re-render ExpensiveChild
- [ ] Changing filters doesn't re-render ExpensiveChild
- [ ] Changing config doesn't re-render ExpensiveChild
- [ ] Handler always uses latest state values
- [ ] No stale closures
- [ ] Arguments passed correctly
- [ ] Return values work correctly
- [ ] Works with async handlers
- [ ] Console shows minimal re-renders

## Learning Objectives

This advanced pattern teaches you to escape useCallback's limitations. You'll understand when refs are better than memoization, how to create stable wrappers, and why this pattern is crucial for performance in complex component trees. This is a senior-level optimization technique used in production apps with deep component hierarchies.
