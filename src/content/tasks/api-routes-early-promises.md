---
title: API Routes - Start Promises Early, Await Late
description: Optimize API route handlers by starting all promises immediately before awaiting any results
tags:
  - async
  - performance
  - vercel-best-practices
  - api-routes
  - promise-optimization
difficulty: medium
timeEstimate: 25
learningGoals:
  - Start all async operations immediately in API handlers
  - Await promises as late as possible to maximize parallelism
  - Avoid creating unintentional waterfalls in backend code
  - Structure API routes for optimal performance
  - Measure and compare sequential vs parallel execution time
hints:
  - Create all promise objects first, then await them together
  - Don't await inside loops - collect promises first, then Promise.all
  - Even database queries can often run in parallel
  - The order you await matters - restructure to minimize total time
  - Use Promise.all for truly independent operations
starterCode: |
  import { useState } from 'react';

  // Simulated backend database operations
  const mockDB = {
    async getUserById(userId) {
      console.log('DB: Fetching user...');
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'developer'
      };
    },

    async getUserOrders(userId) {
      console.log('DB: Fetching orders...');
      await new Promise(resolve => setTimeout(resolve, 400));
      return [
        { id: 1, userId, product: 'Widget A', amount: 29.99 },
        { id: 2, userId, product: 'Widget B', amount: 49.99 }
      ];
    },

    async getUserPreferences(userId) {
      console.log('DB: Fetching preferences...');
      await new Promise(resolve => setTimeout(resolve, 250));
      return {
        theme: 'dark',
        language: 'en',
        notifications: true
      };
    },

    async getRecommendations(userId) {
      console.log('DB: Fetching recommendations...');
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        { id: 1, title: 'Product C', score: 0.95 },
        { id: 2, title: 'Product D', score: 0.87 }
      ];
    }
  };

  // Simulated external API calls
  const mockExternalAPI = {
    async getWeatherForLocation(location) {
      console.log('API: Fetching weather...');
      await new Promise(resolve => setTimeout(resolve, 600));
      return {
        location,
        temp: 72,
        condition: 'Sunny',
        humidity: 45
      };
    },

    async getExchangeRate(currency) {
      console.log('API: Fetching exchange rate...');
      await new Promise(resolve => setTimeout(resolve, 450));
      return {
        currency,
        rate: 1.18,
        lastUpdated: new Date().toISOString()
      };
    },

    async getStockPrice(symbol) {
      console.log('API: Fetching stock price...');
      await new Promise(resolve => setTimeout(resolve, 350));
      return {
        symbol,
        price: 150.25,
        change: '+2.3%'
      };
    }
  };

  export default function App() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState(null);
    const [executionTime, setExecutionTime] = useState(null);

    // TODO: Implement SLOW sequential version (anti-pattern)
    // This demonstrates the WRONG way
    const fetchDataSequential = async () => {
      setLoading(true);
      setMethod('sequential');
      setResult(null);
      const startTime = performance.now();

      try {
        // WRONG: Await each operation before starting the next
        const user = await mockDB.getUserById(1);
        const orders = await mockDB.getUserOrders(user.id);
        const preferences = await mockDB.getUserPreferences(user.id);
        const recommendations = await mockDB.getRecommendations(user.id);
        const weather = await mockExternalAPI.getWeatherForLocation('San Francisco');
        const exchangeRate = await mockExternalAPI.getExchangeRate('EUR');
        const stockPrice = await mockExternalAPI.getStockPrice('AAPL');

        const endTime = performance.now();
        setExecutionTime(Math.round(endTime - startTime));
        setResult({
          user,
          orders,
          preferences,
          recommendations,
          weather,
          exchangeRate,
          stockPrice
        });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    // TODO: Implement FAST optimized version (best practice)
    // Start all promises early, await late
    const fetchDataOptimized = async () => {
      setLoading(true);
      setMethod('optimized');
      setResult(null);
      const startTime = performance.now();

      try {
        // RIGHT: Start all promises immediately, await at the end
        // TODO: Get user first (required for dependent queries)
        // TODO: Start all dependent DB queries immediately (don't await yet)
        // TODO: Start all external API calls immediately (fully independent)
        // TODO: Use Promise.all to await everything together

        // Hint: Structure should be:
        // 1. const user = await getUserById (must be first)
        // 2. const ordersPromise = getUserOrders(user.id) (start, don't await)
        // 3. const preferencesPromise = getUserPreferences(user.id) (start, don't await)
        // 4. ... start all other promises
        // 5. const [orders, preferences, ...] = await Promise.all([ordersPromise, ...])

        const endTime = performance.now();
        setExecutionTime(Math.round(endTime - startTime));
        // TODO: Set result with all data
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    const improvement = executionTime && method === 'optimized' ?
      '~75% faster!' : null;

    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <h1>API Route Optimization</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Compare sequential awaits vs. starting promises early and awaiting late.
          Simulates a backend API route handler pattern.
        </p>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <button
            onClick={fetchDataSequential}
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
            🐌 Sequential Awaits (Slow)
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
            🚀 Early Promises (Fast)
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
              ⏳ Executing API handler with {method} pattern...
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Open console to see request timing
            </div>
          </div>
        )}

        {executionTime && !loading && (
          <div style={{
            padding: '20px',
            background: method === 'optimized' ? '#d4edda' : '#fff3cd',
            borderRadius: '8px',
            marginBottom: '20px',
            border: `2px solid ${method === 'optimized' ? '#51cf66' : '#ffc107'}`
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
              {method === 'sequential' ? '🐌' : '🚀'} Completed in {executionTime}ms
            </div>
            {improvement && (
              <div style={{ fontSize: '16px', color: '#28a745', fontWeight: 'bold' }}>
                {improvement}
              </div>
            )}
            <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
              Pattern: {method}
            </div>
          </div>
        )}

        {result && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '15px'
          }}>
            {/* User Info */}
            <div style={{
              padding: '15px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginTop: 0 }}>👤 User Info</h3>
              <div><strong>{result.user.name}</strong></div>
              <div style={{ fontSize: '14px', color: '#666' }}>{result.user.email}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Role: {result.user.role}</div>
            </div>

            {/* Orders */}
            <div style={{
              padding: '15px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginTop: 0 }}>🛒 Orders ({result.orders.length})</h3>
              {result.orders.map(order => (
                <div key={order.id} style={{
                  padding: '8px',
                  background: '#f8f9fa',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  <div><strong>{order.product}</strong></div>
                  <div style={{ color: '#666' }}>${order.amount}</div>
                </div>
              ))}
            </div>

            {/* Preferences */}
            <div style={{
              padding: '15px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginTop: 0 }}>⚙️ Preferences</h3>
              <div style={{ fontSize: '14px' }}>
                <div><strong>Theme:</strong> {result.preferences.theme}</div>
                <div><strong>Language:</strong> {result.preferences.language}</div>
                <div><strong>Notifications:</strong> {result.preferences.notifications ? 'On' : 'Off'}</div>
              </div>
            </div>

            {/* Recommendations */}
            <div style={{
              padding: '15px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginTop: 0 }}>💡 Recommendations</h3>
              {result.recommendations.map(rec => (
                <div key={rec.id} style={{
                  padding: '8px',
                  background: '#e3f2fd',
                  borderRadius: '4px',
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  <div><strong>{rec.title}</strong></div>
                  <div style={{ color: '#666' }}>Score: {rec.score}</div>
                </div>
              ))}
            </div>

            {/* Weather */}
            <div style={{
              padding: '15px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginTop: 0 }}>🌤️ Weather</h3>
              <div style={{ fontSize: '14px' }}>
                <div><strong>Location:</strong> {result.weather.location}</div>
                <div><strong>Temp:</strong> {result.weather.temp}°F</div>
                <div><strong>Condition:</strong> {result.weather.condition}</div>
              </div>
            </div>

            {/* Exchange Rate */}
            <div style={{
              padding: '15px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginTop: 0 }}>💱 Exchange Rate</h3>
              <div style={{ fontSize: '14px' }}>
                <div><strong>Currency:</strong> {result.exchangeRate.currency}</div>
                <div><strong>Rate:</strong> {result.exchangeRate.rate}</div>
              </div>
            </div>

            {/* Stock Price */}
            <div style={{
              padding: '15px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginTop: 0 }}>📈 Stock Price</h3>
              <div style={{ fontSize: '14px' }}>
                <div><strong>Symbol:</strong> {result.stockPrice.symbol}</div>
                <div><strong>Price:</strong> ${result.stockPrice.price}</div>
                <div style={{ color: '#28a745' }}><strong>Change:</strong> {result.stockPrice.change}</div>
              </div>
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
          <h3 style={{ marginTop: 0 }}>🎯 Performance Analysis</h3>
          <p>
            <strong>Sequential (SLOW):</strong> Each await blocks the next operation.
            Total = 300 + 400 + 250 + 500 + 600 + 450 + 350 = ~2850ms
          </p>
          <p style={{ marginBottom: 0 }}>
            <strong>Optimized (FAST):</strong> getUserById (300ms) → Promise.all([all others in parallel])
            = longest parallel operation (600ms) = ~900ms total
          </p>
        </div>
      </div>
    );
  }
---

## Task

Optimize an API route handler by implementing the "start promises early, await late" pattern. Learn to identify independent operations and execute them in parallel for maximum performance.

### Requirements

1. **Implement Sequential Version**
   - Complete fetchDataSequential function
   - Await each operation sequentially (demonstrates anti-pattern)
   - Fetch user, then orders, then preferences, etc.
   - Measure total execution time
   - This should take ~2850ms total

2. **Implement Optimized Version**
   - Complete fetchDataOptimized function
   - Fetch user first (required dependency)
   - Start all dependent DB queries immediately (don't await yet)
   - Start all external API calls immediately (fully independent)
   - Use Promise.all to await everything together at the end
   - This should take ~900ms total

3. **Identify Independent Operations**
   - User must be fetched first (everything depends on user.id)
   - Orders, preferences, and recommendations depend on user.id but not each other
   - Weather, exchange rate, and stock price are completely independent
   - All 6 operations after getting user can run in parallel

4. **Start Promises Early Pattern**
   - Create promise objects without awaiting: const p = fetchData()
   - Collect all promises in an array
   - Use Promise.all to await them together
   - Don't await inside loops or sequentially

5. **Measure and Display Performance**
   - Show execution time for each method
   - Calculate improvement percentage
   - Display which pattern was used
   - Render all fetched data in organized cards

### Example Behavior

- User clicks "Sequential Awaits"
- Operations execute one at a time: user → orders → preferences → recommendations → weather → exchange → stock
- Console shows each starting only after previous completes
- Total time: ~2850ms (sum of all operations)
- UI shows slow performance warning
- User clicks "Early Promises"
- getUserById executes first (300ms)
- Then all 6 remaining operations start simultaneously
- Total time: ~900ms (300ms + longest parallel operation 600ms)
- UI shows "~75% faster!" with green success indicator

### Bonus Challenges

- Add a third "mixed" version with some sequential, some parallel
- Implement timeout handling for slow external APIs
- Add retry logic that doesn't break parallelism
- Show visual timeline of when each operation executes
- Implement request caching to avoid redundant calls
- Add error handling that allows partial success
- Create a generic "parallel executor" utility function
- Implement this pattern in a real Next.js API route
