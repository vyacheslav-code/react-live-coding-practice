---
title: Data Fetching with useEffect
description: Fetch and display user data from an API using useEffect
tags:
  - useEffect
  - async
  - fetching
difficulty: easy
timeEstimate: 20
learningGoals:
  - Use useEffect for side effects
  - Handle async operations in React
  - Manage loading and error states
  - Display fetched data
hints:
  - Use fetch API inside useEffect
  - Set loading state before fetching
  - Use empty dependency array for mount-only effect
  - Handle errors with try-catch
starterCode: |
  export default function App() {
    // TODO: Add state for users, loading, and error

    // TODO: Add useEffect to fetch data
    // API: https://jsonplaceholder.typicode.com/users

    return (
      <div>
        <h1>Users</h1>
        {/* TODO: Show loading state */}
        {/* TODO: Show error message if failed */}
        {/* TODO: Display list of users */}
      </div>
    );
  }
---

Create a component that fetches user data from an API when it mounts and displays the results.

## Requirements

- Fetch users from JSONPlaceholder API on component mount
- Display loading indicator while fetching
- Show user names in a list
- Display error message if fetch fails
- Use proper error handling

## API Endpoint

```
https://jsonplaceholder.typicode.com/users
```

## Learning Objectives

This exercise teaches you how to perform side effects in React using useEffect. You'll learn the proper patterns for data fetching, including managing loading states, handling errors, and working with async operations in functional components.
