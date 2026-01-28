---
title: Hoist Static JSX Outside Components
description: Extract static JSX outside components to prevent recreation on every render
tags:
  - performance
  - optimization
  - patterns
difficulty: medium
timeEstimate: 25
learningGoals:
  - Understand JSX object creation on each render
  - Hoist static JSX to module scope
  - Prevent unnecessary object creation
  - Identify when hoisting is beneficial
hints:
  - JSX creates new objects on every render
  - Static content that never changes can be hoisted
  - Define JSX outside component function
  - Use const variables at module level
starterCode: |
  import { useState } from 'react';

  // TODO: Hoist static JSX here

  function UserCard({ user, isActive }) {
    const [showDetails, setShowDetails] = useState(false);

    // Static header - never changes
    const header = (
      <div style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '8px 8px 0 0',
      }}>
        <h2 style={{ margin: 0 }}>User Profile</h2>
        <p style={{ margin: '8px 0 0 0', opacity: 0.9 }}>
          View and manage user information
        </p>
      </div>
    );

    // Static footer - never changes
    const footer = (
      <div style={{
        padding: '16px',
        background: '#f7f7f7',
        borderTop: '1px solid #e0e0e0',
        fontSize: '12px',
        color: '#666',
      }}>
        <p style={{ margin: 0 }}>
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p style={{ margin: '8px 0 0 0' }}>
          © 2026 User Management System
        </p>
      </div>
    );

    // Static placeholder - never changes
    const emptyState = (
      <div style={{
        padding: '60px 20px',
        textAlign: 'center',
        color: '#999',
      }}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2"/>
          <circle cx="12" cy="16" r="0.5" fill="currentColor"/>
        </svg>
        <h3>No User Selected</h3>
        <p>Select a user from the list to view details</p>
      </div>
    );

    if (!user) {
      return emptyState;
    }

    return (
      <div style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '20px auto',
      }}>
        {header}

        <div style={{ padding: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: isActive ? '#4CAF50' : '#999',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
            }}>
              {user.name[0]}
            </div>
            <div style={{ marginLeft: '16px' }}>
              <h3 style={{ margin: 0 }}>{user.name}</h3>
              <p style={{ margin: '4px 0 0 0', color: '#666' }}>
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{
              padding: '8px 16px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {showDetails ? 'Hide' : 'Show'} Details
          </button>

          {showDetails && (
            <div style={{ marginTop: '20px' }}>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Department:</strong> {user.department}</p>
              <p><strong>Status:</strong> {isActive ? 'Active' : 'Inactive'}</p>
            </div>
          )}
        </div>

        {footer}
      </div>
    );
  }

  export default function App() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isActive, setIsActive] = useState(true);

    const users = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer', department: 'Engineering' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer', department: 'Design' },
      { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Manager', department: 'Operations' },
    ];

    return (
      <div style={{ padding: '20px' }}>
        <h1>Hoist Static JSX Demo</h1>

        <div style={{ marginBottom: '20px' }}>
          <label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            {' '}Active User
          </label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <strong>Select User:</strong>
          {users.map(user => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              style={{
                marginLeft: '8px',
                padding: '8px 12px',
                background: selectedUser?.id === user.id ? '#667eea' : '#f0f0f0',
                color: selectedUser?.id === user.id ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {user.name}
            </button>
          ))}
          <button
            onClick={() => setSelectedUser(null)}
            style={{
              marginLeft: '8px',
              padding: '8px 12px',
              background: '#f0f0f0',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
        </div>

        <UserCard user={selectedUser} isActive={isActive} />

        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: '#f9f9f9',
          borderRadius: '8px',
        }}>
          <h3>Performance Tip</h3>
          <p>
            Static JSX elements (header, footer, emptyState) are recreated on every render.
            Hoist them outside the component to prevent unnecessary object creation.
          </p>
          <p>
            <strong>Why it matters:</strong> Each render creates new JSX objects, even if
            the content is identical. Moving static JSX to module scope prevents this waste.
          </p>
        </div>
      </div>
    );
  }
---

Learn to optimize component performance by hoisting static JSX outside the component function.

## Requirements

- Identify static JSX that never changes
- Move static JSX to module scope (outside component)
- Keep dynamic JSX inside component
- Verify that functionality remains unchanged
- Understand when hoisting is beneficial

## Implementation Steps

1. Identify JSX that doesn't depend on props or state
2. Move `header`, `footer`, and `emptyState` outside `UserCard`
3. Define as `const` variables at module level
4. Reference them inside component as before

## Expected Behavior

**Before hoisting:**
- Header, footer, and emptyState JSX recreated on every render
- More object creation and garbage collection
- Slightly higher memory churn

**After hoisting:**
- Static JSX created once at module initialization
- Same objects reused across renders
- Reduced object creation overhead

## Visual Example

```javascript
// ❌ Before: Recreated every render
function UserCard({ user }) {
  const header = <div>Static Header</div>;
  return <div>{header}...</div>;
}

// ✅ After: Created once
const HEADER = <div>Static Header</div>;

function UserCard({ user }) {
  return <div>{HEADER}...</div>;
}
```

## Learning Objectives

This exercise teaches JSX hoisting, a micro-optimization that prevents unnecessary object creation. While React is already fast at diffing, reducing object creation can help in components that render frequently or have large static sections.

## When to Hoist JSX

✅ **Good candidates:**
- Headers, footers that never change
- Empty state placeholders
- Static icons or decorations
- Loading spinners
- Error messages that are always the same

❌ **Don't hoist:**
- JSX that uses props or state
- JSX with event handlers that reference component scope
- JSX that needs different instances (like keys)

## Performance Impact

- **Micro-optimization**: Impact is small for most apps
- **Beneficial when**: Component renders very frequently
- **Best practice**: Do this naturally, don't over-optimize
- **Real benefit**: Cleaner code and clear intent (this JSX is static)

## Common Pitfall

```javascript
// ❌ Wrong: Event handler references component scope
const BUTTON = (
  <button onClick={() => setCount(count + 1)}>
    Click
  </button>
);

// ✅ Correct: Pass handler as prop or keep inside component
function MyComponent() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Click
    </button>
  );
}
```
