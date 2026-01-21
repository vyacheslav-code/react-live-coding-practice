---
title: Tabs Component
description: Build a reusable tabs component with keyboard navigation
tags:
  - UI
  - components
  - keyboard navigation
  - accessibility
difficulty: easy
timeEstimate: 25
learningGoals:
  - Create compound components
  - Implement keyboard navigation
  - Use ARIA tab patterns
  - Manage active state
hints:
  - Use role="tablist", role="tab", role="tabpanel"
  - Arrow keys navigate between tabs
  - aria-selected indicates active tab
  - Connect tabs to panels with IDs
starterCode: |
  import { useState } from 'react';

  export default function App() {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
      <div>
        <h1>Tabs Component</h1>

        {/* TODO: Add proper ARIA attributes */}
        <div role="tablist">
          <button
            role="tab"
            onClick={() => setActiveTab('tab1')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'tab1' ? '#007bff' : '#e9ecef',
              color: activeTab === 'tab1' ? 'white' : 'black',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Profile
          </button>
          <button
            role="tab"
            onClick={() => setActiveTab('tab2')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'tab2' ? '#007bff' : '#e9ecef',
              color: activeTab === 'tab2' ? 'white' : 'black',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Settings
          </button>
          <button
            role="tab"
            onClick={() => setActiveTab('tab3')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'tab3' ? '#007bff' : '#e9ecef',
              color: activeTab === 'tab3' ? 'white' : 'black',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Notifications
          </button>
        </div>

        {/* TODO: Add keyboard navigation */}
        {activeTab === 'tab1' && (
          <div role="tabpanel" style={{ padding: '20px', border: '1px solid #ddd' }}>
            <h2>Profile</h2>
            <p>Your profile information goes here.</p>
            <input type="text" placeholder="Name" />
          </div>
        )}

        {activeTab === 'tab2' && (
          <div role="tabpanel" style={{ padding: '20px', border: '1px solid #ddd' }}>
            <h2>Settings</h2>
            <p>Your settings go here.</p>
            <label>
              <input type="checkbox" /> Email notifications
            </label>
          </div>
        )}

        {activeTab === 'tab3' && (
          <div role="tabpanel" style={{ padding: '20px', border: '1px solid #ddd' }}>
            <h2>Notifications</h2>
            <p>Your notifications appear here.</p>
            <ul>
              <li>New message from Alice</li>
              <li>Update available</li>
            </ul>
          </div>
        )}
      </div>
    );
  }
---

Build an accessible tabs component with proper ARIA attributes and keyboard navigation.

## Requirements

- Three tabs: Profile, Settings, Notifications
- Click to switch between tabs
- Arrow keys navigate between tabs
- Active tab visually highlighted
- Only active panel visible
- Proper ARIA attributes
- Tab key moves focus into panel content

## Keyboard Interactions

- **Left/Right Arrow:** Navigate between tabs
- **Home:** Focus first tab
- **End:** Focus last tab
- **Tab:** Move focus into panel content

## Accessibility Requirements

- role="tablist" on tab container
- role="tab" on each tab button
- role="tabpanel" on each panel
- aria-selected="true" on active tab
- aria-controls connecting tabs to panels
- Keyboard navigation working

## Learning Objectives

This exercise teaches the ARIA tabs pattern, which is commonly used but often implemented incorrectly. You'll learn proper semantic markup, keyboard handling, and how to create accessible interactive components.

## ARIA Pattern Reference

Follow the W3C tabs pattern for proper implementation.
