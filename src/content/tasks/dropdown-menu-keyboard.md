---
title: Dropdown Menu with Keyboard Nav
description: Build a dropdown menu with full keyboard navigation support
tags:
  - UI
  - components
  - keyboard navigation
  - accessibility
difficulty: medium
timeEstimate: 30
learningGoals:
  - Implement dropdown menu pattern
  - Handle keyboard navigation
  - Manage focus properly
  - Close on outside click
hints:
  - Use useRef to detect outside clicks
  - Arrow keys navigate menu items
  - Escape closes menu
  - Enter selects current item
starterCode: |
  import { useState, useRef, useEffect } from 'react';

  const MENU_ITEMS = [
    { id: 1, label: 'Profile', icon: '👤' },
    { id: 2, label: 'Settings', icon: '⚙️' },
    { id: 3, label: 'Billing', icon: '💳' },
    { id: 4, label: 'Help', icon: '❓' },
    { id: 5, label: 'Sign Out', icon: '🚪' },
  ];

  export default function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dropdownRef = useRef(null);

    // TODO: Implement outside click detection
    useEffect(() => {
      // Add click listener to close dropdown
    }, [isOpen]);

    // TODO: Implement keyboard navigation
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          // Move selection down
          break;
        case 'ArrowUp':
          // Move selection up
          break;
        case 'Enter':
          // Select current item
          break;
        case 'Escape':
          // Close menu
          break;
      }
    };

    const handleSelect = (item) => {
      console.log('Selected:', item.label);
      setIsOpen(false);
    };

    return (
      <div style={{ padding: '50px' }}>
        <h1>Dropdown Menu</h1>

        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            style={{
              padding: '10px 20px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Menu ▼
          </button>

          {isOpen && (
            <div
              role="menu"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '5px',
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                minWidth: '200px',
                zIndex: 1000,
              }}
            >
              {MENU_ITEMS.map((item, index) => (
                <div
                  key={item.id}
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => handleSelect(item)}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    background: selectedIndex === index ? '#f0f0f0' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <p>Try keyboard navigation: Arrow keys, Enter, Escape</p>
      </div>
    );
  }
---

Create a dropdown menu with complete keyboard navigation and accessibility support.

## Requirements

- Button toggles menu open/closed
- Click menu item to select
- Click outside closes menu
- Escape key closes menu
- Arrow Up/Down navigate items
- Enter selects highlighted item
- Visual highlight on keyboard navigation
- Proper ARIA attributes

## Keyboard Interactions

- **Arrow Down:** Move to next item (wrap to first)
- **Arrow Up:** Move to previous item (wrap to last)
- **Enter:** Select highlighted item
- **Escape:** Close menu and return focus to button
- **Tab:** Close menu and move focus away

## Implementation Details

1. Track menu open/closed state
2. Track selected index for keyboard navigation
3. Detect clicks outside dropdown to close
4. Handle keyboard events
5. Apply visual highlight to selected item

## Learning Objectives

This exercise teaches how to build accessible dropdown menus with proper keyboard support. You'll learn focus management, outside click detection, keyboard event handling, and the ARIA menu pattern.

## Accessibility Checklist

- role="menu" on dropdown
- role="menuitem" on items
- Keyboard navigation working
- Focus management correct
