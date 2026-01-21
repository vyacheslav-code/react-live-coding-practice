---
title: Drag and Drop Reordering
description: Implement drag and drop to reorder items in a list
tags:
  - UI
  - drag and drop
  - interactions
difficulty: hard
timeEstimate: 40
learningGoals:
  - Implement HTML5 drag and drop
  - Handle drag events properly
  - Update list order on drop
  - Provide visual feedback during drag
hints:
  - Use draggable attribute
  - Handle onDragStart, onDragOver, onDrop events
  - Store dragged item index in state
  - Prevent default on dragOver for drop to work
starterCode: |
  import { useState } from 'react';

  const INITIAL_TASKS = [
    { id: 1, text: 'Design homepage', priority: 'high' },
    { id: 2, text: 'Write documentation', priority: 'medium' },
    { id: 3, text: 'Fix bug #123', priority: 'high' },
    { id: 4, text: 'Update dependencies', priority: 'low' },
    { id: 5, text: 'Code review', priority: 'medium' },
  ];

  export default function App() {
    const [tasks, setTasks] = useState(INITIAL_TASKS);
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (index) => {
      setDraggedIndex(index);
    };

    const handleDragOver = (e) => {
      e.preventDefault(); // Allow drop
    };

    const handleDrop = (dropIndex) => {
      // TODO: Reorder tasks array
      // Move item from draggedIndex to dropIndex
    };

    const getPriorityColor = (priority) => {
      const colors = {
        high: '#ff6b6b',
        medium: '#ffd93d',
        low: '#6bcf7f',
      };
      return colors[priority];
    };

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>Task List - Drag to Reorder</h1>
        <p>Drag tasks to reorder them by priority</p>

        <div>
          {tasks.map((task, index) => (
            <div
              key={task.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              style={{
                padding: '15px',
                marginBottom: '10px',
                background: 'white',
                border: `2px solid ${getPriorityColor(task.priority)}`,
                borderRadius: '4px',
                cursor: 'move',
                opacity: draggedIndex === index ? 0.5 : 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 'bold' }}>{task.text}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Priority: {task.priority}
                </div>
              </div>
              <div style={{ fontSize: '20px' }}>☰</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '30px', padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
          <h3>Current Order:</h3>
          <ol>
            {tasks.map(task => (
              <li key={task.id}>{task.text}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
---

Create a task list where users can reorder items using drag and drop.

## Requirements

- Display list of tasks with priority
- Each task is draggable
- Drop task at any position to reorder
- Visual feedback during drag (opacity change)
- Tasks reorder when dropped
- Color-coded by priority
- Show current order below list

## Drag and Drop Events

1. **onDragStart:** Store which item is being dragged
2. **onDragOver:** Prevent default to allow drop
3. **onDrop:** Reorder array based on drag and drop positions

## Reordering Logic

```javascript
// Remove item from draggedIndex
// Insert item at dropIndex
```

## Learning Objectives

This exercise teaches HTML5 drag and drop API, which enables rich interactions without external libraries. You'll learn drag events, how to manipulate array order, and how to provide visual feedback during drag operations.

## Visual States

- **Normal:** Full opacity, colored border
- **Dragging:** Reduced opacity (0.5)
- **Drop target:** Could add hover effect (bonus)

## Bonus Features

- Add drop zone highlighting
- Animate reordering
- Add keyboard support
- Persist order to localStorage
