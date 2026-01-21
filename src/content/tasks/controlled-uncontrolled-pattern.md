---
title: Controlled vs Uncontrolled Pattern - Dual-Mode Input
description: Build a component that supports both controlled and uncontrolled modes seamlessly
tags:
  - advanced-patterns
  - controlled-components
  - uncontrolled-components
  - state-management
difficulty: hard
timeEstimate: 35
learningGoals:
  - Understand controlled vs uncontrolled components
  - Implement dual-mode component support
  - Synchronize internal and external state
  - Detect which mode is being used
  - Handle edge cases and mode transitions
hints:
  - Check if value prop is provided to determine mode
  - Use internal state for uncontrolled mode
  - Use prop value for controlled mode
  - Warn if component switches between modes
  - Support defaultValue for uncontrolled mode initial state
starterCode: |
  import { useState, useRef, useEffect } from 'react';

  // TODO: Implement a dual-mode Input component
  function Input({
    value: controlledValue,
    defaultValue = '',
    onChange,
    ...props
  }) {
    // TODO: Detect if component is controlled or uncontrolled
    const isControlled = controlledValue !== undefined;

    // TODO: Internal state for uncontrolled mode
    const [internalValue, setInternalValue] = useState(defaultValue);

    // TODO: Determine which value to use
    const value = isControlled ? controlledValue : internalValue;

    // TODO: Warn if component mode changes (controlled <-> uncontrolled)

    // TODO: Handle input changes for both modes
    const handleChange = (e) => {
      const newValue = e.target.value;

      // TODO: Update internal state if uncontrolled
      // TODO: Call onChange callback if provided
    };

    return (
      <input
        value={value}
        onChange={handleChange}
        {...props}
      />
    );
  }

  // TODO: Implement a dual-mode Slider component
  function Slider({
    value: controlledValue,
    defaultValue = 50,
    onChange,
    min = 0,
    max = 100,
    ...props
  }) {
    // TODO: Implement same controlled/uncontrolled pattern
    // TODO: Add visual indicator of current value

    return (
      <div style={{ width: '100%' }}>
        <input
          type="range"
          min={min}
          max={max}
          style={{ width: '100%' }}
          {...props}
        />
        <div style={{ textAlign: 'center', marginTop: '5px' }}>
          Value: TODO
        </div>
      </div>
    );
  }

  // TODO: Implement a dual-mode Counter component
  function Counter({
    value: controlledValue,
    defaultValue = 0,
    onChange,
    min = -Infinity,
    max = Infinity,
  }) {
    // TODO: Implement controlled/uncontrolled pattern
    // TODO: Add increment/decrement buttons
    // TODO: Respect min/max bounds

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button>-</button>
        <span style={{ minWidth: '60px', textAlign: 'center', fontSize: '24px' }}>
          TODO
        </span>
        <button>+</button>
      </div>
    );
  }

  export default function App() {
    // Controlled state examples
    const [controlledInput, setControlledInput] = useState('');
    const [controlledSlider, setControlledSlider] = useState(50);
    const [controlledCounter, setControlledCounter] = useState(0);

    return (
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Controlled vs Uncontrolled Pattern</h1>

        {/* Uncontrolled Examples */}
        <section style={{ marginBottom: '40px', padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
          <h2>Uncontrolled Mode (Internal State)</h2>
          <p>Components manage their own state internally.</p>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Uncontrolled Input:
            </label>
            <Input
              defaultValue="Initial value"
              onChange={(e) => console.log('Uncontrolled input:', e.target.value)}
              placeholder="Type here..."
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Uncontrolled Slider:
            </label>
            <Slider
              defaultValue={30}
              onChange={(value) => console.log('Uncontrolled slider:', value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Uncontrolled Counter:
            </label>
            <Counter
              defaultValue={5}
              min={0}
              max={10}
              onChange={(value) => console.log('Uncontrolled counter:', value)}
            />
          </div>
        </section>

        {/* Controlled Examples */}
        <section style={{ marginBottom: '40px', padding: '20px', background: '#e0f0ff', borderRadius: '8px' }}>
          <h2>Controlled Mode (External State)</h2>
          <p>Parent controls component state via props.</p>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Controlled Input:
            </label>
            <Input
              value={controlledInput}
              onChange={(e) => setControlledInput(e.target.value)}
              placeholder="Type here..."
              style={{ width: '100%', padding: '8px' }}
            />
            <div style={{ marginTop: '5px', fontSize: '14px', color: '#666' }}>
              Current value: "{controlledInput}"
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Controlled Slider:
            </label>
            <Slider
              value={controlledSlider}
              onChange={setControlledSlider}
            />
            <button
              onClick={() => setControlledSlider(75)}
              style={{ marginTop: '10px' }}
            >
              Set to 75
            </button>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Controlled Counter:
            </label>
            <Counter
              value={controlledCounter}
              onChange={setControlledCounter}
              min={-5}
              max={5}
            />
            <button
              onClick={() => setControlledCounter(0)}
              style={{ marginTop: '10px' }}
            >
              Reset to 0
            </button>
          </div>
        </section>

        {/* Synchronized Example */}
        <section style={{ padding: '20px', background: '#e0ffe0', borderRadius: '8px' }}>
          <h2>Synchronized Controls</h2>
          <p>Multiple controlled components sharing the same state:</p>

          <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
            <div style={{ flex: 1 }}>
              <Slider
                value={controlledSlider}
                onChange={setControlledSlider}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Input
                type="number"
                value={controlledSlider}
                onChange={(e) => setControlledSlider(Number(e.target.value))}
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
---

Build components that seamlessly support both controlled and uncontrolled modes. This is a critical pattern used by all major React UI libraries and native form elements.

## Requirements

### Detection Logic

**Determine Component Mode:**
- If `value` prop is provided -> Controlled mode
- If only `defaultValue` provided -> Uncontrolled mode
- Controlled: parent manages state via `value` + `onChange`
- Uncontrolled: component manages internal state

### Input Component

**Props:**
- `value`: Controlled value (optional)
- `defaultValue`: Initial value for uncontrolled mode
- `onChange`: Callback for value changes
- Spread other props to native input

**Behavior:**
- Support both controlled and uncontrolled modes
- Use internal state when uncontrolled
- Use prop value when controlled
- Call onChange in both modes (if provided)
- Warn if component switches modes

### Slider Component

**Props:**
- `value`, `defaultValue`, `onChange` (same pattern)
- `min`, `max`: Range bounds (default 0-100)

**Features:**
- Visual range input
- Display current value
- Support controlled/uncontrolled modes

### Counter Component

**Props:**
- `value`, `defaultValue`, `onChange`
- `min`, `max`: Boundary constraints

**Features:**
- Increment/decrement buttons
- Respect min/max bounds
- Support both modes
- Disable buttons at boundaries

## Edge Cases to Handle

1. **Mode Switching**: Warn if component switches from controlled to uncontrolled or vice versa
2. **Undefined vs Null**: Treat `undefined` as uncontrolled, `null` as controlled
3. **Default Value in Controlled**: Ignore defaultValue when controlled
4. **OnChange Missing**: Component should work without onChange
5. **Boundary Conditions**: Handle min/max constraints properly

## Warning Implementation

Detect mode changes and warn in development:
```javascript
useEffect(() => {
  if (wasControlled.current !== isControlled) {
    console.warn(
      `Component is changing from ${wasControlled.current ? 'controlled' : 'uncontrolled'} to ${isControlled ? 'controlled' : 'uncontrolled'}. This can cause unexpected behavior.`
    );
  }
});
```

## Advanced Challenges

1. **TypeScript**: Add proper types distinguishing controlled vs uncontrolled
2. **Ref Forwarding**: Support ref to access internal input element
3. **Validation**: Add validation prop that works in both modes
4. **Reset Functionality**: Add reset() method for uncontrolled components
5. **Form Integration**: Make components work with native form submission
6. **Async Updates**: Handle debounced/async onChange callbacks
7. **Multiple Inputs**: Create form component managing multiple dual-mode inputs

## Design Patterns to Learn

1. **Controlled Components**: Parent controls state via props
2. **Uncontrolled Components**: Component manages internal state
3. **Dual-Mode Support**: Detect mode and behave accordingly
4. **State Synchronization**: Keep internal and external state in sync
5. **Progressive Enhancement**: Work with or without state management

## Real-World Usage

This pattern is used by:
- Native HTML inputs (value + defaultValue)
- Material-UI components
- Ant Design components
- Chakra UI components
- Radix UI primitives

Every production UI library implements this pattern to provide flexibility:
- Simple use cases: uncontrolled (less code)
- Complex use cases: controlled (full control)
- Forms: often mix both patterns

## When to Use Each Mode

**Uncontrolled (defaultValue):**
- Simple forms
- One-time submission
- Less re-renders
- Simpler code

**Controlled (value + onChange):**
- Validation on every keystroke
- Conditional formatting
- Synchronized inputs
- Complex state logic
- Form state in Redux/context

## Validation Tips

Test your implementation:
- Uncontrolled input works with defaultValue
- Controlled input updates when parent state changes
- onChange fires in both modes
- Warning appears if mode switches
- Min/max constraints respected
- Components work without onChange prop
- Multiple controlled components can share state
- Console shows appropriate warnings for misuse
