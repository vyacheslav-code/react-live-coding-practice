---
title: Undo/Redo Functionality
description: Build a complete undo/redo system with time-travel state management for a drawing canvas or form
tags:
  - state management
  - useReducer
  - command pattern
  - history
difficulty: hard
timeEstimate: 40
learningGoals:
  - Implement command pattern for undo/redo
  - Build time-travel state management
  - Manage history stack with size limits
  - Handle branching timelines when undoing then making new changes
  - Create keyboard shortcuts for undo/redo
hints:
  - Maintain separate arrays for past states and future states
  - When new action occurs after undo, clear future states
  - Use Cmd+Z / Ctrl+Z for undo, Cmd+Shift+Z for redo
  - Consider using useReducer to manage history state
  - Limit history size to prevent memory issues
starterCode: |
  import { useReducer, useEffect, useCallback } from 'react';

  // TODO: Define action types
  const ACTIONS = {
    ADD_SHAPE: 'ADD_SHAPE',
    MOVE_SHAPE: 'MOVE_SHAPE',
    DELETE_SHAPE: 'DELETE_SHAPE',
    CHANGE_COLOR: 'CHANGE_COLOR',
    UNDO: 'UNDO',
    REDO: 'REDO',
  };

  // Initial state structure
  const initialState = {
    present: {
      shapes: [], // Array of { id, type, x, y, color, size }
    },
    past: [], // Array of previous states
    future: [], // Array of future states (for redo)
  };

  // TODO: Create history reducer
  function historyReducer(state, action) {
    switch (action.type) {
      case ACTIONS.UNDO:
        // TODO: Move to previous state
        if (state.past.length === 0) return state;

        // TODO: Implement undo logic
        return state;

      case ACTIONS.REDO:
        // TODO: Move to next state
        if (state.future.length === 0) return state;

        // TODO: Implement redo logic
        return state;

      case ACTIONS.ADD_SHAPE:
      case ACTIONS.MOVE_SHAPE:
      case ACTIONS.DELETE_SHAPE:
      case ACTIONS.CHANGE_COLOR:
        // TODO: Update present state and add current state to past
        // TODO: Clear future (branching timeline)

        const newPresent = shapesReducer(state.present, action);

        return {
          past: [...state.past, state.present].slice(-50), // Limit history to 50
          present: newPresent,
          future: [], // Clear redo stack
        };

      default:
        return state;
    }
  }

  // TODO: Create shapes reducer for actual state changes
  function shapesReducer(state, action) {
    switch (action.type) {
      case ACTIONS.ADD_SHAPE:
        // TODO: Add new shape to shapes array
        return state;

      case ACTIONS.MOVE_SHAPE:
        // TODO: Update shape position
        return state;

      case ACTIONS.DELETE_SHAPE:
        // TODO: Remove shape from array
        return state;

      case ACTIONS.CHANGE_COLOR:
        // TODO: Update shape color
        return state;

      default:
        return state;
    }
  }

  function Canvas({ shapes, onShapeClick }) {
    return (
      <div
        style={{
          width: '600px',
          height: '400px',
          border: '2px solid #333',
          position: 'relative',
          background: '#f9f9f9',
          cursor: 'crosshair'
        }}
        onClick={(e) => {
          // TODO: Add shape at click position
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          console.log('Click at:', x, y);
        }}
      >
        {shapes.map(shape => (
          <div
            key={shape.id}
            onClick={(e) => {
              e.stopPropagation();
              onShapeClick(shape.id);
            }}
            style={{
              position: 'absolute',
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              background: shape.color,
              borderRadius: shape.type === 'circle' ? '50%' : '0',
              cursor: 'pointer',
              border: '2px solid #333'
            }}
            title={`Click to delete ${shape.type}`}
          />
        ))}
      </div>
    );
  }

  function Toolbar({ onAddShape, canUndo, canRedo, onUndo, onRedo, historyInfo }) {
    return (
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button onClick={() => onAddShape('square', '#ff6b6b')}>
            Add Red Square
          </button>
          <button onClick={() => onAddShape('circle', '#4ecdc4')}>
            Add Teal Circle
          </button>
          <button onClick={() => onAddShape('square', '#ffe66d')}>
            Add Yellow Square
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={onUndo} disabled={!canUndo}>
            ⬅️ Undo {canUndo && `(${historyInfo.pastCount})`}
          </button>
          <button onClick={onRedo} disabled={!canRedo}>
            ➡️ Redo {canRedo && `(${historyInfo.futureCount})`}
          </button>
          <span style={{ marginLeft: '20px', color: '#666' }}>
            Keyboard: Cmd/Ctrl+Z (undo), Cmd/Ctrl+Shift+Z (redo)
          </span>
        </div>
      </div>
    );
  }

  export default function App() {
    const [state, dispatch] = useReducer(historyReducer, initialState);

    const canUndo = state.past.length > 0;
    const canRedo = state.future.length > 0;

    // TODO: Implement keyboard shortcuts
    useEffect(() => {
      const handleKeyDown = (e) => {
        // TODO: Check for Cmd/Ctrl+Z (undo)
        // TODO: Check for Cmd/Ctrl+Shift+Z (redo)
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [canUndo, canRedo]);

    // TODO: Implement add shape handler
    const handleAddShape = useCallback((type, color) => {
      const newShape = {
        id: Date.now(),
        type,
        color,
        x: Math.random() * 500,
        y: Math.random() * 300,
        size: 50,
      };

      dispatch({ type: ACTIONS.ADD_SHAPE, payload: newShape });
    }, []);

    // TODO: Implement delete shape handler
    const handleShapeClick = useCallback((shapeId) => {
      dispatch({ type: ACTIONS.DELETE_SHAPE, payload: shapeId });
    }, []);

    const handleUndo = () => dispatch({ type: ACTIONS.UNDO });
    const handleRedo = () => dispatch({ type: ACTIONS.REDO });

    return (
      <div style={{ padding: '20px' }}>
        <h1>Undo/Redo Canvas</h1>

        <Toolbar
          onAddShape={handleAddShape}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={handleUndo}
          onRedo={handleRedo}
          historyInfo={{
            pastCount: state.past.length,
            futureCount: state.future.length
          }}
        />

        <Canvas
          shapes={state.present.shapes}
          onShapeClick={handleShapeClick}
        />

        <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
          <h3>Instructions</h3>
          <ul>
            <li>Click buttons to add shapes at random positions</li>
            <li>Click shapes to delete them</li>
            <li>Use Undo/Redo buttons or keyboard shortcuts</li>
            <li>History limited to 50 states</li>
            <li>Making new changes after undo clears redo stack</li>
          </ul>
        </div>
      </div>
    );
  }
---

Build a complete undo/redo system with time-travel state management for a drawing canvas using the command pattern.

## Requirements

- Implement undo/redo functionality for all actions
- Maintain history of past states (limited to 50)
- Support redo after undo
- Clear redo stack when new action performed after undo
- Add keyboard shortcuts (Cmd/Ctrl+Z for undo, Cmd/Ctrl+Shift+Z for redo)
- Show visual indicators for undo/redo availability
- Display history stack size
- Handle multiple action types: add, move, delete, color change
- Implement efficient state management with useReducer
- Prevent memory leaks with history limits

## State Structure

Maintain three state slices:
- `past`: Array of previous states
- `present`: Current state
- `future`: Array of future states (for redo)

## Operations to Support

### Add Shape
- Create new shape at random or clicked position
- Add to canvas
- Record in history

### Delete Shape
- Remove shape on click
- Record in history
- Can be undone

### Undo
- Move current state to future stack
- Pop from past stack and set as current
- Disable if past is empty

### Redo
- Move current state to past stack
- Pop from future stack and set as current
- Disable if future is empty

## History Management

- Limit past states to 50 entries (prevent memory issues)
- When limit reached, remove oldest state
- Clear future stack on new action (branching timeline)
- Efficient array operations (avoid copying entire history)

## Keyboard Shortcuts

- `Cmd+Z` (Mac) or `Ctrl+Z` (Windows/Linux): Undo
- `Cmd+Shift+Z` (Mac) or `Ctrl+Shift+Z` (Windows/Linux): Redo
- Prevent default browser behavior
- Only trigger when buttons enabled

## Visual Feedback

- Disable undo button when past is empty
- Disable redo button when future is empty
- Show count of available undo/redo operations
- Highlight current state vs historical states

## Edge Cases

- Undo when past is empty (no-op)
- Redo when future is empty (no-op)
- Multiple rapid undo/redo operations
- New action after undo (clears future)
- History limit reached (remove oldest)
- Keyboard shortcuts while buttons disabled

## Learning Objectives

Master the command pattern for undo/redo, implement time-travel state management, understand branching timelines, and optimize history stack performance. This pattern is essential for editors, drawing tools, and form builders.
