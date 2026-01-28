---
title: Set/Map for O(1) Lookups
description: Use Set/Map for O(1) lookups vs O(n) array methods
tags:
  - performance
  - javascript
  - data-structures
difficulty: medium
timeEstimate: 25
learningGoals:
  - Understand time complexity of lookups
  - Use Set for O(1) membership checks
  - Use Map for O(1) key-value lookups
  - Measure performance differences
hints:
  - Array.includes() is O(n), Set.has() is O(1)
  - Array.find() is O(n), Map.get() is O(1)
  - Convert arrays to Set/Map for frequent lookups
  - Use performance.now() to measure timing
starterCode: |
  import { useState, useMemo } from 'react';

  // Sample data: large list of users
  const generateUsers = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role: i % 3 === 0 ? 'admin' : 'user'
    }));
  };

  export default function App() {
    const [searchId, setSearchId] = useState('5000');
    const [results, setResults] = useState({ array: null, map: null });

    const users = useMemo(() => generateUsers(10000), []);

    // TODO: Create a Map for O(1) lookups
    const userMap = users; // Replace with Map

    // TODO: Create a Set of admin IDs for O(1) checks
    const adminIds = users.filter(u => u.role === 'admin').map(u => u.id);

    const searchWithArray = () => {
      const start = performance.now();

      // Array lookup - O(n)
      const user = users.find(u => u.id === parseInt(searchId));

      // Check if admin - O(n)
      const isAdmin = users
        .filter(u => u.role === 'admin')
        .some(u => u.id === parseInt(searchId));

      const duration = performance.now() - start;

      setResults(prev => ({
        ...prev,
        array: { user, isAdmin, time: duration.toFixed(4) }
      }));
    };

    const searchWithMap = () => {
      const start = performance.now();

      // TODO: Map lookup - O(1)
      const user = null; // Use userMap.get()

      // TODO: Set lookup - O(1)
      const isAdmin = false; // Use adminIds.has()

      const duration = performance.now() - start;

      setResults(prev => ({
        ...prev,
        map: { user, isAdmin, time: duration.toFixed(4) }
      }));
    };

    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Set/Map Performance Demo</h1>
        <p>Searching in {users.length.toLocaleString()} users</p>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter user ID (0-9999)"
            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
          />
          <button
            onClick={searchWithArray}
            style={{ padding: '8px 16px', marginRight: '10px' }}
          >
            Search with Array (O(n))
          </button>
          <button
            onClick={searchWithMap}
            style={{ padding: '8px 16px' }}
          >
            Search with Map/Set (O(1))
          </button>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1, padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
            <h3>Array Lookup Results</h3>
            {results.array ? (
              <>
                <p><strong>Time:</strong> {results.array.time}ms</p>
                <p><strong>User:</strong> {results.array.user?.name || 'Not found'}</p>
                <p><strong>Is Admin:</strong> {results.array.isAdmin ? 'Yes' : 'No'}</p>
              </>
            ) : (
              <p>Click "Search with Array" to see results</p>
            )}
          </div>

          <div style={{ flex: 1, padding: '15px', background: '#e8f5e9', borderRadius: '8px' }}>
            <h3>Map/Set Lookup Results</h3>
            {results.map ? (
              <>
                <p><strong>Time:</strong> {results.map.time}ms</p>
                <p><strong>User:</strong> {results.map.user?.name || 'Not found'}</p>
                <p><strong>Is Admin:</strong> {results.map.isAdmin ? 'Yes' : 'No'}</p>
              </>
            ) : (
              <p>Click "Search with Map/Set" to see results</p>
            )}
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', background: '#fff3e0', borderRadius: '8px' }}>
          <h3>Performance Comparison</h3>
          {results.array && results.map && (
            <p>
              <strong>Speedup:</strong> {(results.array.time / results.map.time).toFixed(1)}x faster with Map/Set
            </p>
          )}
          <ul>
            <li><code>Array.find()</code>: O(n) - checks every element until found</li>
            <li><code>Map.get()</code>: O(1) - direct hash table lookup</li>
            <li><code>Array.includes()</code>: O(n) - checks every element</li>
            <li><code>Set.has()</code>: O(1) - direct hash table lookup</li>
          </ul>
        </div>
      </div>
    );
  }
---

Learn to optimize lookups using Set and Map data structures for O(1) time complexity instead of O(n) array methods.

## Requirements

- Create a Map from users array with id as key
- Create a Set of admin IDs for membership checks
- Implement searchWithMap using Map.get() and Set.has()
- Display performance comparison between methods
- Show actual timing measurements
- Verify both methods return same results

## Expected Behavior

**Array Method (O(n)):**
- Uses Array.find() to search users
- Uses Array.filter() + Array.some() to check admin status
- Takes longer as dataset grows
- Time proportional to array size

**Map/Set Method (O(1)):**
- Uses Map.get() for user lookup
- Uses Set.has() for admin check
- Constant time regardless of dataset size
- Significantly faster (10-100x) for large datasets

**Performance Results:**
- Map/Set should be noticeably faster
- Speedup increases with dataset size
- Both methods return identical results

## Learning Objectives

This exercise teaches choosing the right data structure for performance. You'll learn when to use Set/Map over arrays, understand time complexity impact, and measure performance differences.

## Time Complexity Cheat Sheet

**Array Methods:**
- `find()`, `includes()`, `indexOf()`: O(n)
- `filter()`: O(n)
- `some()`, `every()`: O(n)

**Map Methods:**
- `get()`, `has()`, `set()`: O(1)

**Set Methods:**
- `has()`, `add()`, `delete()`: O(1)

## When to Use Set/Map

- Frequent membership checks (use Set)
- Frequent lookups by key (use Map)
- Large datasets (1000+ items)
- Performance-critical code paths
- Don't use for small arrays (overhead not worth it)
