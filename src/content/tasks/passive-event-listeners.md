---
title: Passive Event Listeners
description: Use passive event listeners for scroll and touch events to improve performance
tags:
  - performance
  - events
  - scroll
  - touch
  - optimization
difficulty: medium
timeEstimate: 25
learningGoals:
  - Understand passive event listeners concept
  - Improve scroll performance
  - Prevent Chrome warning messages
  - Use addEventListener with options
  - Handle touch events efficiently
hints:
  - "Use addEventListener directly, not React's onClick"
  - "Pass { passive: true } as third argument"
  - Passive listeners cannot call preventDefault()
  - Use useEffect for adding/removing listeners
  - Check Chrome DevTools for violation warnings
starterCode: |
  import { useState, useEffect, useRef } from 'react';

  function ScrollTracker() {
    const [scrollY, setScrollY] = useState(0);
    const [velocity, setVelocity] = useState(0);
    const lastScrollY = useRef(0);
    const lastTimestamp = useRef(Date.now());

    useEffect(() => {
      // TODO: Add passive scroll listener
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const currentTime = Date.now();
        const timeDiff = currentTime - lastTimestamp.current;
        const scrollDiff = currentScrollY - lastScrollY.current;

        setScrollY(currentScrollY);
        setVelocity(Math.abs(scrollDiff / timeDiff).toFixed(2));

        lastScrollY.current = currentScrollY;
        lastTimestamp.current = currentTime;
      };

      // TODO: Use addEventListener with passive: true option
      // window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        // TODO: Clean up listener
      };
    }, []);

    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '15px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        borderRadius: '8px',
        fontSize: '14px',
        zIndex: 1000
      }}>
        <div>Scroll Position: {Math.round(scrollY)}px</div>
        <div>Velocity: {velocity}px/ms</div>
      </div>
    );
  }

  function TouchGestureArea() {
    const [touchInfo, setTouchInfo] = useState({ x: 0, y: 0, touches: 0 });
    const [gesture, setGesture] = useState('');
    const touchAreaRef = useRef(null);
    const startPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
      const element = touchAreaRef.current;
      if (!element) return;

      // TODO: Add passive touch listeners
      const handleTouchStart = (e) => {
        const touch = e.touches[0];
        startPos.current = { x: touch.clientX, y: touch.clientY };
        setTouchInfo({
          x: touch.clientX,
          y: touch.clientY,
          touches: e.touches.length
        });
      };

      const handleTouchMove = (e) => {
        const touch = e.touches[0];
        const deltaX = touch.clientX - startPos.current.x;
        const deltaY = touch.clientY - startPos.current.y;

        // Detect gesture
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          setGesture(deltaX > 0 ? 'Swipe Right' : 'Swipe Left');
        } else {
          setGesture(deltaY > 0 ? 'Swipe Down' : 'Swipe Up');
        }

        setTouchInfo({
          x: touch.clientX,
          y: touch.clientY,
          touches: e.touches.length
        });
      };

      const handleTouchEnd = () => {
        setGesture('');
      };

      // TODO: Add listeners with passive: true
      // element.addEventListener('touchstart', handleTouchStart, { passive: true });
      // element.addEventListener('touchmove', handleTouchMove, { passive: true });
      // element.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        // TODO: Remove listeners
      };
    }, []);

    return (
      <div
        ref={touchAreaRef}
        style={{
          width: '100%',
          height: '300px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          userSelect: 'none',
          touchAction: 'none'
        }}
      >
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>
          {gesture || 'Touch and Swipe Here'}
        </div>
        <div>Touch X: {Math.round(touchInfo.x)}</div>
        <div>Touch Y: {Math.round(touchInfo.y)}</div>
        <div>Active Touches: {touchInfo.touches}</div>
      </div>
    );
  }

  function WheelZoomArea() {
    const [scale, setScale] = useState(1);
    const wheelAreaRef = useRef(null);

    useEffect(() => {
      const element = wheelAreaRef.current;
      if (!element) return;

      // TODO: Add passive wheel listener
      const handleWheel = (e) => {
        // Note: We can't preventDefault() with passive listener
        // This is intentional - we're just tracking, not blocking
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));
      };

      // TODO: Add listener with passive: true
      // element.addEventListener('wheel', handleWheel, { passive: true });

      return () => {
        // TODO: Remove listener
      };
    }, []);

    return (
      <div
        ref={wheelAreaRef}
        style={{
          width: '100%',
          height: '250px',
          background: '#f0f0f0',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          border: '2px solid #ddd'
        }}
      >
        <div style={{
          transform: `scale(${scale})`,
          transition: 'transform 0.1s ease-out',
          padding: '20px',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3>Scroll wheel to zoom</h3>
          <p>Scale: {scale.toFixed(2)}x</p>
        </div>
      </div>
    );
  }

  export default function App() {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Passive Event Listeners</h1>

        <ScrollTracker />

        <div style={{
          padding: '15px',
          background: '#fff3cd',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #ffc107'
        }}>
          <strong>Performance Tip:</strong> Passive listeners improve scroll/touch
          performance by telling the browser we won't call preventDefault().
          Check DevTools console for violation warnings!
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2>Touch Gestures</h2>
          <TouchGestureArea />
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
            Works best on touch devices. Use mouse to simulate on desktop.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2>Wheel Zoom</h2>
          <WheelZoomArea />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2>Scroll Test Area</h2>
          <div style={{
            height: '400px',
            background: 'linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px'
          }}>
            Scroll down to see tracker update
          </div>
        </div>

        {/* Extra content for scrolling */}
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            style={{
              height: '300px',
              background: i % 2 === 0 ? '#f9f9f9' : '#fff',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              color: '#ccc'
            }}
          >
            Section {i}
          </div>
        ))}

        <div style={{
          padding: '15px',
          background: '#f5f5f5',
          borderRadius: '8px',
          marginTop: '30px'
        }}>
          <h3>What are Passive Listeners?</h3>
          <ul>
            <li>Tell browser you won't call preventDefault()</li>
            <li>Browser can optimize scrolling performance</li>
            <li>Required for touch/wheel events in Chrome</li>
            <li>Prevents "violation" warnings in console</li>
            <li>Critical for smooth 60fps scrolling</li>
          </ul>
        </div>
      </div>
    );
  }
