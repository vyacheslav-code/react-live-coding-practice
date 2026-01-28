---
title: Suspense Boundaries for Streaming Content
description: Use React Suspense to stream content as it loads, eliminating render-blocking waterfalls
tags:
  - suspense
  - streaming
  - performance
  - async
  - vercel-best-practices
difficulty: hard
timeEstimate: 35
learningGoals:
  - Understand how Suspense enables streaming architecture
  - Create multiple Suspense boundaries for independent data
  - Stream content progressively as promises resolve
  - Avoid blocking entire page render on slowest request
  - Implement error boundaries with Suspense
hints:
  - Wrap async components in Suspense with fallback
  - Each Suspense boundary streams independently
  - Throw promises to trigger Suspense (use "use" hook or throw manually)
  - Parent components render immediately, children stream in
  - Combine with ErrorBoundary for error handling
starterCode: |
  import { Suspense, useState } from 'react';

  // Mock API with different delays
  const mockAPI = {
    fetchUser: () =>
      new Promise(resolve =>
        setTimeout(() => resolve({
          name: 'Sarah Connor',
          avatar: '👩',
          status: 'online'
        }), 800)
      ),

    fetchPosts: () =>
      new Promise(resolve =>
        setTimeout(() => resolve([
          { id: 1, title: 'React 19 is amazing', likes: 42 },
          { id: 2, title: 'Suspense changes everything', likes: 38 },
          { id: 3, title: 'Performance tips', likes: 55 }
        ]), 1500)
      ),

    fetchComments: () =>
      new Promise(resolve =>
        setTimeout(() => resolve([
          { id: 1, text: 'Great post!', author: 'Alice' },
          { id: 2, text: 'Very helpful', author: 'Bob' }
        ]), 2200)
      ),

    fetchStats: () =>
      new Promise(resolve =>
        setTimeout(() => resolve({
          followers: 1234,
          posts: 89,
          likes: 5678
        }), 600)
      ),

    fetchActivity: () =>
      new Promise(resolve =>
        setTimeout(() => resolve([
          { action: 'Posted a photo', time: '2h ago' },
          { action: 'Liked a comment', time: '4h ago' },
          { action: 'Followed @john', time: '1d ago' }
        ]), 1800)
      )
  };

  // TODO: Create a promise cache/store
  // Suspense needs promises to be stable across renders
  const promiseCache = new Map();

  function getCachedPromise(key, fetchFn) {
    if (!promiseCache.has(key)) {
      promiseCache.set(key, fetchFn());
    }
    return promiseCache.get(key);
  }

  // TODO: Create components that throw promises for Suspense
  // These components should:
  // 1. Get cached promise
  // 2. Check if it's resolved (wrap in another promise that tracks state)
  // 3. Throw the promise if not resolved (triggers Suspense)
  // 4. Return JSX when resolved

  function UserProfile({ userId }) {
    // TODO: Implement suspense-enabled component
    // Throw promise if data not ready
    // Return JSX when data is ready

    return <div>User component goes here</div>;
  }

  function PostsList() {
    // TODO: Implement suspense-enabled component
    return <div>Posts component goes here</div>;
  }

  function CommentsList() {
    // TODO: Implement suspense-enabled component
    return <div>Comments component goes here</div>;
  }

  function StatsCard() {
    // TODO: Implement suspense-enabled component
    return <div>Stats component goes here</div>;
  }

  function ActivityFeed() {
    // TODO: Implement suspense-enabled component
    return <div>Activity component goes here</div>;
  }

  export default function App() {
    const [showDashboard, setShowDashboard] = useState(false);

    const handleReset = () => {
      promiseCache.clear();
      setShowDashboard(false);
      setTimeout(() => setShowDashboard(true), 0);
    };

    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui' }}>
        <h1>Streaming Dashboard with Suspense</h1>

        <div style={{
          padding: '20px',
          background: '#e3f2fd',
          borderRadius: '8px',
          marginBottom: '20px',
          borderLeft: '4px solid #2196F3'
        }}>
          <strong>Suspense Streaming:</strong>
          <p style={{ margin: '10px 0 0' }}>
            Instead of waiting for ALL data before showing ANYTHING, Suspense lets
            each section stream in as soon as it's ready. Fast content appears first,
            slow content fills in later.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setShowDashboard(true)}
            disabled={showDashboard}
            style={{
              padding: '12px 24px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: showDashboard ? 'not-allowed' : 'pointer',
              marginRight: '10px'
            }}
          >
            Load Dashboard
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '12px 24px',
              background: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset & Reload
          </button>
        </div>

        {showDashboard && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* User Profile - Fast (800ms) */}
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#fff' }}>
              <h2 style={{ marginTop: 0 }}>User Profile</h2>
              <Suspense fallback={
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  <div>⏳ Loading user...</div>
                </div>
              }>
                <UserProfile userId={1} />
              </Suspense>
            </div>

            {/* Stats - Fastest (600ms) */}
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#fff' }}>
              <h2 style={{ marginTop: 0 }}>Statistics</h2>
              <Suspense fallback={
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  <div>⏳ Loading stats...</div>
                </div>
              }>
                <StatsCard />
              </Suspense>
            </div>

            {/* Posts - Medium (1500ms) */}
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#fff', gridColumn: '1 / -1' }}>
              <h2 style={{ marginTop: 0 }}>Recent Posts</h2>
              <Suspense fallback={
                <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                  <div>⏳ Loading posts...</div>
                </div>
              }>
                <PostsList />
              </Suspense>
            </div>

            {/* Activity - Slow (1800ms) */}
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#fff' }}>
              <h2 style={{ marginTop: 0 }}>Activity Feed</h2>
              <Suspense fallback={
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  <div>⏳ Loading activity...</div>
                </div>
              }>
                <ActivityFeed />
              </Suspense>
            </div>

            {/* Comments - Slowest (2200ms) */}
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#fff' }}>
              <h2 style={{ marginTop: 0 }}>Comments</h2>
              <Suspense fallback={
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  <div>⏳ Loading comments...</div>
                </div>
              }>
                <CommentsList />
              </Suspense>
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
          <h3 style={{ marginTop: 0 }}>Expected Streaming Timeline</h3>
          <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
            <div>0ms: Page shell renders instantly with all Suspense fallbacks</div>
            <div>600ms: ✅ Stats loads (fastest)</div>
            <div>800ms: ✅ User Profile loads</div>
            <div>1500ms: ✅ Posts load</div>
            <div>1800ms: ✅ Activity Feed loads</div>
            <div>2200ms: ✅ Comments load (slowest, but doesn't block others!)</div>
            <br />
            <div><strong>Without Suspense:</strong> Wait 2200ms before showing ANYTHING</div>
            <div><strong>With Suspense:</strong> Show content progressively as it arrives</div>
          </div>
        </div>
      </div>
    );
  }
