---
title: Dynamic Imports and Code Splitting
description: Use React.lazy and dynamic imports to split heavy components into separate chunks loaded on demand
tags:
  - bundle-optimization
  - code-splitting
  - react-lazy
  - suspense
  - dynamic-import
difficulty: medium
timeEstimate: 30
learningGoals:
  - Implement React.lazy for component-level code splitting
  - Use dynamic import() for on-demand module loading
  - Measure chunk sizes and loading performance
  - Implement intelligent preloading strategies
  - Handle loading states with Suspense boundaries
hints:
  - React.lazy only works with default exports
  - Suspense provides fallback UI during loading
  - Dynamic imports return promises that resolve to modules
  - Webpack creates separate chunks for dynamic imports
  - Use import() inside event handlers for on-demand loading
starterCode: |
  import { useState, Suspense, lazy } from 'react';

  // Heavy component libraries (normally would be separate files)
  const ChartLibrary = {
    LineChart: ({ data }) => (
      <div style={{ padding: '20px', border: '2px solid #2196F3', borderRadius: '8px' }}>
        <h3>Line Chart (Heavy: ~150 KB)</h3>
        <svg width="400" height="200" style={{ border: '1px solid #ddd' }}>
          {data.map((point, i) => (
            <circle
              key={i}
              cx={40 + i * 40}
              cy={180 - point * 1.5}
              r="4"
              fill="#2196F3"
            />
          ))}
          {data.map((point, i) => {
            if (i === data.length - 1) return null;
            return (
              <line
                key={i}
                x1={40 + i * 40}
                y1={180 - point * 1.5}
                x2={40 + (i + 1) * 40}
                y2={180 - data[i + 1] * 1.5}
                stroke="#2196F3"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Includes: D3, Chart.js, Complex rendering engine
        </div>
      </div>
    ),

    BarChart: ({ data }) => (
      <div style={{ padding: '20px', border: '2px solid #4CAF50', borderRadius: '8px' }}>
        <h3>Bar Chart (Heavy: ~120 KB)</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '10px' }}>
          {data.map((value, i) => (
            <div
              key={i}
              style={{
                width: '40px',
                height: `${value}%`,
                background: '#4CAF50',
                borderRadius: '4px 4px 0 0'
              }}
            />
          ))}
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Includes: Charting engine, Animation library
        </div>
      </div>
    )
  };

  const MapLibrary = {
    InteractiveMap: () => (
      <div style={{ padding: '20px', border: '2px solid #FF9800', borderRadius: '8px' }}>
        <h3>Interactive Map (Heavy: ~300 KB)</h3>
        <div style={{
          width: '100%',
          height: '300px',
          background: '#e0f2f1',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div style={{ fontSize: '48px' }}>🗺️</div>
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            fontSize: '12px',
            color: '#666'
          }}>
            Includes: Leaflet, Mapbox GL, Geo libraries
          </div>
        </div>
      </div>
    )
  };

  const EditorLibrary = {
    RichTextEditor: () => (
      <div style={{ padding: '20px', border: '2px solid #9C27B0', borderRadius: '8px' }}>
        <h3>Rich Text Editor (Heavy: ~250 KB)</h3>
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '10px',
          minHeight: '200px',
          background: 'white'
        }}>
          <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '10px' }}>
            <button style={{ padding: '5px 10px', marginRight: '5px' }}>B</button>
            <button style={{ padding: '5px 10px', marginRight: '5px' }}>I</button>
            <button style={{ padding: '5px 10px', marginRight: '5px' }}>U</button>
          </div>
          <div contentEditable style={{ minHeight: '150px' }}>
            Start typing...
          </div>
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Includes: Draft.js, Prosemirror, Quill
        </div>
      </div>
    )
  };

  export default function App() {
    const [loadedComponents, setLoadedComponents] = useState({
      charts: false,
      map: false,
      editor: false
    });

    const [activeView, setActiveView] = useState(null);
    const [chunkSizes, setChunkSizes] = useState({
      initial: 50, // KB
      charts: 270,
      map: 300,
      editor: 250
    });

    // TODO: Implement React.lazy for code splitting
    // Split heavy components into separate chunks

    // TODO: Implement dynamic loading on button click
    // Load components only when user requests them

    // TODO: Track loading progress and chunk sizes
    // Show which chunks are loaded and their sizes

    const loadComponent = async (componentType) => {
      // TODO: Dynamically import the component
      // Simulate loading time
      // Update loaded components state

      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoadedComponents(prev => ({ ...prev, [componentType]: true }));
      setActiveView(componentType);
    };

    const totalBundleSize = chunkSizes.initial +
      (loadedComponents.charts ? chunkSizes.charts : 0) +
      (loadedComponents.map ? chunkSizes.map : 0) +
      (loadedComponents.editor ? chunkSizes.editor : 0);

    const potentialBundleSize = chunkSizes.initial +
      chunkSizes.charts +
      chunkSizes.map +
      chunkSizes.editor;

    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <h1>Dynamic Imports & Code Splitting</h1>

        <div style={{
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h3 style={{ marginTop: 0 }}>Bundle Size Status</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px',
            marginBottom: '15px'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: '#666' }}>Initial Bundle</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {chunkSizes.initial} KB
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#666' }}>Currently Loaded</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>
                {totalBundleSize} KB
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#666' }}>Without Splitting</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f44336' }}>
                {potentialBundleSize} KB
              </div>
            </div>
          </div>

          <div style={{
            padding: '15px',
            background: '#e8f5e9',
            borderRadius: '4px'
          }}>
            <strong>Savings:</strong>{' '}
            {potentialBundleSize - totalBundleSize} KB (
            {((1 - totalBundleSize / potentialBundleSize) * 100).toFixed(0)}% reduction)
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '15px',
          marginBottom: '30px'
        }}>
          <button
            onClick={() => loadComponent('charts')}
            disabled={loadedComponents.charts}
            style={{
              padding: '20px',
              border: '2px solid #2196F3',
              borderRadius: '8px',
              background: loadedComponents.charts ? '#e3f2fd' : 'white',
              cursor: loadedComponents.charts ? 'default' : 'pointer',
              opacity: loadedComponents.charts ? 0.6 : 1
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>📊</div>
            <div style={{ fontWeight: 'bold' }}>Charts</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              {loadedComponents.charts ? '✅ Loaded' : '270 KB'}
            </div>
          </button>

          <button
            onClick={() => loadComponent('map')}
            disabled={loadedComponents.map}
            style={{
              padding: '20px',
              border: '2px solid #FF9800',
              borderRadius: '8px',
              background: loadedComponents.map ? '#fff3e0' : 'white',
              cursor: loadedComponents.map ? 'default' : 'pointer',
              opacity: loadedComponents.map ? 0.6 : 1
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🗺️</div>
            <div style={{ fontWeight: 'bold' }}>Map</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              {loadedComponents.map ? '✅ Loaded' : '300 KB'}
            </div>
          </button>

          <button
            onClick={() => loadComponent('editor')}
            disabled={loadedComponents.editor}
            style={{
              padding: '20px',
              border: '2px solid #9C27B0',
              borderRadius: '8px',
              background: loadedComponents.editor ? '#f3e5f5' : 'white',
              cursor: loadedComponents.editor ? 'default' : 'pointer',
              opacity: loadedComponents.editor ? 0.6 : 1
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>✏️</div>
            <div style={{ fontWeight: 'bold' }}>Editor</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              {loadedComponents.editor ? '✅ Loaded' : '250 KB'}
            </div>
          </button>
        </div>

        {activeView && (
          <div style={{
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            {/* TODO: Render lazy-loaded components with Suspense */}
            <Suspense fallback={
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
                <div>Loading component chunk...</div>
              </div>
            }>
              {activeView === 'charts' && (
                <div>
                  <ChartLibrary.LineChart data={[20, 45, 30, 60, 40, 80, 65]} />
                  <div style={{ marginTop: '20px' }}>
                    <ChartLibrary.BarChart data={[60, 40, 70, 50, 80, 45]} />
                  </div>
                </div>
              )}
              {activeView === 'map' && <MapLibrary.InteractiveMap />}
              {activeView === 'editor' && <EditorLibrary.RichTextEditor />}
            </Suspense>
          </div>
        )}

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#fff3cd',
          borderRadius: '8px'
        }}>
          <h3 style={{ marginTop: 0 }}>How Code Splitting Works</h3>
          <ol style={{ lineHeight: '1.8' }}>
            <li>Heavy components are wrapped in React.lazy()</li>
            <li>Bundler creates separate chunks for each lazy component</li>
            <li>Initial bundle only includes core application code</li>
            <li>Chunks load on-demand when component is rendered</li>
            <li>Suspense provides loading fallback during chunk fetch</li>
          </ol>
        </div>

        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <strong>Tip:</strong> Only split components that are large (50+ KB) or rarely used
        </div>
      </div>
    );
  }
---

## Task

Implement code splitting using React.lazy and dynamic imports to reduce initial bundle size. Load heavy components on-demand and measure the performance impact.

### Requirements

1. **React.lazy Implementation**
   - Wrap heavy components in React.lazy()
   - Use Suspense boundaries for loading states
   - Handle loading errors gracefully
   - Support named exports with lazy loading
   - Implement proper error boundaries

2. **Dynamic Import Strategy**
   - Load components only when needed (on click/route)
   - Use import() for conditional module loading
   - Track which chunks are loaded
   - Prevent duplicate chunk loading
   - Handle failed chunk loads with retry

3. **Bundle Size Tracking**
   - Show initial bundle size (before loading)
   - Track each chunk size separately
   - Calculate total loaded size
   - Compare with non-split bundle size
   - Display savings in KB and percentage

4. **Loading States**
   - Show skeleton/spinner during chunk load
   - Display loading progress if possible
   - Handle slow networks gracefully
   - Provide visual feedback for long loads
   - Implement timeout for failed loads

5. **Performance Measurement**
   - Measure time to interactive (TTI)
   - Track chunk load duration
   - Calculate first contentful paint (FCP)
   - Show network waterfall simulation
   - Compare metrics: split vs non-split

### Example Behavior

- App loads with 50 KB initial bundle
- Page renders immediately with three component cards
- User clicks "Charts" → import() triggered
- Suspense shows loading fallback for 1 second
- Charts chunk (270 KB) loads and renders
- Bundle size updates: 50 KB → 320 KB
- User clicks "Map" → Another chunk loads
- Final bundle: 620 KB vs 870 KB without splitting (29% savings)
- Status shows "3/3 chunks loaded"

### Bonus Challenges

- Implement intelligent preloading on hover/focus
- Add route-based code splitting with React Router
- Create webpack magic comments for chunk names
- Show actual network requests in DevTools
- Implement progressive loading (critical → non-critical)
- Add chunk preloading hints (<link rel="preload">)
- Support concurrent chunk loading
- Implement chunk caching strategy
- Build custom Suspense fallback with progress
- Add webpack bundle analyzer integration
