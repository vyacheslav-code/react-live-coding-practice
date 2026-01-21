---
title: Optimistic Todo with Sync & Conflict Resolution
description: Build a todo app with optimistic updates, delayed backend sync, conflict resolution, and retry logic
tags:
  - optimistic-updates
  - async
  - state-management
  - error-handling
  - sync
difficulty: hard
timeEstimate: 35
learningGoals:
  - Implement optimistic UI updates for instant feedback
  - Handle server sync with delayed responses and failures
  - Resolve conflicts between local and server state
  - Build retry queue for failed operations
  - Manage complex async state transitions
hints:
  - Update UI immediately (optimistic), then sync with server
  - Track pending operations separately from completed ones
  - Use temporary IDs for new items until server responds with real ID
  - Implement exponential backoff for retries (1s, 2s, 4s, max 10s)
  - Handle conflicts by preferring server state but preserving unsynced changes
  - Store operation queue to retry failed syncs
starterCode: |
  import { useState, useEffect, useRef } from 'react';

  // Mock API with realistic delays and random failures
  let serverTodos = [
    { id: 1, text: 'Buy groceries', completed: false, version: 1 },
    { id: 2, text: 'Walk the dog', completed: true, version: 1 },
  ];
  let nextId = 3;

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const mockAPI = {
    async fetchTodos() {
      await delay(500 + Math.random() * 500);
      return [...serverTodos];
    },

    async addTodo(text) {
      await delay(1000 + Math.random() * 1000);
      if (Math.random() < 0.2) throw new Error('Network error');

      const todo = { id: nextId++, text, completed: false, version: 1 };
      serverTodos.push(todo);
      return todo;
    },

    async updateTodo(id, updates) {
      await delay(800 + Math.random() * 800);
      if (Math.random() < 0.2) throw new Error('Network error');

      const todo = serverTodos.find(t => t.id === id);
      if (!todo) throw new Error('Todo not found');

      Object.assign(todo, updates);
      todo.version++;
      return todo;
    },

    async deleteTodo(id) {
      await delay(600 + Math.random() * 600);
      if (Math.random() < 0.2) throw new Error('Network error');

      serverTodos = serverTodos.filter(t => t.id !== id);
      return { success: true };
    }
  };

  export default function App() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [syncStatus, setSyncStatus] = useState('synced'); // synced, syncing, error
    const [pendingOps, setPendingOps] = useState([]);
    const [retryQueue, setRetryQueue] = useState([]);

    // TODO: Add refs for tracking operation IDs and retry attempts

    // TODO: Load initial todos from server

    // TODO: Implement retry logic with exponential backoff

    // TODO: Process retry queue periodically

    const addTodo = async () => {
      if (!inputValue.trim()) return;

      // TODO: Implement optimistic add
      // 1. Generate temporary ID (e.g., 'temp-123')
      // 2. Add to local state immediately
      // 3. Call API in background
      // 4. Replace temp ID with real ID on success
      // 5. Handle errors and add to retry queue

      setInputValue('');
    };

    const toggleTodo = async (id) => {
      // TODO: Implement optimistic toggle
      // 1. Update local state immediately
      // 2. Call API in background
      // 3. Revert on failure and add to retry queue
    };

    const deleteTodo = async (id) => {
      // TODO: Implement optimistic delete
      // 1. Remove from local state immediately
      // 2. Call API in background
      // 3. Re-add on failure and add to retry queue
    };

    const retryFailedOp = async (operation) => {
      // TODO: Retry a failed operation
      // Implement based on operation type (add, update, delete)
    };

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>Optimistic Todo List</h1>

        <div style={{
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '4px',
          background: syncStatus === 'synced' ? '#d4edda' :
                     syncStatus === 'syncing' ? '#fff3cd' : '#f8d7da',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            Status: <strong>{syncStatus}</strong>
            {pendingOps.length > 0 && ` (${pendingOps.length} pending)`}
            {retryQueue.length > 0 && ` | ${retryQueue.length} failed operations`}
          </div>
          {retryQueue.length > 0 && (
            <button
              onClick={() => {
                // TODO: Retry all failed operations
              }}
              style={{
                padding: '5px 10px',
                fontSize: '12px',
                border: 'none',
                background: '#ff9800',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Retry All
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new todo..."
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
          <button
            onClick={addTodo}
            disabled={!inputValue.trim()}
            style={{
              padding: '10px 20px',
              borderRadius: '4px',
              border: 'none',
              background: '#2196F3',
              color: 'white',
              cursor: !inputValue.trim() ? 'not-allowed' : 'pointer',
              opacity: !inputValue.trim() ? 0.5 : 1
            }}
          >
            Add
          </button>
        </div>

        <div>
          {todos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              No todos yet. Add one above!
            </div>
          ) : (
            todos.map(todo => {
              const isPending = pendingOps.some(op => op.todoId === todo.id);
              const hasFailed = retryQueue.some(op => op.todoId === todo.id);
              const isTemp = String(todo.id).startsWith('temp-');

              return (
                <div
                  key={todo.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '15px',
                    marginBottom: '10px',
                    background: hasFailed ? '#ffebee' : isTemp || isPending ? '#e3f2fd' : '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    opacity: isTemp || isPending ? 0.7 : 1,
                    transition: 'all 0.2s'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                  <span style={{
                    flex: 1,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#999' : '#000'
                  }}>
                    {todo.text}
                  </span>
                  {isTemp && (
                    <span style={{ fontSize: '10px', color: '#2196F3', fontWeight: 'bold' }}>
                      SYNCING...
                    </span>
                  )}
                  {hasFailed && (
                    <span style={{ fontSize: '10px', color: '#f44336', fontWeight: 'bold' }}>
                      FAILED
                    </span>
                  )}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    style={{
                      padding: '5px 10px',
                      border: 'none',
                      background: '#f44336',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div>Note: API has ~20% random failure rate to test error handling</div>
          <div>Temp IDs are used until server confirms the operation</div>
        </div>
      </div>
    );
  }
---

## Task

Build a production-ready todo application with optimistic updates, server synchronization, conflict resolution, and automatic retry logic for failed operations.

### Requirements

1. **Optimistic Updates**
   - Update UI immediately when user takes action (add, toggle, delete)
   - Don't wait for server response to show changes
   - Use temporary IDs for new items until server confirms
   - Show visual indicator for pending operations

2. **Server Synchronization**
   - Sync all operations with mock backend
   - Handle delayed responses (1-2 seconds)
   - Track pending operations separately
   - Replace temporary IDs with real IDs from server

3. **Error Handling & Retry**
   - Detect failed API calls (20% random failure rate)
   - Add failed operations to retry queue
   - Implement exponential backoff (1s, 2s, 4s, max 10s)
   - Show failed operations with visual indicator
   - Provide manual "Retry All" button

4. **Conflict Resolution**
   - Handle case where server state differs from local
   - Prefer server state but preserve unsynced local changes
   - Version tracking to detect conflicts
   - Revert optimistic updates on conflict

5. **Sync Status Indicator**
   - Show sync status: `synced`, `syncing`, `error`
   - Display count of pending operations
   - Display count of failed operations
   - Update in real-time

### Example Behavior

- User adds todo → Appears immediately with temp ID + "SYNCING" label
- After 1-2s → Temp ID replaced with real ID, label removed
- User toggles todo → Updates immediately, syncs in background
- API fails → Item marked as "FAILED", added to retry queue
- After 1s → Automatic retry attempt
- Retry fails → Wait 2s, retry again (exponential backoff)
- User clicks "Retry All" → All failed operations retry immediately
- All synced → Status shows "synced" with green background

### Bonus Challenges

- Persist todos and retry queue to localStorage
- Handle concurrent edits to same todo
- Add undo/redo functionality
- Show operation history/timeline
- Implement batch sync (combine multiple operations)
- Add optimistic reordering with drag-drop
- Handle offline mode explicitly
