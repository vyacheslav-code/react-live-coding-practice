---
title: Hover Preload Optimization
description: Preload code chunks and resources on hover/focus to improve perceived performance
tags:
  - bundle-optimization
  - preloading
  - user-intent
  - performance
  - ux
difficulty: medium
timeEstimate: 25
learningGoals:
  - Implement hover-based preloading for better UX
  - Use link prefetch/preload for resources
  - Detect user intent before navigation
  - Measure perceived vs actual load time
  - Balance preloading cost vs benefit
hints:
  - Use onMouseEnter to detect hover intent
  - Preload chunks with <link rel="prefetch">
  - Cancel preload if user moves away quickly
  - Track hover duration to avoid false positives
  - Use requestIdleCallback for low-priority preloads
starterCode: |
  import { useState, useRef, useEffect } from 'react';

  // Simulate different pages/routes with varying load times
  const PageModules = {
    dashboard: {
      name: 'Dashboard',
      icon: '📊',
      size: 120, // KB
      loadTime: 500, // ms
      content: () => (
        <div style={{ padding: '30px' }}>
          <h2>Dashboard</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{
                padding: '20px',
                background: '#f5f5f5',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>📈</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{Math.floor(Math.random() * 1000)}</div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>Metric {i}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },

    analytics: {
      name: 'Analytics',
      icon: '📈',
      size: 250,
      loadTime: 1200,
      content: () => (
        <div style={{ padding: '30px' }}>
          <h2>Analytics</h2>
          <div style={{ marginTop: '20px' }}>
            <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px', marginBottom: '20px' }}>
              <h3>User Growth</h3>
              <div style={{ height: '200px', background: 'linear-gradient(to top, #2196F3 0%, #2196F3 60%, transparent 60%)', borderRadius: '4px' }} />
            </div>
            <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
              <h3>Revenue Trends</h3>
              <div style={{ height: '200px', background: 'linear-gradient(to top, #4CAF50 0%, #4CAF50 40%, transparent 40%)', borderRadius: '4px' }} />
            </div>
          </div>
        </div>
      )
    },

    reports: {
      name: 'Reports',
      icon: '📄',
      size: 180,
      loadTime: 800,
      content: () => (
        <div style={{ padding: '30px' }}>
          <h2>Reports</h2>
          <div style={{ marginTop: '20px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                padding: '20px',
                background: '#f5f5f5',
                borderRadius: '8px',
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0 }}>Report {i}</h4>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                      Generated {i} days ago
                    </div>
                  </div>
                  <button style={{
                    padding: '8px 16px',
                    background: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },

    settings: {
      name: 'Settings',
      icon: '⚙️',
      size: 90,
      loadTime: 400,
      content: () => (
        <div style={{ padding: '30px' }}>
          <h2>Settings</h2>
          <div style={{ marginTop: '20px' }}>
            {['Profile', 'Notifications', 'Privacy', 'Security'].map(section => (
              <div key={section} style={{
                padding: '20px',
                background: '#f5f5f5',
                borderRadius: '8px',
                marginBottom: '15px'
              }}>
                <h4 style={{ margin: '0 0 10px 0' }}>{section}</h4>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Configure {section.toLowerCase()} options
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },

    profile: {
      name: 'Profile',
      icon: '👤',
      size: 150,
      loadTime: 600,
      content: () => (
        <div style={{ padding: '30px' }}>
          <h2>User Profile</h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginTop: '20px',
            padding: '20px',
            background: '#f5f5f5',
            borderRadius: '8px'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: '#2196F3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px'
            }}>
              👤
            </div>
            <div>
              <h3 style={{ margin: '0 0 10px 0' }}>John Doe</h3>
              <div style={{ fontSize: '14px', color: '#666' }}>john.doe@example.com</div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Member since 2024</div>
            </div>
          </div>
        </div>
      )
    }
  };

  export default function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [preloadedPages, setPreloadedPages] = useState({ dashboard: true });
    const [hoveringPage, setHoveringPage] = useState(null);
    const [loadingPage, setLoadingPage] = useState(null);
    const [preloadStrategy, setPreloadStrategy] = useState('hover');
    const [metrics, setMetrics] = useState({
      navigations: 0,
      totalLoadTime: 0,
      preloadHits: 0,
      preloadMisses: 0
    });

    const hoverTimerRef = useRef(null);
    const hoverStartRef = useRef(null);

    // TODO: Implement hover-based preloading
    // Preload page chunks when user hovers over nav links

    // TODO: Add minimum hover duration threshold
    // Only preload if hover lasts >100ms (avoid false positives)

    // TODO: Cancel preload on mouse leave
    // Don't waste bandwidth if user moves away quickly

    const preloadPage = async (pageId) => {
      if (preloadedPages[pageId]) return;

      // TODO: Implement actual preloading logic
      // Insert <link rel="prefetch"> or use import()

      const page = PageModules[pageId];
      await new Promise(resolve => setTimeout(resolve, page.loadTime * 0.3)); // Preload is faster

      setPreloadedPages(prev => ({ ...prev, [pageId]: true }));
    };

    const handleMouseEnter = (pageId) => {
      if (preloadStrategy !== 'hover') return;

      hoverStartRef.current = Date.now();
      setHoveringPage(pageId);

      // TODO: Add hover duration threshold
      // Only preload if user hovers for >100ms
      hoverTimerRef.current = setTimeout(() => {
        preloadPage(pageId);
      }, 100); // Minimum hover duration
    };

    const handleMouseLeave = () => {
      setHoveringPage(null);

      // TODO: Cancel preload if user leaves quickly
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
    };

    const navigateToPage = async (pageId) => {
      const startTime = Date.now();
      const wasPreloaded = preloadedPages[pageId];

      setLoadingPage(pageId);

      // Simulate loading time (reduced if preloaded)
      const page = PageModules[pageId];
      const loadTime = wasPreloaded ? page.loadTime * 0.2 : page.loadTime;
      await new Promise(resolve => setTimeout(resolve, loadTime));

      setCurrentPage(pageId);
      setLoadingPage(null);

      // Update metrics
      const actualLoadTime = Date.now() - startTime;
      setMetrics(prev => ({
        navigations: prev.navigations + 1,
        totalLoadTime: prev.totalLoadTime + actualLoadTime,
        preloadHits: prev.preloadHits + (wasPreloaded ? 1 : 0),
        preloadMisses: prev.preloadMisses + (wasPreloaded ? 0 : 1)
      }));

      if (!wasPreloaded) {
        setPreloadedPages(prev => ({ ...prev, [pageId]: true }));
      }
    };

    const pagesArray = Object.entries(PageModules);
    const preloadedCount = Object.keys(preloadedPages).length;
    const totalSize = pagesArray.reduce((sum, [, page]) => sum + page.size, 0);
    const loadedSize = pagesArray
      .filter(([id]) => preloadedPages[id])
      .reduce((sum, [, page]) => sum + page.size, 0);

    const avgLoadTime = metrics.navigations > 0
      ? (metrics.totalLoadTime / metrics.navigations).toFixed(0)
      : 0;

    const preloadHitRate = metrics.navigations > 0
      ? ((metrics.preloadHits / metrics.navigations) * 100).toFixed(0)
      : 0;

    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <h1 style={{ margin: 0 }}>Hover Preload Demo</h1>

          <div>
            <label style={{ fontSize: '14px', marginRight: '10px' }}>
              <input
                type="radio"
                value="hover"
                checked={preloadStrategy === 'hover'}
                onChange={(e) => setPreloadStrategy(e.target.value)}
                style={{ marginRight: '5px' }}
              />
              Hover Preload
            </label>
            <label style={{ fontSize: '14px' }}>
              <input
                type="radio"
                value="none"
                checked={preloadStrategy === 'none'}
                onChange={(e) => setPreloadStrategy(e.target.value)}
                style={{ marginRight: '5px' }}
              />
              No Preload
            </label>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '15px',
          marginBottom: '30px'
        }}>
          <div style={{ padding: '15px', background: 'white', borderRadius: '8px', border: '1px solid #ddd' }}>
            <div style={{ fontSize: '12px', color: '#666' }}>Avg Load Time</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2196F3' }}>
              {avgLoadTime}ms
            </div>
          </div>
          <div style={{ padding: '15px', background: 'white', borderRadius: '8px', border: '1px solid #ddd' }}>
            <div style={{ fontSize: '12px', color: '#666' }}>Preload Hit Rate</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4CAF50' }}>
              {preloadHitRate}%
            </div>
          </div>
          <div style={{ padding: '15px', background: 'white', borderRadius: '8px', border: '1px solid #ddd' }}>
            <div style={{ fontSize: '12px', color: '#666' }}>Pages Cached</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
              {preloadedCount}/{pagesArray.length}
            </div>
          </div>
          <div style={{ padding: '15px', background: 'white', borderRadius: '8px', border: '1px solid #ddd' }}>
            <div style={{ fontSize: '12px', color: '#666' }}>Bundle Loaded</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
              {loadedSize}KB
            </div>
          </div>
        </div>

        <nav style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          padding: '15px',
          background: 'white',
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          {pagesArray.map(([pageId, page]) => {
            const isActive = currentPage === pageId;
            const isPreloaded = preloadedPages[pageId];
            const isHovering = hoveringPage === pageId;

            return (
              <button
                key={pageId}
                onClick={() => navigateToPage(pageId)}
                onMouseEnter={() => handleMouseEnter(pageId)}
                onMouseLeave={handleMouseLeave}
                style={{
                  flex: 1,
                  padding: '15px',
                  border: '2px solid ' + (isActive ? '#2196F3' : '#ddd'),
                  borderRadius: '8px',
                  background: isActive ? '#e3f2fd' : isHovering ? '#f5f5f5' : 'white',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '5px' }}>{page.icon}</div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{page.name}</div>
                <div style={{ fontSize: '10px', color: '#666', marginTop: '5px' }}>
                  {page.size} KB
                </div>
                {isPreloaded && (
                  <div style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    fontSize: '12px'
                  }}>
                    ✅
                  </div>
                )}
                {isHovering && preloadStrategy === 'hover' && !isPreloaded && (
                  <div style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    fontSize: '12px'
                  }}>
                    ⏳
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{
          background: 'white',
          borderRadius: '8px',
          border: '1px solid #ddd',
          minHeight: '400px',
          position: 'relative'
        }}>
          {loadingPage ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '400px',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{ fontSize: '48px' }}>⏳</div>
              <div style={{ fontSize: '18px', color: '#666' }}>
                Loading {PageModules[loadingPage].name}...
              </div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                {preloadedPages[loadingPage] ? 'From cache' : 'Downloading chunk'}
              </div>
            </div>
          ) : (
            PageModules[currentPage].content()
          )}
        </div>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#fff3cd',
          borderRadius: '8px'
        }}>
          <h3 style={{ marginTop: 0 }}>How Hover Preload Works</h3>
          <ol style={{ lineHeight: '1.8' }}>
            <li>User hovers over navigation link</li>
            <li>Wait 100ms to detect real intent (avoid false positives)</li>
            <li>Start preloading page chunk in background</li>
            <li>When user clicks, page loads instantly from cache</li>
            <li>Perceived load time: ~0ms vs actual: 400-1200ms</li>
          </ol>
        </div>

        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <strong>Tip:</strong> Hover preload works best for frequent navigation patterns
        </div>
      </div>
    );
  }
