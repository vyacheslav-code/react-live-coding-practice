---
title: Custom Hook - useMediaQuery
description: Build a responsive useMediaQuery hook with SSR support and multiple breakpoint handling
tags:
  - custom hooks
  - useEffect
  - useState
  - responsive
  - ssr
difficulty: medium
timeEstimate: 25
learningGoals:
  - Work with window.matchMedia API
  - Handle SSR safely (window undefined)
  - Implement event listeners with cleanup
  - Create responsive breakpoint system
  - Build composable hooks for responsive design
hints:
  - window.matchMedia returns MediaQueryList object
  - addEventListener with 'change' event for reactive updates
  - Handle SSR by checking if window exists
  - Clean up listeners in useEffect cleanup
  - Consider initial value before hydration
starterCode: |
  import { useState, useEffect } from 'react';

  // TODO: Implement useMediaQuery hook
  function useMediaQuery(query) {
    // TODO: Handle SSR (server-side rendering)
    // TODO: Use window.matchMedia
    // TODO: Set up change listener
    // TODO: Clean up listener on unmount

    return false;
  }

  // TODO: Create breakpoint hooks using useMediaQuery
  function useBreakpoint() {
    // TODO: Return object with isMobile, isTablet, isDesktop

    return {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    };
  }

  // Responsive component examples
  function Navigation() {
    // TODO: Use useBreakpoint to show different navigation

    return (
      <nav style={{ padding: '20px', background: '#333', color: 'white' }}>
        {/* TODO: Show hamburger menu on mobile, full nav on desktop */}
        <div>Navigation</div>
      </nav>
    );
  }

  function ResponsiveGrid() {
    // TODO: Use useBreakpoint to adjust grid columns

    const items = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
      <div
        style={{
          display: 'grid',
          gap: '10px',
          padding: '20px',
          gridTemplateColumns: 'repeat(1, 1fr)', // TODO: Make responsive
        }}
      >
        {items.map((item) => (
          <div
            key={item}
            style={{
              padding: '40px',
              background: '#f0f0f0',
              textAlign: 'center',
            }}
          >
            Item {item}
          </div>
        ))}
      </div>
    );
  }

  export default function App() {
    // TODO: Use useMediaQuery for custom queries
    // const isLargeScreen = useMediaQuery('(min-width: 1200px)');
    // const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    // const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

    // TODO: Use useBreakpoint
    // const { isMobile, isTablet, isDesktop } = useBreakpoint();

    return (
      <div style={{ fontFamily: 'sans-serif' }}>
        <h1 style={{ padding: '20px' }}>Responsive Design with useMediaQuery</h1>

        {/* TODO: Show current breakpoint info */}
        <div style={{ padding: '20px', background: '#e3f2fd' }}>
          <h2>Current Breakpoint:</h2>
          <p>Resize browser to test responsiveness</p>
        </div>

        <Navigation />
        <ResponsiveGrid />

        <div style={{ padding: '20px', background: '#f5f5f5' }}>
          <h2>System Preferences:</h2>
          {/* TODO: Show user preferences (dark mode, reduced motion) */}
        </div>
      </div>
    );
  }
---

Build a production-ready `useMediaQuery` hook that safely handles responsive design, including SSR compatibility and system preference detection.

## Requirements

### Core useMediaQuery Hook
- Accept CSS media query string as parameter
- Return boolean indicating if query matches
- Use `window.matchMedia()` API
- React to media query changes in real-time
- Clean up event listeners properly

### SSR Safety
- Check if `window` exists before accessing
- Provide sensible default for server-side rendering
- No hydration mismatches
- Handle initial render before media query evaluates

### Event Listeners
- Listen to MediaQueryList 'change' events
- Update state when media query match changes
- Remove listeners on unmount
- Handle rapid resize events efficiently

### useBreakpoint Utility
- Build on top of useMediaQuery
- Return `{ isMobile, isTablet, isDesktop }`
- Standard breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### Responsive UI Examples
- Navigation: hamburger on mobile, full nav on desktop
- Grid: 1 column mobile, 2 tablet, 3-4 desktop
- Show/hide elements based on screen size
- Detect system preferences (dark mode, reduced motion)

## Media Query Examples

```javascript
// Screen size
useMediaQuery('(min-width: 768px)')
useMediaQuery('(max-width: 1024px)')

// Orientation
useMediaQuery('(orientation: portrait)')

// System preferences
useMediaQuery('(prefers-color-scheme: dark)')
useMediaQuery('(prefers-reduced-motion: reduce)')

// Device features
useMediaQuery('(hover: hover)') // supports hover
```

## SSR Considerations

```javascript
// Bad - crashes on server
const matches = window.matchMedia(query).matches;

// Good - checks for window
const matches = typeof window !== 'undefined'
  ? window.matchMedia(query).matches
  : false;
```

## Bonus Challenges

- Add debounce to prevent excessive re-renders on resize
- Support multiple queries with single hook call
- Create useOrientation hook (portrait/landscape)
- Cache MediaQueryList instances for performance
- Add TypeScript types for common breakpoints

## Real-World Use Cases

- Responsive navigation (hamburger vs full menu)
- Adaptive grid layouts
- Show/hide content based on screen size
- Respect user accessibility preferences
- Device-specific features (touch vs mouse)

## Testing Checklist

- [ ] Hook updates when window resizes
- [ ] No errors on server-side render
- [ ] Event listeners clean up on unmount
- [ ] Breakpoint hooks work correctly
- [ ] System preferences detected (dark mode, etc.)
- [ ] Multiple hooks can coexist without conflicts
- [ ] Performance is good during rapid resizing
