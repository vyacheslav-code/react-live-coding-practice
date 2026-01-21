---
title: Kanban Board with Drag & Drop and Undo
description: Build a Trello-style kanban board with drag-drop cards, optimistic updates, and undo functionality
tags:
  - drag-and-drop
  - state-management
  - optimistic-updates
  - undo-redo
  - complex-ui
difficulty: hard
timeEstimate: 40
learningGoals:
  - Implement multi-column drag and drop with HTML5 API
  - Master optimistic updates for responsive UX
  - Build undo/redo system with state history
  - Handle complex state updates across columns
  - Manage drop zones and visual feedback during drag
hints:
  - Track board state as object with column IDs as keys and card arrays as values
  - Use dragover and drop events, prevent default on dragover to enable dropping
  - For undo, maintain history array of previous states
  - Optimistic update means updating UI immediately, then sync to server
  - Calculate drop position by comparing mouse Y position to card midpoints
starterCode: |
  import { useState, useRef } from 'react';

  const INITIAL_BOARD = {
    todo: [
      { id: '1', title: 'Design homepage mockup', priority: 'high' },
      { id: '2', title: 'Write API documentation', priority: 'medium' },
      { id: '3', title: 'Fix login bug', priority: 'high' },
    ],
    inProgress: [
      { id: '4', title: 'Implement user authentication', priority: 'high' },
      { id: '5', title: 'Setup CI/CD pipeline', priority: 'medium' },
    ],
    review: [
      { id: '6', title: 'Code review PR #123', priority: 'low' },
    ],
    done: [
      { id: '7', title: 'Update dependencies', priority: 'low' },
      { id: '8', title: 'Write unit tests', priority: 'medium' },
    ],
  };

  const COLUMNS = [
    { id: 'todo', title: 'To Do', color: '#e2e8f0' },
    { id: 'inProgress', title: 'In Progress', color: '#fef3c7' },
    { id: 'review', title: 'Review', color: '#dbeafe' },
    { id: 'done', title: 'Done', color: '#d1fae5' },
  ];

  export default function App() {
    const [board, setBoard] = useState(INITIAL_BOARD);
    const [history, setHistory] = useState([]);
    const [draggedCard, setDraggedCard] = useState(null);
    const [draggedFromColumn, setDraggedFromColumn] = useState(null);

    // TODO: Implement drag start handler
    const handleDragStart = (e, card, columnId) => {
      // Store which card is being dragged and from which column
    };

    // TODO: Implement drag over handler
    const handleDragOver = (e) => {
      // Prevent default to allow dropping
    };

    // TODO: Implement drop handler
    const handleDrop = (e, targetColumnId, targetIndex) => {
      // Move card from source column to target column at specific index
      // Save current state to history before update
      // Update board state optimistically
    };

    // TODO: Implement undo functionality
    const handleUndo = () => {
      // Restore previous state from history
    };

    // TODO: Helper to move card between columns
    const moveCard = (card, fromColumn, toColumn, toIndex) => {
      // Return new board state with card moved
    };

    return (
      <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h1>Kanban Board</h1>
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            style={{
              padding: '8px 16px',
              background: history.length > 0 ? '#3b82f6' : '#e5e7eb',
              color: history.length > 0 ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '6px',
              cursor: history.length > 0 ? 'pointer' : 'not-allowed',
              fontWeight: '500',
            }}
          >
            ↶ Undo ({history.length})
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}>
          {COLUMNS.map((column) => (
            <div
              key={column.id}
              style={{
                background: column.color,
                borderRadius: '8px',
                padding: '16px',
                minHeight: '400px',
              }}
            >
              <h3 style={{
                margin: '0 0 16px 0',
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                {column.title} ({board[column.id].length})
              </h3>

              {/* TODO: Render cards with drag and drop */}
              {/* Each card should be draggable */}
              {/* Column should be a drop zone */}
              <div style={{ color: '#666', fontSize: '14px' }}>
                Cards will render here
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: '#f9fafb',
          borderRadius: '8px',
        }}>
          <h3>Instructions:</h3>
          <ul style={{ lineHeight: '1.8', color: '#4b5563' }}>
            <li>Drag cards between columns to update their status</li>
            <li>Drop cards at specific positions to reorder</li>
            <li>Click Undo to revert the last move</li>
            <li>Updates happen instantly (optimistic updates)</li>
          </ul>
        </div>
      </div>
    );
  }
---

## Task

Build a production-quality Kanban board (like Trello/Linear) with drag-and-drop cards between columns, reordering within columns, optimistic updates for instant feedback, and undo functionality.

### Requirements

**Core Functionality:**
- 4 columns: To Do, In Progress, Review, Done
- Drag cards between any columns
- Reorder cards within the same column
- Undo last move (one level of history minimum)
- Optimistic updates: UI updates immediately without async delays
- Show card count in each column header

**Drag and Drop:**
- Cards are draggable (use `draggable="true"`)
- Visual feedback during drag (dim the dragged card)
- Highlight drop zone on hover
- Support dropping:
  - Into empty column
  - Between cards (insert at specific position)
  - At the end of a column
- Smooth reordering animation (optional)

**State Management:**
- Board state as object: `{ columnId: [cards...] }`
- Each card has: `id`, `title`, `priority` (high/medium/low)
- History array stores previous board states
- Limit history to last 10 moves (prevent memory issues)

**Optimistic Updates:**
- Update UI immediately on drop
- In real app, this would sync to backend
- No loading spinners or async delays for moves
- User sees instant feedback

**Undo System:**
- Undo button shows count: "Undo (3)"
- Disabled when history is empty
- Clicking undo restores previous state
- Undo does NOT add to history (no redo in basic version)

**UI/UX:**
- Each column has distinct background color
- Cards show priority indicator (color dot or badge)
- Hover states on cards
- Cursor changes to grab/grabbing during drag
- Responsive grid layout

### Example Behavior

1. User drags "Design homepage mockup" from To Do
2. Card becomes semi-transparent during drag
3. User hovers over In Progress column - column highlights
4. User drops card between existing cards
5. Card immediately appears in new position
6. Undo button updates: "Undo (1)"
7. User clicks Undo
8. Card instantly returns to original column and position

### Bonus Challenges

- Add new card functionality with inline form
- Edit card title (double-click to edit)
- Delete cards with confirmation
- Priority color coding (red/yellow/green dots)
- Keyboard shortcuts (Cmd+Z for undo)
- Multiple undo levels (full history stack)
- Redo functionality
- Persist board state to localStorage
- Add card details (description, assignee, due date)
- Column limits (max cards per column with warning)
- Search/filter cards across all columns

### Testing Checklist

- [ ] Cards can be dragged to any column
- [ ] Cards can be reordered within same column
- [ ] Drop position is accurate (before/after specific card)
- [ ] Undo restores exact previous state
- [ ] Undo button disabled when no history
- [ ] Card count updates correctly in headers
- [ ] Empty columns accept drops
- [ ] Visual feedback during drag is clear
- [ ] No duplicate IDs after moving cards
- [ ] Multiple rapid moves work correctly
