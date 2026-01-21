---
title: Timer with useEffect Cleanup
description: Build a timer that properly cleans up intervals using useEffect
tags:
  - useEffect
  - cleanup
  - intervals
difficulty: easy
timeEstimate: 20
learningGoals:
  - Understand useEffect cleanup function
  - Work with setInterval in React
  - Prevent memory leaks
  - Implement start/stop/reset functionality
hints:
  - Return cleanup function from useEffect
  - Use clearInterval in cleanup
  - Store interval ID to clear it later
  - Update state in interval callback
starterCode: |
  export default function App() {
    // TODO: Add state for seconds and isRunning

    // TODO: Add useEffect to manage interval
    // Remember to clean up!

    return (
      <div>
        <h1>Timer: {/* display seconds */}s</h1>
        <button>Start</button>
        <button>Stop</button>
        <button>Reset</button>
      </div>
    );
  }
---

Create a timer component that counts seconds and demonstrates proper cleanup of intervals.

## Requirements

- Display elapsed seconds
- Start button begins counting
- Stop button pauses counting
- Reset button stops and resets to 0
- Properly clean up interval when component unmounts
- Prevent multiple intervals from running simultaneously

## Learning Objectives

This exercise demonstrates the critical concept of cleanup in useEffect. You'll learn how to prevent memory leaks by properly cleaning up side effects like intervals and timers, which is essential for building robust React applications.
