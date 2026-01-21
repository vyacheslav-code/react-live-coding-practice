---
title: Type-Safe API Client Hook
description: Build a generic API client hook with type-safe requests, responses, and error handling
tags:
  - typescript
  - hooks
  - generics
difficulty: hard
timeEstimate: 35
learningGoals:
  - Create generic hooks with type parameters
  - Implement discriminated unions for request states
  - Type-safe URL parameter handling
  - Generic error handling patterns
  - Infer response types from API endpoints
hints:
  - Use a discriminated union for loading/success/error states
  - Create generic types for request and response data
  - Type query parameters based on endpoint requirements
  - Use template literal types for URL construction
  - Consider a type-safe API endpoint registry
starterCode: |
  import { useState, useEffect } from 'react';

  // TODO: Type these API endpoints
  const API_ENDPOINTS = {
    getUser: '/api/users/:id',
    getUsers: '/api/users',
    getPosts: '/api/posts',
    getPost: '/api/posts/:id',
  };

  // TODO: Create type-safe useApi hook
  function useApi(endpoint, params) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      let cancelled = false;

      const fetchData = async () => {
        try {
          setLoading(true);
          // Build URL with params
          let url = endpoint;
          if (params) {
            Object.entries(params).forEach(([key, value]) => {
              url = url.replace(`:${key}`, value);
            });
          }

          const response = await fetch(url);
          if (!response.ok) throw new Error('Request failed');

          const result = await response.json();
          if (!cancelled) {
            setData(result);
            setError(null);
          }
        } catch (err) {
          if (!cancelled) {
            setError(err.message);
            setData(null);
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

      fetchData();
      return () => { cancelled = true; };
    }, [endpoint, params]);

    return { data, loading, error };
  }

  // Mock fetch for demo
  global.fetch = async (url) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (url.includes('/users/1')) {
      return {
        ok: true,
        json: async () => ({ id: 1, name: 'Alice', email: 'alice@example.com' })
      };
    }
    if (url.includes('/posts/42')) {
      return {
        ok: true,
        json: async () => ({ id: 42, title: 'Hello', body: 'World', userId: 1 })
      };
    }
    return {
      ok: true,
      json: async () => ([])
    };
  };

  export default function App() {
    const [userId, setUserId] = useState('1');

    // TODO: These should be fully typed based on endpoint
    const userResult = useApi(API_ENDPOINTS.getUser, { id: userId });
    const postsResult = useApi(API_ENDPOINTS.getPosts);

    return (
      <div>
        <h1>API Client Demo</h1>

        <div>
          <label>User ID: </label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div>
          <h2>User Data</h2>
          {userResult.loading && <p>Loading...</p>}
          {userResult.error && <p>Error: {userResult.error}</p>}
          {userResult.data && (
            <div>
              <p>Name: {userResult.data.name}</p>
              <p>Email: {userResult.data.email}</p>
            </div>
          )}
        </div>

        <div>
          <h2>Posts</h2>
          {postsResult.loading && <p>Loading...</p>}
          {postsResult.error && <p>Error: {postsResult.error}</p>}
          {postsResult.data && (
            <ul>
              {postsResult.data.map(post => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
---

Create a type-safe API client hook that provides full type safety for endpoints, parameters, and response data.

## Requirements

- Define types for all API endpoints with their response types
- Create a discriminated union for request states (loading/success/error)
- Type-safe URL parameter substitution
- Infer response type from endpoint selection
- Generic error handling with typed error objects
- Proper loading and error state management
- Type-safe query parameters

## TypeScript Patterns to Implement

### API Endpoint Registry
```typescript
type User = { id: number; name: string; email: string };
type Post = { id: number; title: string; body: string; userId: number };

type ApiEndpoints = {
  getUser: { url: '/api/users/:id'; params: { id: string }; response: User };
  getUsers: { url: '/api/users'; params: {}; response: User[] };
  getPosts: { url: '/api/posts'; params: {}; response: Post[] };
  getPost: { url: '/api/posts/:id'; params: { id: string }; response: Post };
};
```

### Discriminated Union for State
```typescript
type ApiState<T> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string };
```

### Generic Hook Type
```typescript
function useApi<K extends keyof ApiEndpoints>(
  endpoint: K,
  params: ApiEndpoints[K]['params']
): ApiState<ApiEndpoints[K]['response']>;
```

## Type Safety Goals

- TypeScript enforces required parameters for each endpoint
- Response data is properly typed based on endpoint
- Cannot access `data` without checking the state status
- URL parameters must match endpoint requirements
- Full autocomplete for endpoint names and response properties

## Example Behavior

When using the hook:
```typescript
const { status, data, error } = useApi('getUser', { id: '123' });

if (status === 'success') {
  console.log(data.name);  // TypeScript knows data is User
}
```

TypeScript should:
- Require the `id` parameter for `getUser`
- Know that `data` is `User` when endpoint is `getUser`
- Prevent accessing `data` in loading/error states

## Bonus Challenges

- Add support for POST/PUT/DELETE methods
- Implement request body typing
- Add query string parameter support with type safety
- Create a mutation hook with optimistic updates
- Add request caching with cache invalidation
