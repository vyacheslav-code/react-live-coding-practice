---
title: Command Palette with Keyboard Navigation
description: Build a Cmd+K style command palette with fuzzy search and keyboard navigation
tags:
  - keyboard-navigation
  - search
  - accessibility
  - performance
  - portal
difficulty: hard
category: pet-projects
timeEstimate: 40
learningGoals:
  - Implement global keyboard shortcuts with proper event handling
  - Build fuzzy search filtering algorithm
  - Master keyboard navigation with arrow keys and focus management
  - Handle command execution and history tracking
  - Practice portal rendering and escape key handling
hints:
  - Use useEffect to register global keyboard listener for Cmd+K/Ctrl+K
  - For fuzzy search, check if all characters in query appear in order in the command
  - Track selected index with useState and update on arrow key press
  - Maintain recent commands in state and display them when search is empty
  - Use createPortal to render palette outside normal DOM hierarchy
starterCode: |
  import { useState, useEffect, useRef } from 'react';

  const COMMANDS = [
    { id: 1, name: 'Create New File', action: 'new-file', keywords: ['create', 'file', 'new'] },
    { id: 2, name: 'Open Settings', action: 'settings', keywords: ['settings', 'preferences', 'config'] },
    { id: 3, name: 'Toggle Dark Mode', action: 'theme', keywords: ['dark', 'light', 'theme'] },
    { id: 4, name: 'Search Files', action: 'search', keywords: ['search', 'find', 'files'] },
    { id: 5, name: 'Git: Commit', action: 'git-commit', keywords: ['git', 'commit', 'save'] },
    { id: 6, name: 'Git: Push', action: 'git-push', keywords: ['git', 'push', 'upload'] },
    { id: 7, name: 'Run Build', action: 'build', keywords: ['build', 'compile', 'run'] },
    { id: 8, name: 'Run Tests', action: 'test', keywords: ['test', 'spec', 'run'] },
    { id: 9, name: 'Format Document', action: 'format', keywords: ['format', 'prettier', 'beautify'] },
    { id: 10, name: 'Close All Tabs', action: 'close-tabs', keywords: ['close', 'tabs', 'all'] },
  ];

  export default function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [recentCommands, setRecentCommands] = useState([]);
    const inputRef = useRef(null);

    // TODO: Add keyboard listener for Cmd+K / Ctrl+K to open palette

    // TODO: Implement fuzzy search filter function
    const filterCommands = (commands, searchQuery) => {
      // Return all commands for now
      return commands;
    };

    // TODO: Handle keyboard navigation (ArrowUp, ArrowDown, Enter, Escape)

    // TODO: Handle command execution and add to recent commands

    const filteredCommands = filterCommands(COMMANDS, query);
    const displayCommands = query ? filteredCommands : recentCommands.slice(0, 5);

    return (
      <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1>Command Palette Demo</h1>
          <p style={{ color: '#666' }}>
            Press <kbd style={{
              padding: '2px 6px',
              background: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '3px',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>Cmd+K</kbd> (Mac) or <kbd style={{
              padding: '2px 6px',
              background: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '3px',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>Ctrl+K</kbd> (Windows/Linux) to open the command palette
          </p>

          <div style={{ marginTop: '20px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
            <h3>Try These Actions:</h3>
            <ul style={{ lineHeight: '1.8' }}>
              <li>Open palette and search for "new"</li>
              <li>Navigate with arrow keys</li>
              <li>Execute with Enter</li>
              <li>Close with Escape</li>
              <li>See recent commands when search is empty</li>
            </ul>
          </div>

          {/* TODO: Render command palette modal when isOpen is true */}
          {/* Include: backdrop, search input, filtered commands, keyboard selection highlight */}
        </div>
      </div>
    );
  }
---

## Task

Build a production-quality command palette (like VS Code's Cmd+K or GitHub's search) with fuzzy search filtering, full keyboard navigation, and recent command history tracking.

### Requirements

**Core Functionality:**
- Global keyboard shortcut: `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) to open
- Search input with real-time fuzzy filtering
- Keyboard navigation:
  - `ArrowDown` / `ArrowUp` to navigate commands
  - `Enter` to execute selected command
  - `Escape` to close palette
- Track and display up to 5 recent commands when search is empty
- Command execution with visual feedback

**Fuzzy Search Algorithm:**
- Match commands where search characters appear in order (not necessarily consecutive)
- Example: "gp" should match "Git: Push"
- Case-insensitive matching
- Search across command name and keywords

**UI/UX Details:**
- Modal overlay with backdrop (click outside to close)
- Auto-focus search input when opened
- Visual highlight on selected command (keyboard selection)
- Clear search when palette closes
- Smooth animations (optional but nice)

**Edge Cases:**
- Prevent default browser behavior for keyboard shortcuts
- Handle empty search results
- Reset selected index when filtered results change
- Don't add duplicate commands to recent list
- Prevent scroll when palette is open

### Example Behavior

1. User presses `Cmd+K` anywhere on the page
2. Palette opens with search input focused
3. If no search query, show recent commands (if any)
4. User types "gi" - filters to "Git: Commit" and "Git: Push"
5. User presses `ArrowDown` - highlights "Git: Push"
6. User presses `Enter` - executes command, closes palette, adds to recent
7. User opens palette again - sees recent commands including "Git: Push"

### Bonus Challenges

- Add command icons (use emoji or symbols)
- Show keyboard shortcut hints for each command
- Implement command categories/sections
- Add "no results" state with helpful message
- Highlight matching characters in search results
- Support multiple palettes (layers)
- Add analytics tracking for command usage

### Testing Checklist

- [ ] Global keyboard shortcut works from anywhere
- [ ] Fuzzy search correctly filters commands
- [ ] Arrow keys navigate without page scroll
- [ ] Enter executes correct command
- [ ] Escape closes palette
- [ ] Recent commands persist and display correctly
- [ ] Click outside closes palette
- [ ] Selected index resets when search changes
- [ ] Input stays focused during keyboard navigation
