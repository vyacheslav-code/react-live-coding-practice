---
title: Render Props Pattern - Data Fetcher
description: Implement flexible data fetching with render props for maximum composability
tags:
  - advanced-patterns
  - render-props
  - composition
  - data-fetching
difficulty: medium
timeEstimate: 30
learningGoals:
  - Understand and implement render props pattern
  - Create flexible rendering with function children
  - Handle multiple render prop variants
  - Compose multiple data sources
  - Manage loading and error states
hints:
  - Accept a function as children prop that receives data and state
  - Support both children and render prop variations
  - Provide loading, error, data, and refetch to render function
  - Use useEffect to fetch data when dependencies change
  - Handle cleanup for cancelled requests
starterCode: |
  import { useState, useEffect } from 'react';

  // DataFetcher component using render props
  function DataFetcher({ url, children, render }) {
    // TODO: Implement state for:
    // - data (fetched data)
    // - loading (boolean)
    // - error (error object or null)

    // TODO: Implement fetch logic with useEffect
    // - Fetch when url changes
    // - Handle loading state
    // - Handle errors
    // - Handle cleanup/cancellation

    // TODO: Implement refetch function

    // TODO: Call render prop with state
    // Support both `children` and `render` props
    // Pass: { data, loading, error, refetch }

    const renderProp = children || render;

    return renderProp({
      data: null,
      loading: false,
      error: null,
      refetch: () => {},
    });
  }

  // Example: Composing multiple data fetchers
  function ComposedData({ children }) {
    // TODO: Implement a component that fetches from multiple sources
    // and composes the results
    return null;
  }

  // Mock API endpoints (for demo)
  const MOCK_USERS_API = 'https://jsonplaceholder.typicode.com/users';
  const MOCK_POSTS_API = 'https://jsonplaceholder.typicode.com/posts?_limit=5';

  export default function App() {
    const [userId, setUserId] = useState(1);

    return (
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Render Props Pattern</h1>

        {/* Example 1: Basic render prop */}
        <section style={{ marginBottom: '40px' }}>
          <h2>Users List (children function)</h2>
          <DataFetcher url={MOCK_USERS_API}>
            {({ data, loading, error, refetch }) => {
              if (loading) return <p>Loading users...</p>;
              if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

              return (
                <div>
                  <button onClick={refetch} style={{ marginBottom: '10px' }}>
                    Refresh
                  </button>
                  <ul>
                    {data?.slice(0, 5).map(user => (
                      <li key={user.id}>{user.name} ({user.email})</li>
                    ))}
                  </ul>
                </div>
              );
            }}
          </DataFetcher>
        </section>

        {/* Example 2: Alternative render prop */}
        <section style={{ marginBottom: '40px' }}>
          <h2>Posts (render prop)</h2>
          <DataFetcher
            url={MOCK_POSTS_API}
            render={({ data, loading, error }) => {
              if (loading) return <p>Loading posts...</p>;
              if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

              return (
                <div>
                  {data?.map(post => (
                    <div
                      key={post.id}
                      style={{
                        padding: '15px',
                        marginBottom: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                      }}
                    >
                      <h3 style={{ margin: '0 0 8px 0' }}>{post.title}</h3>
                      <p style={{ margin: 0, color: '#666' }}>{post.body}</p>
                    </div>
                  ))}
                </div>
              );
            }}
          />
        </section>

        {/* Example 3: Composed data fetchers */}
        <section>
          <h2>Composed Data (Advanced)</h2>
          <p>TODO: Fetch user + posts together and compose results</p>
        </section>
      </div>
    );
  }
---

Implement a flexible data fetching component using the render props pattern. This pattern provides maximum flexibility for rendering, allowing consumers to control exactly how data is displayed.

## Requirements

### DataFetcher Component

**State Management:**
- `data`: The fetched data (null initially)
- `loading`: Boolean loading state
- `error`: Error object or null

**Props:**
- `url`: The API endpoint to fetch from
- `children`: Function that receives render props
- `render`: Alternative prop for render function (support both)

**Functionality:**
- Fetch data when component mounts
- Refetch when `url` changes
- Provide `refetch()` function for manual refresh
- Handle errors gracefully
- Cancel in-flight requests on unmount or url change

### Render Props API

Pass these values to the render function:
```javascript
{
  data: any,          // Fetched data
  loading: boolean,   // Loading state
  error: Error | null, // Error if fetch failed
  refetch: () => void  // Function to manually refetch
}
```

### Support Both Patterns
```javascript
// Pattern 1: children as function
<DataFetcher url={url}>
  {({ data, loading }) => <div>{data}</div>}
</DataFetcher>

// Pattern 2: render prop
<DataFetcher url={url} render={({ data }) => <div>{data}</div>} />
```

## Advanced Challenges

1. **Composed Data Fetchers**: Create a component that fetches from multiple URLs and composes results
2. **Caching**: Implement simple caching to avoid refetching same URLs
3. **Debouncing**: Add debounce option to prevent rapid refetches
4. **Suspense**: Convert to use React Suspense for data fetching
5. **TypeScript**: Add proper generic types for data shape
6. **Polling**: Add option to poll endpoint at intervals
7. **Optimistic Updates**: Support optimistic UI updates

## Composition Example

```javascript
<DataFetcher url="/api/user">
  {({ data: user, loading: userLoading }) => (
    <DataFetcher url={`/api/posts/${user.id}`}>
      {({ data: posts, loading: postsLoading }) => (
        <UserWithPosts
          user={user}
          posts={posts}
          loading={userLoading || postsLoading}
        />
      )}
    </DataFetcher>
  )}
</DataFetcher>
```

## Design Patterns to Learn

1. **Render Props**: Pass rendering control to component consumers
2. **Separation of Concerns**: Logic (fetching) separated from presentation (rendering)
3. **Composability**: Easy to compose multiple data sources
4. **Inversion of Control**: Consumer controls rendering completely
5. **Function as Children**: Modern React pattern for flexibility

## Real-World Usage

This pattern is used by:
- React Router (Route component)
- Formik (Form state management)
- Apollo Client (Query component - before hooks)
- Downshift (Accessible dropdown logic)

While hooks have largely replaced render props for simple cases, render props remain valuable for:
- Maximum rendering flexibility
- Sharing logic without hooks
- Library APIs that need to be framework-agnostic

## Validation Tips

- Test loading state appears immediately
- Test error handling with invalid URLs
- Test refetch functionality
- Test cleanup (check network tab for cancelled requests)
- Test composition of multiple DataFetchers
- Verify both `children` and `render` prop APIs work
