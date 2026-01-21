---
title: Type-Safe Context Provider Pattern
description: Create a reusable type-safe Context API pattern that prevents undefined context access
tags:
  - typescript
  - context
  - generics
difficulty: medium
timeEstimate: 30
learningGoals:
  - Build generic context provider utilities
  - Prevent undefined context access at compile time
  - Create type-safe context consumer hooks
  - Master factory functions for context creation
  - Use assertion functions for runtime safety
hints:
  - Create a factory function that returns both Provider and hook
  - Use TypeScript assertion functions to narrow undefined types
  - Throw errors when context is used outside provider
  - Make the hook return non-nullable context value
  - Consider generic type parameters for context value
starterCode: |
  import { createContext, useContext, useState } from 'react';

  // TODO: Create a generic createSafeContext utility

  // Example 1: Theme Context
  const ThemeContext = createContext(undefined);

  function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
      throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
  }

  // Example 2: Auth Context
  const AuthContext = createContext(undefined);

  function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (username) => {
      setUser({ id: 1, username });
    };

    const logout = () => {
      setUser(null);
    };

    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }

  function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
  }

  // Components using the contexts
  function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (
      <button onClick={toggleTheme}>
        Current theme: {theme}
      </button>
    );
  }

  function UserProfile() {
    const { user, login, logout } = useAuth();

    if (!user) {
      return <button onClick={() => login('Alice')}>Login</button>;
    }

    return (
      <div>
        <p>Welcome, {user.username}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  export default function App() {
    return (
      <ThemeProvider>
        <AuthProvider>
          <div style={{ padding: '20px' }}>
            <h1>Type-Safe Context Demo</h1>
            <ThemeToggle />
            <UserProfile />
          </div>
        </AuthProvider>
      </ThemeProvider>
    );
  }
---

Create a reusable utility for creating type-safe React contexts that eliminate the common "undefined context" problem and provide better TypeScript support.

## Requirements

- Build a `createSafeContext` factory function
- Return both a Provider component and consumer hook
- Prevent usage outside of Provider at compile time
- Eliminate need for undefined checks in consumers
- Make the pattern reusable for any context type
- Provide helpful error messages when misused
- Support generic type parameters

## TypeScript Patterns to Implement

### Factory Function Type
```typescript
function createSafeContext<T>() {
  const Context = createContext<T | undefined>(undefined);

  function useCtx(): T {
    const ctx = useContext(Context);
    if (ctx === undefined) {
      throw new Error('Context used outside provider');
    }
    return ctx;
  }

  return [Context.Provider, useCtx] as const;
}
```

### Usage Pattern
```typescript
const [ThemeProvider, useTheme] = createSafeContext<{
  theme: string;
  toggleTheme: () => void;
}>();

// Now useTheme() always returns non-undefined value
function MyComponent() {
  const { theme, toggleTheme } = useTheme(); // No undefined check needed!
  return <button onClick={toggleTheme}>{theme}</button>;
}
```

## Type Safety Goals

- The consumer hook returns non-nullable context value
- TypeScript enforces Provider usage before hook usage
- No need for `context?.value` checks
- Full autocomplete on context value properties
- Runtime error when hook used outside Provider
- Generic type parameter for context value

## Key Challenges

### Problem: Standard Context Pattern
```typescript
const ctx = useContext(MyContext);
// ctx is possibly undefined - must check every time
if (!ctx) throw new Error('...');
```

### Solution: Safe Context Factory
```typescript
const ctx = useMySafeContext();
// ctx is guaranteed to be defined - TypeScript knows this
```

## Example Behavior

Using the safe context utility:

```typescript
const [AuthProvider, useAuth] = createSafeContext<AuthContextType>();

function AuthProviderComponent({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthProvider value={{ user, login, logout }}>
      {children}
    </AuthProvider>
  );
}

function UserProfile() {
  const { user, login, logout } = useAuth(); // Never undefined!
  // Use context without null checks
}
```

## Bonus Challenges

- Add display names to Provider components for DevTools
- Create a `createSafeContextWithDefault` that accepts default value
- Add optional context initialization function
- Create a `createSafeContextWithSelector` for performance optimization
- Add TypeScript tests to verify type safety
