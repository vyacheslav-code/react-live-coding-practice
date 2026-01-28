---
title: Defer Third-Party Scripts After Hydration
description: Load analytics, logging, and non-critical third-party scripts after React hydration completes
tags:
  - bundle-optimization
  - third-party
  - performance
  - hydration
  - script-loading
difficulty: medium
timeEstimate: 25
learningGoals:
  - Understand how third-party scripts block main thread
  - Implement deferred script loading after hydration
  - Measure impact on Core Web Vitals (FCP, LCP, TTI)
  - Use requestIdleCallback for non-critical loads
  - Track when third-party services become available
hints:
  - Use useEffect with empty deps to load after mount
  - requestIdleCallback loads during idle time
  - Script tags can be dynamically inserted after hydration
  - Check if script already loaded to prevent duplicates
  - Use async/defer attributes for non-blocking loads
starterCode: |
  import { useState, useEffect, useRef } from 'react';

  // Simulate third-party services
  const ThirdPartyServices = {
    analytics: {
      name: 'Analytics',
      size: 45, // KB
      priority: 'low',
      blockingTime: 120, // ms
      init: () => console.log('Analytics initialized'),
      track: (event) => console.log('Track:', event)
    },

    chatWidget: {
      name: 'Chat Widget',
      size: 80,
      priority: 'medium',
      blockingTime: 200,
      init: () => console.log('Chat widget initialized'),
      open: () => console.log('Chat opened')
    },

    monitoring: {
      name: 'Error Monitoring',
      size: 35,
      priority: 'high',
      blockingTime: 90,
      init: () => console.log('Error monitoring initialized'),
      captureError: (err) => console.log('Error captured:', err)
    },

    advertising: {
      name: 'Ad Network',
      size: 120,
      priority: 'low',
      blockingTime: 300,
      init: () => console.log('Ad network initialized'),
      showAd: () => console.log('Ad displayed')
    },

    heatmaps: {
      name: 'Heatmaps',
      size: 60,
      priority: 'low',
      blockingTime: 150,
      init: () => console.log('Heatmaps initialized'),
      track: () => console.log('User interaction tracked')
    }
  };

  export default function App() {
    const [loadStrategy, setLoadStrategy] = useState('eager');
    const [loadedServices, setLoadedServices] = useState({});
    const [metrics, setMetrics] = useState({
      fcp: 0,
      lcp: 0,
      tti: 0,
      totalBlockingTime: 0
    });
    const [isHydrated, setIsHydrated] = useState(false);
    const startTimeRef = useRef(Date.now());

    // TODO: Implement deferred loading after hydration
    // Load third-party scripts only after React is ready

    // TODO: Use requestIdleCallback for low-priority scripts
    // Load analytics and non-critical services during idle time

    // TODO: Prioritize critical services
    // Load error monitoring immediately, defer others

    useEffect(() => {
      // Simulate hydration complete
      const hydrationTime = Date.now() - startTimeRef.current;
      setIsHydrated(true);

      // TODO: Start loading third-party services after hydration
      if (loadStrategy === 'deferred') {
        loadThirdPartyServices();
      }
    }, []);

    const loadThirdPartyServices = async () => {
      // TODO: Implement smart loading strategy
      // 1. Load critical services first (error monitoring)
      // 2. Defer low-priority (analytics, ads)
      // 3. Use requestIdleCallback when available
    };

    const loadServiceEagerly = () => {
      // Simulate eager loading (traditional approach)
      const services = Object.entries(ThirdPartyServices);
      let totalBlockingTime = 0;

      services.forEach(([key, service], index) => {
        setTimeout(() => {
          setLoadedServices(prev => ({
            ...prev,
            [key]: {
              loaded: true,
              loadTime: Date.now() - startTimeRef.current,
              strategy: 'eager'
            }
          }));
          totalBlockingTime += service.blockingTime;

          if (index === services.length - 1) {
            calculateMetrics('eager', totalBlockingTime);
          }
        }, service.blockingTime * (index + 1));
      });
    };

    const loadServiceDeferred = () => {
      // TODO: Implement deferred loading
      // Wait for hydration, then load by priority
    };

    const calculateMetrics = (strategy, blockingTime) => {
      // Simulate Core Web Vitals
      const baseMetrics = {
        eager: { fcp: 1200, lcp: 2500, tti: 3800 },
        deferred: { fcp: 800, lcp: 1400, tti: 1800 }
      };

      setMetrics({
        ...baseMetrics[strategy],
        totalBlockingTime: blockingTime
      });
    };

    const startTest = () => {
      startTimeRef.current = Date.now();
      setLoadedServices({});
      setMetrics({ fcp: 0, lcp: 0, tti: 0, totalBlockingTime: 0 });

      if (loadStrategy === 'eager') {
        loadServiceEagerly();
      } else {
        loadServiceDeferred();
      }
    };

    const servicesArray = Object.entries(ThirdPartyServices);
    const loadedCount = Object.keys(loadedServices).length;
    const totalSize = servicesArray.reduce((sum, [, service]) => sum + service.size, 0);

    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h1>Defer Third-Party Scripts</h1>

        <div style={{
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h3 style={{ marginTop: 0 }}>Loading Strategy</h3>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>
              <input
                type="radio"
                value="eager"
                checked={loadStrategy === 'eager'}
                onChange={(e) => setLoadStrategy(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <strong>Eager Loading</strong> - Load all scripts immediately (blocks main thread)
            </label>
            <label style={{ display: 'block' }}>
              <input
                type="radio"
                value="deferred"
                checked={loadStrategy === 'deferred'}
                onChange={(e) => setLoadStrategy(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <strong>Deferred Loading</strong> - Load after hydration completes
            </label>
          </div>

          <button
            onClick={startTest}
            style={{
              padding: '12px 24px',
              background: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Start Loading Test
          </button>

          <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
            Hydration Status: {isHydrated ? '✅ Complete' : '⏳ In Progress'}
          </div>
        </div>

        {metrics.fcp > 0 && (
          <div style={{
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #ddd',
            marginBottom: '30px'
          }}>
            <h3 style={{ marginTop: 0 }}>Core Web Vitals</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px'
            }}>
              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  First Contentful Paint
                </div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: metrics.fcp < 1000 ? '#4CAF50' : '#FF9800'
                }}>
                  {metrics.fcp}ms
                </div>
                <div style={{ fontSize: '10px', color: '#999' }}>
                  Goal: &lt;1000ms
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Largest Contentful Paint
                </div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: metrics.lcp < 2000 ? '#4CAF50' : '#FF9800'
                }}>
                  {metrics.lcp}ms
                </div>
                <div style={{ fontSize: '10px', color: '#999' }}>
                  Goal: &lt;2000ms
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Time to Interactive
                </div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: metrics.tti < 2500 ? '#4CAF50' : '#FF9800'
                }}>
                  {metrics.tti}ms
                </div>
                <div style={{ fontSize: '10px', color: '#999' }}>
                  Goal: &lt;2500ms
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Total Blocking Time
                </div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: metrics.totalBlockingTime < 200 ? '#4CAF50' : '#f44336'
                }}>
                  {metrics.totalBlockingTime}ms
                </div>
                <div style={{ fontSize: '10px', color: '#999' }}>
                  Goal: &lt;200ms
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{
          padding: '20px',
          background: 'white',
          borderRadius: '8px',
          border: '1px solid #ddd',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: 0 }}>Third-Party Services</h3>
            <div>
              <span style={{ fontSize: '14px', color: '#666' }}>
                {loadedCount}/{servicesArray.length} loaded
              </span>
              <span style={{ fontSize: '14px', color: '#666', marginLeft: '20px' }}>
                Total: {totalSize} KB
              </span>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            {servicesArray.map(([key, service]) => {
              const isLoaded = loadedServices[key];
              return (
                <div
                  key={key}
                  style={{
                    padding: '15px',
                    border: '2px solid ' + (isLoaded ? '#4CAF50' : '#ddd'),
                    borderRadius: '8px',
                    background: isLoaded ? '#f1f8f4' : 'white',
                    opacity: isLoaded ? 1 : 0.5
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <strong>{service.name}</strong>
                    {isLoaded && <span>✅</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    <div>Size: {service.size} KB</div>
                    <div>Priority: {service.priority}</div>
                    <div>Blocking: {service.blockingTime}ms</div>
                    {isLoaded && (
                      <div style={{ marginTop: '5px', color: '#4CAF50' }}>
                        Loaded: {isLoaded.loadTime}ms
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{
          padding: '20px',
          background: '#e3f2fd',
          borderRadius: '8px'
        }}>
          <h3 style={{ marginTop: 0 }}>Best Practices</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li><strong>Load after hydration:</strong> Wait for useEffect before loading scripts</li>
            <li><strong>Prioritize:</strong> Load critical services first (error monitoring)</li>
            <li><strong>Use idle time:</strong> requestIdleCallback for low-priority scripts</li>
            <li><strong>Async by default:</strong> Always use async/defer attributes</li>
            <li><strong>Measure impact:</strong> Track how each service affects Core Web Vitals</li>
          </ul>
        </div>
      </div>
    );
  }
---

## Task

Implement deferred loading of third-party scripts (analytics, chat widgets, ads) after React hydration completes. Measure the impact on Core Web Vitals and page performance.

### Requirements

1. **Deferred Script Loading**
   - Load scripts only after React hydration completes
   - Use useEffect to trigger loading post-mount
   - Insert script tags dynamically via DOM manipulation
   - Handle script load success and failure
   - Prevent duplicate script loading

2. **Priority-Based Loading**
   - Load critical services first (error monitoring)
   - Defer low-priority services (analytics, ads)
   - Use requestIdleCallback for non-critical scripts
   - Respect network conditions (slow connections)
   - Implement loading queue with priorities

3. **Performance Measurement**
   - Track First Contentful Paint (FCP)
   - Measure Largest Contentful Paint (LCP)
   - Calculate Time to Interactive (TTI)
   - Monitor Total Blocking Time (TBT)
   - Compare eager vs deferred metrics

4. **Service Availability Tracking**
   - Track when each service loads
   - Show loading progress per service
   - Handle service initialization
   - Provide fallbacks if services fail to load
   - Queue events until services are ready

5. **Visual Feedback**
   - Display loading status for each service
   - Show performance metrics in real-time
   - Color-code based on Core Web Vitals thresholds
   - Highlight which services block the main thread
   - Show total bundle size and blocking time

### Example Behavior

- Page loads → React hydrates (800ms)
- Hydration complete → Start loading third-party scripts
- Error monitoring loads first (priority: high) at 890ms
- Chat widget loads next (priority: medium) at 1090ms
- requestIdleCallback fires → Load analytics at 1500ms
- All services loaded by 2000ms
- Metrics: FCP 800ms (good), LCP 1400ms (good), TTI 1800ms (good)
- Compare to eager loading: FCP 1200ms, LCP 2500ms, TTI 3800ms
- Shows 1600ms improvement in TTI

### Bonus Challenges

- Implement script preloading with <link rel="preload">
- Add network-aware loading (slow network detection)
- Create custom script loader hook
- Support script cleanup on unmount
- Implement consent-based loading (GDPR)
- Add retry logic for failed script loads
- Show network waterfall visualization
- Integrate with Lighthouse scores
- Support Server-Side Rendering (SSR) hydration
- Build third-party script audit tool
