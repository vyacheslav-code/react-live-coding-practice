---
title: Traffic Light
description: Build a traffic light that cycles through colors automatically with proper timing
tags:
  - useState
  - useEffect
  - intervals
  - state machine
difficulty: easy
timeEstimate: 20
learningGoals:
  - Implement state machine pattern
  - Use intervals with useEffect cleanup
  - Handle state transitions with timing
  - Build simple animation effects
hints:
  - "Light sequence: green → yellow → red → green"
  - Each color has different duration
  - Use setTimeout or setInterval with cleanup
  - Store current light in state
starterCode: |
  import { useState, useEffect } from 'react';

  // Light configuration: color and duration in ms
  const LIGHTS = {
    green: { color: '#22c55e', next: 'yellow', duration: 3000 },
    yellow: { color: '#eab308', next: 'red', duration: 1000 },
    red: { color: '#ef4444', next: 'green', duration: 2000 },
  };

  export default function App() {
    const [currentLight, setCurrentLight] = useState('red');
    const [isRunning, setIsRunning] = useState(true);

    // TODO: Effect to cycle through lights
    // useEffect(() => {
    //   if (!isRunning) return;
    //
    //   const timer = setTimeout(() => {
    //     setCurrentLight(LIGHTS[currentLight].next);
    //   }, LIGHTS[currentLight].duration);
    //
    //   return () => clearTimeout(timer);
    // }, [currentLight, isRunning]);

    return (
      <div style={{
        padding: '20px',
        fontFamily: 'system-ui',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h1>Traffic Light</h1>

        {/* Traffic Light Housing */}
        <div style={{
          background: '#1f2937',
          padding: '20px',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {/* Red Light */}
          <Light
            color={LIGHTS.red.color}
            isActive={currentLight === 'red'}
          />

          {/* Yellow Light */}
          <Light
            color={LIGHTS.yellow.color}
            isActive={currentLight === 'yellow'}
          />

          {/* Green Light */}
          <Light
            color={LIGHTS.green.color}
            isActive={currentLight === 'green'}
          />
        </div>

        {/* Controls */}
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              background: isRunning ? '#ef4444' : '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>

          <button
            onClick={() => setCurrentLight('red')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>

        {/* Status */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: '#f3f4f6',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <div style={{ fontWeight: 500 }}>
            Current: {currentLight.toUpperCase()}
          </div>
          <div style={{ color: '#6b7280', marginTop: '4px' }}>
            Duration: {LIGHTS[currentLight].duration}ms
          </div>
        </div>

        {/* Legend */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: '#f9fafb',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#6b7280',
        }}>
          <strong>Timing:</strong><br />
          Red: 2s → Green: 3s → Yellow: 1s → Red...
        </div>
      </div>
    );
  }

  function Light({ color, isActive }) {
    return (
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: isActive ? color : '#374151',
          boxShadow: isActive ? `0 0 30px ${color}` : 'none',
          transition: 'all 0.3s',
          border: '4px solid #4b5563',
        }}
      />
    );
  }
---

## Task

Build a traffic light that automatically cycles through red, yellow, and green with proper timing.

### Requirements

**Light Cycle:**
- Red (2 seconds) → Green (3 seconds) → Yellow (1 second) → Red...
- Automatic cycling using setTimeout/setInterval
- Proper cleanup on unmount

**Visual:**
- Three stacked circular lights
- Active light is colored, others are dim/gray
- Glow effect on active light
- Smooth transitions

**Controls:**
- Start/Stop button to pause cycling
- Reset button to return to red

### State Machine

```
States: red, yellow, green
Transitions:
  red    → green  (after 2000ms)
  green  → yellow (after 3000ms)
  yellow → red    (after 1000ms)
```

### Example Behavior

1. Page loads: red light active
2. After 2s: switches to green
3. After 3s: switches to yellow
4. After 1s: switches to red
5. Click Stop: light stays on current color
6. Click Start: cycling resumes
7. Click Reset: jumps to red

### Bonus Challenges

- Add pedestrian crossing button
- Add countdown display for each light
- Add different modes (normal, night flashing)
- Add intersection with multiple lights
- Add sound effects

### Testing Checklist

- [ ] Starts on red
- [ ] Cycles red → green → yellow → red
- [ ] Timing is correct for each light
- [ ] Stop pauses the cycle
- [ ] Start resumes from current light
- [ ] Reset returns to red
- [ ] No memory leaks (cleanup works)
