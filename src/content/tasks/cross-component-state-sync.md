---
title: Cross-Component State Sync
description: Synchronize state across unrelated components using custom event emitter pattern without prop drilling
tags:
  - state management
  - events
  - custom hooks
  - memory management
difficulty: hard
timeEstimate: 35
learningGoals:
  - Implement custom event emitter for cross-component communication
  - Create subscription management system
  - Build custom hooks for state synchronization
  - Prevent memory leaks with proper cleanup
  - Handle multiple subscribers and publishers
hints:
  - Create a global event emitter outside React
  - Use useEffect for subscription setup and cleanup
  - Store subscribers in a Map keyed by event name
  - Return cleanup function from useEffect
  - Use useCallback to stabilize event handlers
starterCode: |
  import { useState, useEffect, useCallback, useRef } from 'react';

  // TODO: Create EventEmitter class
  class EventEmitter {
    constructor() {
      this.events = new Map();
    }

    subscribe(eventName, callback) {
      // TODO: Add subscriber to event
      // TODO: Return unsubscribe function
    }

    emit(eventName, data) {
      // TODO: Notify all subscribers
    }

    getSubscriberCount(eventName) {
      // TODO: Return number of subscribers for debugging
      return 0;
    }
  }

  // Global event emitter instance
  const globalEvents = new EventEmitter();

  // TODO: Create custom hook for publishing events
  export function useEventPublisher(eventName) {
    const publish = useCallback((data) => {
      globalEvents.emit(eventName, data);
    }, [eventName]);

    return publish;
  }

  // TODO: Create custom hook for subscribing to events
  export function useEventSubscriber(eventName, callback) {
    useEffect(() => {
      // TODO: Subscribe to event
      // TODO: Return cleanup function

      return () => {
        // TODO: Unsubscribe
      };
    }, [eventName, callback]);
  }

  // TODO: Create custom hook for synced state
  export function useSyncedState(eventName, initialValue) {
    const [value, setValue] = useState(initialValue);

    // Subscribe to events
    const handleUpdate = useCallback((newValue) => {
      setValue(newValue);
    }, []);

    useEventSubscriber(eventName, handleUpdate);

    // Publish when value changes
    const publish = useEventPublisher(eventName);

    const updateValue = useCallback((newValue) => {
      setValue(newValue);
      publish(newValue);
    }, [publish]);

    return [value, updateValue];
  }

  // Components

  function ShoppingCart() {
    const [items, setItems] = useSyncedState('cart:items', []);
    const [notifications, setNotifications] = useState([]);

    // Subscribe to cart notifications
    useEventSubscriber('cart:notification', (message) => {
      setNotifications(prev => [...prev, { id: Date.now(), message }]);
      setTimeout(() => {
        setNotifications(prev => prev.slice(1));
      }, 3000);
    });

    const addItem = (item) => {
      setItems([...items, { id: Date.now(), ...item }]);
    };

    const removeItem = (id) => {
      setItems(items.filter(item => item.id !== id));
    };

    return (
      <div style={{ padding: '20px', border: '2px solid #333', borderRadius: '8px' }}>
        <h2>Shopping Cart ({items.length})</h2>

        {notifications.map(notif => (
          <div key={notif.id} style={{
            padding: '10px',
            background: '#e3f2fd',
            marginBottom: '10px',
            borderRadius: '4px'
          }}>
            {notif.message}
          </div>
        ))}

        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => removeItem(item.id)} style={{ marginLeft: '10px' }}>
                Remove
              </button>
            </li>
          ))}
        </ul>

        <button onClick={() => addItem({ name: 'Test Item', price: 9.99 })}>
          Add Test Item
        </button>
      </div>
    );
  }

  function ProductList() {
    const publish = useEventPublisher('cart:items');
    const notifyCart = useEventPublisher('cart:notification');

    const products = [
      { id: 1, name: 'Laptop', price: 999 },
      { id: 2, name: 'Mouse', price: 29 },
      { id: 3, name: 'Keyboard', price: 79 },
    ];

    const addToCart = (product) => {
      // Get current cart items (need to subscribe first)
      // For now, just publish the add event
      notifyCart(`Added ${product.name} to cart!`);
    };

    return (
      <div style={{ padding: '20px', border: '2px solid #333', borderRadius: '8px' }}>
        <h2>Products</h2>
        <ul>
          {products.map(product => (
            <li key={product.id} style={{ marginBottom: '10px' }}>
              <strong>{product.name}</strong> - ${product.price}
              <button onClick={() => addToCart(product)} style={{ marginLeft: '10px' }}>
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function CartSummary() {
    const [items] = useSyncedState('cart:items', []);

    const total = items.reduce((sum, item) => sum + item.price, 0);
    const itemCount = items.length;

    return (
      <div style={{
        padding: '15px',
        background: '#f5f5f5',
        borderRadius: '8px',
        position: 'sticky',
        top: '20px'
      }}>
        <h3>Cart Summary</h3>
        <p>Items: {itemCount}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
    );
  }

  function DebugPanel() {
    const [subscriberCounts, setSubscriberCounts] = useState({});

    useEffect(() => {
      const interval = setInterval(() => {
        setSubscriberCounts({
          'cart:items': globalEvents.getSubscriberCount('cart:items'),
          'cart:notification': globalEvents.getSubscriberCount('cart:notification'),
        });
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{
        padding: '15px',
        background: '#fff3e0',
        borderRadius: '8px',
        fontSize: '12px'
      }}>
        <h4>Debug: Event Subscribers</h4>
        <pre>{JSON.stringify(subscriberCounts, null, 2)}</pre>
      </div>
    );
  }

  export default function App() {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Cross-Component State Sync</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <div>
            <ProductList />
            <div style={{ marginTop: '20px' }}>
              <ShoppingCart />
            </div>
          </div>

          <div>
            <CartSummary />
            <div style={{ marginTop: '20px' }}>
              <DebugPanel />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px', padding: '15px', background: '#e8f5e9', borderRadius: '8px' }}>
          <h3>Instructions</h3>
          <ul>
            <li>Add products to cart from ProductList</li>
            <li>Remove items from ShoppingCart</li>
            <li>Watch CartSummary update automatically</li>
            <li>Check DebugPanel for subscriber counts</li>
            <li>Verify no memory leaks (subscribers cleanup)</li>
          </ul>
        </div>
      </div>
    );
  }
---

Build a cross-component state synchronization system using custom event emitter pattern to share state between unrelated components without prop drilling.

## Requirements

- Implement custom EventEmitter class
- Create subscription management system
- Build custom hooks for publishing and subscribing
- Implement useSyncedState hook for bidirectional sync
- Prevent memory leaks with proper cleanup
- Support multiple subscribers to same event
- Support multiple event types
- Track subscriber counts for debugging
- Handle rapid event emissions
- Ensure cleanup on component unmount

## EventEmitter API

Implement these methods:
- `subscribe(eventName, callback)`: Subscribe to event, returns unsubscribe function
- `emit(eventName, data)`: Emit event to all subscribers
- `getSubscriberCount(eventName)`: Get subscriber count for debugging

## Custom Hooks

### useEventPublisher(eventName)
- Returns publish function
- Memoizes function with useCallback
- Emits events to all subscribers

### useEventSubscriber(eventName, callback)
- Subscribes to event on mount
- Unsubscribes on unmount
- Re-subscribes if eventName or callback changes
- Handles cleanup properly

### useSyncedState(eventName, initialValue)
- Returns [value, setValue] like useState
- Automatically publishes changes
- Automatically subscribes to updates
- Syncs state across all components using this hook

## Components to Build

### ShoppingCart
- Uses useSyncedState for cart items
- Subscribes to cart notifications
- Can add/remove items
- Shows notifications temporarily (3 seconds)

### ProductList
- Displays available products
- Publishes add-to-cart events
- Sends notifications to cart

### CartSummary
- Uses useSyncedState to read cart (read-only)
- Calculates and displays total
- Shows item count

### DebugPanel
- Shows subscriber counts for each event
- Updates every second
- Helps verify cleanup works

## Events to Implement

- `cart:items`: Syncs shopping cart items array
- `cart:notification`: Sends notification messages

## Memory Management

Critical requirements:
- Unsubscribe on component unmount
- Clear event listeners properly
- Avoid creating new functions on every render
- Use useCallback for stable references
- Test with component mount/unmount

## Edge Cases

- Component subscribes then immediately unmounts
- Multiple components subscribe to same event
- Rapid event emissions (debouncing/throttling)
- Event emitted before any subscribers exist
- Subscriber callback throws error (should not break others)
- Circular event emissions

## Testing Checklist

- Add/remove items, verify all components update
- Unmount component, verify subscriber count decreases
- Mount multiple instances, verify all receive events
- Check console for memory leak warnings
- Verify notifications disappear after timeout
- Test rapid add/remove operations

## Learning Objectives

Master event-driven architecture in React, implement proper subscription cleanup to prevent memory leaks, build reusable state synchronization patterns, and understand when to use event emitters vs Context API. This pattern is essential for complex UIs with distant component communication.
