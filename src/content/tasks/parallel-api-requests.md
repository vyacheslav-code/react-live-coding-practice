---
title: Parallel API Requests with Partial Failures
description: Fetch multiple APIs in parallel, aggregate results, handle partial failures, and manage loading states
tags:
  - async
  - promise-all
  - error-handling
  - loading-states
  - useEffect
difficulty: medium
timeEstimate: 30
learningGoals:
  - Execute multiple API calls in parallel with Promise.all
  - Handle partial failures gracefully (some succeed, some fail)
  - Manage individual loading states for each request
  - Aggregate and display combined results
  - Implement request cancellation with AbortController
hints:
  - Use Promise.all or Promise.allSettled for parallel execution
  - Promise.allSettled allows some requests to fail while others succeed
  - Track loading/error state separately for each API endpoint
  - Use AbortController to cancel all pending requests on unmount
  - Show partial results even if some requests fail
starterCode: |
  import { useState, useEffect } from 'react';

  // Mock API endpoints with different delays and failure rates
  const mockAPIs = {
    async fetchUser() {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      if (Math.random() < 0.1) throw new Error('User service unavailable');
      return {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: '👤'
      };
    },

    async fetchPosts() {
      await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
      if (Math.random() < 0.15) throw new Error('Posts service unavailable');
      return [
        { id: 1, title: 'First Post', likes: 42 },
        { id: 2, title: 'Second Post', likes: 15 },
        { id: 3, title: 'Third Post', likes: 28 },
      ];
    },

    async fetchComments() {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 600));
      if (Math.random() < 0.15) throw new Error('Comments service unavailable');
      return [
        { id: 1, author: 'Alice', text: 'Great post!' },
        { id: 2, author: 'Bob', text: 'Thanks for sharing' },
      ];
    },

    async fetchStats() {
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));
      if (Math.random() < 0.1) throw new Error('Stats service unavailable');
      return {
        followers: 1234,
        following: 567,
        totalPosts: 89
      };
    },

    async fetchNotifications() {
      await new Promise(resolve => setTimeout(resolve, 900 + Math.random() * 500));
      if (Math.random() < 0.2) throw new Error('Notifications service unavailable');
      return [
        { id: 1, message: 'New follower: Sarah' },
        { id: 2, message: 'Mike liked your post' },
      ];
    }
  };

  export default function App() {
    const [data, setData] = useState({
      user: null,
      posts: null,
      comments: null,
      stats: null,
      notifications: null
    });

    const [loading, setLoading] = useState({
      user: false,
      posts: false,
      comments: false,
      stats: false,
      notifications: false
    });

    const [errors, setErrors] = useState({
      user: null,
      posts: null,
      comments: null,
      stats: null,
      notifications: null
    });

    const [isRefreshing, setIsRefreshing] = useState(false);

    // TODO: Implement parallel data fetching with Promise.allSettled
    // Fetch all APIs in parallel on mount

    // TODO: Handle cancellation with AbortController
    // Cancel pending requests if component unmounts

    // TODO: Implement refresh functionality
    // Re-fetch all APIs and update states

    const fetchAllData = async () => {
      // TODO: Fetch all APIs in parallel
      // Use Promise.allSettled to handle partial failures
      // Update loading, data, and error states appropriately
    };

    const retryFailedRequest = async (apiName) => {
      // TODO: Retry a single failed request
    };

    useEffect(() => {
      // TODO: Fetch data on mount and cleanup on unmount
    }, []);

    const allLoaded = Object.values(loading).every(l => !l);
    const hasErrors = Object.values(errors).some(e => e !== null);
    const successCount = Object.values(data).filter(d => d !== null).length;
    const totalCount = Object.keys(data).length;

    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h1>Dashboard</h1>
          <button
            onClick={fetchAllData}
            disabled={isRefreshing}
            style={{
              padding: '10px 20px',
              borderRadius: '4px',
              border: 'none',
              background: '#2196F3',
              color: 'white',
              cursor: isRefreshing ? 'not-allowed' : 'pointer',
              opacity: isRefreshing ? 0.5 : 1
            }}
          >
            {isRefreshing ? 'Refreshing...' : '🔄 Refresh All'}
          </button>
        </div>

        <div style={{
          padding: '15px',
          marginBottom: '20px',
          borderRadius: '4px',
          background: allLoaded && !hasErrors ? '#d4edda' :
                     allLoaded && hasErrors ? '#fff3cd' : '#e3f2fd'
        }}>
          <div>Status: {allLoaded ? 'Loaded' : 'Loading...'}</div>
          <div>Success: {successCount}/{totalCount} endpoints</div>
          {hasErrors && <div style={{ color: '#856404' }}>Some requests failed - partial data shown</div>}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {/* User Card */}
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#fff' }}>
            <h2 style={{ marginTop: 0 }}>User Profile</h2>
            {loading.user ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>Loading...</div>
            ) : errors.user ? (
              <div>
                <div style={{ padding: '20px', background: '#ffebee', borderRadius: '4px', marginBottom: '10px' }}>
                  Error: {errors.user}
                </div>
                <button onClick={() => retryFailedRequest('user')} style={{ padding: '5px 10px' }}>
                  Retry
                </button>
              </div>
            ) : data.user ? (
              <div>
                <div style={{ fontSize: '48px', textAlign: 'center' }}>{data.user.avatar}</div>
                <div><strong>Name:</strong> {data.user.name}</div>
                <div><strong>Email:</strong> {data.user.email}</div>
              </div>
            ) : null}
          </div>

          {/* Stats Card */}
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#fff' }}>
            <h2 style={{ marginTop: 0 }}>Statistics</h2>
            {loading.stats ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>Loading...</div>
            ) : errors.stats ? (
              <div>
                <div style={{ padding: '20px', background: '#ffebee', borderRadius: '4px', marginBottom: '10px' }}>
                  Error: {errors.stats}
                </div>
                <button onClick={() => retryFailedRequest('stats')} style={{ padding: '5px 10px' }}>
                  Retry
                </button>
              </div>
            ) : data.stats ? (
              <div>
                <div><strong>Followers:</strong> {data.stats.followers}</div>
                <div><strong>Following:</strong> {data.stats.following}</div>
                <div><strong>Posts:</strong> {data.stats.totalPosts}</div>
              </div>
            ) : null}
          </div>

          {/* Posts Card */}
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#fff' }}>
            <h2 style={{ marginTop: 0 }}>Recent Posts</h2>
            {loading.posts ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>Loading...</div>
            ) : errors.posts ? (
              <div>
                <div style={{ padding: '20px', background: '#ffebee', borderRadius: '4px', marginBottom: '10px' }}>
                  Error: {errors.posts}
                </div>
                <button onClick={() => retryFailedRequest('posts')} style={{ padding: '5px 10px' }}>
                  Retry
                </button>
              </div>
            ) : data.posts ? (
              <div>
                {data.posts.map(post => (
                  <div key={post.id} style={{ marginBottom: '10px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                    <div><strong>{post.title}</strong></div>
                    <div style={{ fontSize: '12px', color: '#666' }}>❤️ {post.likes} likes</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Comments Card */}
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#fff' }}>
            <h2 style={{ marginTop: 0 }}>Comments</h2>
            {loading.comments ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>Loading...</div>
            ) : errors.comments ? (
              <div>
                <div style={{ padding: '20px', background: '#ffebee', borderRadius: '4px', marginBottom: '10px' }}>
                  Error: {errors.comments}
                </div>
                <button onClick={() => retryFailedRequest('comments')} style={{ padding: '5px 10px' }}>
                  Retry
                </button>
              </div>
            ) : data.comments ? (
              <div>
                {data.comments.map(comment => (
                  <div key={comment.id} style={{ marginBottom: '10px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{comment.author}</div>
                    <div>{comment.text}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Notifications Card */}
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#fff' }}>
            <h2 style={{ marginTop: 0 }}>Notifications</h2>
            {loading.notifications ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>Loading...</div>
            ) : errors.notifications ? (
              <div>
                <div style={{ padding: '20px', background: '#ffebee', borderRadius: '4px', marginBottom: '10px' }}>
                  Error: {errors.notifications}
                </div>
                <button onClick={() => retryFailedRequest('notifications')} style={{ padding: '5px 10px' }}>
                  Retry
                </button>
              </div>
            ) : data.notifications ? (
              <div>
                {data.notifications.map(notification => (
                  <div key={notification.id} style={{ marginBottom: '10px', padding: '10px', background: '#e3f2fd', borderRadius: '4px' }}>
                    {notification.message}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          Note: Each API has 10-20% random failure rate. Refresh to retry all or retry individual sections.
        </div>
      </div>
    );
  }
---

## Task

Build a dashboard that fetches multiple API endpoints in parallel, handles partial failures gracefully, and allows individual retry of failed requests.

### Requirements

1. **Parallel Execution**
   - Fetch all 5 API endpoints simultaneously (not sequentially)
   - Use Promise.allSettled to allow partial failures
   - Don't block successful requests if others fail
   - Show loading state for each endpoint independently

2. **Partial Failure Handling**
   - Display successful data even if some requests fail
   - Show error messages for failed requests
   - Provide retry button for each failed section
   - Update overall status (X/5 endpoints loaded)

3. **Loading States**
   - Track loading state per endpoint
   - Show loading spinner for each card
   - Update status bar with overall progress
   - Disable refresh button while loading

4. **Request Cancellation**
   - Use AbortController for all fetch requests
   - Cancel pending requests on component unmount
   - Prevent memory leaks from completed async operations
   - Clean up properly in useEffect

5. **Refresh & Retry**
   - "Refresh All" button to re-fetch everything
   - Individual retry buttons for failed requests
   - Maintain state for successful requests during retry
   - Show appropriate loading states during refresh

### Example Behavior

- Component mounts → All 5 APIs start loading in parallel
- After 600-1200ms → Different cards finish at different times
- User card loads first → Shows immediately (don't wait for others)
- Stats request fails → Shows error with retry button, other cards still load
- All loaded → Status shows "Loaded: 4/5 endpoints" (partial success)
- User clicks retry on stats → Only stats reloads
- User clicks "Refresh All" → All 5 APIs reload simultaneously
- Component unmounts during loading → All requests cancelled

### Bonus Challenges

- Add progress bar showing X/5 loaded
- Implement request timeout (fail after 5s)
- Add skeleton loading states for cards
- Show request duration for each API
- Implement smart retry with exponential backoff
- Add "Load More" for paginated endpoints
- Cache successful results (don't re-fetch on refresh if recent)
