---
title: Batch DOM/CSS Updates
description: Group CSS changes via classes or cssText to minimize reflows
tags:
  - performance
  - javascript
  - DOM
  - CSS
difficulty: medium
timeEstimate: 30
learningGoals:
  - Understand browser reflow and repaint costs
  - Batch multiple style changes together
  - Use className or cssText for bulk updates
  - Measure DOM manipulation performance
hints:
  - Each style property change triggers reflow
  - Use cssText to set multiple styles at once
  - Toggle classes instead of individual styles
  - Read layout properties (offsetHeight) forces reflow
starterCode: |
  import { useRef, useState } from 'react';

  export default function App() {
    const boxRef = useRef(null);
    const [measurements, setMeasurements] = useState({ individual: null, batched: null });
    const [animating, setAnimating] = useState(false);

    // Slow approach: Individual style changes (triggers multiple reflows)
    const animateIndividual = () => {
      if (animating) return;
      setAnimating(true);
      const box = boxRef.current;

      const start = performance.now();

      // TODO: Each of these triggers a reflow - very slow!
      for (let i = 0; i < 100; i++) {
        box.style.width = `${100 + i}px`;
        box.style.height = `${100 + i}px`;
        box.style.backgroundColor = `hsl(${i * 3.6}, 70%, 50%)`;
        box.style.borderRadius = `${i / 2}px`;
        box.style.transform = `rotate(${i * 3.6}deg)`;
        // Reading layout property forces reflow
        const height = box.offsetHeight;
      }

      const duration = performance.now() - start;
      setMeasurements(prev => ({ ...prev, individual: duration.toFixed(2) }));

      // Reset
      setTimeout(() => {
        box.style.cssText = '';
        setAnimating(false);
      }, 100);
    };

    // Fast approach: Batched updates
    const animateBatched = () => {
      if (animating) return;
      setAnimating(true);
      const box = boxRef.current;

      const start = performance.now();

      // TODO: Use cssText to apply all styles at once
      for (let i = 0; i < 100; i++) {
        // Single reflow per iteration instead of 5
        box.style.cssText = `
          width: ${100 + i}px;
          height: ${100 + i}px;
          background-color: hsl(${i * 3.6}, 70%, 50%);
          border-radius: ${i / 2}px;
          transform: rotate(${i * 3.6}deg);
        `;
      }

      const duration = performance.now() - start;
      setMeasurements(prev => ({ ...prev, batched: duration.toFixed(2) }));

      // Reset
      setTimeout(() => {
        box.style.cssText = '';
        setAnimating(false);
      }, 100);
    };

    // Best approach: Use CSS classes
    const [useClass, setUseClass] = useState(false);
    const animateWithClass = () => {
      if (animating) return;
      setAnimating(true);

      const start = performance.now();

      // TODO: Toggle a CSS class instead of inline styles
      // This is the fastest - browser optimizes class changes
      setUseClass(true);

      const duration = performance.now() - start;
      setMeasurements(prev => ({ ...prev, class: duration.toFixed(2) }));

      setTimeout(() => {
        setUseClass(false);
        setAnimating(false);
      }, 1000);
    };

    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <style>{`
          .animated-box {
            width: 200px;
            height: 200px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50px;
            transform: rotate(360deg);
            transition: all 1s ease-in-out;
          }
        `}</style>

        <h1>Batch DOM Updates Performance</h1>

        <div style={{ marginBottom: '30px' }}>
          <button
            onClick={animateIndividual}
            disabled={animating}
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              cursor: animating ? 'not-allowed' : 'pointer',
              opacity: animating ? 0.5 : 1
            }}
          >
            Individual Updates (Slow)
          </button>

          <button
            onClick={animateBatched}
            disabled={animating}
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              cursor: animating ? 'not-allowed' : 'pointer',
              opacity: animating ? 0.5 : 1
            }}
          >
            Batched Updates (Fast)
          </button>

          <button
            onClick={animateWithClass}
            disabled={animating}
            style={{
              padding: '10px 20px',
              cursor: animating ? 'not-allowed' : 'pointer',
              opacity: animating ? 0.5 : 1
            }}
          >
            CSS Class (Fastest)
          </button>
        </div>

        <div
          ref={boxRef}
          className={useClass ? 'animated-box' : ''}
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#3b82f6',
            marginBottom: '20px',
            transition: 'none'
          }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
          <div style={{ padding: '15px', background: '#fee', borderRadius: '8px' }}>
            <h3>Individual Updates</h3>
            {measurements.individual ? (
              <>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>
                  {measurements.individual}ms
                </p>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  5 style changes × 100 = 500 reflows
                </p>
              </>
            ) : (
              <p>Click button to measure</p>
            )}
          </div>

          <div style={{ padding: '15px', background: '#fef3c7', borderRadius: '8px' }}>
            <h3>Batched cssText</h3>
            {measurements.batched ? (
              <>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#d97706' }}>
                  {measurements.batched}ms
                </p>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  1 cssText × 100 = 100 reflows
                </p>
              </>
            ) : (
              <p>Click button to measure</p>
            )}
          </div>

          <div style={{ padding: '15px', background: '#d1fae5', borderRadius: '8px' }}>
            <h3>CSS Class</h3>
            {measurements.class ? (
              <>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>
                  {measurements.class}ms
                </p>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  1 class toggle = 1 reflow
                </p>
              </>
            ) : (
              <p>Click button to measure</p>
            )}
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px' }}>
          <h3>Understanding Reflows</h3>
          {measurements.individual && measurements.batched && (
            <p>
              <strong>Speedup:</strong> Batched is {(measurements.individual / measurements.batched).toFixed(1)}x faster
            </p>
          )}
          <ul style={{ fontSize: '14px' }}>
            <li><strong>Reflow:</strong> Browser recalculates element positions/sizes (expensive)</li>
            <li><strong>Repaint:</strong> Browser redraws pixels (less expensive)</li>
            <li>Individual style changes trigger multiple reflows</li>
            <li>cssText applies all styles in one operation</li>
            <li>CSS classes are optimized by the browser</li>
            <li>Reading layout properties (offsetHeight, getComputedStyle) forces reflow</li>
          </ul>
        </div>
      </div>
    );
  }
