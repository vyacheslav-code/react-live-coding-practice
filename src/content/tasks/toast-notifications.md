---
title: Toast Notification System
description: Build a toast notification system with auto-dismiss, queue management, and different types
tags:
  - useState
  - useEffect
  - context
  - animations
  - queue
difficulty: medium
timeEstimate: 25
learningGoals:
  - Build notification queue system
  - Implement auto-dismiss with timers
  - Create reusable toast context/hook
  - Handle multiple concurrent toasts
hints:
  - Use array state to manage toast queue
  - Each toast needs unique ID for removal
  - setTimeout for auto-dismiss with cleanup
  - Stack toasts vertically with position fixed
starterCode: |
  import { useState, useEffect, createContext, useContext, useCallback } from 'react';

  // Toast Context
  const ToastContext = createContext(null);

  export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
      throw new Error('useToast must be used within ToastProvider');
    }
    return context;
  }

  export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    // TODO: Add toast function
    const addToast = useCallback((message, type = 'info', duration = 3000) => {
      const id = Date.now() + Math.random();
      const toast = { id, message, type, duration };

      setToasts(prev => [...prev, toast]);

      // TODO: Auto-dismiss after duration
      // if (duration > 0) {
      //   setTimeout(() => removeToast(id), duration);
      // }
    }, []);

    // TODO: Remove toast function
    const removeToast = useCallback((id) => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    // Convenience methods
    const toast = {
      info: (msg, duration) => addToast(msg, 'info', duration),
      success: (msg, duration) => addToast(msg, 'success', duration),
      warning: (msg, duration) => addToast(msg, 'warning', duration),
      error: (msg, duration) => addToast(msg, 'error', duration),
    };

    return (
      <ToastContext.Provider value={toast}>
        {children}
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </ToastContext.Provider>
    );
  }

  function ToastContainer({ toasts, removeToast }) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 1000,
        }}
      >
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    );
  }

  function Toast({ toast, onClose }) {
    const { message, type } = toast;

    // TODO: Define colors for each type
    const colors = {
      info: { bg: '#eff6ff', border: '#3b82f6', text: '#1d4ed8' },
      success: { bg: '#f0fdf4', border: '#22c55e', text: '#166534' },
      warning: { bg: '#fefce8', border: '#eab308', text: '#a16207' },
      error: { bg: '#fef2f2', border: '#ef4444', text: '#dc2626' },
    };

    const style = colors[type] || colors.info;

    return (
      <div
        role="alert"
        style={{
          padding: '12px 16px',
          background: style.bg,
          border: `1px solid ${style.border}`,
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          minWidth: '280px',
          maxWidth: '400px',
          // TODO: Add enter animation
        }}
      >
        {/* Icon based on type */}
        <span style={{ fontSize: '20px' }}>
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'warning' && '⚠'}
          {type === 'info' && 'ℹ'}
        </span>

        <span style={{ flex: 1, color: style.text }}>{message}</span>

        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: style.text,
            opacity: 0.7,
          }}
        >
          ×
        </button>
      </div>
    );
  }

  // Demo App
  export default function App() {
    return (
      <ToastProvider>
        <DemoContent />
      </ToastProvider>
    );
  }

  function DemoContent() {
    const toast = useToast();

    return (
      <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
        <h1>Toast Notifications</h1>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          Click buttons to show different toast types
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={() => toast.info('This is an info message')}
            style={buttonStyle('#3b82f6')}
          >
            Show Info
          </button>

          <button
            onClick={() => toast.success('Action completed successfully!')}
            style={buttonStyle('#22c55e')}
          >
            Show Success
          </button>

          <button
            onClick={() => toast.warning('Warning: Check your input')}
            style={buttonStyle('#eab308')}
          >
            Show Warning
          </button>

          <button
            onClick={() => toast.error('Error: Something went wrong')}
            style={buttonStyle('#ef4444')}
          >
            Show Error
          </button>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
          <button
            onClick={() => {
              toast.info('First toast');
              setTimeout(() => toast.success('Second toast'), 500);
              setTimeout(() => toast.warning('Third toast'), 1000);
            }}
            style={buttonStyle('#6b7280')}
          >
            Show Multiple
          </button>

          <button
            onClick={() => toast.info('This stays for 10 seconds', 10000)}
            style={buttonStyle('#6b7280')}
          >
            Long Duration (10s)
          </button>
        </div>
      </div>
    );
  }

  const buttonStyle = (color) => ({
    padding: '12px 20px',
    background: color,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 500,
  });
---

## Task

Build a toast notification system with auto-dismiss and queue management.

### Requirements

**Toast Types:**
- Info (blue)
- Success (green)
- Warning (yellow)
- Error (red)

**Behavior:**
- Auto-dismiss after duration (default 3s)
- Manual dismiss with X button
- Stack multiple toasts vertically
- Each toast has unique ID

**Architecture:**
- ToastProvider wraps app
- useToast hook for showing toasts
- ToastContainer renders active toasts

### API

```javascript
const toast = useToast();

toast.info('Message');
toast.success('Saved!');
toast.warning('Check input');
toast.error('Failed!', 5000); // custom duration
```

### Example Behavior

1. Click "Show Success": green toast appears top-right
2. After 3 seconds: toast fades/disappears
3. Click X: toast dismisses immediately
4. Show multiple: toasts stack vertically
5. Newest toast at bottom (or top)

### Bonus Challenges

- Add slide-in/fade-out animations
- Add progress bar showing time remaining
- Add pause-on-hover
- Add position options (top-left, bottom-right, etc.)
- Add maximum toast limit
- Persist toasts across page navigation

### Testing Checklist

- [ ] Each type shows correct color/icon
- [ ] Auto-dismiss works after duration
- [ ] X button dismisses immediately
- [ ] Multiple toasts stack correctly
- [ ] Unique IDs prevent conflicts
- [ ] Custom duration works
