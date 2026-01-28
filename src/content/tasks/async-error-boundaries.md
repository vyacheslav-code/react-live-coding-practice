---
title: Async Error Boundaries with Suspense
description: Handle async errors gracefully using error boundaries, Suspense, and proper error propagation patterns
tags:
  - async
  - error-handling
  - suspense
  - error-boundaries
  - react-18
difficulty: hard
timeEstimate: 35
learningGoals:
  - Implement error boundaries to catch async errors
  - Integrate Suspense for loading states with error boundaries
  - Propagate errors from async functions to error boundaries
  - Create reusable error boundary components with fallback UI
  - Handle errors at different component tree levels
hints:
  - Error boundaries only catch errors during render, not in event handlers
  - Throw errors during render to trigger error boundaries
  - Use Suspense for loading states, error boundaries for error states
  - Wrap components at appropriate levels for error isolation
  - Store error state and throw during render to bridge async → error boundary
starterCode: |
  import { Component, useState, useEffect, Suspense } from 'react';

  // Mock APIs with different failure scenarios
  const mockAPI = {
    async fetchUserProfile(userId) {
      console.log('Fetching user profile...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (Math.random() < 0.3) {
        throw new Error('Failed to load user profile: User service unavailable');
      }

      return {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: '👤'
      };
    },

    async fetchUserPosts(userId) {
      console.log('Fetching user posts...');
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (Math.random() < 0.25) {
        throw new Error('Failed to load posts: Database connection timeout');
      }

      return [
        { id: 1, title: 'First Post', likes: 42 },
        { id: 2, title: 'Second Post', likes: 28 },
        { id: 3, title: 'Latest Update', likes: 65 }
      ];
    },

    async fetchUserStats(userId) {
      console.log('Fetching user stats...');
      await new Promise(resolve => setTimeout(resolve, 800));

      if (Math.random() < 0.2) {
        throw new Error('Failed to load stats: Analytics service down');
      }

      return {
        followers: 1234,
        following: 567,
        posts: 89
      };
    },

    async fetchNotifications() {
      console.log('Fetching notifications...');
      await new Promise(resolve => setTimeout(resolve, 600));

      if (Math.random() < 0.35) {
        throw new Error('Failed to load notifications: Permission denied');
      }

      return [
        { id: 1, message: 'New follower: Alice', time: '5m ago' },
        { id: 2, message: 'Bob liked your post', time: '15m ago' },
        { id: 3, message: 'New comment from Charlie', time: '1h ago' }
      ];
    }
  };

  // TODO: Implement Error Boundary component
  // This catches errors during render (including thrown errors from async state)
  class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      // TODO: Initialize state with error tracking
    }

    static getDerivedStateFromError(error) {
      // TODO: Update state so next render shows fallback UI
    }

    componentDidCatch(error, errorInfo) {
      // TODO: Log error details
      console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
      // TODO: If error exists, render fallback UI
      // Otherwise render children
      // Include reset functionality
    }
  }

  // TODO: Implement component that fetches data and handles errors
  function UserProfile({ userId }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      // TODO: Fetch user profile
      // On error, store error in state
      // During render, check if error exists and throw it
      // This allows error boundary to catch it
    }, [userId]);

    // TODO: Throw error during render if it exists
    // This is how async errors reach error boundaries
    if (error) throw error;

    // TODO: Handle loading state
    if (!data) return <div style={{ padding: '20px' }}>Loading profile...</div>;

    return (
      <div style={{
        padding: '20px',
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}>
        <div style={{ fontSize: '48px', textAlign: 'center' }}>{data.avatar}</div>
        <h2 style={{ marginTop: '10px', marginBottom: '5px' }}>{data.name}</h2>
        <p style={{ color: '#666', margin: 0 }}>{data.email}</p>
      </div>
    );
  }

  // TODO: Implement Posts component with error handling
  function UserPosts({ userId }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      // TODO: Fetch posts and handle errors
    }, [userId]);

    if (error) throw error;
    if (!data) return <div style={{ padding: '20px' }}>Loading posts...</div>;

    return (
      <div style={{
        padding: '20px',
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}>
        <h3 style={{ marginTop: 0 }}>Recent Posts</h3>
        {data.map(post => (
          <div key={post.id} style={{
            padding: '10px',
            background: '#f8f9fa',
            borderRadius: '4px',
            marginBottom: '10px'
          }}>
            <div style={{ fontWeight: 'bold' }}>{post.title}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>❤️ {post.likes} likes</div>
          </div>
        ))}
      </div>
    );
  }

  // TODO: Implement Stats component with error handling
  function UserStats({ userId }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      // TODO: Fetch stats and handle errors
    }, [userId]);

    if (error) throw error;
    if (!data) return <div style={{ padding: '20px' }}>Loading stats...</div>;

    return (
      <div style={{
        padding: '20px',
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}>
        <h3 style={{ marginTop: 0 }}>Statistics</h3>
        <div><strong>Followers:</strong> {data.followers}</div>
        <div><strong>Following:</strong> {data.following}</div>
        <div><strong>Posts:</strong> {data.posts}</div>
      </div>
    );
  }

  // TODO: Implement Notifications component with error handling
  function Notifications() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      // TODO: Fetch notifications and handle errors
    }, []);

    if (error) throw error;
    if (!data) return <div style={{ padding: '20px' }}>Loading notifications...</div>;

    return (
      <div style={{
        padding: '20px',
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}>
        <h3 style={{ marginTop: 0 }}>Notifications</h3>
        {data.map(notif => (
          <div key={notif.id} style={{
            padding: '10px',
            background: '#e3f2fd',
            borderRadius: '4px',
            marginBottom: '8px',
            fontSize: '14px'
          }}>
            <div>{notif.message}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{notif.time}</div>
          </div>
        ))}
      </div>
    );
  }

  // Error fallback component
  function ErrorFallback({ error, resetError, section }) {
    return (
      <div style={{
        padding: '20px',
        background: '#ffebee',
        border: '2px solid #ff6b6b',
        borderRadius: '8px'
      }}>
        <h3 style={{ marginTop: 0, color: '#c62828' }}>❌ Error in {section}</h3>
        <p style={{ margin: '10px 0', fontSize: '14px' }}>{error.message}</p>
        <button
          onClick={resetError}
          style={{
            padding: '8px 16px',
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  export default function App() {
    const [refreshKey, setRefreshKey] = useState(0);
    const userId = 1;

    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h1>User Dashboard</h1>
          <button
            onClick={() => setRefreshKey(k => k + 1)}
            style={{
              padding: '10px 20px',
              background: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔄 Refresh All
          </button>
        </div>

        <div style={{
          padding: '15px',
          background: '#fff3cd',
          borderRadius: '4px',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          ℹ️ Each section has a 20-35% chance of failing. Errors are isolated by error boundaries.
          Working sections continue to function normally.
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {/* TODO: Wrap UserProfile in ErrorBoundary */}
          {/* Each section should have its own error boundary for isolation */}
          <div key={`profile-${refreshKey}`}>
            <UserProfile userId={userId} />
          </div>

          {/* TODO: Wrap UserPosts in ErrorBoundary */}
          <div key={`posts-${refreshKey}`}>
            <UserPosts userId={userId} />
          </div>

          {/* TODO: Wrap UserStats in ErrorBoundary */}
          <div key={`stats-${refreshKey}`}>
            <UserStats userId={userId} />
          </div>

          {/* TODO: Wrap Notifications in ErrorBoundary */}
          <div key={`notifications-${refreshKey}`}>
            <Notifications />
          </div>
        </div>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          <h3 style={{ marginTop: 0 }}>🎯 Error Boundary Pattern</h3>
          <p>
            <strong>1. Store error in state:</strong> Catch async errors in useEffect
          </p>
          <p>
            <strong>2. Throw during render:</strong> if (error) throw error
          </p>
          <p>
            <strong>3. Error boundary catches:</strong> Shows fallback UI
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>4. Isolation:</strong> Each section has its own boundary, failures don't affect others
          </p>
        </div>
      </div>
    );
  }
---

## Task

Build a resilient dashboard that uses error boundaries to gracefully handle async errors. Implement proper error propagation from async operations to error boundaries, with isolated error handling per section.

### Requirements

1. **Implement ErrorBoundary Component**
   - Create class component extending React.Component
   - Track error state in component state
   - Implement getDerivedStateFromError to update state on error
   - Implement componentDidCatch for error logging
   - Render fallback UI when error exists
   - Provide reset functionality to retry after errors
   - Accept section name prop for better error messages

2. **Async Error Propagation Pattern**
   - In each data component (UserProfile, UserPosts, etc.):
   - Store errors in local state when async operations fail
   - Throw the error during render: if (error) throw error
   - This bridges the gap between async code and error boundaries
   - Error boundaries only catch render errors, not async errors directly

3. **Implement Data Components**
   - Complete UserProfile: fetch and display user profile
   - Complete UserPosts: fetch and display posts list
   - Complete UserStats: fetch and display statistics
   - Complete Notifications: fetch and display notifications
   - Each should handle loading, error, and success states
   - Use the "store then throw" pattern for error propagation

4. **Error Boundary Isolation**
   - Wrap each section in its own ErrorBoundary
   - When one section fails, others continue working
   - Each error boundary shows specific error message
   - Each has independent retry functionality
   - Pass section name to error boundary for context

5. **Error Recovery**
   - Implement reset functionality in error boundaries
   - Allow retrying failed sections individually
   - Include "Refresh All" button to reset everything
   - Use key prop to force remount on retry
   - Clear error state when retrying

### Example Behavior

- Dashboard loads, all 4 sections start fetching
- UserProfile loads successfully in 1s
- UserPosts fails with database error after 1.2s
- Posts section shows error fallback with retry button
- UserStats loads successfully in 800ms
- Notifications loads successfully in 600ms
- 3 sections working, 1 showing error (isolated failure)
- User clicks retry on failed Posts section
- Only Posts section reloads, others stay intact
- If Posts succeeds on retry, error clears and shows data
- User clicks "Refresh All"
- All 4 sections remount and refetch
- Different sections may fail on refresh (randomized)

### Bonus Challenges

- Add Suspense boundaries alongside error boundaries
- Implement exponential backoff for automatic retries
- Show error count and history per section
- Add "Report Error" functionality
- Implement global error boundary as fallback
- Track and display error rates per section
- Add circuit breaker to prevent retry storms
- Create reusable useAsyncError hook
- Integrate with error reporting service (e.g., Sentry)
- Add partial data rendering (show what's available despite errors)
