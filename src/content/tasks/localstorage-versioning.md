---
title: LocalStorage Versioning
description: Implement versioned localStorage with schema migration and data minimization
tags:
  - localStorage
  - data persistence
  - schema migration
  - optimization
difficulty: medium
timeEstimate: 30
learningGoals:
  - Version localStorage schemas for safe migrations
  - Minimize data size in storage
  - Handle schema changes gracefully
  - Implement migration strategies
  - Validate stored data integrity
hints:
  - Store version number with data
  - Check version on load and migrate if needed
  - Use migration functions for each version upgrade
  - Minimize JSON by removing default/unnecessary values
  - Consider compression for large datasets
starterCode: |
  import { useState, useEffect } from 'react';

  const STORAGE_KEY = 'app_user_preferences';
  const CURRENT_VERSION = 2;

  // Version 1 schema (old)
  // {
  //   version: 1,
  //   theme: 'light',
  //   fontSize: 16,
  //   sidebarOpen: true
  // }

  // Version 2 schema (current)
  // {
  //   version: 2,
  //   theme: 'light',
  //   fontSize: 16,
  //   sidebarOpen: true,
  //   notifications: {
  //     email: true,
  //     push: false,
  //     sound: true
  //   }
  // }

  const DEFAULT_PREFERENCES = {
    version: CURRENT_VERSION,
    theme: 'light',
    fontSize: 16,
    sidebarOpen: true,
    notifications: {
      email: true,
      push: false,
      sound: true
    }
  };

  // TODO: Implement migration functions
  const migrations = {
    1: (oldData) => {
      // Migrate from v1 to v2
      // TODO: Add notifications field with defaults
      return {
        ...oldData,
        version: 2,
        // Add new fields here
      };
    }
    // Add more migrations as versions increase
  };

  // TODO: Implement data loader with migration
  function loadPreferences() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_PREFERENCES;

      const data = JSON.parse(stored);

      // TODO: Check version
      // TODO: Run migrations if needed
      // TODO: Validate data structure

      return data;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return DEFAULT_PREFERENCES;
    }
  }

  // TODO: Implement data minimizer
  // Only store values that differ from defaults to save space
  function minimizeData(data, defaults) {
    // TODO: Compare data with defaults
    // TODO: Only include changed values
    // TODO: Always include version number
    return data; // Replace with minimized version
  }

  // TODO: Implement data expander
  // Restore default values for missing fields
  function expandData(minimized, defaults) {
    // TODO: Merge minimized data with defaults
    return minimized; // Replace with expanded version
  }

  function savePreferences(data) {
    try {
      // TODO: Minimize data before saving
      const minimized = minimizeData(data, DEFAULT_PREFERENCES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(minimized));

      // Show size comparison
      const fullSize = JSON.stringify(data).length;
      const minimizedSize = JSON.stringify(minimized).length;
      console.log(`Storage saved: ${fullSize - minimizedSize} bytes (${minimizedSize}/${fullSize})`);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }

  export default function App() {
    const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
    const [storageInfo, setStorageInfo] = useState({ size: 0, minimized: 0 });
    const [migrationLog, setMigrationLog] = useState([]);

    // Load preferences on mount
    useEffect(() => {
      const loaded = loadPreferences();
      setPreferences(loaded);
      updateStorageInfo();
    }, []);

    // Save whenever preferences change
    useEffect(() => {
      savePreferences(preferences);
      updateStorageInfo();
    }, [preferences]);

    const updateStorageInfo = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      const full = JSON.stringify(preferences);
      setStorageInfo({
        size: full.length,
        minimized: stored ? stored.length : 0
      });
    };

    const updatePreference = (key, value) => {
      setPreferences(prev => ({
        ...prev,
        [key]: value
      }));
    };

    const updateNotification = (key, value) => {
      setPreferences(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [key]: value
        }
      }));
    };

    const simulateOldVersion = () => {
      // Simulate v1 data
      const v1Data = {
        version: 1,
        theme: 'dark',
        fontSize: 14,
        sidebarOpen: false
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(v1Data));
      setMigrationLog(prev => [...prev, 'Saved v1 data - reload to trigger migration']);
    };

    const clearStorage = () => {
      localStorage.removeItem(STORAGE_KEY);
      setPreferences(DEFAULT_PREFERENCES);
      setMigrationLog([]);
    };

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const compressionRatio = storageInfo.size > 0
      ? ((1 - storageInfo.minimized / storageInfo.size) * 100).toFixed(1)
      : 0;

    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>LocalStorage Versioning & Minimization</h1>

        <div style={{
          padding: '15px',
          background: '#e3f2fd',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <strong>Storage Info</strong>
          <div>Full Size: {storageInfo.size} bytes</div>
          <div>Minimized: {storageInfo.minimized} bytes</div>
          <div>Compression: {compressionRatio}%</div>
          <div>Version: {preferences.version}</div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2>Preferences</h2>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Theme:
              <select
                value={preferences.theme}
                onChange={(e) => updatePreference('theme', e.target.value)}
                style={{ marginLeft: '10px', padding: '5px' }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </label>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Font Size: {preferences.fontSize}px
              <input
                type="range"
                min="12"
                max="24"
                value={preferences.fontSize}
                onChange={(e) => updatePreference('fontSize', Number(e.target.value))}
                style={{ marginLeft: '10px' }}
              />
            </label>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>
              <input
                type="checkbox"
                checked={preferences.sidebarOpen}
                onChange={(e) => updatePreference('sidebarOpen', e.target.checked)}
              />
              Sidebar Open
            </label>
          </div>

          <div style={{
            padding: '15px',
            background: '#f5f5f5',
            borderRadius: '8px',
            marginTop: '15px'
          }}>
            <h3>Notifications (v2 feature)</h3>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={preferences.notifications.email}
                  onChange={(e) => updateNotification('email', e.target.checked)}
                />
                Email Notifications
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={preferences.notifications.push}
                  onChange={(e) => updateNotification('push', e.target.checked)}
                />
                Push Notifications
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={preferences.notifications.sound}
                  onChange={(e) => updateNotification('sound', e.target.checked)}
                />
                Sound
              </label>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2>Testing</h2>
          <button
            onClick={simulateOldVersion}
            style={{ padding: '10px', marginRight: '10px' }}
          >
            Simulate v1 Data
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '10px', marginRight: '10px' }}
          >
            Reload Page (Test Migration)
          </button>
          <button
            onClick={clearStorage}
            style={{ padding: '10px' }}
          >
            Clear Storage
          </button>
        </div>

        {migrationLog.length > 0 && (
          <div style={{
            padding: '15px',
            background: '#fff3cd',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <strong>Migration Log:</strong>
            {migrationLog.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        )}

        <div style={{
          padding: '15px',
          background: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <h3>Stored Data (Minimized)</h3>
          <pre style={{
            background: '#fff',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '12px'
          }}>
            {JSON.stringify(saved, null, 2)}
          </pre>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <h3>Instructions</h3>
          <ol>
            <li>Implement migration system to upgrade v1 to v2</li>
            <li>Implement data minimization to only store changed values</li>
            <li>Click "Simulate v1 Data" then reload to test migration</li>
            <li>Change preferences and observe minimized storage</li>
            <li>Check console for storage size savings</li>
          </ol>
        </div>
      </div>
    );
  }
---

Implement a robust localStorage system with schema versioning, automatic migrations, and data minimization to optimize storage usage.

## Requirements

- Version all stored data with schema version number
- Implement migration system to upgrade old data formats
- Minimize stored data by omitting default values
- Expand minimized data when loading (restore defaults)
- Validate data structure and handle corruption
- Provide migration logging for debugging
- Calculate and display storage savings
- Handle edge cases (missing data, invalid JSON, etc.)

## Schema Versioning Pattern

```javascript
const data = {
  version: 2,  // Always store version
  // ... actual data
};

// On load:
if (data.version < CURRENT_VERSION) {
  data = migrate(data);
}
```

## Migration Strategy

For each version upgrade, create a migration function:

```javascript
const migrations = {
  1: (old) => ({ ...old, version: 2, newField: default }),
  2: (old) => ({ ...old, version: 3, /* changes */ }),
  // Chain migrations for multi-version jumps
};

function migrate(data) {
  let current = data;
  while (current.version < CURRENT_VERSION) {
    current = migrations[current.version](current);
  }
  return current;
}
```

## Data Minimization

Only store values that differ from defaults:

```javascript
// Full data: 250 bytes
{
  version: 2,
  theme: "light",      // default
  fontSize: 16,        // default
  sidebarOpen: false,  // NOT default (true)
  notifications: {
    email: true,       // default
    push: false,       // default
    sound: false       // NOT default (true)
  }
}

// Minimized: 80 bytes (68% savings)
{
  version: 2,
  sidebarOpen: false,
  notifications: {
    sound: false
  }
}
```

## Implementation Steps

1. **Load**: Read from localStorage
2. **Parse**: JSON.parse with error handling
3. **Validate**: Check version exists
4. **Migrate**: Run migration chain if needed
5. **Expand**: Merge with defaults
6. **Use**: Work with full data in app
7. **Minimize**: Before saving, remove defaults
8. **Save**: Write minimized data back

## Deep Merge for Nested Objects

```javascript
function deepMerge(defaults, partial) {
  const result = { ...defaults };
  for (const key in partial) {
    if (typeof partial[key] === 'object' && !Array.isArray(partial[key])) {
      result[key] = deepMerge(defaults[key] || {}, partial[key]);
    } else {
      result[key] = partial[key];
    }
  }
  return result;
}
```

## Error Handling

```javascript
function safeLoad() {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return defaults;

    const parsed = JSON.parse(stored);
    if (!parsed.version) throw new Error('No version');

    return migrate(expand(parsed));
  } catch (error) {
    console.error('Storage corrupted, using defaults', error);
    return defaults;
  }
}
```

## Storage Limits

- localStorage typically has 5-10MB limit per origin
- Check quota: `navigator.storage.estimate()`
- Handle QuotaExceededError
- Consider IndexedDB for larger datasets

## Testing Migrations

1. Save v1 format manually
2. Reload app
3. Verify migration ran
4. Check all fields present
5. Confirm data integrity

## Advanced Features

- **Compression**: Use LZ-string for large datasets
- **Encryption**: Encrypt sensitive data
- **Sync**: Share across tabs with storage events
- **Backup**: Keep previous version during migration
- **Rollback**: Revert if migration fails

## Performance Optimization

```javascript
// Debounce saves to avoid excessive writes
const debouncedSave = debounce(savePreferences, 500);

useEffect(() => {
  debouncedSave(preferences);
}, [preferences]);
```

## Learning Objectives

Master localStorage schema evolution strategies. Understand the importance of versioning client-side data. Learn to minimize storage footprint. Handle breaking changes gracefully without data loss.

## Real-World Use Cases

- User preferences and settings
- Draft content (forms, editors)
- Shopping cart persistence
- Feature flags and A/B tests
- Offline-first app data
- Session state restoration

## Common Pitfalls

- Forgetting to version data initially
- Not handling missing fields in old versions
- Breaking changes without migration path
- Storing too much data (hitting quota)
- Not validating restored data
- Forgetting to test migration paths
