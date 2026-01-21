---
title: Global State with useReducer
description: Build a mini Redux-like global state management system using useReducer and Context API
tags:
  - useReducer
  - context
  - state management
  - redux pattern
difficulty: hard
timeEstimate: 40
learningGoals:
  - Implement Redux-like architecture with useReducer
  - Create action creators and action type constants
  - Build selector pattern for derived state
  - Implement middleware-like functionality
  - Combine reducers for modular state management
hints:
  - Define action types as constants to prevent typos
  - Use useReducer with Context to share state globally
  - Create action creator functions for type safety
  - Implement selectors to compute derived state
  - Add middleware by wrapping dispatch function
starterCode: |
  import { createContext, useContext, useReducer } from 'react';

  // Action Types
  const ADD_USER = 'ADD_USER';
  const REMOVE_USER = 'REMOVE_USER';
  const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
  const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

  // TODO: Create initial state
  const initialState = {
    users: [],
    counter: 0,
  };

  // TODO: Create reducer function
  function appReducer(state, action) {
    switch (action.type) {
      // TODO: Implement cases for each action type
      default:
        return state;
    }
  }

  // TODO: Create action creators
  export const actions = {
    addUser: (name) => ({ type: ADD_USER, payload: { name, id: Date.now() } }),
    // TODO: Add other action creators
  };

  // TODO: Create selectors
  export const selectors = {
    getUsers: (state) => state.users,
    getUserCount: (state) => state.users.length,
    getCounter: (state) => state.counter,
    // TODO: Add more selectors
  };

  // TODO: Create context
  const StateContext = createContext();
  const DispatchContext = createContext();

  // TODO: Create middleware wrapper for dispatch
  function applyMiddleware(dispatch) {
    return (action) => {
      console.log('Action:', action.type, action.payload);
      const result = dispatch(action);
      console.log('New State:', result);
      return result;
    };
  }

  // TODO: Create StoreProvider
  export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // TODO: Wrap dispatch with middleware

    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    );
  }

  // TODO: Create custom hooks
  export function useAppState() {
    const context = useContext(StateContext);
    if (!context) throw new Error('useAppState must be used within StoreProvider');
    return context;
  }

  export function useAppDispatch() {
    const context = useContext(DispatchContext);
    if (!context) throw new Error('useAppDispatch must be used within StoreProvider');
    return context;
  }

  // Components
  function UserList() {
    const state = useAppState();
    const users = selectors.getUsers(state);
    const dispatch = useAppDispatch();

    return (
      <div>
        <h3>Users ({users.length})</h3>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => dispatch(actions.removeUser(user.id))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function AddUserForm() {
    const dispatch = useAppDispatch();

    const handleSubmit = (e) => {
      e.preventDefault();
      const name = e.target.username.value;
      if (name) {
        dispatch(actions.addUser(name));
        e.target.reset();
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Enter name" />
        <button type="submit">Add User</button>
      </form>
    );
  }

  function Counter() {
    const state = useAppState();
    const counter = selectors.getCounter(state);
    const dispatch = useAppDispatch();

    return (
      <div>
        <h3>Counter: {counter}</h3>
        <button onClick={() => dispatch(actions.incrementCounter())}>+</button>
        <button onClick={() => dispatch(actions.decrementCounter())}>-</button>
      </div>
    );
  }

  export default function App() {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Global State Management</h1>
        <p>Implement Redux-like pattern with useReducer + Context</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <AddUserForm />
            <UserList />
          </div>
          <div>
            <Counter />
          </div>
        </div>
      </div>
    );
  }
---

Build a complete Redux-like state management system using useReducer and Context API with actions, reducers, selectors, and middleware.

## Requirements

- Create global store with useReducer and Context
- Implement action types as constants
- Build action creator functions
- Create reducer with multiple action cases
- Implement selector pattern for derived state
- Add middleware-like logging functionality
- Split state and dispatch into separate contexts
- Create custom hooks for consuming store
- Handle errors when hooks used outside provider
- Manage multiple slices of state (users and counter)
- Ensure immutable state updates

## Architecture Pattern

Follow Redux principles:
- Single source of truth (one state object)
- State is read-only (only updated via dispatch)
- Changes made with pure reducer functions
- Action creators for consistency
- Selectors for computed values

## Action Creators

Implement:
- `addUser(name)`: Add user with auto-generated ID
- `removeUser(id)`: Remove user by ID
- `incrementCounter()`: Increment counter
- `decrementCounter()`: Decrement counter
- `resetCounter()`: Reset counter to 0 (bonus)

## Selectors

Implement:
- `getUsers(state)`: Get all users
- `getUserCount(state)`: Get user count
- `getCounter(state)`: Get counter value
- `getUserById(state, id)`: Find user by ID (bonus)

## Middleware

Create a logging middleware that:
- Logs action type and payload before dispatch
- Logs resulting state after dispatch
- Maintains proper dispatch flow

## Testing Requirements

- Add multiple users
- Remove users by ID
- Increment/decrement counter
- Verify state updates are immutable
- Check console for middleware logs

## Learning Objectives

Understand Redux architecture patterns, implement reducer composition, master action creator and selector patterns, and build middleware functionality. This is essential knowledge for state management in large applications.
