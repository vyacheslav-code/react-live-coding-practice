---
title: Type-Safe Event Emitter System
description: Build a strongly-typed event emitter with type-safe payloads and subscriber management
tags:
  - typescript
  - patterns
  - generics
difficulty: hard
timeEstimate: 35
learningGoals:
  - Create type-safe event emitter patterns
  - Use mapped types for event payload typing
  - Implement strongly-typed subscriber functions
  - Master template literal types for event names
  - Build generic event handler patterns
hints:
  - Define an event map type that maps event names to payload types
  - Use generics to ensure emit and on methods are type-safe
  - Constrain event names to keys of the event map
  - Type subscriber functions based on event payload type
  - Consider using a Map for internal subscriber storage
starterCode: |
  import { useEffect, useState } from 'react';

  // TODO: Create type-safe EventEmitter class
  class EventEmitter {
    constructor() {
      this.listeners = {};
    }

    on(event, callback) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);

      return () => {
        this.listeners[event] = this.listeners[event].filter(
          cb => cb !== callback
        );
      };
    }

    emit(event, data) {
      if (this.listeners[event]) {
        this.listeners[event].forEach(callback => callback(data));
      }
    }

    off(event, callback) {
      if (this.listeners[event]) {
        this.listeners[event] = this.listeners[event].filter(
          cb => cb !== callback
        );
      }
    }
  }

  // TODO: Define event types for the app
  const events = new EventEmitter();

  // Notification component
  function NotificationCenter() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
      const unsubscribe = events.on('notification', (notification) => {
        setNotifications(prev => [...prev, notification]);
        setTimeout(() => {
          setNotifications(prev =>
            prev.filter(n => n.id !== notification.id)
          );
        }, 3000);
      });

      return unsubscribe;
    }, []);

    return (
      <div style={{ position: 'fixed', top: 20, right: 20 }}>
        {notifications.map(notif => (
          <div
            key={notif.id}
            style={{
              padding: '10px',
              marginBottom: '10px',
              background: notif.type === 'error' ? '#fee' : '#efe',
              border: '1px solid #ccc'
            }}
          >
            {notif.message}
          </div>
        ))}
      </div>
    );
  }

  // User actions component
  function UserActions() {
    const [username, setUsername] = useState('');

    const handleLogin = () => {
      events.emit('user:login', {
        userId: 1,
        username,
        timestamp: Date.now()
      });
      events.emit('notification', {
        id: Date.now(),
        type: 'success',
        message: `Welcome, ${username}!`
      });
    };

    const handleLogout = () => {
      events.emit('user:logout', {
        userId: 1,
        timestamp: Date.now()
      });
      events.emit('notification', {
        id: Date.now(),
        type: 'info',
        message: 'You have been logged out'
      });
    };

    return (
      <div>
        <input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  // Activity log component
  function ActivityLog() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
      const unsubLogin = events.on('user:login', (data) => {
        setActivities(prev => [
          ...prev,
          `User ${data.username} logged in at ${new Date(data.timestamp).toLocaleTimeString()}`
        ]);
      });

      const unsubLogout = events.on('user:logout', (data) => {
        setActivities(prev => [
          ...prev,
          `User logged out at ${new Date(data.timestamp).toLocaleTimeString()}`
        ]);
      });

      return () => {
        unsubLogin();
        unsubLogout();
      };
    }, []);

    return (
      <div>
        <h3>Activity Log</h3>
        <ul>
          {activities.map((activity, idx) => (
            <li key={idx}>{activity}</li>
          ))}
        </ul>
      </div>
    );
  }

  export default function App() {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Type-Safe Event System</h1>
        <NotificationCenter />
        <UserActions />
        <ActivityLog />
      </div>
    );
  }
---

Build a type-safe event emitter system that provides compile-time guarantees for event names and payload types, preventing runtime errors from incorrect event usage.

## Requirements

- Create a generic `EventEmitter` class with type parameters
- Define an event map type that maps event names to payload types
- Type-safe `emit` method that enforces correct payload shape
- Type-safe `on` method that provides typed callback parameters
- Prevent emitting or subscribing to non-existent events
- Return unsubscribe function from `on` method
- Support multiple subscribers per event
- Full autocomplete for event names and payload properties

## TypeScript Patterns to Implement

### Event Map Type
```typescript
type AppEvents = {
  'user:login': { userId: number; username: string; timestamp: number };
  'user:logout': { userId: number; timestamp: number };
  'notification': { id: number; type: 'success' | 'error' | 'info'; message: string };
  'data:updated': { resource: string; id: number };
};
```

### Generic EventEmitter Class
```typescript
class EventEmitter<EventMap> {
  on<K extends keyof EventMap>(
    event: K,
    callback: (data: EventMap[K]) => void
  ): () => void;

  emit<K extends keyof EventMap>(
    event: K,
    data: EventMap[K]
  ): void;

  off<K extends keyof EventMap>(
    event: K,
    callback: (data: EventMap[K]) => void
  ): void;
}
```

### Typed Instance
```typescript
const events = new EventEmitter<AppEvents>();

// TypeScript enforces correct usage:
events.emit('user:login', { userId: 1, username: 'Alice', timestamp: Date.now() }); // ✓
events.emit('user:login', { userId: 1 }); // ✗ Error: missing username and timestamp
events.emit('invalid:event', {}); // ✗ Error: event doesn't exist
```

## Type Safety Goals

- Cannot emit events that aren't in the event map
- Payload must match the exact shape for each event
- Callback functions receive properly typed data parameter
- Autocomplete shows all available event names
- TypeScript catches typos in event names at compile time
- Cannot subscribe to non-existent events

## Example Behavior

### Type-Safe Emission
```typescript
events.emit('notification', {
  id: 1,
  type: 'success',
  message: 'Saved!'
}); // ✓

events.emit('notification', {
  id: 1,
  message: 'Saved!'
}); // ✗ Error: missing 'type'
```

### Type-Safe Subscription
```typescript
events.on('user:login', (data) => {
  console.log(data.username); // ✓ TypeScript knows username exists
  console.log(data.email);    // ✗ Error: email doesn't exist on this event
});
```

## Bonus Challenges

- Add support for wildcard event listeners (listen to all events)
- Implement `once` method for one-time subscriptions
- Add event namespacing with typed namespace support
- Create a React hook `useEventListener` for automatic cleanup
- Add event payload validation with runtime checks
- Implement event history/replay functionality
