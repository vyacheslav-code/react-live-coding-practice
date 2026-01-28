---
title: Promise.race for Timeouts and Competitive Requests
description: Use Promise.race to implement timeouts, fallbacks, and competitive request patterns for resilient applications
tags:
  - async
  - promise-race
  - timeout
  - error-handling
  - performance
difficulty: medium
timeEstimate: 30
learningGoals:
  - Implement request timeouts with Promise.race
  - Create fallback chains for unreliable services
  - Build competitive request patterns (fastest wins)
  - Handle timeout errors gracefully with user feedback
  - Combine Promise.race with Promise.all for complex patterns
hints:
  - Promise.race resolves/rejects with the first promise that settles
  - Create a timeout promise that rejects after X milliseconds
  - Race the actual request against the timeout promise
  - For competitive requests, race multiple data sources
  - Cleanup losing promises to prevent memory leaks
starterCode: |
  import { useState } from 'react';

  // Mock API with configurable delays and failure rates
  const mockAPI = {
    // Slow, unreliable primary API
    async fetchFromPrimaryAPI(endpoint) {
      const delay = 2000 + Math.random() * 3000; // 2-5 seconds
      console.log(`🌐 Primary API: Starting request to ${endpoint}...`);
      await new Promise(resolve => setTimeout(resolve, delay));

      if (Math.random() < 0.3) {
        throw new Error('Primary API failed');
      }

      console.log(`✅ Primary API: Completed in ${Math.round(delay)}ms`);
      return {
        source: 'primary',
        data: { id: 1, title: 'Data from primary API', value: 100 },
        responseTime: Math.round(delay)
      };
    },

    // Faster backup API
    async fetchFromBackupAPI(endpoint) {
      const delay = 1000 + Math.random() * 1500; // 1-2.5 seconds
      console.log(`🔄 Backup API: Starting request to ${endpoint}...`);
      await new Promise(resolve => setTimeout(resolve, delay));

      if (Math.random() < 0.2) {
        throw new Error('Backup API failed');
      }

      console.log(`✅ Backup API: Completed in ${Math.round(delay)}ms`);
      return {
        source: 'backup',
        data: { id: 2, title: 'Data from backup API', value: 90 },
        responseTime: Math.round(delay)
      };
    },

    // Fast cache (usually fastest but might be stale)
    async fetchFromCache(endpoint) {
      const delay = 100 + Math.random() * 300; // 100-400ms
      console.log(`⚡ Cache: Checking for ${endpoint}...`);
      await new Promise(resolve => setTimeout(resolve, delay));

      // Cache miss 30% of the time
      if (Math.random() < 0.3) {
        throw new Error('Cache miss');
      }

      console.log(`✅ Cache: Hit in ${Math.round(delay)}ms`);
      return {
        source: 'cache',
        data: { id: 3, title: 'Data from cache', value: 85, stale: true },
        responseTime: Math.round(delay)
      };
    },

    // CDN endpoint (fast but might be outdated)
    async fetchFromCDN(endpoint) {
      const delay = 200 + Math.random() * 500; // 200-700ms
      console.log(`🌍 CDN: Fetching ${endpoint}...`);
      await new Promise(resolve => setTimeout(resolve, delay));

      if (Math.random() < 0.15) {
        throw new Error('CDN unavailable');
      }

      console.log(`✅ CDN: Served in ${Math.round(delay)}ms`);
      return {
        source: 'cdn',
        data: { id: 4, title: 'Data from CDN', value: 95 },
        responseTime: Math.round(delay)
      };
    }
  };

  // Utility function for timeout promise
  const createTimeoutPromise = (ms, message = 'Request timeout') => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error(message)), ms);
    });
  };

  export default function App() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [strategy, setStrategy] = useState(null);

    // TODO: Implement timeout pattern
    // Race primary API against a timeout
    const fetchWithTimeout = async () => {
      setLoading(true);
      setError(null);
      setResult(null);
      setStrategy('timeout');
      const startTime = performance.now();

      try {
        // TODO: Use Promise.race to race the API call against a 2000ms timeout
        // If timeout wins, show error
        // If API wins, show result

        // Hint: Promise.race([
        //   mockAPI.fetchFromPrimaryAPI('/data'),
        //   createTimeoutPromise(2000, 'Request took too long')
        // ])

        const endTime = performance.now();
        // TODO: Set result with data and elapsed time
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // TODO: Implement fallback chain pattern
    // Try cache first, if fails try CDN, if fails try primary API
    const fetchWithFallback = async () => {
      setLoading(true);
      setError(null);
      setResult(null);
      setStrategy('fallback');
      const startTime = performance.now();

      try {
        // TODO: Try cache first
        // If it fails, try CDN
        // If that fails, try primary API
        // Use try/catch chain or Promise.race with fallback logic

        const endTime = performance.now();
        // TODO: Set result with data and elapsed time
      } catch (err) {
        setError('All sources failed: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    // TODO: Implement competitive request pattern
    // Race multiple sources, fastest wins
    const fetchCompetitive = async () => {
      setLoading(true);
      setError(null);
      setResult(null);
      setStrategy('competitive');
      const startTime = performance.now();

      try {
        // TODO: Race cache, CDN, backup API, and primary API
        // Whichever responds first wins
        // Use Promise.race([cache, cdn, backup, primary])
        // Handle case where all fail

        const endTime = performance.now();
        // TODO: Set result with data and elapsed time
      } catch (err) {
        setError('All requests failed: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    // TODO: Implement competitive with timeout
    // Race multiple sources but also enforce a timeout
    const fetchCompetitiveWithTimeout = async () => {
      setLoading(true);
      setError(null);
      setResult(null);
      setStrategy('competitive-timeout');
      const startTime = performance.now();

      try {
        // TODO: Race multiple sources AND a timeout
        // Fastest source wins, but if all are slower than timeout, fail
        // Use Promise.race([cache, cdn, backup, primary, timeout])

        const endTime = performance.now();
        // TODO: Set result with data and elapsed time
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <h1>Promise.race Patterns</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Learn to use Promise.race for timeouts, fallbacks, and competitive requests.
          Essential patterns for building resilient applications.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '30px'
        }}>
          <button
            onClick={fetchWithTimeout}
            disabled={loading}
            style={{
              padding: '12px 16px',
              background: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              fontSize: '14px'
            }}
          >
            ⏱️ With Timeout<br/>
            <span style={{ fontSize: '12px', opacity: 0.8 }}>2s max wait</span>
          </button>

          <button
            onClick={fetchWithFallback}
            disabled={loading}
            style={{
              padding: '12px 16px',
              background: '#4dabf7',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              fontSize: '14px'
            }}
          >
            🔄 Fallback Chain<br/>
            <span style={{ fontSize: '12px', opacity: 0.8 }}>Cache → CDN → API</span>
          </button>

          <button
            onClick={fetchCompetitive}
            disabled={loading}
            style={{
              padding: '12px 16px',
              background: '#51cf66',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              fontSize: '14px'
            }}
          >
            🏁 Competitive<br/>
            <span style={{ fontSize: '12px', opacity: 0.8 }}>Fastest wins</span>
          </button>

          <button
            onClick={fetchCompetitiveWithTimeout}
            disabled={loading}
            style={{
              padding: '12px 16px',
              background: '#9775fa',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              fontSize: '14px'
            }}
          >
            🏁⏱️ Competitive + Timeout<br/>
            <span style={{ fontSize: '12px', opacity: 0.8 }}>Fast or fail</span>
          </button>
        </div>

        {loading && (
          <div style={{
            padding: '20px',
            background: '#e3f2fd',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '18px', marginBottom: '10px' }}>
              ⏳ Loading with {strategy} strategy...
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Check console to see which sources are racing
            </div>
          </div>
        )}

        {error && (
          <div style={{
            padding: '20px',
            background: '#ffebee',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '2px solid #ff6b6b'
          }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#c62828' }}>
              ❌ Error
            </div>
            <div style={{ fontSize: '14px' }}>{error}</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
              Strategy: {strategy}
            </div>
          </div>
        )}

        {result && !loading && (
          <div style={{
            padding: '20px',
            background: '#d4edda',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '2px solid #51cf66'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>
              ✅ Success
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '10px',
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              <strong>Source:</strong>
              <span style={{
                padding: '4px 8px',
                background: result.data.source === 'cache' ? '#fff3cd' :
                           result.data.source === 'cdn' ? '#cfe2ff' :
                           result.data.source === 'backup' ? '#d1ecf1' : '#e2d5f7',
                borderRadius: '4px',
                display: 'inline-block'
              }}>
                {result.data.source.toUpperCase()}
                {result.data.stale && ' (may be stale)'}
              </span>

              <strong>Strategy:</strong>
              <span>{strategy}</span>

              <strong>Response Time:</strong>
              <span>{result.data.responseTime}ms</span>

              <strong>Total Time:</strong>
              <span>{result.totalTime}ms</span>
            </div>

            <div style={{
              padding: '15px',
              background: 'white',
              borderRadius: '6px',
              marginTop: '15px'
            }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                {result.data.data.title}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                ID: {result.data.data.id} | Value: {result.data.data.value}
              </div>
            </div>
          </div>
        )}

        <div style={{
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '14px',
          lineHeight: '1.8'
        }}>
          <h3 style={{ marginTop: 0 }}>🎯 Strategy Comparison</h3>

          <div style={{ marginBottom: '15px' }}>
            <strong>⏱️ Timeout:</strong> Prevents slow requests from hanging forever.
            Good for user experience - fail fast rather than wait indefinitely.
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong>🔄 Fallback Chain:</strong> Try fastest source first (cache), fall back to
            slower but more reliable sources if needed. Sequential with fallbacks.
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong>🏁 Competitive:</strong> Race all sources simultaneously. Fastest wins.
            Great for redundant services. May use more resources.
          </div>

          <div>
            <strong>🏁⏱️ Competitive + Timeout:</strong> Best of both worlds. Race multiple sources
            but enforce a timeout. Fast AND resilient.
          </div>
        </div>
      </div>
    );
  }
---

## Task

Implement four Promise.race patterns for building resilient, performant applications: basic timeout, fallback chain, competitive requests, and competitive with timeout.

### Requirements

1. **Basic Timeout Pattern**
   - Complete fetchWithTimeout function
   - Race primary API against a 2000ms timeout promise
   - If timeout wins, show error message
   - If API wins, show result
   - Display which occurred and how long it took

2. **Fallback Chain Pattern**
   - Complete fetchWithFallback function
   - Try cache first (fastest but might miss)
   - If cache fails, try CDN
   - If CDN fails, try primary API
   - Each fallback only attempts if previous fails
   - Show which source ultimately succeeded

3. **Competitive Request Pattern**
   - Complete fetchCompetitive function
   - Start all sources simultaneously: cache, CDN, backup API, primary API
   - Use Promise.race - first to succeed wins
   - Ignore other requests once one succeeds
   - Display winning source and response time

4. **Competitive with Timeout**
   - Complete fetchCompetitiveWithTimeout function
   - Race all sources AND a timeout promise
   - Fastest successful response wins
   - If all are slower than timeout, fail fast
   - Shows best of competitive + timeout patterns

5. **Error Handling**
   - Handle timeout errors with clear messages
   - Handle API failures gracefully
   - Show which strategy was used when error occurs
   - Provide useful debugging information

### Example Behavior

- User clicks "With Timeout"
- Primary API starts (slow: 2-5s)
- Timeout promise also starts (2s)
- If API responds < 2s: Show success with source and time
- If API > 2s: Show "Request took too long" error
- User clicks "Fallback Chain"
- Try cache (fast: 100-400ms)
- If cache hit: Success in ~200ms
- If cache miss: Try CDN (200-700ms)
- If CDN fails: Try primary API (2-5s)
- Shows which source ultimately succeeded
- User clicks "Competitive"
- All 4 sources start simultaneously
- Cache usually wins (~200ms)
- CDN sometimes wins (~400ms)
- Display shows winning source
- User clicks "Competitive + Timeout"
- All 4 sources + timeout (1500ms) start racing
- Fastest successful response shown
- If all sources > 1500ms, timeout wins and shows error

### Bonus Challenges

- Add request cancellation for losing promises
- Implement retry logic with exponential backoff
- Show all response times, not just the winner
- Add a "hedged request" pattern (start backup after delay)
- Implement circuit breaker pattern for failing sources
- Track success rate per source over time
- Add visual timeline showing race in progress
- Create a generic "raceWithFallback" utility function
