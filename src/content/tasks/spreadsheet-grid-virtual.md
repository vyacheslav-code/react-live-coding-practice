---
title: Virtual Spreadsheet Grid with Formulas
description: Build an Excel-like spreadsheet with virtual scrolling, cell editing, formula evaluation, and keyboard navigation
tags:
  - virtual-scrolling
  - performance
  - complex-state
  - keyboard-navigation
  - formulas
difficulty: hard
timeEstimate: 40
learningGoals:
  - Implement virtual scrolling for rendering 1000+ rows efficiently
  - Build inline cell editing with focus management
  - Parse and evaluate spreadsheet formulas (SUM, AVERAGE, etc)
  - Master keyboard navigation (arrows, Tab, Enter)
  - Handle complex grid state with dependencies
hints:
  - "Virtual scrolling: only render visible rows based on scroll position"
  - Track editing cell separately from selected cell
  - "Formula evaluation: parse =SUM(A1:A5) and calculate from cell values"
  - Use keyboard events on container, handle arrow keys to move selection
  - Store cell values as Map or object for O(1) lookup
starterCode: |
  import { useState, useRef, useCallback, useEffect } from 'react';

  const ROWS = 1000;
  const COLS = 26; // A-Z
  const ROW_HEIGHT = 32;
  const COL_WIDTH = 100;
  const VISIBLE_ROWS = 20;

  // Convert column index to letter (0 -> A, 25 -> Z)
  const getColumnLetter = (index) => {
    return String.fromCharCode(65 + index);
  };

  // Parse cell reference like "A5" to {col: 0, row: 4}
  const parseCellRef = (ref) => {
    const match = ref.match(/^([A-Z])(\d+)$/);
    if (!match) return null;
    return {
      col: match[1].charCodeAt(0) - 65,
      row: parseInt(match[2]) - 1,
    };
  };

  // Evaluate formula like "=SUM(A1:A5)" or "=A1+B2"
  const evaluateFormula = (formula, getCellValue) => {
    if (!formula.startsWith('=')) return formula;

    try {
      // Remove = prefix
      let expression = formula.slice(1);

      // TODO: Handle SUM(A1:A5)
      // TODO: Handle AVERAGE(A1:A5)
      // TODO: Replace cell references like A1 with their values
      // TODO: Use eval() carefully (or build a safe parser)

      return 'TODO';
    } catch (error) {
      return '#ERROR';
    }
  };

  export default function App() {
    const [cells, setCells] = useState(new Map());
    const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
    const [editingCell, setEditingCell] = useState(null);
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    // Calculate visible row range based on scroll
    const startRow = Math.floor(scrollTop / ROW_HEIGHT);
    const endRow = Math.min(startRow + VISIBLE_ROWS + 5, ROWS);

    // TODO: Get cell value (raw or computed)
    const getCellValue = useCallback((row, col) => {
      const key = `${row}-${col}`;
      const value = cells.get(key) || '';

      if (typeof value === 'string' && value.startsWith('=')) {
        return evaluateFormula(value, (r, c) => getCellValue(r, c));
      }

      return value;
    }, [cells]);

    // TODO: Set cell value
    const setCellValue = (row, col, value) => {
      const key = `${row}-${col}`;
      setCells(new Map(cells.set(key, value)));
    };

    // TODO: Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (editingCell) return; // Don't navigate while editing

      const { row, col } = selectedCell;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          // Move selection up
          break;
        case 'ArrowDown':
          e.preventDefault();
          // Move selection down
          break;
        case 'ArrowLeft':
          e.preventDefault();
          // Move selection left
          break;
        case 'ArrowRight':
          e.preventDefault();
          // Move selection right
          break;
        case 'Enter':
          // Start editing current cell
          setEditingCell({ row, col });
          break;
        case 'Tab':
          e.preventDefault();
          // Move to next cell (right)
          break;
      }
    };

    // TODO: Handle cell click
    const handleCellClick = (row, col) => {
      setSelectedCell({ row, col });
      setEditingCell(null);
    };

    // TODO: Handle cell double-click (start editing)
    const handleCellDoubleClick = (row, col) => {
      setEditingCell({ row, col });
    };

    // TODO: Handle edit commit
    const handleEditCommit = (value) => {
      if (editingCell) {
        setCellValue(editingCell.row, editingCell.col, value);
        setEditingCell(null);
      }
    };

    // Auto-focus input when editing starts
    useEffect(() => {
      if (editingCell && inputRef.current) {
        inputRef.current.focus();
      }
    }, [editingCell]);

    return (
      <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1>Spreadsheet Grid</h1>

          <div style={{
            marginBottom: '16px',
            padding: '12px',
            background: '#f0f9ff',
            borderRadius: '6px',
          }}>
            <div style={{ fontSize: '14px', color: '#0369a1' }}>
              <strong>Selected:</strong> {getColumnLetter(selectedCell.col)}{selectedCell.row + 1}
              {' | '}
              <strong>Value:</strong> {getCellValue(selectedCell.row, selectedCell.col) || '(empty)'}
            </div>
          </div>

          <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
            style={{
              height: '600px',
              overflow: 'auto',
              border: '1px solid #ddd',
              borderRadius: '8px',
              position: 'relative',
              outline: 'none',
            }}
          >
            {/* Spacer for total height (enables scrolling) */}
            <div style={{ height: ROWS * ROW_HEIGHT }} />

            {/* Virtual grid - only render visible rows */}
            <div
              style={{
                position: 'absolute',
                top: startRow * ROW_HEIGHT,
                left: 0,
                right: 0,
              }}
            >
              {/* TODO: Render header row with column letters */}

              {/* TODO: Render visible data rows */}
              {/* Each cell should show computed value */}
              {/* Selected cell should have border highlight */}
              {/* Editing cell should show input */}

              <div style={{ padding: '20px', color: '#999' }}>
                Virtual grid will render here
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '16px',
            padding: '16px',
            background: '#f9fafb',
            borderRadius: '8px',
          }}>
            <h3 style={{ marginTop: 0 }}>Instructions:</h3>
            <ul style={{ lineHeight: '1.8', color: '#4b5563' }}>
              <li>Click a cell to select it</li>
              <li>Press Enter or double-click to edit</li>
              <li>Use arrow keys to navigate</li>
              <li>Type formulas: <code>=A1+B2</code> or <code>=SUM(A1:A5)</code></li>
              <li>Scroll to see all 1000 rows (only ~20 rendered at a time)</li>
            </ul>

            <div style={{ marginTop: '12px', padding: '12px', background: 'white', borderRadius: '4px' }}>
              <strong>Try these formulas:</strong>
              <ul style={{ marginBottom: 0 }}>
                <li><code>=10+20</code> - Basic math</li>
                <li><code>=A1*2</code> - Cell reference</li>
                <li><code>=SUM(A1:A5)</code> - Sum range</li>
                <li><code>=AVERAGE(B1:B10)</code> - Average range</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
