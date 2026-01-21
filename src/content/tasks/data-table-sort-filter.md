---
title: Data Table with Sort and Filter
description: Build an interactive data table with sorting and filtering capabilities
tags:
  - UI
  - tables
  - sorting
  - filtering
difficulty: medium
timeEstimate: 35
learningGoals:
  - Implement table sorting
  - Add column filtering
  - Manage table state
  - Calculate derived data efficiently
hints:
  - Use sort for ordering
  - Use filter for searching
  - Track sort column and direction
  - Calculate filtered/sorted data during render
starterCode: |
  import { useState } from 'react';

  const USERS = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28, role: 'Developer' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 35, role: 'Designer' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', age: 42, role: 'Manager' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', age: 31, role: 'Developer' },
    { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', age: 39, role: 'Designer' },
    { id: 6, name: 'Fiona Apple', email: 'fiona@example.com', age: 27, role: 'Developer' },
    { id: 7, name: 'George Martin', email: 'george@example.com', age: 45, role: 'Manager' },
    { id: 8, name: 'Hannah Montana', email: 'hannah@example.com', age: 25, role: 'Designer' },
  ];

  export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [sortColumn, setSortColumn] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');

    // TODO: Implement filtering and sorting
    const filteredAndSortedUsers = USERS;

    const handleSort = (column) => {
      // TODO: Toggle sort direction if same column, else set new column
    };

    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>User Directory</h1>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: '10px' }}
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{ padding: '10px' }}
          >
            <option value="all">All Roles</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th onClick={() => handleSort('name')} style={{ padding: '12px', cursor: 'pointer', textAlign: 'left' }}>
                Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('email')} style={{ padding: '12px', cursor: 'pointer', textAlign: 'left' }}>
                Email {sortColumn === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('age')} style={{ padding: '12px', cursor: 'pointer', textAlign: 'left' }}>
                Age {sortColumn === 'age' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('role')} style={{ padding: '12px', cursor: 'pointer', textAlign: 'left' }}>
                Role {sortColumn === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedUsers.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{user.name}</td>
                <td style={{ padding: '12px' }}>{user.email}</td>
                <td style={{ padding: '12px' }}>{user.age}</td>
                <td style={{ padding: '12px' }}>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginTop: '20px' }}>
          Showing {filteredAndSortedUsers.length} of {USERS.length} users
        </p>
      </div>
    );
  }
---

Create an interactive data table with search, filtering, and sorting capabilities.

## Requirements

- Display users in table format
- Search by name or email
- Filter by role dropdown
- Click column headers to sort
- Toggle between ascending/descending
- Show sort direction indicator
- Display count of filtered results
- All filters work together

## Sorting Logic

- Click header: Sort by that column ascending
- Click again: Toggle to descending
- Click different header: Sort by new column ascending

## Filtering Logic

1. Filter by role (if not "all")
2. Filter by search term (name or email contains text)
3. Sort by selected column and direction
4. Display result count

## Learning Objectives

This exercise teaches how to build interactive data tables, a common requirement in web applications. You'll learn sorting algorithms, filtering logic, state management for table interactions, and how to compose multiple data transformations.
