---
title: Defer Await to Conditional Branches
description: Learn to avoid waterfalls by moving await statements into the branches where results are actually used
tags:
  - async
  - performance
  - waterfalls
  - vercel-best-practices
difficulty: medium
timeEstimate: 25
learningGoals:
  - Understand how early awaits create unnecessary waterfalls
  - Move await statements into conditional branches
  - Start all promises early, await only when needed
  - Optimize async function execution time
  - Reduce total request time by parallelizing independent operations
hints:
  - Don't await a promise until you actually need its result
  - Start promises immediately but await them in branches
  - If a value is only used in an if/else, await it inside that branch
  - Promises run in parallel even if you don't await them immediately
  - Use Promise.race or conditional awaits based on logic flow
starterCode: |
  import { useState } from 'react';

  // Mock API functions with realistic delays
  const mockAPI = {
    async getUserProfile(userId) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        id: userId,
        name: 'Jane Smith',
        role: 'premium',
        preferences: { theme: 'dark', notifications: true }
      };
    },

    async getPremiumFeatures() {
      await new Promise(resolve => setTimeout(resolve, 600));
      return {
        features: ['Advanced Analytics', 'Priority Support', 'Custom Themes'],
        expiresAt: '2024-12-31'
      };
    },

    async getFreeFeatures() {
      await new Promise(resolve => setTimeout(resolve, 400));
      return {
        features: ['Basic Dashboard', 'Email Support'],
        upgradePrompt: 'Upgrade to premium for more features!'
      };
    },

    async getActivityLog() {
      await new Promise(resolve => setTimeout(resolve, 700));
      return [
        { id: 1, action: 'Login', timestamp: '2024-01-15 10:30' },
        { id: 2, action: 'Updated profile', timestamp: '2024-01-15 11:45' },
        { id: 3, action: 'Downloaded report', timestamp: '2024-01-15 14:20' }
      ];
    }
  };

  export default function App() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [executionTime, setExecutionTime] = useState(null);

    // ❌ BAD: Sequential awaits create waterfall
    const fetchUserDataWaterfall = async (userId) => {
      const startTime = performance.now();
      setLoading(true);
      setData(null);

      try {
        // Wait for user (800ms)
        const user = await mockAPI.getUserProfile(userId);

        // Wait for features based on role (600ms or 400ms)
        const features = user.role === 'premium'
          ? await mockAPI.getPremiumFeatures()
          : await mockAPI.getFreeFeatures();

        // Wait for activity log (700ms)
        const activity = await mockAPI.getActivityLog();

        // Total time: 800 + (600 or 400) + 700 = ~2100ms or 1900ms

        setData({ user, features, activity });
        setExecutionTime(performance.now() - startTime);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    // TODO: ✅ GOOD: Defer awaits, parallelize independent operations
    const fetchUserDataOptimized = async (userId) => {
      const startTime = performance.now();
      setLoading(true);
      setData(null);

      try {
        // TODO: Start all promises immediately (don't await yet)
        // Start user profile fetch
        // Start activity log fetch (independent of user data)

        // TODO: Await user first (we need it to determine features)

        // TODO: Now conditionally start and await the right features call
        // Only await getPremiumFeatures OR getFreeFeatures based on user.role

        // TODO: Await activity log (was running in parallel the whole time)

        // Total time should be: max(800, 700) + (600 or 400) = ~1400ms or 1200ms
        // We saved ~700ms by parallelizing user + activity fetches!

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui' }}>
        <h1>Async Performance: Defer Await Pattern</h1>

        <div style={{
          padding: '20px',
          background: '#e3f2fd',
          borderRadius: '8px',
          marginBottom: '20px',
          borderLeft: '4px solid #2196F3'
        }}>
          <strong>Performance Concept:</strong>
          <p style={{ margin: '10px 0 0' }}>
            Don't await promises until you need their results. Start promises early,
            await late. This allows independent operations to run in parallel.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <button
            onClick={() => fetchUserDataWaterfall(1)}
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
            ❌ Waterfall Version (~2100ms)
          </button>

          <button
            onClick={() => fetchUserDataOptimized(1)}
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
            ✅ Optimized Version (~1400ms)
          </button>
        </div>

        {loading && (
          <div style={{
            padding: '20px',
            textAlign: 'center',
            background: '#fff3e0',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
            <div>Loading user data...</div>
          </div>
        )}

        {executionTime && (
          <div style={{
            padding: '15px',
            background: executionTime < 1500 ? '#c8e6c9' : '#ffcdd2',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <strong>Execution Time:</strong> {Math.round(executionTime)}ms
            {executionTime < 1500 && ' 🚀 (Optimized!)'}
          </div>
        )}

        {data && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* User Profile Card */}
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              background: '#fff'
            }}>
              <h2 style={{ marginTop: 0 }}>👤 User Profile</h2>
              <div><strong>Name:</strong> {data.user.name}</div>
              <div><strong>Role:</strong> {data.user.role}</div>
              <div><strong>Theme:</strong> {data.user.preferences.theme}</div>
            </div>

            {/* Features Card */}
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              background: data.user.role === 'premium' ? '#f3e5f5' : '#fff'
            }}>
              <h2 style={{ marginTop: 0 }}>
                {data.user.role === 'premium' ? '⭐ Premium Features' : '📦 Free Features'}
              </h2>
              <ul style={{ marginBottom: 0 }}>
                {data.features.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              {data.features.upgradePrompt && (
                <div style={{ marginTop: '10px', color: '#ff6f00' }}>
                  {data.features.upgradePrompt}
                </div>
              )}
            </div>

            {/* Activity Log Card */}
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              background: '#fff'
            }}>
              <h2 style={{ marginTop: 0 }}>📊 Activity Log</h2>
              {data.activity.map(log => (
                <div key={log.id} style={{
                  padding: '10px',
                  background: '#f5f5f5',
                  borderRadius: '4px',
                  marginBottom: '8px'
                }}>
                  <div><strong>{log.action}</strong></div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{log.timestamp}</div>
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
          <h3 style={{ marginTop: 0 }}>Performance Analysis</h3>
          <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
            <div><strong>❌ Waterfall (Sequential):</strong></div>
            <div>→ getUserProfile: 800ms</div>
            <div>→ getFeatures: 400-600ms</div>
            <div>→ getActivityLog: 700ms</div>
            <div><strong>Total: ~1900-2100ms</strong></div>
            <br />
            <div><strong>✅ Optimized (Parallel):</strong></div>
            <div>→ getUserProfile + getActivityLog in parallel: max(800, 700) = 800ms</div>
            <div>→ getFeatures (after knowing user role): 400-600ms</div>
            <div><strong>Total: ~1200-1400ms (33% faster!)</strong></div>
          </div>
        </div>
      </div>
    );
  }
---

## Task

Build a user dashboard that demonstrates the performance impact of deferring await statements. Learn how moving awaits into conditional branches eliminates waterfalls and improves load time.

### Requirements

1. **Implement Optimized Version**
   - Start getUserProfile promise immediately (don't await)
   - Start getActivityLog promise immediately (independent operation)
   - Await getUserProfile first (we need role to decide features)
   - Conditionally start and await getPremiumFeatures OR getFreeFeatures
   - Await getActivityLog (was running in parallel)
   - Total time should be ~1200-1400ms

2. **Performance Optimization**
   - Parallelize getUserProfile + getActivityLog (both start immediately)
   - Only await getUserProfile when you need to check the role
   - Don't await getActivityLog until the end (runs in background)
   - Avoid sequential awaits that don't depend on each other
   - Measure execution time with performance.now()

3. **Correct Data Flow**
   - Must fetch user first to determine premium vs free features
   - Activity log is independent and can run in parallel
   - Features request depends on user.role
   - All data must be available before rendering
   - Handle errors gracefully

4. **UI Requirements**
   - Show execution time for each version
   - Highlight when optimized version is faster (< 1500ms)
   - Display user profile, features, and activity log
   - Different styling for premium vs free users
   - Loading state while fetching

5. **Timing Analysis**
   - Waterfall should take ~1900-2100ms
   - Optimized should take ~1200-1400ms
   - Difference should be ~600-700ms (parallel savings)
   - Visual feedback showing which is faster

### Example Behavior

**Waterfall Version:**
- Start → getUserProfile (800ms) → wait
- Then → getFeatures (600ms) → wait
- Then → getActivityLog (700ms) → wait
- Total: 2100ms

**Optimized Version:**
- Start → getUserProfile + getActivityLog (both start)
- After 800ms → getUserProfile resolves, start getFeatures
- After 1400ms → getFeatures resolves
- After 800ms → getActivityLog resolves (was running in parallel)
- Total: 1400ms (33% faster!)

### Bonus Challenges

- Add visual timeline showing when each API call starts/ends
- Implement with 4-5 API calls to show larger savings
- Add a "race condition" scenario where order matters
- Show network waterfall diagram
- Add retry logic that maintains parallelization
- Implement with real fetch calls and AbortController
- Add percentage improvement calculator
- Create a comparison table of both approaches