---

Learn to optimize DOM manipulation by batching CSS changes to minimize expensive browser reflows and repaints.

## Requirements

- Implement individual style updates (baseline)
- Implement batched updates using cssText
- Implement CSS class-based approach
- Measure and display timing for each approach
- Show performance comparison with speedup calculation
- Demonstrate the impact of forced reflows

## Expected Behavior

**Individual Updates (Slowest):**
- Changes 5 style properties separately in loop
- Each change triggers browser reflow
- 500 total reflows for 100 iterations
- Noticeable lag and slowness

**Batched cssText (Faster):**
- Applies all 5 styles with single cssText assignment
- One reflow per iteration
- 100 total reflows for 100 iterations
- 3-5x faster than individual updates

**CSS Class (Fastest):**
- Single class toggle triggers one reflow
- Browser optimizes class-based changes
- Smooth animation with CSS transitions
- 5-10x faster than individual updates

## Learning Objectives

This exercise teaches DOM performance optimization through batching. You'll learn about browser reflows/repaints, how individual style changes impact performance, and best practices for efficient DOM manipulation.

## Reflow Triggers

**Properties that trigger reflow:**
- Width, height, padding, margin
- Display, position, float
- Font properties, text content
- Border, box-shadow

**Properties that only repaint:**
- Color, background-color
- Visibility, outline
- Box-shadow (without size change)

**Reading these forces reflow:**
- offsetHeight, offsetWidth
- clientHeight, clientWidth
- scrollHeight, scrollWidth
- getComputedStyle()

## Optimization Strategies

1. **Batch style changes** - use cssText or classes
2. **Cache layout values** - don't read in loops
3. **Use transforms** - doesn't trigger reflow
4. **DocumentFragment** - for adding multiple elements
5. **CSS classes** - let browser optimize
6. **requestAnimationFrame** - for smooth animations

## When to Use Each Method

- **cssText:** Temporary bulk style changes
- **Classes:** Predefined states and animations
- **Individual:** Single style change (acceptable)
- **Transform:** For animations (uses GPU)