---

## Task

Build a production-quality virtual spreadsheet grid (like Excel/Google Sheets) with virtual scrolling for 1000+ rows, inline cell editing, formula evaluation (SUM, AVERAGE, cell references), and full keyboard navigation.

### Requirements

**Core Functionality:**
- Grid: 1000 rows × 26 columns (A-Z)
- Virtual scrolling: only render ~20-25 visible rows at a time
- Cell selection with visual highlight
- Double-click or Enter to edit cell
- Arrow key navigation (Up, Down, Left, Right)
- Tab to move to next cell

**Virtual Scrolling:**
- Calculate visible row range from scroll position
- Render only visible rows + small buffer (5 rows above/below)
- Use absolute positioning to maintain scroll height
- Smooth scrolling without jank
- Should handle 1000+ rows without performance issues

**Cell Editing:**
- Double-click or press Enter to start editing
- Show input field in place of cell value
- Commit on Enter or blur
- Cancel on Escape
- Auto-focus input when editing starts

**Formula Evaluation:**
Support these formula types:
- Simple math: `=10+20` → 30
- Cell references: `=A1+B2` → sum of those cells
- SUM function: `=SUM(A1:A5)` → sum of range
- AVERAGE function: `=AVERAGE(A1:A5)` → average of range
- Show `#ERROR` for invalid formulas
- Formulas start with `=` character

**Keyboard Navigation:**
- Arrow keys move selection (prevent page scroll)
- Enter starts editing current cell
- Tab moves to next cell (right), Shift+Tab moves left
- Escape cancels editing
- Navigation disabled while editing

**UI/UX:**
- Header row with column letters (A-Z)
- Row numbers on left
- Selected cell has distinct border (blue, 2px)
- Editing cell shows text input
- Grid lines between cells
- Fixed column widths (100px)
- Fixed row heights (32px)

**State Management:**
- Store cell values in Map: `key: "row-col", value: "content"`
- Track selected cell: `{row, col}`
- Track editing cell: `{row, col}` or null
- Recalculate formulas when dependencies change

### Example Behavior

1. User clicks cell A1, types "10", presses Enter
2. User clicks cell A2, types "20", presses Enter
3. User clicks cell A3, types "=A1+A2", presses Enter
4. Cell A3 displays "30"
5. User scrolls down to row 500 (smooth, only visible rows render)
6. User clicks cell B500, types "=SUM(A1:A3)", presses Enter
7. Cell B500 displays "30" (sum of 10+20+0)
8. User uses arrow keys to navigate to A4
9. User presses Enter, types "5"
10. Cell A3 automatically updates to "35" (dependency chain)

### Bonus Challenges

- More functions: MIN, MAX, COUNT, IF
- Cell formatting (bold, colors, alignment)
- Copy/paste cells (Cmd+C, Cmd+V)
- Fill down (drag to copy formula)
- Column resize (drag column border)
- Row/column selection (click header)
- Freeze header row during scroll
- Multi-cell selection (drag to select range)
- Formula bar above grid (like Excel)
- Cell validation (number-only cells)
- Undo/redo
- Export to CSV
- Named ranges (SUM(Revenue) instead of SUM(A1:A10))

### Testing Checklist

- [ ] Virtual scrolling renders only visible rows
- [ ] Smooth scroll performance with 1000 rows
- [ ] Arrow keys navigate correctly
- [ ] Enter starts editing, commits on blur
- [ ] Formulas evaluate correctly (math, SUM, AVERAGE)
- [ ] Cell references update when source changes
- [ ] Tab moves to next cell
- [ ] No memory leaks from many cells
- [ ] Grid renders correctly at different scroll positions
- [ ] Keyboard shortcuts don't conflict with browser

### Performance Notes

**Why Virtual Scrolling?**
- Rendering 1000 rows × 26 columns = 26,000 DOM elements
- Virtual scrolling: ~20 rows × 26 columns = 520 DOM elements
- 50x reduction in DOM nodes = smooth performance

**Formula Dependency:**
- Basic version: recalculate all formulas on any change
- Advanced: build dependency graph, only recalc affected cells
- For 1000 rows, smart caching is critical
