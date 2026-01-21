---
title: Lazy Load Components
description: Use React.lazy and Suspense to code-split and lazy load components
tags:
  - performance
  - lazy loading
  - code splitting
  - Suspense
difficulty: medium
timeEstimate: 25
learningGoals:
  - Understand code splitting benefits
  - Use React.lazy for dynamic imports
  - Implement Suspense boundaries
  - Handle loading states
hints:
  - Use React.lazy for component imports
  - Wrap lazy components with Suspense
  - Provide fallback UI
  - Lazy load heavy components
starterCode: |
  import { lazy, Suspense, useState } from 'react';

  // TODO: Lazy load these components
  // import HeavyChart from './HeavyChart';
  // import HeavyTable from './HeavyTable';
  // import HeavyMap from './HeavyMap';

  // Simulated heavy components
  function HeavyChart() {
    return (
      <div style={{ padding: '20px', border: '2px solid blue' }}>
        <h3>Heavy Chart Component</h3>
        <p>Imagine this is a large charting library...</p>
        <div style={{ height: '200px', background: '#e3f2fd' }}>
          Chart visualization here
        </div>
      </div>
    );
  }

  function HeavyTable() {
    return (
      <div style={{ padding: '20px', border: '2px solid green' }}>
        <h3>Heavy Table Component</h3>
        <p>Imagine this is a complex data table...</p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => (
              <tr key={i}>
                <td>Data {i}-1</td>
                <td>Data {i}-2</td>
                <td>Data {i}-3</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function HeavyMap() {
    return (
      <div style={{ padding: '20px', border: '2px solid red' }}>
        <h3>Heavy Map Component</h3>
        <p>Imagine this is a mapping library like Mapbox...</p>
        <div style={{ height: '300px', background: '#ffe0b2' }}>
          Map visualization here
        </div>
      </div>
    );
  }

  export default function App() {
    const [activeTab, setActiveTab] = useState('home');

    return (
      <div>
        <h1>Dashboard with Lazy Loading</h1>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => setActiveTab('home')}>Home</button>
          <button onClick={() => setActiveTab('chart')}>Chart</button>
          <button onClick={() => setActiveTab('table')}>Table</button>
          <button onClick={() => setActiveTab('map')}>Map</button>
        </div>

        {/* TODO: Add Suspense wrapper with fallback */}
        <div>
          {activeTab === 'home' && (
            <div>
              <h2>Welcome to Dashboard</h2>
              <p>Select a tab to load heavy components</p>
              <p>Open Network tab to see lazy loading in action</p>
            </div>
          )}

          {activeTab === 'chart' && <HeavyChart />}
          {activeTab === 'table' && <HeavyTable />}
          {activeTab === 'map' && <HeavyMap />}
        </div>
      </div>
    );
  }
---

Implement code splitting and lazy loading to improve initial load time.

## Requirements

- Create tabs to switch between different views
- Lazy load heavy components using React.lazy
- Wrap lazy components with Suspense
- Show loading fallback while component loads
- Components should only load when their tab is clicked
- Home tab loads immediately

## Expected Behavior

- Initial page load only includes Home content
- Clicking "Chart" dynamically imports and displays chart component
- Browser shows additional bundle loading in network tab
- Loading indicator appears briefly while component loads

## Learning Objectives

This exercise teaches code splitting with React.lazy and Suspense. Instead of bundling all code upfront, you split it into chunks that load on demand. This dramatically improves initial load time for large applications.

## Benefits of Code Splitting

- Faster initial page load
- Smaller initial bundle size
- Components load only when needed
- Better user experience

## Pattern

```javascript
const LazyComponent = lazy(() => import('./Component'));

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```
