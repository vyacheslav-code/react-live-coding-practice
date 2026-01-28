---
title: Partial Dependencies Pattern with Promise.all
description: Eliminate waterfalls by fetching partial dependencies in parallel, even when some data depends on others
tags:
  - async
  - performance
  - vercel-best-practices
  - promise-all
  - waterfall-elimination
difficulty: medium
timeEstimate: 30
learningGoals:
  - Identify and eliminate request waterfalls in data dependencies
  - Use Promise.all to fetch independent data in parallel
  - Implement the "better-all" pattern for partial dependencies
  - Start all possible requests immediately before awaiting any
  - Optimize perceived and actual load times by reducing sequential chains
hints:
  - Not all dependencies are truly dependent - find what can start immediately
  - Start promises early, await late - create all promises before awaiting
  - User profile and user posts are independent even if both need userId
  - Group requests by dependency level, fetch each level in parallel
  - Promise.all on the same level, sequential awaits between levels only
starterCode: |
  import { useState } from 'react';

  // Mock API with realistic delays
  const mockAPI = {
    async getUserId(username) {
      console.log('🔍 Fetching user ID...');
      await new Promise(resolve => setTimeout(resolve, 800));
      return { userId: 123, username };
    },

    async getUserProfile(userId) {
      console.log('👤 Fetching user profile...');
      await new Promise(resolve => setTimeout(resolve, 600));
      return {
        userId,
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Software developer',
        avatar: '👨‍💻'
      };
    },

    async getUserPosts(userId) {
      console.log('📝 Fetching user posts...');
      await new Promise(resolve => setTimeout(resolve, 900));
      return [
        { id: 1, userId, title: 'First Post', likes: 42 },
        { id: 2, userId, title: 'Second Post', likes: 28 },
        { id: 3, userId, title: 'Latest Update', likes: 65 }
      ];
    },

    async getUserFollowers(userId) {
      console.log('👥 Fetching followers...');
      await new Promise(resolve => setTimeout(resolve, 700));
      return [
        { id: 1, name: 'Alice', avatar: '👩' },
        { id: 2, name: 'Bob', avatar: '👨' },
        { id: 3, name: 'Charlie', avatar: '🧑' }
      ];
    },

    async getUserSettings(userId) {
      console.log('⚙️ Fetching settings...');
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        theme: 'dark',
        notifications: true,
        language: 'en'
      };
    },

    async getRecommendations(userId) {
      console.log('💡 Fetching recommendations...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        { id: 1, title: 'Learn React Performance' },
        { id: 2, title: 'Async Patterns Guide' }
      ];
    }
  };

  export default function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadTime, setLoadTime] = useState(null);
    const [method, setMethod] = useState(null);

    // TODO: Implement SLOW waterfall version (sequential)
    // This is the WRONG way - demonstrates the problem
    const fetchDataWaterfall = async () => {
      setLoading(true);
      setMethod('waterfall');
      setData(null);
      const startTime = performance.now();

      try {
        // SLOW: Wait for each request before starting the next
        const { userId } = await mockAPI.getUserId('johndoe');
        const profile = await mockAPI.getUserProfile(userId);
        const posts = await mockAPI.getUserPosts(userId);
        const followers = await mockAPI.getUserFollowers(userId);
        const settings = await mockAPI.getUserSettings(userId);
        const recommendations = await mockAPI.getRecommendations(userId);

        const endTime = performance.now();
        setLoadTime(Math.round(endTime - startTime));
        setData({ profile, posts, followers, settings, recommendations });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    // TODO: Implement FAST better-all pattern (parallel where possible)
    // This is the RIGHT way - Vercel best practice
    const fetchDataOptimized = async () => {
      setLoading(true);
      setMethod('optimized');
      setData(null);
      const startTime = performance.now();

      try {
        // FAST: Start all independent requests immediately
        // TODO: First, get userId (must be first)
        // TODO: Then start ALL other requests in parallel with Promise.all
        // All requests only depend on userId, not on each other!

        // Hint: Structure should be:
        // 1. await getUserId (level 0 - required first)
        // 2. Promise.all([profile, posts, followers, settings, recs]) (level 1 - all parallel)

        const endTime = performance.now();
        setLoadTime(Math.round(endTime - startTime));
        // TODO: Set data with results
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeImprovement = loadTime && method === 'optimized' ?
      '~70% faster than waterfall!' : null;

    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <h1>Partial Dependencies Pattern</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Compare waterfall vs. optimized parallel fetching. All requests depend on userId,
          but NOT on each other.
        </p>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <button
            onClick={fetchDataWaterfall}
            disabled={loading}
            style={{
              padding: '12px 24px',
              background: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              fontSize: '16px'
            }}
          >
            🐌 Load with Waterfall (Slow)
          </button>

          <button
            onClick={fetchDataOptimized}
            disabled={loading}
            style={{
              padding: '12px 24px',
              background: '#51cf66',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              fontSize: '16px'
            }}
          >
            🚀 Load Optimized (Fast)
          </button>
        </div>

        {loading && (
          <div style={{
            padding: '20px',
            background: '#e3f2fd',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '18px', marginBottom: '10px' }}>
              ⏳ Loading with {method} method...
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Check console to see request timing
            </div>
          </div>
        )}

        {loadTime && !loading && (
          <div style={{
            padding: '20px',
            background: method === 'optimized' ? '#d4edda' : '#fff3cd',
            borderRadius: '8px',
            marginBottom: '20px',
            border: `2px solid ${method === 'optimized' ? '#51cf66' : '#ffc107'}`
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
              {method === 'waterfall' ? '🐌' : '🚀'} Loaded in {loadTime}ms
            </div>
            {timeImprovement && (
              <div style={{ fontSize: '16px', color: '#28a745', fontWeight: 'bold' }}>
                {timeImprovement}
              </div>
            )}
            <div style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
              Method: {method}
            </div>
          </div>
        )}

        {data && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px'
          }}>
            {/* Profile Card */}
            <div style={{
              padding: '15px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginTop: 0 }}>👤 Profile</h3>
              <div style={{ fontSize: '40px', textAlign: 'center', margin: '10px 0' }}>
                {data.profile.avatar}
              </div>
              <div><strong>{data.profile.name}</strong></div>
              <div style={{ fontSize: '14px', color: '#666' }}>{data.profile.email}</div>
              <div style={{ fontSize: '14px', marginTop: '5px' }}>{data.profile.bio}</div>
            </div>

            {/* Posts Card */}
            <div style={{
              padding: '15px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginTop: 0 }}>📝 Posts ({data.posts.length})</h3>
              {data.posts.map(post => (
                <div key={post.id} style={{
                  padding: '8px',
                  background: '#f8f9fa',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  <div><strong>{post.title}</strong></div>
                  <div style={{ color: '#666', fontSize: '12px' }}>❤️ {post.likes}</div>
                </div>
              ))}
            </div>

            {/* Followers Card */}
            <div style={{
              padding: '15px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginTop: 0 }}>👥 Followers ({data.followers.length})</h3>
              {data.followers.map(follower => (
                <div key={follower.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  <span style={{ fontSize: '24px' }}>{follower.avatar}</span>
                  <span>{follower.name}</span>
                </div>
              ))}
            </div>

            {/* Settings Card */}
            <div style={{
              padding: '15px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginTop: 0 }}>⚙️ Settings</h3>
              <div style={{ fontSize: '14px' }}>
                <div><strong>Theme:</strong> {data.settings.theme}</div>
                <div><strong>Notifications:</strong> {data.settings.notifications ? 'On' : 'Off'}</div>
                <div><strong>Language:</strong> {data.settings.language}</div>
              </div>
            </div>

            {/* Recommendations Card */}
            <div style={{
              padding: '15px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginTop: 0 }}>💡 Recommendations</h3>
              {data.recommendations.map(rec => (
                <div key={rec.id} style={{
                  padding: '8px',
                  background: '#e3f2fd',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  {rec.title}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          <h3 style={{ marginTop: 0 }}>🎯 Key Insight</h3>
          <p style={{ margin: 0 }}>
            <strong>Waterfall:</strong> getUserId (800ms) → profile (600ms) → posts (900ms) →
            followers (700ms) → settings (500ms) → recommendations (1000ms) = ~4500ms total
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Optimized:</strong> getUserId (800ms) → Promise.all([profile, posts, followers,
            settings, recommendations]) = longest of parallel (1000ms) = ~1800ms total
          </p>
        </div>
      </div>
    );
  }
---

## Task

Implement the "partial dependencies" optimization pattern by identifying truly independent requests and fetching them in parallel, even when they share a common dependency.

### Requirements

1. **Identify True Dependencies**
   - getUserId must execute first (everything depends on it)
   - All other requests only depend on userId, not on each other
   - These 5 requests are independent and can run in parallel
   - Don't create false sequential dependencies

2. **Implement Waterfall Version**
   - Complete the fetchDataWaterfall function
   - Await each API call sequentially (the wrong way)
   - Measure total load time with performance.now()
   - This demonstrates the problem to avoid

3. **Implement Optimized Version**
   - Complete the fetchDataOptimized function
   - First await getUserId (required dependency)
   - Then use Promise.all to fetch all 5 remaining APIs in parallel
   - All 5 requests start simultaneously after userId is available
   - Measure and compare load time

4. **Start Promises Early, Await Late**
   - Create all promise objects before awaiting any
   - Don't await inside a loop or sequentially
   - Structure: const p1 = fetch(), p2 = fetch(); await Promise.all([p1, p2])
   - NOT: await fetch(), await fetch()

5. **Measure and Display Performance**
   - Show load time for each method
   - Display which method was used
   - Calculate and show improvement percentage
   - Render all data once loaded

### Example Behavior

- User clicks "Load with Waterfall"
- Requests execute sequentially: ID → profile → posts → followers → settings → recs
- Console shows each request starting only after previous completes
- Total time: ~4500ms (sum of all requests)
- User clicks "Load Optimized"
- Request ID first (800ms)
- Then all 5 requests start simultaneously
- Total time: ~1800ms (800ms + longest parallel request ~1000ms)
- Display shows "~70% faster than waterfall!"

### Bonus Challenges

- Add visual timeline showing when each request starts/ends
- Implement a 3-level dependency graph (not just 2 levels)
- Add error handling that doesn't break parallel execution
- Show individual request times in the UI
- Implement this pattern with React Query or SWR
- Create a generic "dependency resolver" function
- Add a "mixed" version with some parallel, some sequential
