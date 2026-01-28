---
title: React.cache() for Request Deduplication
description: Use React.cache() to automatically deduplicate identical fetches within a single server request
tags:
  - react-cache
  - server-components
  - performance
  - deduplication
  - vercel-best-practices
difficulty: medium
timeEstimate: 30
learningGoals:
  - Understand how React.cache() deduplicates function calls per-request
  - Prevent redundant database/API calls when same data is needed in multiple components
  - Learn the difference between React.cache() and traditional caching
  - Implement per-request memoization for server components
  - Optimize server-side rendering performance
hints:
  - React.cache() creates a per-request memoization boundary
  - Same arguments = same cached result within one request
  - Cache is discarded after the request completes
  - Wrap your data fetching functions with React.cache()
  - Multiple components can call the same cached function without redundant fetches
starterCode: |
  'use client';
  import { useState } from 'react';

  // Simulate server-side data fetching with delays
  // In real app, these would be actual database/API calls
  let fetchCount = {
    user: 0,
    posts: 0,
    comments: 0,
    metadata: 0
  };

  const mockServerFunctions = {
    // Simulate expensive database query
    async fetchUser(userId) {
      fetchCount.user++;
      console.log(`[FETCH ${fetchCount.user}] getUserById(${userId})`);
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        id: userId,
        name: 'Alex Rivera',
        email: 'alex@example.com',
        avatar: '👤'
      };
    },

    // Simulate API call
    async fetchUserPosts(userId) {
      fetchCount.posts++;
      console.log(`[FETCH ${fetchCount.posts}] getUserPosts(${userId})`);
      await new Promise(resolve => setTimeout(resolve, 400));
      return [
        { id: 1, title: 'Understanding React Cache', likes: 42 },
        { id: 2, title: 'Server Components Guide', likes: 38 }
      ];
    },

    // Simulate metadata fetch
    async fetchUserMetadata(userId) {
      fetchCount.metadata++;
      console.log(`[FETCH ${fetchCount.metadata}] getUserMetadata(${userId})`);
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        joinedAt: '2023-01-15',
        lastActive: '2024-01-28',
        followers: 1234
      };
    },

    // Simulate comments fetch
    async fetchUserComments(userId) {
      fetchCount.comments++;
      console.log(`[FETCH ${fetchCount.comments}] getUserComments(${userId})`);
      await new Promise(resolve => setTimeout(resolve, 350));
      return [
        { id: 1, text: 'Great article!', postId: 1 },
        { id: 2, text: 'Very helpful', postId: 2 }
      ];
    }
  };

  // TODO: Implement React.cache() wrappers
  // These should deduplicate calls with same arguments
  // Example pattern:
  // const getCachedUser = React.cache(async (userId) => {
  //   return await mockServerFunctions.fetchUser(userId);
  // });

  // ❌ WITHOUT React.cache() - Multiple redundant fetches
  async function loadUserProfileUncached(userId) {
    // Each component calls these independently
    // Result: Same userId fetched 3-4 times!
    const user = await mockServerFunctions.fetchUser(userId);
    const posts = await mockServerFunctions.fetchUserPosts(userId);
    const metadata = await mockServerFunctions.fetchUserMetadata(userId);
    const comments = await mockServerFunctions.fetchUserComments(userId);

    return { user, posts, metadata, comments };
  }

  // TODO: ✅ WITH React.cache() - Deduplication
  async function loadUserProfileCached(userId) {
    // TODO: Call cached versions instead
    // If getCachedUser(1) is called 3 times, only 1 fetch happens
    // All 3 calls get the same cached result

    // TODO: Implement this function using your cached wrappers
    // It should call the same functions as above but through cache
  }

  // Simulate multiple components needing same data
  function UserHeader({ userId, data }) {
    if (!data) return null;
    return (
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>
          {data.user.avatar} {data.user.name}
        </div>
        <div style={{ opacity: 0.9 }}>{data.user.email}</div>
      </div>
    );
  }

  function UserStats({ userId, data }) {
    if (!data) return null;
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div style={{
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
            {data.posts.length}
          </div>
          <div style={{ color: '#666', fontSize: '14px' }}>Posts</div>
        </div>
        <div style={{
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
            {data.metadata.followers}
          </div>
          <div style={{ color: '#666', fontSize: '14px' }}>Followers</div>
        </div>
        <div style={{
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
            {data.comments.length}
          </div>
          <div style={{ color: '#666', fontSize: '14px' }}>Comments</div>
        </div>
      </div>
    );
  }

  function UserContent({ userId, data }) {
    if (!data) return null;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h3 style={{ marginTop: 0 }}>Recent Posts</h3>
          {data.posts.map(post => (
            <div key={post.id} style={{
              padding: '12px',
              background: '#f5f5f5',
              borderRadius: '4px',
              marginBottom: '10px'
            }}>
              <div style={{ fontWeight: 'bold' }}>{post.title}</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                ❤️ {post.likes} likes
              </div>
            </div>
          ))}
        </div>
        <div style={{
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h3 style={{ marginTop: 0 }}>Activity</h3>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
            Joined: {data.metadata.joinedAt}<br />
            Last active: {data.metadata.lastActive}
          </div>
          <h4>Recent Comments</h4>
          {data.comments.map(comment => (
            <div key={comment.id} style={{
              padding: '8px',
              background: '#f5f5f5',
              borderRadius: '4px',
              marginBottom: '8px',
              fontSize: '13px'
            }}>
              {comment.text}
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default function App() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [metrics, setMetrics] = useState(null);

    const resetFetchCount = () => {
      fetchCount = { user: 0, posts: 0, comments: 0, metadata: 0 };
    };

    const loadUncached = async () => {
      resetFetchCount();
      setLoading(true);
      setData(null);
      setMetrics(null);

      const startTime = performance.now();
      const result = await loadUserProfileUncached(1);
      const duration = performance.now() - startTime;

      setData(result);
      setMetrics({
        duration: Math.round(duration),
        fetches: { ...fetchCount },
        totalFetches: Object.values(fetchCount).reduce((a, b) => a + b, 0)
      });
      setLoading(false);
    };

    const loadCached = async () => {
      resetFetchCount();
      setLoading(true);
      setData(null);
      setMetrics(null);

      const startTime = performance.now();
      const result = await loadUserProfileCached(1);
      const duration = performance.now() - startTime;

      setData(result);
      setMetrics({
        duration: Math.round(duration),
        fetches: { ...fetchCount },
        totalFetches: Object.values(fetchCount).reduce((a, b) => a + b, 0)
      });
      setLoading(false);
    };

    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui' }}>
        <h1>React.cache() Deduplication</h1>

        <div style={{
          padding: '20px',
          background: '#e3f2fd',
          borderRadius: '8px',
          marginBottom: '20px',
          borderLeft: '4px solid #2196F3'
        }}>
          <strong>Server Performance Concept:</strong>
          <p style={{ margin: '10px 0 0' }}>
            React.cache() automatically deduplicates function calls within a single server request.
            If multiple components need the same data, only one fetch happens. Cache is per-request
            and discarded after response is sent.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={loadUncached}
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
            ❌ Without Cache (Redundant)
          </button>

          <button
            onClick={loadCached}
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
            ✅ With React.cache() (Deduplicated)
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
            <div>Loading profile...</div>
          </div>
        )}

        {metrics && (
          <div style={{
            padding: '20px',
            background: metrics.totalFetches <= 4 ? '#c8e6c9' : '#ffcdd2',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginTop: 0 }}>Performance Metrics</h3>
            <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
              <div><strong>Duration:</strong> {metrics.duration}ms</div>
              <div><strong>Total Fetches:</strong> {metrics.totalFetches}</div>
              <div style={{ marginTop: '10px' }}>
                <div>- fetchUser: {metrics.fetches.user}x</div>
                <div>- fetchUserPosts: {metrics.fetches.posts}x</div>
                <div>- fetchUserMetadata: {metrics.fetches.metadata}x</div>
                <div>- fetchUserComments: {metrics.fetches.comments}x</div>
              </div>
              {metrics.totalFetches <= 4 && (
                <div style={{ marginTop: '10px', fontWeight: 'bold', color: '#2e7d32' }}>
                  ✅ Deduplication working! Only 1 fetch per function.
                </div>
              )}
            </div>
          </div>
        )}

        {data && (
          <div>
            <UserHeader userId={1} data={data} />
            <UserStats userId={1} data={data} />
            <UserContent userId={1} data={data} />
          </div>
        )}

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <h3 style={{ marginTop: 0 }}>How React.cache() Works</h3>
          <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
            <div><strong>Without cache:</strong></div>
            <div>→ UserHeader calls fetchUser(1)</div>
            <div>→ UserStats calls fetchUser(1) again</div>
            <div>→ UserContent calls fetchUser(1) again</div>
            <div style={{ color: '#d32f2f' }}>Result: 3 identical fetches! 🔴</div>
            <br />
            <div><strong>With React.cache():</strong></div>
            <div>→ UserHeader calls getCachedUser(1) - FETCH</div>
            <div>→ UserStats calls getCachedUser(1) - CACHED ✓</div>
            <div>→ UserContent calls getCachedUser(1) - CACHED ✓</div>
            <div style={{ color: '#2e7d32' }}>Result: 1 fetch, 2 cache hits! 🟢</div>
            <br />
            <div style={{ background: '#fff3cd', padding: '10px', borderRadius: '4px' }}>
              <strong>Key Point:</strong> Cache is per-request only. Next request starts fresh.
              This prevents stale data while eliminating redundant fetches within same request.
            </div>
          </div>
        </div>
      </div>
    );
  }
---

## Task

Build a user profile dashboard that demonstrates React.cache() for per-request deduplication. Show how wrapping data fetching functions eliminates redundant calls when multiple components need the same data.

### Requirements

1. **Implement React.cache() Wrappers**
   - Create getCachedUser using React.cache()
   - Create getCachedUserPosts using React.cache()
   - Create getCachedUserMetadata using React.cache()
   - Create getCachedUserComments using React.cache()
   - Each wrapper should call the corresponding mock function

2. **Implement Cached Loading Function**
   - Complete loadUserProfileCached function
   - Call all 4 cached functions with same userId
   - Verify only 1 fetch happens per function (4 total)
   - Return all data in same format as uncached version

3. **Performance Comparison**
   - Uncached version should show 4+ fetches
   - Cached version should show exactly 4 fetches (1 per function)
   - Track fetch count for each function type
   - Measure and display execution time
   - Highlight when deduplication is working

4. **UI Requirements**
   - UserHeader component displays user info
   - UserStats component shows post/follower/comment counts
   - UserContent component shows posts and activity
   - All components receive same userId and data
   - Visual metrics showing fetch count breakdown

5. **Metrics Display**
   - Show total fetch count
   - Show per-function fetch counts
   - Display execution time
   - Green background when ≤4 fetches (cached)
   - Red background when >4 fetches (uncached)
   - Success message when deduplication works

### Example Behavior

**Without React.cache():**
- UserHeader fetches user, posts, metadata, comments
- UserStats fetches all again (4 more fetches)
- UserContent fetches all again (4 more fetches)
- Total: 12 fetches for same userId

**With React.cache():**
- UserHeader calls getCachedUser(1) → FETCH (first call)
- UserStats calls getCachedUser(1) → CACHED (same args)
- UserContent calls getCachedUser(1) → CACHED (same args)
- Same pattern for other 3 functions
- Total: 4 fetches (one per unique function+args combination)

### Bonus Challenges

- Add support for different userIds and show cache isolation
- Implement cache key visualization showing what's cached
- Add timestamp to show cache hits happen instantly
- Create cache hit/miss counter
- Implement with real React Server Components
- Add manual cache invalidation
- Show memory usage comparison
- Implement cache analytics dashboard
- Add waterfall diagram showing parallel vs sequential
- Compare with React Query or SWR caching strategies
