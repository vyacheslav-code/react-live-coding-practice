---
title: Optimize with useTransition
description: Use startTransition to defer non-urgent updates and keep UI responsive during heavy operations
tags:
  - performance
  - useTransition
  - concurrent-features
  - React 18
difficulty: medium
timeEstimate: 30
learningGoals:
  - Understand urgent vs non-urgent updates
  - Use useTransition for expensive renders
  - Keep UI responsive during heavy operations
  - Learn when transitions improve UX
hints:
  - Wrap expensive setState in startTransition
  - Input should update immediately (urgent)
  - List filtering can be deferred (non-urgent)
  - isPending indicates transition in progress
starterCode: |
  import { useState, useMemo } from 'react';

  // Generate large dataset
  function generateItems(count = 20000) {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        name: `Item ${i}`,
        category: ['Electronics', 'Clothing', 'Food', 'Books'][i % 4],
        price: Math.floor(Math.random() * 1000),
        description: `This is a description for item ${i}. `.repeat(5)
      });
    }
    return items;
  }

  const items = generateItems();

  function ExpensiveList({ items, highlight }) {
    console.log('🎨 Rendering list with', items.length, 'items');

    return (
      <div style={{ height: 400, overflow: 'auto', border: '1px solid gray' }}>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              padding: 8,
              borderBottom: '1px solid #eee',
              background: item.name.toLowerCase().includes(highlight.toLowerCase())
                ? 'yellow'
                : 'white'
            }}
          >
            <strong>{item.name}</strong> - ${item.price}
            <br />
            <small>{item.category}</small>
          </div>
        ))}
      </div>
    );
  }

  export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTerm, setFilterTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Expensive filtering operation
    const filteredItems = useMemo(() => {
      console.log('🔄 Filtering items...');
      let result = items;

      if (selectedCategory !== 'All') {
        result = result.filter(item => item.category === selectedCategory);
      }

      if (filterTerm) {
        result = result.filter(item =>
          item.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(filterTerm.toLowerCase())
        );
      }

      // Simulate extra expensive operation
      for (let i = 0; i < result.length * 100; i++) {
        Math.random();
      }

      return result;
    }, [filterTerm, selectedCategory]);

    const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      // Problem: This blocks the input from updating smoothly
      setFilterTerm(value);
    };

    const handleCategoryChange = (category) => {
      // Problem: This makes category buttons feel laggy
      setSelectedCategory(category);
    };

    return (
      <div>
        <h1>useTransition Demo</h1>

        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search items..."
            style={{ padding: 8, width: 300, fontSize: 16 }}
          />
          <p style={{ color: 'gray', fontSize: 12 }}>
            Try typing quickly - notice the input feels sluggish
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <strong>Category: </strong>
          {['All', 'Electronics', 'Clothing', 'Food', 'Books'].map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              style={{
                margin: 4,
                padding: 8,
                background: selectedCategory === cat ? 'lightblue' : 'white',
                border: '1px solid gray',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
          <p style={{ color: 'gray', fontSize: 12 }}>
            Click buttons - they should respond instantly
          </p>
        </div>

        <div>
          <strong>Results: {filteredItems.length} items</strong>
        </div>

        <ExpensiveList items={filteredItems} highlight={filterTerm} />

        <div style={{ marginTop: 20, padding: 10, background: '#f0f0f0' }}>
          <h3>Problems to Fix:</h3>
          <ul>
            <li>Input feels sluggish when typing (blocks on expensive filter)</li>
            <li>Category buttons are unresponsive</li>
            <li>UI freezes during filtering</li>
          </ul>
          <h3>Solution:</h3>
          <ul>
            <li>Import and use useTransition hook</li>
            <li>Wrap setFilterTerm and setSelectedCategory in startTransition</li>
            <li>Show loading indicator when isPending is true</li>
            <li>Input stays responsive, filtering happens in background</li>
          </ul>
        </div>
      </div>
    );
  }
---

Master React 18's useTransition to keep UI responsive during expensive state updates.

## Requirements

- Import useTransition from React
- Wrap setFilterTerm in startTransition
- Wrap setSelectedCategory in startTransition
- Show loading indicator when isPending is true
- Input must remain responsive while filtering
- Add opacity or loading spinner during transitions

## Expected Behavior

**Before useTransition:**
- Typing in input feels laggy and sluggish
- Each keystroke blocks until filtering completes
- Category buttons are unresponsive
- UI freezes during expensive operations
- Poor user experience

**After useTransition:**
- Input updates immediately on every keystroke
- Filtering happens in background (deferred)
- Category buttons respond instantly
- Loading indicator shows work is happening
- Smooth, responsive user experience

## Performance Impact

**Problem:** React processes all state updates with the same priority. Expensive updates (filtering 20K items) block urgent updates (input value). User types but sees delayed feedback, making the app feel broken.

**Solution:** useTransition marks updates as non-urgent. React prioritizes urgent updates (input), defers non-urgent ones (filtering), and can interrupt expensive work to handle new input. UI stays responsive.

**Real-world savings:**
- Input responsiveness: 60fps vs 5fps (dramatic improvement)
- Perceived performance: Instant feedback even during heavy work
- Better UX: Loading states instead of frozen UI
- Can handle 10x larger datasets without freezing

## Learning Objectives

This exercise teaches React 18's concurrent features - specifically useTransition. You'll learn to distinguish urgent from non-urgent updates, understand how transitions keep UI responsive, and see when concurrent rendering provides real value.

## Urgent vs Non-urgent Updates

**Urgent (must be immediate):**
- Text input changes
- Button clicks
- Hover states
- Focus changes
- Any direct user interaction

**Non-urgent (can be deferred):**
- Search result filtering
- Sorting large lists
- Heavy computations
- Animations
- Non-critical UI updates

## Pattern Implementation

```javascript
import { useState, useTransition } from 'react';

const [isPending, startTransition] = useTransition();
const [input, setInput] = useState('');
const [filter, setFilter] = useState('');

function handleChange(e) {
  // Urgent: update input immediately
  setInput(e.target.value);

  // Non-urgent: defer expensive filter
  startTransition(() => {
    setFilter(e.target.value);
  });
}

return (
  <>
    <input value={input} onChange={handleChange} />
    {isPending && <Spinner />}
    <ExpensiveList filter={filter} />
  </>
);
```

## When to Use useTransition

- Heavy list filtering/sorting
- Complex search results
- Tab switching with expensive renders
- Dashboard updates
- Any update that's not directly responding to user
- Don't use for simple operations (overhead not worth it)
