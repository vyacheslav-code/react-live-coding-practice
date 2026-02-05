---
title: Recursive Tree View with Drag & Drop
description: Build a file explorer tree with expand/collapse, lazy loading, and drag-drop reordering
tags:
  - recursion
  - drag-and-drop
  - tree-structure
  - performance
  - state-management
difficulty: hard
category: pet-projects
timeEstimate: 40
learningGoals:
  - Master recursive component patterns for nested data
  - Implement expand/collapse state management for tree structures
  - Build drag and drop reordering with proper drop zones
  - Handle lazy loading of child nodes on demand
  - Manage complex selection state across tree hierarchy
hints:
  - Create a recursive TreeNode component that renders itself for children
  - Use a Map or object to track expanded state by node ID
  - For drag and drop, track draggedNode and dropTarget in state
  - Lazy load children by storing a hasChildren flag and fetching on expand
  - Selection state can be a Set of IDs for O(1) lookup performance
starterCode: |
  import { useState, useCallback } from 'react';

  const INITIAL_TREE = {
    id: 'root',
    name: 'Project',
    type: 'folder',
    children: [
      {
        id: '1',
        name: 'src',
        type: 'folder',
        children: [
          { id: '1-1', name: 'components', type: 'folder', hasChildren: true },
          { id: '1-2', name: 'utils', type: 'folder', hasChildren: true },
          { id: '1-3', name: 'App.tsx', type: 'file' },
        ],
      },
      {
        id: '2',
        name: 'public',
        type: 'folder',
        children: [
          { id: '2-1', name: 'index.html', type: 'file' },
          { id: '2-2', name: 'favicon.ico', type: 'file' },
        ],
      },
      { id: '3', name: 'package.json', type: 'file' },
      { id: '4', name: 'README.md', type: 'file' },
    ],
  };

  // Simulated async fetch for lazy loading
  const fetchChildren = (nodeId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock child data
        const children = [
          { id: `${nodeId}-child-1`, name: 'Component1.tsx', type: 'file' },
          { id: `${nodeId}-child-2`, name: 'Component2.tsx', type: 'file' },
          { id: `${nodeId}-child-3`, name: 'index.ts', type: 'file' },
        ];
        resolve(children);
      }, 500);
    });
  };

  export default function App() {
    const [tree, setTree] = useState(INITIAL_TREE);
    const [expanded, setExpanded] = useState(new Set(['root', '1']));
    const [selected, setSelected] = useState(null);
    const [draggedNode, setDraggedNode] = useState(null);

    // TODO: Implement toggle expand/collapse
    const handleToggle = (nodeId) => {
      // Toggle expanded state
    };

    // TODO: Implement lazy loading of children
    const handleExpand = async (nodeId) => {
      // If node has hasChildren flag, fetch and update tree
    };

    // TODO: Implement drag and drop handlers
    const handleDragStart = (e, node) => {
      // Set dragged node
    };

    const handleDragOver = (e, targetNode) => {
      // Prevent default to allow drop
    };

    const handleDrop = (e, targetNode) => {
      // Reorder tree based on drag and drop
    };

    // TODO: Implement selection
    const handleSelect = (nodeId) => {
      setSelected(nodeId);
    };

    return (
      <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: '600px' }}>
          <h1>Tree View Explorer</h1>

          <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            background: '#fafafa',
            minHeight: '400px',
          }}>
            {/* TODO: Render recursive tree starting from root */}
            {/* Each node should show: icon, name, expand button if folder */}
            {/* Make nodes draggable and droppable */}
            <div style={{ color: '#999' }}>Tree will render here</div>
          </div>

          <div style={{ marginTop: '20px', padding: '16px', background: '#f0f0f0', borderRadius: '8px' }}>
            <h3>Instructions:</h3>
            <ul style={{ lineHeight: '1.8' }}>
              <li>Click folders to expand/collapse</li>
              <li>Click files or folders to select</li>
              <li>Drag and drop to reorder items</li>
              <li>Expand "components" or "utils" to lazy load children</li>
            </ul>
            {selected && (
              <div style={{ marginTop: '12px', padding: '8px', background: 'white', borderRadius: '4px' }}>
                <strong>Selected:</strong> {selected}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
---

## Task

Build a production-quality recursive tree view component (like VS Code's file explorer) with expand/collapse, lazy loading, drag-and-drop reordering, and selection state management.

### Requirements

**Core Functionality:**
- Recursive rendering of nested tree structure
- Expand/collapse folders with toggle icon
- Visual indentation based on nesting level
- Single selection (click to select file/folder)
- Lazy loading: folders with `hasChildren: true` load children on first expand
- Drag and drop to reorder items within same parent

**Tree Structure:**
- Each node has: `id`, `name`, `type` (file/folder), optional `children` array
- Folders can contain both files and folders
- Files are leaf nodes (no children)
- Support arbitrary nesting depth

**Expand/Collapse:**
- Track expanded state by node ID (use Set for performance)
- Show expand icon (▶) when collapsed, collapse icon (▼) when expanded
- Only folders should have expand/collapse functionality
- Clicking expand icon should NOT select the node

**Lazy Loading:**
- Nodes with `hasChildren: true` but no `children` array need lazy loading
- Show loading indicator while fetching
- Fetch children when expanded for the first time
- Cache loaded children (don't re-fetch on collapse/expand)

**Drag and Drop:**
- Any node can be dragged
- Drop zones: on other folders or between items
- Reorder items within the same parent
- Visual feedback: highlight drop target
- Cannot drop parent into its own descendant

**UI/UX:**
- Visual indentation: 20px per level
- Folder icon (📁) and file icon (📄)
- Hover state on items
- Selected item has background highlight
- Smooth expand/collapse animation (optional)

### Example Behavior

1. Initial render shows root expanded, "src" expanded
2. User clicks "public" folder collapse icon - "public" children hide
3. User clicks "components" folder expand icon (has `hasChildren: true`)
   - Shows loading spinner
   - After 500ms, children appear
4. User drags "App.tsx" and drops on "components" folder
   - "App.tsx" moves into "components"
   - Tree re-renders with updated structure
5. User clicks "README.md" - it becomes selected with highlight

### Bonus Challenges

- Multi-selection with Cmd/Ctrl+Click
- Context menu on right-click
- Rename functionality (inline editing)
- Delete nodes with confirmation
- Create new file/folder
- Search/filter tree nodes
- Keyboard navigation (arrow keys, Enter, Space)
- Virtual scrolling for large trees (1000+ nodes)
- Undo/redo for structure changes

### Testing Checklist

- [ ] Tree renders with correct nesting and indentation
- [ ] Expand/collapse works for all folder nodes
- [ ] Lazy loading fetches and displays children correctly
- [ ] Drag and drop reorders items properly
- [ ] Selection state updates on click
- [ ] Cannot drop parent into its own child
- [ ] Loading spinner shows during async fetch
- [ ] No infinite loops or stack overflow with deep nesting
- [ ] Expanded state persists when reordering
