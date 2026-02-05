---
title: Toggle Switch Component
description: Build a styled toggle switch with smooth animation and accessibility
tags:
  - useState
  - CSS transitions
  - accessibility
  - controlled components
difficulty: easy
timeEstimate: 15
learningGoals:
  - Build controlled form components
  - Add CSS transitions for smooth animations
  - Implement keyboard accessibility
  - Use proper ARIA attributes
hints:
  - Use a button or div with role="switch"
  - CSS transform for knob position
  - aria-checked for screen readers
  - Handle both click and keyboard (Space/Enter)
starterCode: |
  import { useState } from 'react';

  export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    return (
      <div style={{
        padding: '20px',
        fontFamily: 'system-ui',
        background: darkMode ? '#1f2937' : '#fff',
        color: darkMode ? '#fff' : '#000',
        minHeight: '100vh',
        transition: 'all 0.3s',
      }}>
        <h1>Settings</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>Dark Mode</label>
            <Toggle checked={darkMode} onChange={setDarkMode} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>Notifications</label>
            <Toggle checked={notifications} onChange={setNotifications} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>Disabled Example</label>
            <Toggle checked={true} onChange={() => {}} disabled />
          </div>
        </div>

        <div style={{ marginTop: '24px', padding: '12px', background: darkMode ? '#374151' : '#f3f4f6', borderRadius: '8px' }}>
          <strong>Current state:</strong>
          <pre style={{ margin: '8px 0 0' }}>
            {JSON.stringify({ darkMode, notifications }, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  function Toggle({ checked, onChange, disabled = false }) {
    // TODO: Handle click/keyboard events
    const handleToggle = () => {
      if (!disabled) {
        onChange(!checked);
      }
    };

    return (
      <button
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        disabled={disabled}
        // TODO: Add onKeyDown for Space/Enter
        style={{
          width: '48px',
          height: '26px',
          borderRadius: '13px',
          border: 'none',
          padding: '2px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          // TODO: Change background based on checked state
          background: '#d1d5db',
          transition: 'background 0.2s',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {/* Knob */}
        <div
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            // TODO: Move knob right when checked (transform: translateX)
            transform: 'translateX(0px)',
            transition: 'transform 0.2s',
          }}
        />
      </button>
    );
  }
---

## Task

Build a reusable toggle switch component with smooth animations and full accessibility.

### Requirements

**Functionality:**
- Click to toggle on/off
- Controlled component (value + onChange)
- Disabled state support

**Styling:**
- Pill-shaped track (48x26px)
- Circular knob that slides
- Different colors for on/off states
- Smooth CSS transitions

**Accessibility:**
- role="switch" for screen readers
- aria-checked reflects state
- Keyboard support (Space, Enter)
- Focus visible state

### Visual States

| State | Track Color | Knob Position |
|-------|-------------|---------------|
| Off   | Gray (#d1d5db) | Left |
| On    | Blue (#3b82f6) | Right |
| Disabled | 50% opacity | Current |

### Example Behavior

1. Initial: toggle is off (gray, knob left)
2. Click: toggle turns on (blue, knob slides right)
3. Click again: toggle turns off
4. Tab to focus, press Space: toggles
5. Disabled toggle: shows state but can't interact

### Bonus Challenges

- Add label text inside track (ON/OFF)
- Add custom colors via props
- Add size variants (small, medium, large)
- Add loading state with spinner

### Testing Checklist

- [ ] Click toggles state
- [ ] Knob animates smoothly
- [ ] Colors change correctly
- [ ] Keyboard navigation works
- [ ] Disabled state prevents interaction
- [ ] Screen reader announces state
