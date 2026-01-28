---
title: Safe Conditional Rendering Patterns
description: Use ternary operators instead of && to avoid rendering false/0 in the DOM
tags:
  - patterns
  - rendering
  - best-practices
difficulty: medium
timeEstimate: 25
learningGoals:
  - Understand && operator rendering pitfalls
  - Prevent false/0 from appearing in DOM
  - Use ternary operators for safe conditionals
  - Learn when each pattern is appropriate
hints:
  - && renders falsy values like 0 or empty string
  - Ternary returns null when condition is false
  - null/undefined/true/false don't render in React
  - Always consider what the falsy case evaluates to
starterCode: |
  import { useState } from 'react';

  export default function App() {
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const filteredItems = items.filter(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Simulate loading data
    const loadData = () => {
      setIsLoading(true);
      setError('');
      setTimeout(() => {
        setItems(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']);
        setIsLoading(false);
      }, 1000);
    };

    // Simulate error
    const triggerError = () => {
      setError('Failed to load data');
      setItems([]);
    };

    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Conditional Rendering Patterns</h1>

        {/* Problem 1: count && renders "0" */}
        <div style={{
          padding: '20px',
          marginBottom: '20px',
          border: '2px solid #ffebee',
          borderRadius: '8px',
        }}>
          <h2>Problem: Rendering count with &&</h2>
          <button
            onClick={() => setCount(count + 1)}
            style={{
              padding: '8px 16px',
              marginRight: '8px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Increment ({count})
          </button>
          <button
            onClick={() => setCount(0)}
            style={{
              padding: '8px 16px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>

          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: '#fff3e0',
            borderRadius: '4px',
          }}>
            {/* TODO: Fix - this renders "0" when count is 0 */}
            {count && <p>You have {count} notifications</p>}
          </div>
        </div>

        {/* Problem 2: items.length && renders "0" */}
        <div style={{
          padding: '20px',
          marginBottom: '20px',
          border: '2px solid #ffebee',
          borderRadius: '8px',
        }}>
          <h2>Problem: Rendering list length with &&</h2>
          <button
            onClick={loadData}
            disabled={isLoading}
            style={{
              padding: '8px 16px',
              marginRight: '8px',
              background: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isLoading ? 'Loading...' : 'Load Items'}
          </button>
          <button
            onClick={() => setItems([])}
            style={{
              padding: '8px 16px',
              background: '#9E9E9E',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Clear Items
          </button>

          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: '#fff3e0',
            borderRadius: '4px',
          }}>
            {/* TODO: Fix - this renders "0" when items array is empty */}
            {items.length && (
              <div>
                <strong>{items.length} items loaded:</strong>
                <ul style={{ marginTop: '8px' }}>
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Problem 3: Empty string rendering */}
        <div style={{
          padding: '20px',
          marginBottom: '20px',
          border: '2px solid #ffebee',
          borderRadius: '8px',
        }}>
          <h2>Problem: Search query with &&</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items..."
            style={{
              padding: '8px',
              width: '100%',
              boxSizing: 'border-box',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />

          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: '#fff3e0',
            borderRadius: '4px',
          }}>
            {/* TODO: Fix - shows weird layout when searchQuery is empty */}
            {searchQuery && (
              <p>
                Searching for: "<strong>{searchQuery}</strong>"
              </p>
            )}
            {/* TODO: Fix - this renders "0" when no results */}
            {filteredItems.length && (
              <p>Found {filteredItems.length} results</p>
            )}
          </div>
        </div>

        {/* Problem 4: Error message */}
        <div style={{
          padding: '20px',
          marginBottom: '20px',
          border: '2px solid #ffebee',
          borderRadius: '8px',
        }}>
          <h2>Problem: Error message with &&</h2>
          <button
            onClick={triggerError}
            style={{
              padding: '8px 16px',
              marginRight: '8px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Trigger Error
          </button>
          <button
            onClick={() => setError('')}
            style={{
              padding: '8px 16px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Clear Error
          </button>

          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: '#fff3e0',
            borderRadius: '4px',
          }}>
            {/* TODO: Fix - renders empty string as empty div when no error */}
            {error && (
              <div style={{
                padding: '12px',
                background: '#ffebee',
                color: '#c62828',
                borderRadius: '4px',
              }}>
                Error: {error}
              </div>
            )}
          </div>
        </div>

        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: '#e8f5e9',
          borderRadius: '8px',
        }}>
          <h3>Why This Matters</h3>
          <p>
            <strong>The && operator</strong> returns the left side if falsy, or the right side if truthy.
            When left side is <code>0</code> or <code>""</code>, React renders it!
          </p>
          <p>
            <strong>Solution:</strong> Use ternary operators: <code>condition ? &lt;Component /&gt; : null</code>
          </p>
          <p>
            React won't render: <code>null</code>, <code>undefined</code>, <code>true</code>, <code>false</code>
          </p>
        </div>
      </div>
    );
  }
---

Learn to avoid common conditional rendering bugs by using ternary operators instead of &&.

## Requirements

- Fix all four problematic conditional renders
- Replace `&&` with ternary operators where appropriate
- Ensure no falsy values (0, empty string) appear in DOM
- Maintain same functionality
- Understand when each pattern is safe

## Implementation Steps

1. Replace `count &&` with `count > 0 ? ... : null`
2. Replace `items.length &&` with `items.length > 0 ? ... : null`
3. Replace `searchQuery &&` with `searchQuery.trim() ? ... : null`
4. Replace `error &&` with `error ? ... : null` (this one is actually safe, but ternary is clearer)

## Expected Behavior

**Before fix:**
- When count is 0, renders "0" in the DOM
- When items array is empty, renders "0"
- Awkward empty spaces when conditions are falsy

**After fix:**
- When count is 0, renders nothing (clean)
- When items array is empty, renders nothing
- Clean, intentional rendering in all states

## Visual Example

```
❌ Before (buggy):
┌─────────────────────┐
│ Notifications       │
│ [0]  <- Bug! Shows 0│
└─────────────────────┘

✅ After (fixed):
┌─────────────────────┐
│ Notifications       │
│ (nothing shown)     │
└─────────────────────┘
```

## The Problem Explained

```javascript
// ❌ Renders "0" when count is 0
{count && <p>Count: {count}</p>}
// Why? 0 && <p>... evaluates to 0, React renders 0

// ✅ Renders nothing when count is 0
{count > 0 ? <p>Count: {count}</p> : null}
// Why? false ? <p>... : null evaluates to null, React skips null
```

## Learning Objectives

This exercise teaches safe conditional rendering patterns. The `&&` operator is convenient but has a critical pitfall: it can render falsy values like `0` or `""` into the DOM. Using ternary operators ensures you always return renderable values or `null`.

## When Each Pattern is Safe

### Safe to use &&:
```javascript
// Boolean conditions
{isLoggedIn && <Dashboard />}

// Truthy checks
{user && <UserProfile user={user} />}

// Boolean conversion
{!!count && <Badge count={count} />}
```

### Must use ternary:
```javascript
// Numeric conditions
{count > 0 ? <Badge count={count} /> : null}

// Length checks
{items.length > 0 ? <List items={items} /> : null}

// String checks that might be empty
{searchQuery.trim() ? <Results query={searchQuery} /> : null}
```

## Best Practice Rule

**Use ternary by default for conditional rendering.**

It's more explicit, safer, and makes your intent clear. The `&&` operator is fine for boolean conditions, but ternary is always safe.

## Common Pitfalls

```javascript
// ❌ Renders "0"
{items.length && <List />}

// ❌ Renders ""
{searchQuery && <Results />}

// ❌ Renders "NaN"
{items.length / 0 && <Stats />}

// ✅ Renders nothing
{items.length > 0 ? <List /> : null}
{searchQuery ? <Results /> : null}
{!isNaN(value) ? <Stats /> : null}
```

## Alternative: Boolean Conversion

```javascript
// Also works - converts to boolean first
{!!count && <Badge count={count} />}
{Boolean(items.length) && <List />}

// But ternary is clearer
{count > 0 ? <Badge count={count} /> : null}
```
