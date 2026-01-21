---
title: Search with Request Cancellation & Race Conditions
description: Build a search with request cancellation, prevent race conditions, and distinguish stale vs fresh data
tags:
  - async
  - abort-controller
  - race-conditions
  - debounce
  - search
difficulty: hard
timeEstimate: 35
learningGoals:
  - Prevent race conditions with AbortController
  - Cancel outdated requests when new ones start
  - Implement proper debouncing for search inputs
  - Distinguish between stale and fresh search results
  - Manage request queue and cleanup properly
hints:
  - Use AbortController to cancel previous request when new one starts
  - Store request ID to identify which response is current
  - Debounce input to avoid excessive API calls (300ms recommended)
  - Ignore responses from cancelled requests
  - Show loading state only for active request
  - Use useRef to track latest request ID
starterCode: |
  import { useState, useEffect, useRef } from 'react';

  // Mock search API with variable delays to simulate race conditions
  const mockSearchAPI = async (query, signal) => {
    const delay = 500 + Math.random() * 2000; // Random 0.5-2.5s delay

    // Simulate network delay
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(resolve, delay);

      // Listen for abort signal
      signal?.addEventListener('abort', () => {
        clearTimeout(timeout);
        reject(new DOMException('Request cancelled', 'AbortError'));
      });
    });

    // Mock results based on query
    const allResults = [
      { id: 1, title: 'React Hooks Tutorial', category: 'Tutorial', views: 15000 },
      { id: 2, title: 'useState Deep Dive', category: 'Tutorial', views: 8000 },
      { id: 3, title: 'useEffect Best Practices', category: 'Guide', views: 12000 },
      { id: 4, title: 'React Performance Tips', category: 'Guide', views: 20000 },
      { id: 5, title: 'Custom Hooks Examples', category: 'Tutorial', views: 6000 },
      { id: 6, title: 'React Context API', category: 'Guide', views: 10000 },
      { id: 7, title: 'useReducer vs useState', category: 'Comparison', views: 5000 },
      { id: 8, title: 'React Memo Optimization', category: 'Performance', views: 7000 },
      { id: 9, title: 'useCallback Guide', category: 'Guide', views: 4000 },
      { id: 10, title: 'React Suspense Intro', category: 'Tutorial', views: 9000 },
    ];

    const filtered = allResults.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );

    return {
      results: filtered,
      query,
      timestamp: Date.now(),
      delay: Math.round(delay)
    };
  };

  export default function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [requestLog, setRequestLog] = useState([]);

    // TODO: Add refs for AbortController, request ID, debounce timer

    // TODO: Implement debouncing for search input
    // Debounce search query by 300ms

    // TODO: Implement search with request cancellation
    // Cancel previous request when new one starts
    // Use request ID to identify current request
    // Ignore responses from stale requests

    // TODO: Handle search execution
    const performSearch = async (query) => {
      // 1. Cancel any pending request
      // 2. Create new AbortController
      // 3. Generate request ID
      // 4. Call API with abort signal
      // 5. Check if response is still relevant (request ID matches)
      // 6. Update results only if not cancelled
    };

    // TODO: Add request to log for debugging
    const logRequest = (requestId, query, status, delay) => {
      setRequestLog(prev => [
        { requestId, query, status, delay, timestamp: Date.now() },
        ...prev.slice(0, 9) // Keep last 10
      ]);
    };

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1>Race Condition Aware Search</h1>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for React content..."
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            Type quickly to trigger race conditions (requests have random 0.5-2.5s delays)
          </div>
        </div>

        {isLoading && (
          <div style={{
            padding: '15px',
            background: '#e3f2fd',
            borderRadius: '4px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Searching for "{debouncedQuery}"...
          </div>
        )}

        {error && (
          <div style={{
            padding: '15px',
            background: '#ffebee',
            borderRadius: '4px',
            marginBottom: '20px',
            color: '#c62828'
          }}>
            Error: {error}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <h2>Results ({results.length})</h2>
          {results.length === 0 && !isLoading && debouncedQuery && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              No results found for "{debouncedQuery}"
            </div>
          )}

          {results.length === 0 && !debouncedQuery && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              Start typing to search...
            </div>
          )}

          {results.map(result => (
            <div
              key={result.id}
              style={{
                padding: '15px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: '#fff'
              }}
            >
              <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>
                {result.title}
              </h3>
              <div style={{ fontSize: '14px', color: '#666' }}>
                <span style={{
                  background: '#e3f2fd',
                  padding: '2px 8px',
                  borderRadius: '3px',
                  marginRight: '10px'
                }}>
                  {result.category}
                </span>
                {result.views.toLocaleString()} views
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2>Request Log (Debug)</h2>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
            Watch for cancelled requests when typing quickly
          </div>
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '4px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {requestLog.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                No requests yet
              </div>
            ) : (
              requestLog.map((log, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #f0f0f0',
                    background: log.status === 'cancelled' ? '#ffebee' :
                               log.status === 'success' ? '#e8f5e9' :
                               log.status === 'ignored' ? '#fff3cd' : '#fff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>#{log.requestId}</strong> "{log.query}"
                    </div>
                    <div style={{ fontSize: '11px' }}>
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '3px',
                        background: log.status === 'cancelled' ? '#ffcdd2' :
                                   log.status === 'success' ? '#c8e6c9' :
                                   log.status === 'ignored' ? '#ffe082' : '#ccc',
                        marginRight: '5px'
                      }}>
                        {log.status.toUpperCase()}
                      </span>
                      {log.delay}ms
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '4px', fontSize: '13px' }}>
          <div><strong>Race Condition Prevention:</strong></div>
          <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
            <li>Each request gets a unique ID</li>
            <li>Previous requests are cancelled when new one starts</li>
            <li>Only the latest request's results are shown</li>
            <li>Stale responses (from slower requests) are ignored</li>
          </ul>
        </div>
      </div>
    );
  }
---

## Task

Build a search interface that prevents race conditions by cancelling outdated requests, implementing proper debouncing, and ensuring only fresh results are displayed.

### Requirements

1. **Request Cancellation**
   - Use AbortController to cancel previous requests
   - Create new AbortController for each search
   - Cancel pending request when new one starts
   - Properly clean up on component unmount
   - Handle AbortError gracefully (don't show as user-facing error)

2. **Race Condition Prevention**
   - Assign unique ID to each request
   - Track which request is currently active
   - Ignore responses from cancelled requests
   - Ignore responses from stale requests (overtaken by newer ones)
   - Only update results if response is from latest request

3. **Debouncing**
   - Debounce search input by 300ms
   - Don't send request until user stops typing
   - Clear previous debounce timer on new input
   - Show debounced value in loading state

4. **Request Queue Management**
   - Maintain log of all requests (last 10)
   - Track status: `pending`, `success`, `cancelled`, `ignored`
   - Show request duration for each
   - Display which requests were cancelled vs completed

5. **Loading States**
   - Show loading only for active request
   - Don't show loading for cancelled requests
   - Clear loading when results arrive or request is cancelled
   - Handle error states separately from cancelled requests

### Example Behavior

**Race Condition Scenario:**
- User types "r" → Request #1 starts (will take 2s)
- User quickly types "re" → Request #1 cancelled, #2 starts (will take 0.5s)
- Request #2 completes first → Shows results for "re"
- Request #1 response arrives later → Ignored (already cancelled)
- Log shows: #1 CANCELLED, #2 SUCCESS

**Debounce Scenario:**
- User types "react" quickly → No requests sent during typing
- User stops → Wait 300ms → Request sent for "react"
- Results appear for complete word, not each letter

**Cleanup Scenario:**
- Request is pending
- User navigates away (unmount)
- Request is cancelled, no memory leak

### Bonus Challenges

- Add request timeout (fail after 5s)
- Show request progress/status in UI
- Implement retry for failed requests
- Add search history (recent searches)
- Highlight search terms in results
- Show "stale results" warning if results don't match current query
- Add keyboard shortcuts (Ctrl+K to focus)
- Persist search history to localStorage
