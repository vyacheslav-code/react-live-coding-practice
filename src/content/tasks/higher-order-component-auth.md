---
title: Higher-Order Component - Authentication
description: Create a withAuth HOC for role-based access control and route protection
tags:
  - advanced-patterns
  - higher-order-components
  - authentication
  - composition
difficulty: hard
timeEstimate: 35
learningGoals:
  - Understand and implement Higher-Order Components (HOC)
  - Implement role-based access control
  - Preserve component props and display name
  - Handle redirect logic and loading states
  - Compose multiple HOCs together
hints:
  - HOC is a function that takes a component and returns a new component
  - Use forwardRef to preserve ref forwarding
  - Set displayName for better debugging experience
  - Check authentication state before rendering wrapped component
  - Support both role-based and permission-based access
starterCode: |
  import { useState, useEffect } from 'react';

  // Mock auth service (simulates real authentication)
  const authService = {
    currentUser: null,

    login(username, role) {
      this.currentUser = { username, role, permissions: this.getRolePermissions(role) };
    },

    logout() {
      this.currentUser = null;
    },

    getRolePermissions(role) {
      const permissions = {
        admin: ['read', 'write', 'delete', 'manage_users'],
        editor: ['read', 'write'],
        viewer: ['read'],
      };
      return permissions[role] || [];
    },

    hasRole(role) {
      return this.currentUser?.role === role;
    },

    hasPermission(permission) {
      return this.currentUser?.permissions.includes(permission);
    },
  };

  // TODO: Implement withAuth HOC
  function withAuth(Component, options = {}) {
    // Options:
    // - requiredRole: string (e.g., 'admin')
    // - requiredPermissions: string[] (e.g., ['write', 'delete'])
    // - redirectTo: string (default: '/login')
    // - loadingComponent: React component to show while checking auth

    // TODO: Return a new component that:
    // 1. Checks if user is authenticated
    // 2. Checks if user has required role/permissions
    // 3. Shows loading state while checking
    // 4. Redirects if unauthorized
    // 5. Renders wrapped component if authorized
    // 6. Forwards all props to wrapped component
    // 7. Preserves component displayName

    const WithAuth = (props) => {
      // TODO: Implement authentication logic
      return <Component {...props} />;
    };

    // TODO: Set display name for debugging
    // WithAuth.displayName = `withAuth(${Component.displayName || Component.name})`;

    return WithAuth;
  }

  // TODO: Implement withPermissions HOC (variant of withAuth)
  function withPermissions(permissions) {
    return function(Component) {
      // TODO: Implement permission-based HOC
      return withAuth(Component, { requiredPermissions: permissions });
    };
  }

  // Example protected components
  function AdminDashboard({ username }) {
    return (
      <div style={{ padding: '20px', background: '#ffe0e0', borderRadius: '8px' }}>
        <h2>Admin Dashboard</h2>
        <p>Welcome, {username}! You have admin access.</p>
        <p>You can manage users, delete content, and access all features.</p>
      </div>
    );
  }

  function EditorPanel({ username }) {
    return (
      <div style={{ padding: '20px', background: '#e0f0ff', borderRadius: '8px' }}>
        <h2>Editor Panel</h2>
        <p>Welcome, {username}! You have editor access.</p>
        <p>You can read and write content.</p>
      </div>
    );
  }

  function ViewerContent({ username }) {
    return (
      <div style={{ padding: '20px', background: '#e0ffe0', borderRadius: '8px' }}>
        <h2>Viewer Content</h2>
        <p>Welcome, {username}! You have viewer access.</p>
        <p>You can read content.</p>
      </div>
    );
  }

  // TODO: Wrap components with withAuth HOC
  const ProtectedAdminDashboard = AdminDashboard; // Replace with: withAuth(AdminDashboard, { requiredRole: 'admin' })
  const ProtectedEditorPanel = EditorPanel; // Replace with: withAuth(EditorPanel, { requiredRole: 'editor' })
  const ProtectedViewerContent = ViewerContent; // Replace with: withAuth(ViewerContent, { requiredRole: 'viewer' })

  // Main app
  export default function App() {
    const [user, setUser] = useState(authService.currentUser);
    const [view, setView] = useState('login');

    const handleLogin = (role) => {
      authService.login(`${role}-user`, role);
      setUser(authService.currentUser);
      setView('dashboard');
    };

    const handleLogout = () => {
      authService.logout();
      setUser(null);
      setView('login');
    };

    return (
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>HOC Authentication System</h1>

        {!user ? (
          <div>
            <h2>Login</h2>
            <p>Choose a role to login:</p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button onClick={() => handleLogin('admin')}>Login as Admin</button>
              <button onClick={() => handleLogin('editor')}>Login as Editor</button>
              <button onClick={() => handleLogin('viewer')}>Login as Viewer</button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '6px' }}>
              <strong>Logged in as:</strong> {user.username} ({user.role})
              <button onClick={handleLogout} style={{ marginLeft: '15px' }}>Logout</button>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button onClick={() => setView('admin')}>Admin Dashboard</button>
              <button onClick={() => setView('editor')}>Editor Panel</button>
              <button onClick={() => setView('viewer')}>Viewer Content</button>
            </div>

            <div>
              {view === 'admin' && <ProtectedAdminDashboard username={user.username} />}
              {view === 'editor' && <ProtectedEditorPanel username={user.username} />}
              {view === 'viewer' && <ProtectedViewerContent username={user.username} />}
            </div>
          </div>
        )}
      </div>
    );
  }
