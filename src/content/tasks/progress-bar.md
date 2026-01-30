---
title: Progress Bar Component
description: Build animated progress bars with different styles and states
tags:
  - useState
  - CSS transitions
  - UI components
  - accessibility
difficulty: easy
timeEstimate: 15
learningGoals:
  - Build percentage-based width calculations
  - Add smooth CSS transitions
  - Handle different visual states
  - Add proper ARIA attributes
hints:
  - "Use width percentage for fill: style={{ width: `${percent}%` }}"
  - CSS transition on width for smooth animation
  - "Accessibility: role=progressbar with aria-valuenow"
  - Clamp value between 0 and 100
starterCode: |
  import { useState, useEffect } from 'react';

  export default function App() {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Simulate file upload
    const simulateUpload = () => {
      setIsLoading(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return 100;
          }
          // Random increment for realistic feel
          return Math.min(prev + Math.random() * 15, 100);
        });
      }, 200);
    };

    return (
      <div style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '500px' }}>
        <h1>Progress Bars</h1>

        {/* Basic Progress Bar */}
        <section style={{ marginBottom: '32px' }}>
          <h2>Upload Progress</h2>
          <ProgressBar value={progress} />
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
            <button
              onClick={simulateUpload}
              disabled={isLoading}
              style={{
                padding: '8px 16px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? 'Uploading...' : 'Start Upload'}
            </button>
            <button
              onClick={() => setProgress(0)}
              style={{
                padding: '8px 16px',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          </div>
        </section>

        {/* Different States */}
        <section style={{ marginBottom: '32px' }}>
          <h2>Different States</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '14px', color: '#6b7280' }}>Default (45%)</label>
              <ProgressBar value={45} />
            </div>
            <div>
              <label style={{ fontSize: '14px', color: '#6b7280' }}>Success (100%)</label>
              <ProgressBar value={100} variant="success" />
            </div>
            <div>
              <label style={{ fontSize: '14px', color: '#6b7280' }}>Warning (75%)</label>
              <ProgressBar value={75} variant="warning" />
            </div>
            <div>
              <label style={{ fontSize: '14px', color: '#6b7280' }}>Error (30%)</label>
              <ProgressBar value={30} variant="error" />
            </div>
          </div>
        </section>

        {/* With Labels */}
        <section>
          <h2>With Labels</h2>
          <ProgressBar value={67} showLabel />
        </section>
      </div>
    );
  }

  function ProgressBar({ value, variant = 'default', showLabel = false }) {
    // TODO: Clamp value between 0 and 100
    const clampedValue = Math.max(0, Math.min(100, value));

    // TODO: Define colors for variants
    const colors = {
      default: '#3b82f6',
      success: '#22c55e',
      warning: '#eab308',
      error: '#ef4444',
    };

    const fillColor = colors[variant] || colors.default;

    return (
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          height: '20px',
          background: '#e5e7eb',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Fill */}
        <div
          style={{
            height: '100%',
            // TODO: Set width based on percentage
            width: '0%',
            background: fillColor,
            borderRadius: '10px',
            // TODO: Add transition for smooth animation
            // transition: 'width 0.3s ease',
          }}
        />

        {/* Label */}
        {showLabel && (
          <span
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '12px',
              fontWeight: 600,
              color: clampedValue > 50 ? 'white' : '#374151',
            }}
          >
            {Math.round(clampedValue)}%
          </span>
        )}
      </div>
    );
  }
---

## Task

Build a reusable progress bar component with smooth animations and different visual states.

### Requirements

**Core Functionality:**
- Display progress as percentage (0-100)
- Clamp value to valid range
- Smooth width transition animation

**Visual Variants:**
- Default (blue)
- Success (green)
- Warning (yellow)
- Error (red)

**Options:**
- Show/hide percentage label
- Different sizes (optional)

**Accessibility:**
- role="progressbar"
- aria-valuenow, aria-valuemin, aria-valuemax

### Styling

```css
/* Track */
background: #e5e7eb (gray)
height: 20px
border-radius: 10px

/* Fill */
width: {value}%
transition: width 0.3s ease
```

### Example Behavior

1. Initial: empty bar (0%)
2. Click upload: bar fills gradually
3. Smooth animation as percentage increases
4. Reaches 100%: shows green success state
5. Reset: bar empties

### Bonus Challenges

- Add indeterminate/loading animation
- Add striped pattern
- Add animated stripes (barber pole effect)
- Add size variants (small, medium, large)
- Add gradient fill
- Add buffer indicator (like YouTube video loading)

### Testing Checklist

- [ ] Width matches percentage
- [ ] Smooth animation on change
- [ ] Values clamped to 0-100
- [ ] Variants show correct colors
- [ ] Label displays correctly
- [ ] Screen reader announces progress
