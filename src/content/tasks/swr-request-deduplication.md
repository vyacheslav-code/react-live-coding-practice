---
title: SWR Request Deduplication
description: Use SWR for automatic request deduplication and cache management
tags:
  - data fetching
  - SWR
  - caching
  - performance
difficulty: medium
timeEstimate: 30
learningGoals:
  - Understand request deduplication pattern
  - Implement SWR-style caching
  - Prevent duplicate network requests
  - Share data across components
  - Manage cache invalidation
hints:
  - Multiple components requesting same data should trigger only one fetch
  - Store in-flight requests in a Map keyed by URL
  - Return the same Promise for duplicate requests
  - Cache responses for revalidation
  - Consider stale-while-revalidate pattern
starterCode: |
  import { useState, useEffect, useRef } from 'react';

  // Global cache for requests and data
  const cache = new Map();
  const inFlightRequests = new Map();

  // TODO: Implement useSWR hook with deduplication
  function useSWR(key, fetcher, options = {}) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      // TODO: Check if request is already in-flight
      // TODO: If yes, reuse the existing Promise
      // TODO: If no, start new request and store Promise
      // TODO: Cache the result when request completes
      // TODO: Handle errors and cache invalidation
    }, [key]);

    return { data, error, isLoading };
  }

  // Component that fetches user data
  function UserProfile({ userId }) {
    const { data, error, isLoading } = useSWR(
      `/api/users/${userId}`,
      async (url) => {
        console.log(`Fetching: ${url}`);
        const response = await fetch(`https://jsonplaceholder.typicode.com${url}`);
        return response.json();
      }
    );

    if (isLoading) return <div>Loading user...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;

    return (
      <div style={{ padding: '10px', border: '1px solid #ddd', margin: '5px' }}>
        <h3>{data.name}</h3>
        <p>Email: {data.email}</p>
        <p>Username: {data.username}</p>
      </div>
    );
  }

  // Component that fetches user posts
  function UserPosts({ userId }) {
    const { data, error, isLoading } = useSWR(
      `/api/users/${userId}`,
      async (url) => {
        console.log(`Fetching: ${url}`);
        const response = await fetch(`https://jsonplaceholder.typicode.com${url}`);
        return response.json();
      }
    );

    if (isLoading) return <div>Loading posts info...</div>;
    if (error) return <div>Error loading posts</div>;
    if (!data) return null;

    return (
      <div style={{ padding: '10px', border: '1px solid #ddd', margin: '5px' }}>
        <p>Posts by: {data.name}</p>
        <p>Company: {data.company?.name}</p>
      </div>
    );
  }

  export default function App() {
    const [userId, setUserId] = useState(1);
    const [requestCount, setRequestCount] = useState(0);
    const [showBoth, setShowBoth] = useState(false);

    // Track actual network requests
    useEffect(() => {
      const originalFetch = window.fetch;
      window.fetch = function(...args) {
        setRequestCount(prev => prev + 1);
        return originalFetch.apply(this, args);
      };

      return () => {
        window.fetch = originalFetch;
      };
    }, []);

    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>SWR Request Deduplication</h1>

        <div style={{ marginBottom: '20px' }}>
          <label>
            User ID:
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
              min="1"
              max="10"
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
          <button
            onClick={() => setShowBoth(!showBoth)}
            style={{ marginLeft: '10px', padding: '5px 10px' }}
          >
            {showBoth ? 'Hide Posts' : 'Show Both Components'}
          </button>
        </div>

        <div style={{
          padding: '10px',
          background: '#e3f2fd',
          marginBottom: '20px',
          borderRadius: '4px'
        }}>
          <strong>Network Requests Made: {requestCount}</strong>
          <p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>
            Both components request same data - should only fetch once!
          </p>
        </div>

        <UserProfile userId={userId} />

        {showBoth && <UserPosts userId={userId} />}

        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <h3>Expected Behavior</h3>
          <ul>
            <li>When showing both components, only ONE network request should be made</li>
            <li>Both components should display data from the shared cache</li>
            <li>Changing user ID should trigger a new request</li>
            <li>Open browser console to see "Fetching" logs</li>
          </ul>
        </div>
      </div>
    );
  }
---

Implement SWR-style request deduplication to prevent unnecessary duplicate network requests when multiple components request the same data.

## Requirements

- Create useSWR hook that deduplicates requests with same key
- Multiple components requesting same data should trigger only one fetch
- Store in-flight requests to prevent duplicates
- Cache completed responses for instant reuse
- Handle loading and error states correctly
- All components should receive the same data
- Track network requests to verify deduplication works

## Request Deduplication Pattern

When multiple components request the same resource:
1. First component triggers fetch, stores Promise in Map
2. Second component finds in-flight request, reuses same Promise
3. Both components receive data when Promise resolves
4. Result is cached for immediate reuse

## Implementation Strategy

```javascript
const inFlightRequests = new Map();
const cache = new Map();

function useSWR(key, fetcher) {
  // Check cache first
  // Check in-flight requests
  // If neither, start new request
  // Store Promise while in-flight
  // Cache result when complete
  // Notify all subscribers
}
```

## Cache Structure

You'll need to manage:
- **In-flight Map**: `key -> Promise` (active requests)
- **Cache Map**: `key -> { data, error, timestamp }` (completed)
- **Subscribers**: Components waiting for same data

## Advanced Features (Optional)

- Stale-while-revalidate: Show cached data, fetch fresh in background
- Cache expiration with TTL
- Manual cache invalidation/mutation
- Retry on error
- Focus revalidation

## Testing Your Implementation

1. Open browser console
2. Enable "Show Both Components"
3. Watch console logs - should see only ONE "Fetching" log
4. Network requests counter should increment by 1, not 2
5. Both components should display same data simultaneously

## Learning Objectives

Understand how libraries like SWR and React Query deduplicate requests to improve performance. Learn to manage shared async state across components without prop drilling. Master caching strategies for client-side data fetching.

## Real-World Use Cases

- Product details page with multiple components showing same product
- User profile data used in header, sidebar, and main content
- Shared configuration or feature flags
- Real-time data that multiple components display differently
