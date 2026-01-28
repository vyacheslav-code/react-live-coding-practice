---
title: CSS content-visibility for Long Lists
description: Use CSS content-visibility to optimize rendering of long lists
tags:
  - performance
  - CSS
  - rendering
difficulty: medium
timeEstimate: 25
learningGoals:
  - Understand content-visibility CSS property
  - Optimize off-screen content rendering
  - Measure rendering performance improvements
  - Use contain-intrinsic-size for scrollbar accuracy
hints:
  - Apply content-visibility: auto to list items
  - Use contain-intrinsic-size to estimate item height
  - Browser skips rendering off-screen items
  - Works best with consistent item heights
starterCode: |
  import { useState } from 'react';

  // Generate large dataset
  const items = Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    title: `Item ${i}`,
    description: `This is the description for item ${i}. It contains some text to make the item take up space.`,
    timestamp: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }));

  export default function App() {
    const [filter, setFilter] = useState('');
    const [useOptimization, setUseOptimization] = useState(false);

    const filteredItems = items.filter(item =>
      item.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Long List Optimization</h1>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter items..."
            style={{ padding: '8px', width: '300px' }}
          />

          <label style={{ marginLeft: '20px' }}>
            <input
              type="checkbox"
              checked={useOptimization}
              onChange={(e) => setUseOptimization(e.target.checked)}
            />
            {' '}Enable content-visibility optimization
          </label>
        </div>

        <p>Showing {filteredItems.length} items</p>
        <p>Try scrolling and toggling optimization on/off</p>

        <div
          style={{
            height: '600px',
            overflow: 'auto',
            border: '1px solid #ccc',
          }}
        >
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={useOptimization ? 'optimized-item' : 'standard-item'}
              style={{
                padding: '20px',
                borderBottom: '1px solid #eee',
                // TODO: Add content-visibility styles when optimization enabled
              }}
            >
              <h3 style={{ margin: '0 0 8px 0' }}>{item.title}</h3>
              <p style={{ margin: '0 0 8px 0', color: '#666' }}>
                {item.description}
              </p>
              <small style={{ color: '#999' }}>{item.timestamp}</small>
            </div>
          ))}
        </div>

        {/* TODO: Add CSS styles for .optimized-item with content-visibility */}
        <style>{`
          /* Add optimization styles here */
        `}</style>
      </div>
    );
  }
---

Learn to optimize long list rendering using the CSS content-visibility property.

## Requirements

- Apply `content-visibility: auto` to list items when optimization is enabled
- Use `contain-intrinsic-size` to provide estimated item height
- Toggle optimization on/off to see the difference
- Items should render normally when scrolled into view
- Scrollbar should remain accurate with intrinsic size hints

## Implementation Steps

1. Add CSS with `content-visibility: auto` to optimized items
2. Set `contain-intrinsic-size` to approximate item height (e.g., 120px)
3. Verify smooth scrolling with optimization enabled
4. Compare scroll performance with optimization on vs off

## Expected Behavior

**Without optimization:**
- Browser renders all 5000 items immediately
- Slower initial render and scroll performance
- More memory usage

**With optimization:**
- Browser defers rendering off-screen items
- Faster initial render and scrolling
- Reduced memory usage
- Items render just-in-time when scrolled into view

## Visual Example

```
┌─────────────────────────────┐
│ [Filter input] [✓] Optimize│
├─────────────────────────────┤
│ Viewport                    │
│ ┌─────────────────────────┐ │
│ │ Item 10 (rendered)      │ │
│ │ Item 11 (rendered)      │ │
│ │ Item 12 (rendered)      │ │ <- Visible items
│ └─────────────────────────┘ │
│ [Items 13-5000 skipped]     │ <- Not rendered yet
└─────────────────────────────┘
```

## Learning Objectives

This exercise teaches CSS `content-visibility`, a modern browser optimization that skips rendering off-screen content. Unlike virtualization (JavaScript-based), this is a pure CSS solution that works automatically with the browser's rendering engine.

## When to Use content-visibility

- Long lists or feeds with many items
- Content-heavy pages with off-screen sections
- When you want optimization without complex JavaScript
- Items have relatively consistent heights

## Browser Support

`content-visibility` is supported in Chrome, Edge, and Opera. Falls back gracefully in other browsers (no optimization, but still works).

## Key Properties

- **content-visibility: auto** - Skip rendering off-screen content
- **contain-intrinsic-size** - Estimate size for accurate scrollbar
- **content-visibility: hidden** - Completely skip rendering (like display: none but faster to toggle)