---

## Task

Implement hover-based preloading to improve perceived performance. Detect user intent by monitoring hover/focus events and preload resources before the user clicks.

### Requirements

1. **Hover Detection**
   - Listen for mouseEnter events on navigation links
   - Implement minimum hover duration threshold (100ms)
   - Cancel preload if user leaves quickly
   - Track hover duration for analytics
   - Support keyboard focus events

2. **Intelligent Preloading**
   - Preload code chunks using dynamic import()
   - Insert prefetch link tags for resources
   - Prioritize based on hover confidence
   - Avoid preloading if already cached
   - Implement bandwidth-aware preloading

3. **Performance Measurement**
   - Track actual vs perceived load time
   - Calculate preload hit rate (% of preloads used)
   - Measure wasted preload bandwidth
   - Show average navigation time
   - Compare preload vs no-preload metrics

4. **Visual Feedback**
   - Show preload status on hover
   - Indicate which pages are cached
   - Display loading states during navigation
   - Highlight preload savings in metrics
   - Show preload activity indicator

5. **Optimization Strategy**
   - Balance preload cost vs benefit
   - Detect slow network and disable preload
   - Cancel preloads when navigating away
   - Implement preload budget limits
   - Track and learn from user patterns

### Example Behavior

- User hovers over "Analytics" link
- After 100ms hover, preloading starts (icon shows ⏳)
- Chunk loads in background (250 KB)
- Checkmark appears when preloaded (✅)
- User clicks "Analytics" → Instant navigation (~50ms)
- Without preload: Would take 1200ms
- Metrics show: 95% reduction in perceived load time
- Preload hit rate: 80% (8 of 10 preloads resulted in navigation)

### Bonus Challenges

- Implement predictive preloading (ML-based)
- Add touch/mobile hover alternative (long press)
- Build smart preload queue (limit concurrent)
- Integrate with browser priority hints
- Support preloading related resources (images, fonts)
- Implement A/B testing for preload strategy
- Add Service Worker integration for caching
- Build heatmap of preload effectiveness
- Support route-based preload hints
- Create adaptive preload based on user behavior
