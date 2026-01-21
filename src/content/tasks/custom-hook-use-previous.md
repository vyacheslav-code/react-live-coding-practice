---
title: Custom Hook - usePrevious
description: Create usePrevious hook to compare current and previous values for form validation and change detection
tags:
  - custom hooks
  - useRef
  - useEffect
  - comparison
  - forms
difficulty: medium
timeEstimate: 25
learningGoals:
  - Understand useRef for persisting values across renders
  - Track previous prop or state values
  - Implement change detection patterns
  - Build form validation comparing current vs previous
  - Handle undefined and initial render edge cases
hints:
  - useRef persists values without triggering re-renders
  - Update ref in useEffect after render completes
  - First render has no previous value (undefined)
  - Previous value updates after current render
  - Useful for animations, transitions, and validations
starterCode: |
  import { useState, useRef, useEffect } from 'react';

  // TODO: Implement usePrevious hook
  function usePrevious(value) {
    // TODO: Use useRef to store previous value
    // TODO: Update ref after render in useEffect
    // TODO: Return previous value (undefined on first render)

    return undefined;
  }

  // TODO: Implement useCompare hook that returns what changed
  function useCompare(value) {
    const previous = usePrevious(value);

    // TODO: Compare current vs previous
    // TODO: Return { current, previous, hasChanged, increased, decreased }

    return {
      current: value,
      previous,
      hasChanged: false,
      increased: false,
      decreased: false,
    };
  }

  // Form with change detection
  function FormWithValidation() {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
    });

    // TODO: Track previous form data
    // const prevFormData = usePrevious(formData);

    // Detect which fields changed
    const getChangedFields = () => {
      // TODO: Compare current formData with prevFormData
      // TODO: Return array of changed field names
      return [];
    };

    const changedFields = getChangedFields();

    return (
      <div style={{ padding: '20px', maxWidth: '400px' }}>
        <h2>Form Change Detection</h2>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Username:
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {changedFields.length > 0 && (
          <div style={{ padding: '10px', background: '#fff3cd', marginTop: '10px' }}>
            <strong>Changed fields:</strong> {changedFields.join(', ')}
          </div>
        )}
      </div>
    );
  }

  // Counter with change direction
  function CounterWithDirection() {
    const [count, setCount] = useState(0);

    // TODO: Use useCompare to track if count increased or decreased
    // const { hasChanged, increased, decreased, previous } = useCompare(count);

    return (
      <div style={{ padding: '20px' }}>
        <h2>Counter Direction Detection</h2>

        <div style={{ fontSize: '48px', margin: '20px 0' }}>
          {count}
          {/* TODO: Show arrow based on direction */}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setCount(count - 1)}>-</button>
          <button onClick={() => setCount(0)}>Reset</button>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>

        {/* TODO: Show previous value and change info */}
      </div>
    );
  }

  // Animation trigger based on value change
  function AnimatedValue() {
    const [value, setValue] = useState(50);
    const prevValue = usePrevious(value);

    // TODO: Add animation class when value changes
    // TODO: Detect if value increased or decreased for different animations

    return (
      <div style={{ padding: '20px' }}>
        <h2>Animated Value Changes</h2>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div
          style={{
            padding: '20px',
            background: '#e3f2fd',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '24px',
            // TODO: Add transition styles
            // TODO: Change background color based on increase/decrease
          }}
        >
          Current: {value}
          {prevValue !== undefined && (
            <div style={{ fontSize: '16px', marginTop: '10px' }}>
              Previous: {prevValue}
            </div>
          )}
        </div>
      </div>
    );
  }

  export default function App() {
    return (
      <div style={{ fontFamily: 'sans-serif' }}>
        <h1 style={{ padding: '20px' }}>usePrevious Hook Examples</h1>

        <div style={{ display: 'grid', gap: '20px', padding: '20px' }}>
          <FormWithValidation />
          <CounterWithDirection />
          <AnimatedValue />
        </div>
      </div>
    );
  }
---

Create a `usePrevious` hook to track and compare previous values with current values, enabling change detection, form validation, and animated transitions.

## Requirements

### Core usePrevious Hook
- Accept any value (primitive or object)
- Return the previous value from the last render
- Use useRef to persist value across renders
- Update ref in useEffect (after render)
- Handle initial render (return undefined)

### useCompare Utility Hook
- Built on top of usePrevious
- Return object with: `{ current, previous, hasChanged, increased, decreased }`
- Compare numeric values for direction
- Work with any comparable type

### Form Change Detection
- Track previous form state
- Highlight which fields changed
- Show unsaved changes warning
- Compare objects field by field
- Display changed field names

### Counter with Direction
- Show if value increased or decreased
- Display arrow indicators (↑ ↓)
- Show previous value
- Reset direction indicator on no change
- Handle edge case: first render has no previous

### Animated Transitions
- Trigger animations on value change
- Different animations for increase vs decrease
- Smooth transitions with CSS
- Highlight recent changes
- Fade effects based on change detection

## Key Concepts

### Why useRef Instead of useState?
```javascript
// useState would cause extra render
const [previous, setPrevious] = useState();

// useRef doesn't trigger re-renders
const ref = useRef();
```

### Update Timing
```javascript
// BAD - updates during render
ref.current = value;

// GOOD - updates after render
useEffect(() => {
  ref.current = value;
});
```

### Initial Render
First render has no previous value:
- `usePrevious(5)` returns `undefined` on first call
- Returns `5` on second render (after first update)

## Bonus Challenges

- Deep comparison for objects (JSON.stringify or deep-equal)
- useChangedFields hook that returns array of changed keys
- usePreviousDistinct that only updates when value actually changes
- Track history of last N values (usePreviousN)
- Create useAnimation hook based on usePrevious

## Real-World Use Cases

- Form validation (compare with initial values)
- Unsaved changes warning
- Analytics (track what changed)
- Animations triggered by value changes
- Debugging (log previous vs current state)
- Undo/redo functionality

## Testing Checklist

- [ ] Returns undefined on first render
- [ ] Returns previous value on subsequent renders
- [ ] Works with primitives (numbers, strings)
- [ ] Works with objects and arrays
- [ ] Form change detection highlights modified fields
- [ ] Counter shows correct direction arrows
- [ ] Animations trigger on value changes
- [ ] No unnecessary re-renders
- [ ] Handles rapid value changes correctly
