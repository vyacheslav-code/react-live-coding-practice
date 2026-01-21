---
title: Infinite Scroll List
description: Implement infinite scrolling that loads more items as user scrolls down
tags:
  - UI
  - scrolling
  - performance
  - intersection observer
difficulty: medium
timeEstimate: 30
learningGoals:
  - Use Intersection Observer API
  - Implement infinite scroll pattern
  - Handle loading states
  - Optimize scroll performance
hints:
  - Use IntersectionObserver to detect sentinel element
  - Load more items when sentinel visible
  - Show loading indicator
  - Track current page/offset
starterCode: |
  import { useState, useEffect, useRef } from 'react';

  const ITEMS_PER_PAGE = 20;

  // Generate mock data
  const generateItems = (page) => {
    return Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({
      id: page * ITEMS_PER_PAGE + i,
      title: `Item ${page * ITEMS_PER_PAGE + i + 1}`,
      description: `Description for item ${page * ITEMS_PER_PAGE + i + 1}`,
    }));
  };

  export default function App() {
    const [items, setItems] = useState(generateItems(0));
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const sentinelRef = useRef(null);

    // TODO: Set up Intersection Observer
    useEffect(() => {
      // Create observer that triggers when sentinel is visible
      // Load more items when triggered
    }, [page]);

    const loadMore = () => {
      if (loading || !hasMore) return;

      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        const nextPage = page + 1;
        const newItems = generateItems(nextPage);

        setItems(prev => [...prev, ...newItems]);
        setPage(nextPage);
        setLoading(false);

        // Stop after 5 pages for demo
        if (nextPage >= 5) {
          setHasMore(false);
        }
      }, 1000);
    };

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>Infinite Scroll Demo</h1>
        <p>Scroll down to load more items</p>

        <div>
          {items.map(item => (
            <div
              key={item.id}
              style={{
                padding: '20px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Sentinel element to detect when to load more */}
        <div ref={sentinelRef} style={{ height: '20px' }} />

        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            Loading more items...
          </div>
        )}

        {!hasMore && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            No more items to load
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Loaded {items.length} items
        </div>
      </div>
    );
  }
---

Build an infinite scroll list that automatically loads more content as the user scrolls down.

## Requirements

- Display list of items
- Load more items when user scrolls near bottom
- Show loading indicator while fetching
- Use Intersection Observer API
- Prevent duplicate loads
- Show "no more items" when done
- Smooth user experience

## Implementation Strategy

1. Create sentinel element at bottom of list
2. Use IntersectionObserver to watch sentinel
3. When sentinel becomes visible, load more items
4. Append new items to existing list
5. Show loading state during fetch

## Intersection Observer Setup

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  },
  { threshold: 1.0 }
);
```

## Learning Objectives

This exercise teaches the infinite scroll pattern using modern browser APIs. You'll learn the Intersection Observer API, how to handle asynchronous data loading, and how to create smooth scrolling experiences without performance issues.

## Benefits Over Scroll Events

- Better performance (no scroll event throttling needed)
- Built-in viewport detection
- Cleaner code
- Better battery life on mobile
