---
title: after() for Non-Blocking Operations
description: Use after() to defer logging, analytics, and cleanup tasks so they don't block response
tags:
  - after-hook
  - performance
  - logging
  - analytics
  - vercel-best-practices
difficulty: medium
timeEstimate: 30
learningGoals:
  - Understand how blocking operations delay server response
  - Use after() to defer non-critical work until after response is sent
  - Optimize Time to First Byte (TTFB) by deferring logging/analytics
  - Learn what operations should vs shouldn't be deferred
  - Implement fire-and-forget tasks properly
hints:
  - after() runs code AFTER the response is sent to client
  - Use for logging, analytics, cleanup tasks that user doesn't need to wait for
  - Code in after() won't delay TTFB or page load
  - Don't use after() for data the client needs
  - Perfect for telemetry, metrics, cache warming
starterCode: |
  'use client';
  import { useState } from 'react';

  // Mock server operations with realistic delays
  const mockServerOperations = {
    // Critical: User needs this data
    async fetchUserData(userId) {
      console.log(`[FETCH] Getting user data for ${userId}`);
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        id: userId,
        name: 'Taylor Swift',
        email: 'taylor@example.com',
        preferences: { theme: 'dark', language: 'en' }
      };
    },

    // Critical: User needs this data
    async fetchUserPosts(userId) {
      console.log(`[FETCH] Getting posts for ${userId}`);
      await new Promise(resolve => setTimeout(resolve, 400));
      return [
        { id: 1, title: 'My First Post', views: 1234 },
        { id: 2, title: 'React Best Practices', views: 5678 }
      ];
    },

    // Non-critical: Analytics (user doesn't need to wait)
    async logAnalytics(event, data) {
      console.log(`[ANALYTICS] Logging event: ${event}`);
      await new Promise(resolve => setTimeout(resolve, 200));
      console.log(`[ANALYTICS] Event logged:`, event, data);
    },

    // Non-critical: Audit trail (user doesn't need to wait)
    async writeAuditLog(userId, action) {
      console.log(`[AUDIT] Writing audit log for ${action}`);
      await new Promise(resolve => setTimeout(resolve, 150));
      console.log(`[AUDIT] Audit log written: User ${userId} ${action}`);
    },

    // Non-critical: Update metrics (user doesn't need to wait)
    async updateMetrics(userId) {
      console.log(`[METRICS] Updating metrics for ${userId}`);
      await new Promise(resolve => setTimeout(resolve, 180));
      console.log(`[METRICS] Metrics updated`);
    },

    // Non-critical: Cache warming (user doesn't need to wait)
    async warmRelatedCache(userId) {
      console.log(`[CACHE] Warming cache for related users`);
      await new Promise(resolve => setTimeout(resolve, 220));
      console.log(`[CACHE] Cache warmed`);
    },

    // Non-critical: Send notification (user doesn't need to wait)
    async sendNotification(userId, message) {
      console.log(`[NOTIFICATION] Sending notification to ${userId}`);
      await new Promise(resolve => setTimeout(resolve, 250));
      console.log(`[NOTIFICATION] Notification sent: ${message}`);
    }
  };

  // ❌ BAD: All operations block the response
  async function handleUserRequestBlocking(userId) {
    const startTime = performance.now();
    console.log('\n=== BLOCKING APPROACH ===');

    // Critical data (must block)
    const user = await mockServerOperations.fetchUserData(userId);
    const posts = await mockServerOperations.fetchUserPosts(userId);

    // Non-critical operations (blocking response unnecessarily!)
    await mockServerOperations.logAnalytics('page_view', { userId, page: 'profile' });
    await mockServerOperations.writeAuditLog(userId, 'viewed_profile');
    await mockServerOperations.updateMetrics(userId);
    await mockServerOperations.warmRelatedCache(userId);
    await mockServerOperations.sendNotification(userId, 'Profile was viewed');

    // Total blocking time: 300 + 400 + 200 + 150 + 180 + 220 + 250 = 1700ms
    // User waits 1700ms before seeing the page!

    const duration = performance.now() - startTime;
    console.log(`[RESPONSE] Sent after ${Math.round(duration)}ms\n`);

    return { user, posts, duration };
  }

  // TODO: ✅ GOOD: Use after() for non-blocking operations
  async function handleUserRequestNonBlocking(userId) {
    const startTime = performance.now();
    console.log('\n=== NON-BLOCKING APPROACH ===');

    // TODO: Fetch critical data that user needs (must await)
    // - fetchUserData
    // - fetchUserPosts

    // TODO: Defer non-critical operations with after()
    // Simulate after() by NOT awaiting these operations
    // In real Next.js 15+, you'd use: after(() => { ... })

    // HINT: Don't await these! They should run in background
    // - logAnalytics
    // - writeAuditLog
    // - updateMetrics
    // - warmRelatedCache
    // - sendNotification

    // TODO: Return immediately after critical data is ready
    // Total blocking time should be: 300 + 400 = 700ms
    // User sees page in 700ms, background tasks continue after response

    const duration = performance.now() - startTime;
    console.log(`[RESPONSE] Sent after ${Math.round(duration)}ms`);
    console.log(`[INFO] Background tasks still running...\n`);

    // TODO: Return user and posts data with duration
    return { user: null, posts: [], duration }; // Fix this
  }

  export default function App() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [metrics, setMetrics] = useState(null);

    const handleBlocking = async () => {
      setLoading(true);
      setResult(null);
      setMetrics(null);

      const data = await handleUserRequestBlocking(1);

      setResult(data);
      setMetrics({
        type: 'blocking',
        ttfb: data.duration,
        totalOps: 7
      });
      setLoading(false);
    };

    const handleNonBlocking = async () => {
      setLoading(true);
      setResult(null);
      setMetrics(null);

      const data = await handleUserRequestNonBlocking(1);

      setResult(data);
      setMetrics({
        type: 'non-blocking',
        ttfb: data.duration,
        totalOps: 7
      });
      setLoading(false);

      // Simulate waiting for background tasks to complete
      setTimeout(() => {
        console.log('[INFO] All background tasks completed');
      }, 2000);
    };

    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui' }}>
        <h1>after() for Non-Blocking Operations</h1>

        <div style={{
          padding: '20px',
          background: '#e8f5e9',
          borderRadius: '8px',
          marginBottom: '20px',
          borderLeft: '4px solid #4CAF50'
        }}>
          <strong>Performance Concept:</strong>
          <p style={{ margin: '10px 0 0' }}>
            The after() hook defers non-critical operations (logging, analytics, cleanup)
            until AFTER the response is sent. User gets instant response, background tasks
            finish later without blocking.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={handleBlocking}
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
            ❌ Blocking (~1700ms)
          </button>

          <button
            onClick={handleNonBlocking}
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
            ✅ Non-Blocking (~700ms)
          </button>
        </div>

        {loading && (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            background: '#fff3e0',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>⏳</div>
            <div>Loading user profile...</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              Check console for operation timing
            </div>
          </div>
        )}

        {metrics && (
          <div style={{
            padding: '20px',
            background: metrics.ttfb < 1000 ? '#c8e6c9' : '#ffcdd2',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginTop: 0 }}>Performance Metrics</h3>
            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
              {metrics.type === 'blocking' ? '❌ Blocking' : '✅ Non-Blocking'}
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
              <div><strong>Time to First Byte (TTFB):</strong> {Math.round(metrics.ttfb)}ms</div>
              <div><strong>Total Operations:</strong> {metrics.totalOps}</div>
              {metrics.type === 'non-blocking' && (
                <div style={{ color: '#2e7d32', marginTop: '10px', fontWeight: 'bold' }}>
                  🚀 {Math.round(((1700 - metrics.ttfb) / 1700) * 100)}% faster response!
                  <div style={{ fontSize: '12px', fontWeight: 'normal', marginTop: '5px' }}>
                    Background tasks still running (check console)
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {result && result.user && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* User Profile Card */}
            <div style={{
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px'
            }}>
              <h2 style={{ marginTop: 0 }}>👤 User Profile</h2>
              <div><strong>Name:</strong> {result.user.name}</div>
              <div><strong>Email:</strong> {result.user.email}</div>
              <div><strong>Theme:</strong> {result.user.preferences.theme}</div>
              <div><strong>Language:</strong> {result.user.preferences.language}</div>
            </div>

            {/* Posts Card */}
            <div style={{
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px'
            }}>
              <h2 style={{ marginTop: 0 }}>📝 Recent Posts</h2>
              {result.posts.map(post => (
                <div key={post.id} style={{
                  background: '#f5f5f5',
                  padding: '15px',
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{post.title}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>👁️ {post.views} views</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <h3 style={{ marginTop: 0 }}>Timing Breakdown</h3>
          <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
            <div><strong>❌ Blocking Approach:</strong></div>
            <div>→ fetchUserData: 300ms</div>
            <div>→ fetchUserPosts: 400ms</div>
            <div>→ logAnalytics: 200ms (blocks response!)</div>
            <div>→ writeAuditLog: 150ms (blocks response!)</div>
            <div>→ updateMetrics: 180ms (blocks response!)</div>
            <div>→ warmRelatedCache: 220ms (blocks response!)</div>
            <div>→ sendNotification: 250ms (blocks response!)</div>
            <div style={{ color: '#d32f2f', fontWeight: 'bold', marginTop: '5px' }}>
              TTFB: 1700ms (user waits for everything)
            </div>
            <br />
            <div><strong>✅ Non-Blocking with after():</strong></div>
            <div>→ fetchUserData: 300ms (critical, must wait)</div>
            <div>→ fetchUserPosts: 400ms (critical, must wait)</div>
            <div style={{ color: '#2e7d32', fontWeight: 'bold', marginTop: '5px' }}>
              TTFB: 700ms (response sent immediately)
            </div>
            <div style={{ marginTop: '5px', fontSize: '11px', fontStyle: 'italic' }}>
              → After response: logAnalytics, auditLog, metrics, cache, notification run
            </div>
            <div style={{ marginTop: '5px', fontSize: '11px', fontStyle: 'italic' }}>
              → Total server time still ~1700ms, but user doesn't wait!
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '20px',
          background: '#e3f2fd',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <h3 style={{ marginTop: 0 }}>What to Put in after()</h3>
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#2e7d32' }}>✅ Good for after():</strong>
            <div style={{ fontSize: '12px', color: '#666', marginLeft: '15px', marginTop: '5px' }}>
              • Analytics and telemetry<br />
              • Audit logs and activity tracking<br />
              • Metrics updates<br />
              • Cache warming<br />
              • Email/push notifications<br />
              • Cleanup tasks<br />
              • Third-party API calls (non-critical)
            </div>
          </div>
          <div>
            <strong style={{ color: '#d32f2f' }}>❌ Don't use after() for:</strong>
            <div style={{ fontSize: '12px', color: '#666', marginLeft: '15px', marginTop: '5px' }}>
              • Data the client needs to render<br />
              • Authentication checks<br />
              • Authorization logic<br />
              • Data validation<br />
              • Critical business logic<br />
              • Database transactions that affect response
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '20px',
          background: '#fff3e0',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <h3 style={{ marginTop: 0 }}>Real-World Example (Next.js 15+)</h3>
          <pre style={{
            background: '#fff',
            padding: '15px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '11px'
          }}>{`import { after } from 'next/server';

export async function GET(request) {
  // Critical: Fetch data user needs
  const user = await db.users.findById(userId);
  const posts = await db.posts.findByUser(userId);

  // Non-critical: Defer to after response
  after(async () => {
    await analytics.track('page_view', { userId });
    await db.auditLog.create({ userId, action: 'viewed_profile' });
    await cache.warm('related_users', userId);
  });

  // Response sent immediately with critical data
  return Response.json({ user, posts });
}`}</pre>
        </div>
      </div>
    );
  }
---

## Task

Build a user profile page that demonstrates the performance impact of deferring non-critical operations. Learn when to use after() to avoid blocking the response with logging, analytics, and background tasks.

### Requirements

1. **Implement Non-Blocking Version**
   - Fetch critical data (user, posts) and await them
   - Start non-critical operations (analytics, audit, metrics, cache, notifications)
   - Do NOT await the non-critical operations
   - Return response immediately after critical data is ready
   - Total TTFB should be ~700ms (only critical data)

2. **Critical vs Non-Critical Operations**
   - Critical (must block): fetchUserData, fetchUserPosts
   - Non-critical (after only): logAnalytics, writeAuditLog, updateMetrics, warmRelatedCache, sendNotification
   - User should not wait for non-critical operations
   - Background tasks continue after response is sent

3. **Performance Optimization**
   - Blocking version: 300 + 400 + 200 + 150 + 180 + 220 + 250 = 1700ms
   - Non-blocking version: 300 + 400 = 700ms TTFB
   - Should be approximately 60% faster time to first byte
   - Log timing to console for verification

4. **Proper after() Simulation**
   - In real Next.js 15+, use: after(() => { ... })
   - In this exercise, simulate by NOT awaiting background tasks
   - Background tasks run but don't block return statement
   - Console logs show tasks continuing after response

5. **UI Requirements**
   - Display TTFB (Time to First Byte) for each version
   - Show total operations count
   - Green background for non-blocking (<1000ms)
   - Red background for blocking (>1000ms)
   - Show percentage improvement
   - Explain which operations were deferred

### Example Behavior

**Blocking Version:**
```
→ Fetch user data (300ms) - WAIT
→ Fetch posts (400ms) - WAIT
→ Log analytics (200ms) - WAIT
→ Write audit log (150ms) - WAIT
→ Update metrics (180ms) - WAIT
→ Warm cache (220ms) - WAIT
→ Send notification (250ms) - WAIT
→ Send response (1700ms total)
User sees page after 1700ms
```

**Non-Blocking Version:**
```
→ Fetch user data (300ms) - WAIT
→ Fetch posts (400ms) - WAIT
→ Send response (700ms) ✓
→ [Background] Log analytics (200ms)
→ [Background] Write audit log (150ms)
→ [Background] Update metrics (180ms)
→ [Background] Warm cache (220ms)
→ [Background] Send notification (250ms)
User sees page after 700ms (60% faster!)
```

### Bonus Challenges

- Add error handling for background tasks
- Implement task queue visualization showing what's running
- Add real Next.js 15 after() implementation
- Show server vs client timeline diagram
- Implement priority levels for background tasks
- Add retry logic for failed background operations
- Create dashboard showing background task status
- Implement with Promise.allSettled for background tasks
- Add configurable timeout for background tasks
- Show memory/CPU usage comparison
- Implement batching for multiple analytics events
- Add real-time progress indicator for background tasks
