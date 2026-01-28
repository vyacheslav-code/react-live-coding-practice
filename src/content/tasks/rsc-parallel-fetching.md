---
title: React Server Components Parallel Data Fetching
description: Restructure components to fetch data in parallel instead of sequential waterfalls
tags:
  - react-server-components
  - parallel-fetching
  - performance
  - async-await
  - vercel-best-practices
difficulty: hard
timeEstimate: 35
learningGoals:
  - Understand how component tree structure affects data fetching order
  - Restructure Server Components for parallel data loading
  - Avoid request waterfalls caused by nested async components
  - Learn when to fetch in parent vs child components
  - Optimize Time to First Byte (TTFB) on server
hints:
  - Server Components can be async and await data
  - Child components start rendering AFTER parent finishes
  - Fetching in nested components creates waterfalls
  - Fetch all data at top level and pass down as props
  - Promise.all() enables parallel fetching
starterCode: |
  'use client';
  import { useState } from 'react';

  // Mock server data fetching functions
  const mockServerAPI = {
    async fetchPageMetadata(pageId) {
      console.log(`[START] fetchPageMetadata(${pageId})`);
      await new Promise(resolve => setTimeout(resolve, 400));
      console.log(`[DONE] fetchPageMetadata(${pageId})`);
      return {
        title: 'Product Dashboard',
        description: 'View your product analytics',
        lastUpdated: '2024-01-28'
      };
    },

    async fetchUserSession(userId) {
      console.log(`[START] fetchUserSession(${userId})`);
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`[DONE] fetchUserSession(${userId})`);
      return {
        userId,
        name: 'Jordan Lee',
        role: 'admin',
        permissions: ['read', 'write', 'delete']
      };
    },

    async fetchProductStats(userId) {
      console.log(`[START] fetchProductStats(${userId})`);
      await new Promise(resolve => setTimeout(resolve, 600));
      console.log(`[DONE] fetchProductStats(${userId})`);
      return {
        totalProducts: 145,
        activeProducts: 132,
        revenue: 45678
      };
    },

    async fetchRecentOrders(userId) {
      console.log(`[START] fetchRecentOrders(${userId})`);
      await new Promise(resolve => setTimeout(resolve, 550));
      console.log(`[DONE] fetchRecentOrders(${userId})`);
      return [
        { id: 1, product: 'Widget Pro', amount: 299, status: 'shipped' },
        { id: 2, product: 'Gadget Plus', amount: 199, status: 'pending' },
        { id: 3, product: 'Tool Master', amount: 399, status: 'delivered' }
      ];
    },

    async fetchNotifications(userId) {
      console.log(`[START] fetchNotifications(${userId})`);
      await new Promise(resolve => setTimeout(resolve, 450));
      console.log(`[DONE] fetchNotifications(${userId})`);
      return [
        { id: 1, message: 'New order received', type: 'info' },
        { id: 2, message: 'Payment processed', type: 'success' },
        { id: 3, message: 'Inventory low', type: 'warning' }
      ];
    }
  };

  // ❌ BAD: Waterfall architecture
  // Each component waits for previous to finish
  async function PageMetadata({ pageId }) {
    const metadata = await mockServerAPI.fetchPageMetadata(pageId);
    return (
      <div style={{
        background: '#f5f5f5',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: '0 0 5px' }}>{metadata.title}</h2>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          {metadata.description} • Updated: {metadata.lastUpdated}
        </p>
      </div>
    );
  }

  async function UserSessionBad({ userId }) {
    // Waits for parent to finish first!
    const session = await mockServerAPI.fetchUserSession(userId);
    return (
      <div style={{
        background: '#e3f2fd',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <strong>{session.name}</strong> ({session.role})
      </div>
    );
  }

  async function ProductStatsBad({ userId }) {
    // Waits for UserSession to finish first!
    const stats = await mockServerAPI.fetchProductStats(userId);
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <div style={{ background: '#c8e6c9', padding: '15px', borderRadius: '8px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalProducts}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Total Products</div>
        </div>
        <div style={{ background: '#fff9c4', padding: '15px', borderRadius: '8px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.activeProducts}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Active</div>
        </div>
        <div style={{ background: '#f0f4c3', padding: '15px', borderRadius: '8px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>${stats.revenue}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Revenue</div>
        </div>
      </div>
    );
  }

  async function OrdersAndNotificationsBad({ userId }) {
    // Waits for ProductStats to finish first!
    const orders = await mockServerAPI.fetchRecentOrders(userId);
    const notifications = await mockServerAPI.fetchNotifications(userId);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h3>Recent Orders</h3>
          {orders.map(order => (
            <div key={order.id} style={{
              background: '#fff',
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '8px'
            }}>
              <strong>{order.product}</strong> - ${order.amount}
              <div style={{ fontSize: '12px', color: '#666' }}>{order.status}</div>
            </div>
          ))}
        </div>
        <div>
          <h3>Notifications</h3>
          {notifications.map(notif => (
            <div key={notif.id} style={{
              background: '#fff',
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '8px'
            }}>
              {notif.message}
              <div style={{ fontSize: '12px', color: '#666' }}>{notif.type}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  async function DashboardWaterfall({ userId, pageId }) {
    return (
      <div>
        {/* These load sequentially: 400ms → 500ms → 600ms → 1000ms = 2500ms total */}
        <PageMetadata pageId={pageId} />
        <UserSessionBad userId={userId} />
        <ProductStatsBad userId={userId} />
        <OrdersAndNotificationsBad userId={userId} />
      </div>
    );
  }

  // TODO: ✅ GOOD: Parallel architecture
  // Fetch all data at top level with Promise.all()
  // Pass data down as props to presentational components

  // TODO: Create presentational components that receive data as props
  function UserSessionGood({ session }) {
    return (
      <div style={{
        background: '#e3f2fd',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <strong>{session.name}</strong> ({session.role})
      </div>
    );
  }

  function ProductStatsGood({ stats }) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <div style={{ background: '#c8e6c9', padding: '15px', borderRadius: '8px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalProducts}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Total Products</div>
        </div>
        <div style={{ background: '#fff9c4', padding: '15px', borderRadius: '8px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.activeProducts}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Active</div>
        </div>
        <div style={{ background: '#f0f4c3', padding: '15px', borderRadius: '8px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>${stats.revenue}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Revenue</div>
        </div>
      </div>
    );
  }

  function OrdersAndNotificationsGood({ orders, notifications }) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h3>Recent Orders</h3>
          {orders.map(order => (
            <div key={order.id} style={{
              background: '#fff',
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '8px'
            }}>
              <strong>{order.product}</strong> - ${order.amount}
              <div style={{ fontSize: '12px', color: '#666' }}>{order.status}</div>
            </div>
          ))}
        </div>
        <div>
          <h3>Notifications</h3>
          {notifications.map(notif => (
            <div key={notif.id} style={{
              background: '#fff',
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '8px'
            }}>
              {notif.message}
              <div style={{ fontSize: '12px', color: '#666' }}>{notif.type}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // TODO: Implement parallel data fetching
  async function DashboardParallel({ userId, pageId }) {
    // TODO: Fetch ALL data in parallel with Promise.all()
    // const [metadata, session, stats, orders, notifications] = await Promise.all([
    //   mockServerAPI.fetchPageMetadata(pageId),
    //   mockServerAPI.fetchUserSession(userId),
    //   ... add the rest
    // ]);

    // TODO: Pass data down as props to presentational components
    // Total time should be max(400, 500, 600, 550, 450) = 600ms instead of 2500ms!

    return <div>TODO: Implement parallel version</div>;
  }

  export default function App() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [metrics, setMetrics] = useState(null);

    const loadWaterfall = async () => {
      setLoading(true);
      setResult(null);
      setMetrics(null);

      const startTime = performance.now();
      // Simulate rendering the waterfall component
      const element = await DashboardWaterfall({ userId: 1, pageId: 'home' });
      const duration = performance.now() - startTime;

      setResult('waterfall');
      setMetrics({ duration: Math.round(duration), type: 'waterfall' });
      setLoading(false);
    };

    const loadParallel = async () => {
      setLoading(true);
      setResult(null);
      setMetrics(null);

      const startTime = performance.now();
      // Simulate rendering the parallel component
      const element = await DashboardParallel({ userId: 1, pageId: 'home' });
      const duration = performance.now() - startTime;

      setResult('parallel');
      setMetrics({ duration: Math.round(duration), type: 'parallel' });
      setLoading(false);
    };

    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui' }}>
        <h1>RSC Parallel Data Fetching</h1>

        <div style={{
          padding: '20px',
          background: '#fff3e0',
          borderRadius: '8px',
          marginBottom: '20px',
          borderLeft: '4px solid #ff9800'
        }}>
          <strong>Server Component Architecture:</strong>
          <p style={{ margin: '10px 0 0' }}>
            In React Server Components, async children components don't start fetching until
            their parent finishes. This creates a waterfall. Solution: Fetch all data at the
            top level with Promise.all(), then pass down as props.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={loadWaterfall}
            disabled={loading}
            style={{
              padding: '12px 24px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            ❌ Waterfall (~2500ms)
          </button>

          <button
            onClick={loadParallel}
            disabled={loading}
            style={{
              padding: '12px 24px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            ✅ Parallel (~600ms)
          </button>
        </div>

        {loading && (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            background: '#e3f2fd',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>⏳</div>
            <div>Loading dashboard...</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
              Check console for fetch timing
            </div>
          </div>
        )}

        {metrics && (
          <div style={{
            padding: '20px',
            background: metrics.duration < 800 ? '#c8e6c9' : '#ffcdd2',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginTop: 0 }}>Performance Results</h3>
            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
              {metrics.type === 'waterfall' ? '❌ Waterfall' : '✅ Parallel'}: {metrics.duration}ms
            </div>
            {metrics.duration < 800 && (
              <div style={{ color: '#2e7d32', fontWeight: 'bold' }}>
                🚀 75% faster with parallel fetching!
              </div>
            )}
          </div>
        )}

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <h3 style={{ marginTop: 0 }}>Architecture Comparison</h3>
          <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
            <div><strong>❌ Waterfall (Nested Async Components):</strong></div>
            <div>→ 0ms: Start fetchPageMetadata (400ms)</div>
            <div>→ 400ms: Start fetchUserSession (500ms)</div>
            <div>→ 900ms: Start fetchProductStats (600ms)</div>
            <div>→ 1500ms: Start fetchRecentOrders + fetchNotifications (1000ms)</div>
            <div style={{ color: '#d32f2f', fontWeight: 'bold', marginTop: '5px' }}>
              Total: 2500ms (sequential cascade)
            </div>
            <br />
            <div><strong>✅ Parallel (Promise.all at top level):</strong></div>
            <div>→ 0ms: Start ALL 5 fetches simultaneously</div>
            <div>→ 400ms: fetchPageMetadata done</div>
            <div>→ 450ms: fetchNotifications done</div>
            <div>→ 500ms: fetchUserSession done</div>
            <div>→ 550ms: fetchRecentOrders done</div>
            <div>→ 600ms: fetchProductStats done (slowest)</div>
            <div style={{ color: '#2e7d32', fontWeight: 'bold', marginTop: '5px' }}>
              Total: 600ms (parallel execution) - 75% improvement!
            </div>
            <br />
            <div style={{ background: '#fff3cd', padding: '10px', borderRadius: '4px' }}>
              <strong>Key Pattern:</strong> Hoist all data fetching to top-level async component.
              Use Promise.all() to run in parallel. Pass data down to child components as props.
              Children become simple presentational components.
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '20px',
          background: '#e8eaf6',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <h3 style={{ marginTop: 0 }}>When to Use Each Pattern</h3>
          <div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Waterfall (Nested Async):</strong>
              <div style={{ fontSize: '12px', color: '#666', marginLeft: '15px' }}>
                • When child data depends on parent data<br />
                • Example: Fetch user → Fetch user's posts (need userId first)
              </div>
            </div>
            <div>
              <strong>Parallel (Promise.all):</strong>
              <div style={{ fontSize: '12px', color: '#666', marginLeft: '15px' }}>
                • When all data is independent<br />
                • When you have all parameters upfront<br />
                • When optimizing Time to First Byte (TTFB)<br />
                • Most dashboard/page-level data fetching scenarios
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
---

## Task

Build a dashboard that demonstrates the performance difference between waterfall and parallel data fetching in React Server Components. Restructure nested async components to fetch data in parallel.

### Requirements

1. **Implement Parallel Dashboard Component**
   - Create DashboardParallel async function
   - Use Promise.all() to fetch all 5 data sources simultaneously
   - Destructure results: [metadata, session, stats, orders, notifications]
   - Pass each piece of data to corresponding presentational component
   - Total time should be ~600ms (slowest individual request)

2. **Component Architecture**
   - Top-level DashboardParallel fetches all data
   - Presentational components receive data as props
   - No async operations in child components
   - Clear separation between data fetching and presentation
   - All fetches start at t=0ms

3. **Performance Optimization**
   - Waterfall: 400 + 500 + 600 + max(550, 450) = 2500ms
   - Parallel: max(400, 500, 600, 550, 450) = 600ms
   - Should be approximately 75% faster
   - Verify with performance.now() timing
   - Log fetch start/end times to console

4. **Presentational Components**
   - UserSessionGood receives session prop
   - ProductStatsGood receives stats prop
   - OrdersAndNotificationsGood receives orders & notifications props
   - PageMetadata component for metadata
   - All components render synchronously with props

5. **UI Requirements**
   - Show performance metrics after each load
   - Display execution time
   - Green background for parallel (<800ms)
   - Red background for waterfall (>800ms)
   - Console logs showing fetch timing
   - Architecture comparison explanation

### Example Behavior

**Waterfall Version:**
```
t=0ms:    PageMetadata starts fetching
t=400ms:  PageMetadata done → UserSession starts
t=900ms:  UserSession done → ProductStats starts
t=1500ms: ProductStats done → Orders & Notifications start
t=2500ms: Everything done
```

**Parallel Version:**
```
t=0ms:   All 5 fetches start simultaneously
t=400ms: PageMetadata done
t=450ms: Notifications done
t=500ms: UserSession done
t=550ms: Orders done
t=600ms: ProductStats done → Everything done
```

### Bonus Challenges

- Add visual timeline showing when each request starts/finishes
- Implement with streaming Suspense boundaries
- Add error handling for individual fetch failures
- Show network waterfall diagram
- Implement partial parallel (some dependencies)
- Add request cancellation for slow requests
- Create comparison with 10+ data sources
- Add real Server Component implementation
- Implement with nested parallel groups
- Add metrics for Time to First Byte (TTFB)
- Compare with GraphQL DataLoader pattern
- Add interactive slider to add/remove data sources
