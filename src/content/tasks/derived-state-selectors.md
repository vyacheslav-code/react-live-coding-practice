---
title: Derived State with Selectors
description: Use selector functions to subscribe only to derived values and prevent unnecessary re-renders
tags:
  - performance
  - derived-state
  - selectors
  - optimization
difficulty: medium
timeEstimate: 30
learningGoals:
  - Understand derived state vs raw state subscriptions
  - Create selector functions that compute booleans
  - Prevent re-renders from irrelevant state changes
  - Learn when selectors improve performance
hints:
  - Create separate hooks for each derived value
  - Return booleans/strings instead of full objects
  - Component only re-renders when selector result changes
  - Use useMemo inside custom hooks for derived values
starterCode: |
  import { useState, useMemo } from 'react';

  // Global store (simplified)
  let listeners = [];
  let state = {
    user: { name: 'Alice', role: 'admin', lastLogin: Date.now() },
    posts: [],
    notifications: 0
  };

  function useStore() {
    const [, forceUpdate] = useState({});

    useMemo(() => {
      const listener = () => forceUpdate({});
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    }, []);

    return state;
  }

  function updateStore(newState) {
    state = { ...state, ...newState };
    listeners.forEach(l => l());
  }

  // TODO: Create selector hooks
  // Example: useIsAdmin() should return boolean
  // Example: useUserName() should return string
  // These should prevent re-renders when unrelated state changes

  const AdminPanel = () => {
    const store = useStore(); // Re-renders on ANY state change
    console.log('AdminPanel rendered');

    if (store.user.role !== 'admin') {
      return <div>Access denied</div>;
    }

    return <div>Admin controls visible</div>;
  };

  const UserGreeting = () => {
    const store = useStore(); // Re-renders on ANY state change
    console.log('UserGreeting rendered');
    return <div>Hello, {store.user.name}!</div>;
  };

  const NotificationBadge = () => {
    const store = useStore(); // Re-renders on ANY state change
    console.log('NotificationBadge rendered');

    if (store.notifications === 0) {
      return null;
    }

    return <span className="badge">{store.notifications}</span>;
  };

  export default function App() {
    return (
      <div>
        <h1>Selector Optimization Demo</h1>

        <UserGreeting />
        <AdminPanel />
        <NotificationBadge />

        <div>
          <button onClick={() => updateStore({
            user: { ...state.user, lastLogin: Date.now() }
          })}>
            Update Last Login (irrelevant change)
          </button>

          <button onClick={() => updateStore({
            user: { ...state.user, name: 'Bob' }
          })}>
            Change Name
          </button>

          <button onClick={() => updateStore({
            notifications: state.notifications + 1
          })}>
            Add Notification
          </button>
        </div>

        <p>Open console to see render logs</p>
        <p>Notice: ALL components re-render on ANY state change</p>
      </div>
    );
  }
---

Learn to optimize performance by subscribing to derived state values instead of raw state objects.

## Requirements

- Create `useIsAdmin()` hook that returns boolean
- Create `useUserName()` hook that returns string
- Create `useHasNotifications()` hook that returns boolean
- Update components to use selector hooks
- Verify components only re-render when their specific data changes
- Add console.log to track render behavior

## Expected Behavior

**Before selectors:**
- Updating lastLogin re-renders ALL components
- Changing notifications re-renders ALL components
- Every state change causes universal re-renders

**After selectors:**
- Updating lastLogin re-renders nothing (derived values unchanged)
- Changing name only re-renders UserGreeting
- Adding notifications only re-renders NotificationBadge
- Each component subscribes only to its needed data

## Performance Impact

**Problem:** Subscribing to entire store/context causes re-renders even when component's data hasn't changed. Component checks `user.role === 'admin'` but re-renders when `user.lastLogin` changes.

**Solution:** Selector hooks return computed primitives (booleans, strings). Component only re-renders when selector output changes, not when unrelated state changes.

**Real-world savings:** In apps with frequent state updates, this can reduce re-renders by 60-90% for components that only need derived values.

## Learning Objectives

This exercise teaches derived state optimization - a critical pattern for apps with complex state. You'll learn to create selector functions that compute derived values, allowing components to subscribe only to the data they actually need.

## When to Use Selectors

- Component needs derived boolean/string from complex state
- State updates frequently but component's data rarely changes
- Multiple components need same derived value
- Working with global state (Context, Redux, Zustand)
- Don't optimize prematurely - measure first
