---
title: Move Effects to Event Handlers
description: Eliminate unnecessary effects by moving interaction logic to event handlers
tags:
  - performance
  - useEffect
  - event-handlers
  - optimization
difficulty: medium
timeEstimate: 25
learningGoals:
  - Identify unnecessary effects
  - Move interaction logic to event handlers
  - Understand when effects are needed vs not needed
  - Prevent re-renders from effect dependency changes
hints:
  - Effects are for synchronization, not responding to events
  - User interactions should be handled in event handlers
  - Remove effects that only run after user actions
  - Direct state updates are faster than effect chains
starterCode: |
  import { useState, useEffect } from 'react';

  export default function App() {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [notification, setNotification] = useState('');

    // Problem: These effects create unnecessary render cycles

    // Effect 1: Update filtered items when search changes
    useEffect(() => {
      console.log('🔄 Effect: Filtering items...');
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }, [items, searchTerm]);

    // Effect 2: Update selected item when selectedId changes
    useEffect(() => {
      console.log('🔄 Effect: Finding selected item...');
      const item = items.find(i => i.id === selectedId);
      setSelectedItem(item || null);
    }, [selectedId, items]);

    // Effect 3: Show notification when item is added
    useEffect(() => {
      if (items.length > 0) {
        console.log('🔄 Effect: Showing notification...');
        setNotification(`Added item! Total: ${items.length}`);
        const timer = setTimeout(() => setNotification(''), 2000);
        return () => clearTimeout(timer);
      }
    }, [items.length]);

    const addItem = () => {
      if (!inputValue.trim()) return;

      const newItem = {
        id: Date.now(),
        name: inputValue,
        timestamp: new Date().toISOString()
      };

      setItems([...items, newItem]);
      setInputValue('');
      // Notification effect will trigger automatically
    };

    const selectItem = (id) => {
      setSelectedId(id);
      // Selected item effect will trigger automatically
    };

    const updateSearch = (value) => {
      setSearchTerm(value);
      // Filter effect will trigger automatically
    };

    return (
      <div>
        <h1>Effect vs Event Handler Demo</h1>

        {notification && (
          <div style={{ padding: 10, background: 'lightgreen', margin: 10 }}>
            {notification}
          </div>
        )}

        <div>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Item name..."
          />
          <button onClick={addItem}>Add Item</button>
        </div>

        <div>
          <input
            value={searchTerm}
            onChange={(e) => updateSearch(e.target.value)}
            placeholder="Search..."
          />
        </div>

        <div style={{ display: 'flex', gap: 20 }}>
          <div>
            <h3>Items ({filteredItems.length})</h3>
            <ul>
              {filteredItems.map(item => (
                <li
                  key={item.id}
                  onClick={() => selectItem(item.id)}
                  style={{
                    cursor: 'pointer',
                    background: selectedId === item.id ? 'lightblue' : 'white'
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Selected Item</h3>
            {selectedItem ? (
              <div>
                <p><strong>Name:</strong> {selectedItem.name}</p>
                <p><strong>ID:</strong> {selectedItem.id}</p>
                <p><strong>Time:</strong> {selectedItem.timestamp}</p>
              </div>
            ) : (
              <p>No item selected</p>
            )}
          </div>
        </div>

        <div style={{ marginTop: 20, padding: 10, background: '#f0f0f0' }}>
          <p><strong>Open console to see effect cycles</strong></p>
          <p>Notice: Each interaction triggers multiple effects</p>
          <p>Goal: Eliminate all effects, move logic to event handlers</p>
        </div>
      </div>
    );
  }
---

Learn to distinguish between synchronization effects and event-driven logic, eliminating unnecessary re-renders.

## Requirements

- Remove all three useEffect hooks
- Move filtering logic directly into render
- Move selection logic into selectItem handler
- Move notification logic into addItem handler
- Application must work identically
- Verify fewer console logs (no "Effect:" messages)

## Expected Behavior

**Before optimization:**
- Adding item triggers 3 separate render cycles (effect chain)
- Searching triggers filter effect
- Selecting triggers selection effect
- Console shows multiple "Effect:" logs per interaction
- State updates happen in sequence (slower)

**After optimization:**
- Adding item is one render cycle with direct state updates
- Searching uses derived state (no effect needed)
- Selecting computes item inline (no effect needed)
- Console shows no "Effect:" logs
- All updates happen synchronously (faster)

## Performance Impact

**Problem:** Using effects for event-driven logic creates unnecessary render cycles. User clicks button → setState → render → effect runs → setState again → render again. Each effect adds a full render cycle.

**Solution:** Handle user interactions directly in event handlers. Derive state during render. Avoid the state → effect → state cycle entirely.

**Real-world savings:**
- Eliminates 1-3 extra renders per interaction
- Reduces component render time by 40-70%
- Synchronous updates feel more responsive
- Simpler mental model and easier debugging

## Learning Objectives

This exercise teaches when NOT to use effects - a critical skill for performance. You'll learn to distinguish between synchronization (external systems) and computation (derived values), recognize effect overuse, and refactor to event handlers and derived state.

## When Effects Are NOT Needed

- ❌ Computing derived state from props/state
- ❌ Responding to user interactions
- ❌ Updating one state based on another state
- ❌ Showing notifications after actions
- ❌ Filtering/sorting/transforming data for display

## When Effects ARE Needed

- ✅ Subscribing to external data sources
- ✅ Setting up DOM event listeners
- ✅ Synchronizing with browser APIs
- ✅ Making network requests
- ✅ Setting up timers/intervals

## Refactoring Patterns

```javascript
// ❌ Effect for derived state
useEffect(() => {
  setFiltered(items.filter(predicate));
}, [items]);

// ✅ Derive during render
const filtered = items.filter(predicate);

// ❌ Effect for event response
useEffect(() => {
  if (itemAdded) setNotification('Added!');
}, [itemAdded]);

// ✅ Direct in event handler
function addItem() {
  setItems([...items, item]);
  setNotification('Added!');
}
```