---

Implement passive event listeners for scroll, touch, and wheel events to improve performance and eliminate Chrome violation warnings.

## Requirements

- Add passive scroll listener to track scroll position
- Implement passive touch listeners for gesture detection
- Add passive wheel listener for zoom interaction
- Use addEventListener directly (not React synthetic events)
- Pass { passive: true } as options parameter
- Properly clean up listeners in useEffect
- Display real-time event data
- Check DevTools console for no violation warnings

## Why Passive Listeners Matter

When you attach scroll/touch event listeners, the browser must wait to see if you'll call `preventDefault()` before it can scroll. This creates a delay that makes scrolling feel janky.

Passive listeners tell the browser: "I promise I won't call preventDefault(), so scroll immediately!"

## The Problem Without Passive

```javascript
// BAD - Blocks scrolling
element.addEventListener('touchstart', handler);
// Chrome warning: "Unable to preventDefault inside passive event listener"
```

## The Solution With Passive

```javascript
// GOOD - Non-blocking
element.addEventListener('touchstart', handler, { passive: true });
// No warning, smooth 60fps scrolling
```

## Event Types That Need Passive

- `scroll` - Track scroll position
- `touchstart` - Detect touch beginning
- `touchmove` - Track touch movement
- `touchend` - Detect touch ending
- `wheel` - Mouse wheel events
- `mousewheel` - Legacy wheel events

## Implementation Pattern

```javascript
useEffect(() => {
  const element = ref.current;

  const handler = (e) => {
    // Handle event
    // Cannot call e.preventDefault() here!
  };

  element.addEventListener('scroll', handler, { passive: true });

  return () => {
    element.removeEventListener('scroll', handler, { passive: true });
  };
}, []);
```

## When NOT to Use Passive

Don't use passive when you need to prevent default behavior:
- Form validation (need to block submit)
- Custom drag and drop (need to prevent browser drag)
- Two-finger zoom prevention (need to block pinch)

## Testing Your Implementation

1. Open Chrome DevTools Console
2. Look for violation warnings (should be none)
3. Test scroll smoothness (should be 60fps)
4. Try touch gestures on mobile device
5. Check Performance tab - no forced reflow

## Browser Support

Passive listeners are supported in:
- Chrome 51+
- Firefox 49+
- Safari 10+
- Edge 79+

For older browsers, feature detect:

```javascript
let passiveSupported = false;
try {
  const options = {
    get passive() {
      passiveSupported = true;
      return false;
    }
  };
  window.addEventListener('test', null, options);
} catch(err) {}

const opts = passiveSupported ? { passive: true } : false;
element.addEventListener('scroll', handler, opts);
```

## Performance Impact

- Without passive: 16ms+ latency on scroll
- With passive: <1ms latency on scroll
- Result: Smooth 60fps vs janky 30fps

## Learning Objectives

Understand browser event handling performance implications. Learn when and how to use passive listeners. Eliminate common performance bottlenecks in React apps. Master addEventListener options for optimal UX.

## Real-World Use Cases

- Infinite scroll containers
- Touch-based games and interfaces
- Parallax scrolling effects
- Mobile swipe gestures
- Scroll-triggered animations
