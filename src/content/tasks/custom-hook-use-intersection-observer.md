---
title: Custom Hook - useIntersectionObserver
description: Create a hook for lazy loading images and infinite scroll using Intersection Observer API
tags:
  - custom hooks
  - useEffect
  - useRef
  - performance
  - intersection-observer
difficulty: medium
timeEstimate: 30
learningGoals:
  - Use Intersection Observer API for performance optimization
  - Implement lazy loading with custom hooks
  - Build infinite scroll with automatic data fetching
  - Properly cleanup observers on unmount
  - Combine refs with callback refs for dynamic elements
hints:
  - IntersectionObserver watches when elements enter/exit viewport
  - Use useRef to store observer instance
  - Callback ref pattern allows observing dynamic elements
  - Disconnect observer in cleanup function
  - "Options: root, rootMargin, threshold control when callback fires"
starterCode: |
  import { useState, useEffect, useRef } from 'react';

  // TODO: Implement useIntersectionObserver hook
  function useIntersectionObserver(options = {}) {
    // TODO: Create observer with provided options
    // TODO: Return ref to attach to element and isIntersecting state
    // TODO: Clean up observer on unmount

    return {
      ref: null,
      isIntersecting: false,
    };
  }

  // Mock function to generate image URLs
  const getImageUrl = (id) =>
    `https://picsum.photos/seed/${id}/400/300`;

  // Lazy loaded image component
  function LazyImage({ id, alt }) {
    // TODO: Use useIntersectionObserver hook
    // TODO: Only load image when it enters viewport

    return (
      <div style={{ height: '300px', background: '#f0f0f0', margin: '10px 0' }}>
        {/* TODO: Show placeholder or image based on intersection */}
        <div style={{ padding: '20px' }}>Image {id} - Loading...</div>
      </div>
    );
  }

  // Infinite scroll hook
  function useInfiniteScroll(loadMore) {
    // TODO: Use useIntersectionObserver to detect when sentinel reaches viewport
    // TODO: Call loadMore when sentinel is visible

    return null; // Return sentinel ref
  }

  export default function App() {
    const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
    const [isLoading, setIsLoading] = useState(false);

    const loadMoreItems = () => {
      if (isLoading) return;

      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setItems((prev) => [
          ...prev,
          ...Array.from({ length: 5 }, (_, i) => prev.length + i + 1),
        ]);
        setIsLoading(false);
      }, 1000);
    };

    // TODO: Use useInfiniteScroll hook
    // const sentinelRef = useInfiniteScroll(loadMoreItems);

    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Lazy Loading & Infinite Scroll</h1>

        <div>
          {items.map((id) => (
            <LazyImage key={id} id={id} alt={`Image ${id}`} />
          ))}
        </div>

        {/* TODO: Add sentinel element for infinite scroll */}
        <div style={{ padding: '20px', textAlign: 'center' }}>
          {isLoading ? 'Loading more...' : 'Scroll for more'}
        </div>
      </div>
    );
  }
---

Create a `useIntersectionObserver` hook to build lazy loading images and infinite scroll functionality using the modern Intersection Observer API.

## Requirements

### useIntersectionObserver Hook
- Accept options object: `{ root, rootMargin, threshold }`
- Return `{ ref, isIntersecting }` where ref attaches to observed element
- Create IntersectionObserver instance
- Track when element enters/exits viewport
- Clean up observer on unmount
- Handle edge case: element might not exist initially

### Lazy Loading Images
- Only load images when they enter viewport
- Show placeholder while image is outside viewport
- Smoothly transition when image loads
- Implement LazyImage component using the hook
- Ensure images don't reload when scrolling back

### Infinite Scroll
- Create `useInfiniteScroll` hook built on top of `useIntersectionObserver`
- Detect when sentinel element reaches viewport
- Automatically call `loadMore` callback
- Prevent multiple simultaneous loads
- Add loading indicator at bottom

### Performance Considerations
- Use `rootMargin` to preload slightly before visible
- Disconnect observer after element loads (for images)
- Debounce rapid intersection changes (optional)

## Intersection Observer Options

```javascript
{
  root: null, // viewport
  rootMargin: '100px', // preload 100px before visible
  threshold: 0.1, // 10% visible triggers callback
}
```

## Bonus Challenges

- Add fade-in animation when images load
- Implement bidirectional infinite scroll (top and bottom)
- Add error handling for failed image loads
- Support observing multiple elements with one hook
- Create useInfiniteScrolling hook with hasMore flag

## Real-World Use Cases

- Image galleries and photo feeds
- Social media infinite scroll
- Progressive content loading
- Analytics (track element visibility)
- Ad impression tracking

## Testing Checklist

- [ ] Images only load when scrolled into view
- [ ] Infinite scroll loads more items at bottom
- [ ] No memory leaks from observers
- [ ] Smooth scrolling performance
- [ ] Observer cleanup on unmount works correctly
- [ ] Preloading with rootMargin works as expected