---

## Task

Build a dashboard that uses React Suspense to stream content progressively. Each section loads independently and renders as soon as its data is ready, without blocking other sections.

### Requirements

1. **Suspense-Enabled Components**
   - Create 5 async components (User, Stats, Posts, Activity, Comments)
   - Each component should throw a promise when data isn't ready
   - Each component renders when its promise resolves
   - Use a promise cache to maintain stable references across renders
   - Implement proper promise tracking (pending, resolved, rejected)

2. **Progressive Streaming**
   - Stats should appear first (~600ms)
   - User Profile appears second (~800ms)
   - Posts appear third (~1500ms)
   - Activity appears fourth (~1800ms)
   - Comments appear last (~2200ms)
   - Each section streams in independently

3. **Promise Management**
   - Create a getCachedPromise utility
   - Cache promises in a Map to avoid re-fetching
   - Track promise state (pending/resolved/rejected)
   - Wrap resolved promises to include data
   - Clear cache on reset

4. **Suspense Boundaries**
   - Wrap each async component in its own Suspense boundary
   - Provide meaningful loading fallbacks for each section
   - Fast components don't wait for slow components
   - Page shell renders immediately (0ms)
   - Content fills in as promises resolve

5. **UI Requirements**
   - "Load Dashboard" button to start fetching
   - "Reset & Reload" button to clear cache and restart
   - Loading states for each section
   - Proper styling for each card
   - Show streaming timeline explanation

### Example Behavior

1. User clicks "Load Dashboard"
2. All 5 Suspense fallbacks appear immediately
3. After 600ms → Stats section populates (others still loading)
4. After 800ms → User Profile populates
5. After 1500ms → Posts populate
6. After 1800ms → Activity populates
7. After 2200ms → Comments populate
8. Each section appears independently, no blocking

**Without Suspense:** Wait 2200ms, then show everything at once
**With Suspense:** Show content progressively over 2200ms

### Bonus Challenges

- Add ErrorBoundary to handle failed promises
- Implement skeleton loading states instead of spinners
- Add transition animations as content streams in
- Show visual progress bar tracking which sections are loaded
- Implement with React 19's "use" hook
- Add request waterfall visualization
- Implement nested Suspense (comments within posts)
- Add manual refresh per section
- Cache resolved data in localStorage
- Add timestamp showing when each section loaded
