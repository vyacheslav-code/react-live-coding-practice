---
title: List Virtualization Basics
description: Implement basic virtualization for rendering large lists efficiently
tags:
  - performance
  - virtualization
  - scrolling
difficulty: hard
timeEstimate: 40
learningGoals:
  - Understand virtualization concept
  - Calculate visible items based on scroll
  - Implement windowing technique
  - Optimize large list rendering
hints:
  - Only render items in viewport
  - Track scroll position with onScroll
  - Calculate which items are visible
  - Use absolute positioning for items
starterCode: |
  import { useState, useRef } from 'react';

  const ITEM_HEIGHT = 50;
  const CONTAINER_HEIGHT = 400;
  const TOTAL_ITEMS = 10000;

  // Generate large dataset
  const items = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
    id: i,
    text: `Item ${i}`,
  }));

  export default function App() {
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef(null);

    // TODO: Calculate visible range
    const startIndex = 0; // Calculate based on scrollTop
    const endIndex = TOTAL_ITEMS; // Calculate based on scrollTop + containerHeight
    const visibleItems = items; // Slice to only visible items

    // TODO: Calculate offset for positioning
    const offsetY = 0;

    const handleScroll = (e) => {
      setScrollTop(e.target.scrollTop);
    };

    return (
      <div>
        <h1>Virtualized List</h1>
        <p>10,000 items - only visible ones are rendered</p>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          style={{
            height: CONTAINER_HEIGHT,
            overflow: 'auto',
            border: '1px solid #ccc',
            position: 'relative',
          }}
        >
          {/* TODO: Create scrollable area with correct height */}
          <div style={{ height: TOTAL_ITEMS * ITEM_HEIGHT }}>
            {/* TODO: Render only visible items with correct positioning */}
            <div style={{ transform: `translateY(${offsetY}px)` }}>
              {visibleItems.map(item => (
                <div
                  key={item.id}
                  style={{
                    height: ITEM_HEIGHT,
                    borderBottom: '1px solid #eee',
                    padding: '10px',
                  }}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p>Scroll position: {scrollTop}px</p>
        <p>Rendered items: {visibleItems.length} / {TOTAL_ITEMS}</p>
      </div>
    );
  }
---

Implement a virtualized list that can efficiently render thousands of items.

## Requirements

- Display list of 10,000 items
- Only render items visible in viewport
- Smooth scrolling experience
- Show scroll position and rendered item count
- Calculate visible range based on scroll position
- Use proper positioning to maintain scroll height

## Implementation Strategy

1. Calculate which items are visible based on scroll position
2. Only render those items in the DOM
3. Use absolute positioning to place items correctly
4. Maintain total height for scrollbar

## Calculations

```javascript
startIndex = Math.floor(scrollTop / ITEM_HEIGHT)
visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT)
endIndex = startIndex + visibleCount
```

## Learning Objectives

This exercise teaches virtualization, a critical performance technique for large lists. Instead of rendering all items, you only render what's visible. This dramatically improves performance and is used by libraries like react-window and react-virtualized.

## Performance Comparison

- Without virtualization: 10,000 DOM nodes, slow scrolling
- With virtualization: ~10 DOM nodes, smooth scrolling
