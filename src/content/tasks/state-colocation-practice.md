---
title: State Colocation
description: Practice moving state closer to where it is used
tags:
  - state management
  - component design
  - best practices
difficulty: medium
timeEstimate: 25
learningGoals:
  - Understand state colocation principle
  - Move state to lowest common ancestor
  - Reduce unnecessary re-renders
  - Improve component organization
hints:
  - Keep state as local as possible
  - Move state down to child components
  - Only lift state when siblings need to share
  - Use console.log to see render behavior
starterCode: |
  // This component has state that's too high up
  export default function App() {
    // TODO: Identify which state should move to children

    return (
      <div>
        <h1>Dashboard</h1>
        <UserPanel />
        <SettingsPanel />
        <NotificationsPanel />
      </div>
    );
  }

  function UserPanel() {
    console.log('UserPanel rendered');
    // TODO: Move user-related state here
    return (
      <div>
        <h2>User Info</h2>
        {/* User form inputs */}
      </div>
    );
  }

  function SettingsPanel() {
    console.log('SettingsPanel rendered');
    // TODO: Move settings-related state here
    return (
      <div>
        <h2>Settings</h2>
        {/* Settings toggles */}
      </div>
    );
  }

  function NotificationsPanel() {
    console.log('NotificationsPanel rendered');
    // TODO: Move notification-related state here
    return (
      <div>
        <h2>Notifications</h2>
        {/* Notification list */}
      </div>
    );
  }
---

Refactor a dashboard with poorly organized state by moving state closer to where it's used.

## Requirements

- Create three independent panels: User, Settings, Notifications
- Each panel has its own form/controls
- Move state from App to individual panels
- Verify with console.log that updating one panel doesn't re-render others
- Implement actual functionality in each panel

## Panel Details

**UserPanel:**
- Name and email inputs
- State should live here

**SettingsPanel:**
- Dark mode toggle
- Notifications enabled toggle
- State should live here

**NotificationsPanel:**
- List of notifications
- Mark as read buttons
- State should live here

## Learning Objectives

This exercise teaches the principle of state colocation: keeping state as close as possible to where it's used. This reduces unnecessary re-renders, makes components easier to understand, and improves performance.

## Before and After

Before: All state in App, changing one field re-renders everything
After: State in each panel, only affected panel re-renders
