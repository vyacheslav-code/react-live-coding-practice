---
title: Compound Components Pattern - Custom Select
description: Build a flexible Select/Dropdown using compound components with shared context
tags:
  - advanced-patterns
  - compound-components
  - context
  - composition
difficulty: hard
timeEstimate: 40
learningGoals:
  - Implement compound components pattern
  - Share state via context between components
  - Create flexible component APIs
  - Validate and clone children components
  - Handle keyboard navigation in custom controls
hints:
  - Use Context to share state between Select.Trigger, Select.Menu, and Select.Item
  - Clone children to inject props (onClick, selected state)
  - Use useRef and useEffect for positioning the dropdown
  - Implement keyboard navigation (Arrow keys, Enter, Escape)
  - Consider click-outside detection to close the menu
starterCode: |
  import { useState, useRef, useEffect, createContext, useContext } from 'react';

  // Context for sharing state between compound components
  const SelectContext = createContext(null);

  function useSelectContext() {
    const context = useContext(SelectContext);
    if (!context) {
      throw new Error('Select compound components must be used within Select');
    }
    return context;
  }

  // Main Select component
  function Select({ children, value, onChange, defaultValue }) {
    // TODO: Implement state management for:
    // - Current selected value
    // - Open/close state
    // - Selected index for keyboard navigation

    // TODO: Provide context value with state and handlers

    return (
      <SelectContext.Provider value={{}}>
        <div style={{ position: 'relative', width: '250px' }}>
          {children}
        </div>
      </SelectContext.Provider>
    );
  }

  // Trigger button component
  Select.Trigger = function SelectTrigger({ children, placeholder = 'Select...' }) {
    const context = useSelectContext();

    // TODO: Implement trigger that:
    // - Shows selected value or placeholder
    // - Toggles menu on click
    // - Handles keyboard events (Arrow down to open)

    return (
      <button
        style={{
          width: '100%',
          padding: '10px 15px',
          textAlign: 'left',
          background: 'white',
          border: '2px solid #ddd',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        {placeholder}
      </button>
    );
  };

  // Dropdown menu component
  Select.Menu = function SelectMenu({ children }) {
    const context = useSelectContext();

    // TODO: Implement menu that:
    // - Only renders when open
    // - Positions below trigger
    // - Handles click outside to close
    // - Closes on Escape key

    return null; // Replace with actual implementation
  };

  // Individual option component
  Select.Item = function SelectItem({ value, children }) {
    const context = useSelectContext();

    // TODO: Implement item that:
    // - Shows selected state
    // - Handles click to select
    // - Highlights on keyboard navigation

    return (
      <div
        style={{
          padding: '10px 15px',
          cursor: 'pointer',
          background: 'white',
        }}
      >
        {children}
      </div>
    );
  };

  // Example usage
  export default function App() {
    const [value, setValue] = useState('');

    return (
      <div style={{ padding: '40px' }}>
        <h1>Compound Components Select</h1>

        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Choose a framework:
        </label>

        <Select value={value} onChange={setValue}>
          <Select.Trigger placeholder="Select a framework..." />
          <Select.Menu>
            <Select.Item value="react">React</Select.Item>
            <Select.Item value="vue">Vue</Select.Item>
            <Select.Item value="angular">Angular</Select.Item>
            <Select.Item value="svelte">Svelte</Select.Item>
            <Select.Item value="solid">Solid</Select.Item>
          </Select.Menu>
        </Select>

        {value && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '6px' }}>
            <strong>Selected:</strong> {value}
          </div>
        )}
      </div>
    );
  }
---

Build a fully functional Select/Dropdown component using the compound components pattern. This is the same pattern used by libraries like Radix UI, Reach UI, and Headless UI.

## Requirements

### Context Sharing
- Create SelectContext to share state between all components
- Implement useSelectContext hook with error handling
- Share: selected value, open state, selection handlers

### Select Component
- Accept `value`, `onChange`, `defaultValue` props
- Support both controlled and uncontrolled modes
- Manage open/closed state internally
- Track keyboard navigation index

### Select.Trigger Component
- Display selected value or placeholder
- Toggle dropdown on click
- Support keyboard events (Enter, Space, Arrow Down to open)
- Visual feedback for open state
- Accessible button with proper ARIA attributes

### Select.Menu Component
- Only render when dropdown is open
- Position absolutely below trigger
- Handle click-outside to close
- Close on Escape key
- Prevent body scroll when open (optional)

### Select.Item Component
- Show visual indicator when selected
- Handle click to select and close menu
- Highlight on keyboard navigation
- Support Arrow Up/Down navigation
- Enter key to select highlighted item

## Advanced Challenges

- Implement proper TypeScript types for compound components
- Add disabled state for individual items
- Support custom rendering for trigger (render prop)
- Add search/filter functionality
- Implement proper focus management and ARIA attributes
- Support keyboard Home/End to jump to first/last item
- Add animation on open/close
- Support multi-select mode

## Design Patterns to Learn

1. **Compound Components**: Components that work together sharing implicit state
2. **Context for Composition**: Using React Context for flexible APIs
3. **Children Manipulation**: Cloning children to inject props
4. **Controlled/Uncontrolled**: Supporting both patterns
5. **Keyboard Navigation**: Building accessible custom controls

## Real-World Usage

This pattern is used by:
- Radix UI Select
- Headless UI Listbox
- Reach UI Menu
- React Aria Select

The compound component pattern provides maximum flexibility while maintaining a clean API. Users can customize layout and styling without breaking functionality.

## Validation Tips

Test your implementation:
- Can open/close with mouse and keyboard
- Selected value displays correctly
- Keyboard navigation works (Arrow keys, Enter, Escape)
- Click outside closes menu
- Multiple selects on same page work independently
- Accessible with screen readers
