---
title: Conditional Module Loading
description: Load feature modules only when they are activated, keeping initial bundle minimal
tags:
  - bundle-optimization
  - conditional-loading
  - feature-flags
  - dynamic-import
  - lazy-loading
difficulty: medium
timeEstimate: 30
learningGoals:
  - Implement conditional module loading based on feature flags
  - Load heavy dependencies only when features are enabled
  - Manage feature module lifecycle and cleanup
  - Track loaded modules and their dependencies
  - Optimize for minimal initial bundle size
hints:
  - Use dynamic import() inside conditional blocks
  - Feature flags determine which modules to load
  - Cache loaded modules to prevent reloading
  - Clean up modules when features are disabled
  - Track dependencies between feature modules
starterCode: |
  import { useState, useEffect, useRef } from 'react';

  // Feature modules with their dependencies
  const FeatureModules = {
    videoEditor: {
      name: 'Video Editor',
      size: 450, // KB
      dependencies: ['ffmpeg', 'video-codec', 'canvas-utils'],
      description: 'Advanced video editing with filters and effects',
      init: () => ({
        trim: (start, end) => `Trimming video ${start}-${end}`,
        addFilter: (filter) => `Adding filter: ${filter}`,
        export: (format) => `Exporting as ${format}`
      })
    },

    pdfGenerator: {
      name: 'PDF Generator',
      size: 280,
      dependencies: ['pdf-lib', 'canvas-api'],
      description: 'Generate PDFs from templates with data',
      init: () => ({
        create: (template) => `Creating PDF from ${template}`,
        addPage: () => 'Adding new page',
        download: () => 'Downloading PDF'
      })
    },

    dataVisualization: {
      name: 'Data Visualization',
      size: 320,
      dependencies: ['d3', 'chart-library', 'svg-engine'],
      description: 'Interactive charts and graphs',
      init: () => ({
        createChart: (type, data) => `Creating ${type} chart`,
        export: (format) => `Exporting as ${format}`,
        animate: () => 'Animating transitions'
      })
    },

    imageProcessing: {
      name: 'Image Processing',
      size: 380,
      dependencies: ['sharp', 'filters', 'webgl-engine'],
      description: 'Apply filters and transformations to images',
      init: () => ({
        resize: (width, height) => `Resizing to ${width}x${height}`,
        applyFilter: (filter) => `Applying ${filter}`,
        compress: (quality) => `Compressing with quality ${quality}`
      })
    },

    audioEditor: {
      name: 'Audio Editor',
      size: 250,
      dependencies: ['web-audio-api', 'audio-codec'],
      description: 'Edit and process audio files',
      init: () => ({
        trim: (start, end) => `Trimming audio ${start}-${end}`,
        addEffect: (effect) => `Adding effect: ${effect}`,
        normalize: () => 'Normalizing audio levels'
      })
    },

    collaborativeEdit: {
      name: 'Collaborative Editing',
      size: 200,
      dependencies: ['websocket', 'ot-algorithm', 'crdt'],
      description: 'Real-time collaborative editing',
      init: () => ({
        connect: () => 'Connecting to collaboration server',
        sync: () => 'Syncing changes',
        showCursors: () => 'Showing remote cursors'
      })
    }
  };

  export default function App() {
    const [enabledFeatures, setEnabledFeatures] = useState({});
    const [loadedModules, setLoadedModules] = useState({});
    const [loadingModules, setLoadingModules] = useState({});
    const [activeFeature, setActiveFeature] = useState(null);
    const moduleCache = useRef({});

    // TODO: Implement conditional module loading
    // Load modules only when features are enabled

    // TODO: Cache loaded modules
    // Store modules to prevent reloading

    // TODO: Handle module cleanup
    // Unload modules when features are disabled

    const loadModule = async (featureId) => {
      // TODO: Implement dynamic module loading
      // Use import() to load feature module on demand

      if (moduleCache.current[featureId]) {
        return moduleCache.current[featureId];
      }

      setLoadingModules(prev => ({ ...prev, [featureId]: true }));

      // Simulate loading time based on module size
      const feature = FeatureModules[featureId];
      await new Promise(resolve => setTimeout(resolve, feature.size));

      const module = feature.init();
      moduleCache.current[featureId] = module;

      setLoadedModules(prev => ({
        ...prev,
        [featureId]: {
          module,
          loadedAt: Date.now(),
          size: feature.size
        }
      }));

      setLoadingModules(prev => ({ ...prev, [featureId]: false }));

      return module;
    };

    const toggleFeature = async (featureId) => {
      const isEnabled = enabledFeatures[featureId];

      if (isEnabled) {
        // TODO: Disable feature and potentially unload module
        setEnabledFeatures(prev => ({ ...prev, [featureId]: false }));
        if (activeFeature === featureId) {
          setActiveFeature(null);
        }
      } else {
        // TODO: Enable feature and load module
        setEnabledFeatures(prev => ({ ...prev, [featureId]: true }));
        await loadModule(featureId);
        setActiveFeature(featureId);
      }
    };

    const unloadModule = (featureId) => {
      // TODO: Remove module from cache and memory
      delete moduleCache.current[featureId];
      setLoadedModules(prev => {
        const newLoaded = { ...prev };
        delete newLoaded[featureId];
        return newLoaded;
      });
    };

    const featuresArray = Object.entries(FeatureModules);
    const enabledCount = Object.values(enabledFeatures).filter(Boolean).length;
    const loadedCount = Object.keys(loadedModules).length;
    const totalLoadedSize = Object.values(loadedModules)
      .reduce((sum, mod) => sum + mod.size, 0);
    const totalPossibleSize = featuresArray
      .reduce((sum, [, feature]) => sum + feature.size, 0);

    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1>Conditional Module Loading</h1>

        <div style={{
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h3 style={{ marginTop: 0 }}>Bundle Status</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '15px',
            marginBottom: '15px'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: '#666' }}>Features Enabled</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                {enabledCount}/{featuresArray.length}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#666' }}>Modules Loaded</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2196F3' }}>
                {loadedCount}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#666' }}>Current Size</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4CAF50' }}>
                {totalLoadedSize} KB
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#666' }}>Without Lazy Loading</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f44336' }}>
                {totalPossibleSize} KB
              </div>
            </div>
          </div>

          {totalLoadedSize > 0 && (
            <div style={{
              padding: '15px',
              background: '#e8f5e9',
              borderRadius: '4px'
            }}>
              <strong>Savings:</strong>{' '}
              {totalPossibleSize - totalLoadedSize} KB (
              {((1 - totalLoadedSize / totalPossibleSize) * 100).toFixed(0)}% reduction)
            </div>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {featuresArray.map(([featureId, feature]) => {
            const isEnabled = enabledFeatures[featureId];
            const isLoaded = loadedModules[featureId];
            const isLoading = loadingModules[featureId];

            return (
              <div
                key={featureId}
                style={{
                  border: '2px solid ' + (isEnabled ? '#4CAF50' : '#ddd'),
                  borderRadius: '8px',
                  padding: '20px',
                  background: isEnabled ? '#f1f8f4' : 'white'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px'
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0' }}>{feature.name}</h3>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {feature.size} KB
                    </div>
                  </div>
                  <label style={{ cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={isEnabled || false}
                      onChange={() => toggleFeature(featureId)}
                      style={{ transform: 'scale(1.5)' }}
                    />
                  </label>
                </div>

                <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                  {feature.description}
                </p>

                <div style={{
                  fontSize: '12px',
                  color: '#999',
                  marginTop: '10px',
                  paddingTop: '10px',
                  borderTop: '1px solid #eee'
                }}>
                  <strong>Dependencies:</strong>
                  <div style={{ marginTop: '5px' }}>
                    {feature.dependencies.map(dep => (
                      <span
                        key={dep}
                        style={{
                          display: 'inline-block',
                          background: '#e0e0e0',
                          padding: '2px 6px',
                          borderRadius: '3px',
                          marginRight: '5px',
                          marginTop: '5px',
                          fontSize: '10px'
                        }}
                      >
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>

                {isLoading && (
                  <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    background: '#e3f2fd',
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontSize: '12px'
                  }}>
                    Loading module...
                  </div>
                )}

                {isLoaded && (
                  <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    background: '#e8f5e9',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    <div>✅ Module loaded</div>
                    <div style={{ marginTop: '5px', color: '#666' }}>
                      {new Date(isLoaded.loadedAt).toLocaleTimeString()}
                    </div>
                    <button
                      onClick={() => unloadModule(featureId)}
                      style={{
                        marginTop: '10px',
                        padding: '5px 10px',
                        fontSize: '11px',
                        border: 'none',
                        background: '#f44336',
                        color: 'white',
                        borderRadius: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      Unload Module
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {activeFeature && loadedModules[activeFeature] && (
          <div style={{
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            border: '2px solid #4CAF50'
          }}>
            <h3 style={{ marginTop: 0 }}>
              Active: {FeatureModules[activeFeature].name}
            </h3>
            <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
              <p>This feature's module is now loaded and ready to use.</p>
              <p><strong>Available methods:</strong></p>
              <ul>
                {Object.keys(loadedModules[activeFeature].module).map(method => (
                  <li key={method}>
                    <code style={{
                      background: '#f5f5f5',
                      padding: '2px 6px',
                      borderRadius: '3px'
                    }}>
                      {method}()
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#fff3cd',
          borderRadius: '8px'
        }}>
          <h3 style={{ marginTop: 0 }}>How Conditional Loading Works</h3>
          <ol style={{ lineHeight: '1.8' }}>
            <li>Features start disabled, no modules loaded</li>
            <li>User enables a feature (checkbox)</li>
            <li>Dynamic import() fetches the module on demand</li>
            <li>Module and its dependencies are loaded and initialized</li>
            <li>Feature becomes available instantly</li>
            <li>Disabling a feature can optionally unload the module</li>
          </ol>
        </div>

        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <strong>Tip:</strong> Only load feature modules when users actually need them
        </div>
      </div>
    );
  }
---

## Task

Implement conditional module loading that loads heavy feature modules only when they are activated by the user. Keep the initial bundle minimal by deferring all optional features.

### Requirements

1. **Feature Flag System**
   - Implement feature enable/disable toggles
   - Track which features are currently enabled
   - Persist feature preferences (localStorage)
   - Support feature dependencies
   - Handle feature conflicts (mutually exclusive features)

2. **Dynamic Module Loading**
   - Load feature modules only when enabled
   - Use dynamic import() for on-demand loading
   - Show loading state during module fetch
   - Handle module load errors gracefully
   - Support module retries on failure

3. **Module Caching**
   - Cache loaded modules in memory
   - Prevent duplicate loading of same module
   - Implement cache invalidation strategy
   - Support module versioning
   - Handle cache size limits

4. **Module Lifecycle**
   - Initialize modules after loading
   - Clean up resources when unloading
   - Track module load time and size
   - Support hot module replacement
   - Handle module dependencies

5. **Bundle Size Tracking**
   - Show current loaded bundle size
   - Compare with total possible size (all features)
   - Calculate savings from conditional loading
   - Display per-feature bundle impact
   - Track cumulative loading over time

### Example Behavior

- App loads with 0 KB of feature modules (initial bundle only)
- User enables "Video Editor" → 450 KB module loads
- Loading indicator shows for 450ms
- Module initializes and feature becomes available
- User enables "PDF Generator" → Another 280 KB loads
- Total loaded: 730 KB (vs 1880 KB if all loaded eagerly)
- Shows 61% bundle size reduction
- User disables "Video Editor" → Module can be unloaded
- Bundle size reduces back to 280 KB

### Bonus Challenges

- Implement progressive feature enhancement
- Add feature usage analytics
- Build smart preloading (predict next feature)
- Support lazy loading of feature sub-modules
- Create feature dependency graph visualization
- Implement feature A/B testing
- Add feature rollout/gradual release
- Support feature-based route splitting
- Build feature module hot reloading
- Create automatic feature flag optimization