---

Build a Higher-Order Component (HOC) for authentication and authorization. This pattern is used in production apps for protecting routes and components based on user roles and permissions.

## Requirements

### withAuth HOC

**Function Signature:**
```javascript
withAuth(Component, options) => EnhancedComponent
```

**Options Object:**
- `requiredRole`: string - Required user role ('admin', 'editor', 'viewer')
- `requiredPermissions`: string[] - Required permissions array
- `redirectTo`: string - Where to redirect if unauthorized (default: '/login')
- `loadingComponent`: Component to render while checking auth

**HOC Behavior:**
1. Check if user is authenticated
2. Check if user meets role/permission requirements
3. Show loading state during auth check (simulate with setTimeout)
4. Show "Access Denied" message if unauthorized
5. Render wrapped component if authorized
6. Forward all props to wrapped component
7. Set proper displayName for debugging

### withPermissions HOC

Create a curried variant:
```javascript
withPermissions(['write', 'delete'])(Component)
```

This is a specialized version of withAuth focusing on permissions.

### Component Enhancement

The HOC should:
- Preserve prop types and forwarded refs
- Set displayName: `withAuth(ComponentName)`
- Pass through all original props
- Add auth-related props (optional): `currentUser`, `hasPermission()`

## Advanced Challenges

1. **Compose Multiple HOCs**: Create `withAuthAndLogging` by composing HOCs
2. **Loading State**: Add configurable loading component
3. **Error Boundaries**: Wrap with error boundary for auth failures
4. **TypeScript**: Add proper generic types preserving component props
5. **Performance**: Memoize HOC to prevent unnecessary re-renders
6. **Dev Tools**: Make HOC-wrapped components visible in React DevTools
7. **Redirect State**: Pass redirect state to preserve return URL

## HOC Composition Example

```javascript
const enhance = compose(
  withAuth({ requiredRole: 'admin' }),
  withLogging,
  withErrorBoundary
);

const EnhancedComponent = enhance(MyComponent);
```

## Design Patterns to Learn

1. **Higher-Order Components**: Function that takes component, returns enhanced component
2. **Cross-Cutting Concerns**: Reuse logic across components
3. **Props Proxy**: Manipulate props passed to wrapped component
4. **Inheritance Inversion**: Render wrapped component and control rendering
5. **Display Name**: Set displayName for better debugging

## Real-World Usage

HOCs are used by:
- React Router (withRouter)
- Redux (connect)
- Relay (createFragmentContainer)
- Material-UI (withStyles)

While hooks have replaced many HOC use cases, HOCs remain valuable for:
- Class component enhancement
- Library APIs
- Composition patterns
- Legacy codebase maintenance

## Modern Alternative

Compare HOC with custom hook approach:
```javascript
// HOC
const Protected = withAuth(Component, { role: 'admin' });

// Hook
function Component() {
  const { user, authorized } = useAuth({ role: 'admin' });
  if (!authorized) return <Redirect />;
  return <div>Protected content</div>;
}
```

Understanding HOCs helps you:
- Maintain legacy code
- Understand library internals
- Choose between patterns
- Appreciate hooks advantages

## Validation Tips

- Login with different roles and test access
- Verify "Access Denied" shows for unauthorized access
- Check component displayName in React DevTools
- Confirm all props are forwarded correctly
- Test loading state appears briefly
- Verify logout clears authentication state
- Test permission-based access vs role-based access
