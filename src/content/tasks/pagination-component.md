---
title: Pagination Component
description: Build a reusable pagination component with page numbers, prev/next, and items per page
tags:
  - useState
  - derived state
  - UI components
  - math
difficulty: easy
timeEstimate: 25
learningGoals:
  - Calculate pagination values (total pages, current items)
  - Handle page navigation edge cases
  - Build reusable controlled component
  - Slice arrays for current page items
hints:
  - Total pages = Math.ceil(totalItems / itemsPerPage)
  - Current items = items.slice(startIndex, endIndex)
  - Disable prev on first page, next on last page
  - Show subset of page numbers for large datasets
starterCode: |
  import { useState } from 'react';

  // Sample data - 50 users
  const allUsers = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));

  export default function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // TODO: Calculate pagination
    const totalPages = Math.ceil(allUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = allUsers.slice(startIndex, endIndex);

    // TODO: Handle page change
    const goToPage = (page) => {
      // Clamp page to valid range
      const validPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(validPage);
    };

    // Reset to page 1 when items per page changes
    const handleItemsPerPageChange = (newValue) => {
      setItemsPerPage(newValue);
      setCurrentPage(1);
    };

    return (
      <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
        <h1>User List</h1>

        {/* Items per page selector */}
        <div style={{ marginBottom: '16px' }}>
          <label>
            Items per page:{' '}
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              style={{ padding: '4px 8px' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>

        {/* User list */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{user.id}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{user.name}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />

        {/* Info */}
        <div style={{ marginTop: '12px', color: '#6b7280', fontSize: '14px' }}>
          Showing {startIndex + 1}-{Math.min(endIndex, allUsers.length)} of {allUsers.length} users
        </div>
      </div>
    );
  }

  function Pagination({ currentPage, totalPages, onPageChange }) {
    // TODO: Generate page numbers to display
    // For large datasets, show: 1 ... 4 5 6 ... 20
    const getPageNumbers = () => {
      const pages = [];
      // Simple version: show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    };

    const pages = getPageNumbers();

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            background: 'white',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage === 1 ? 0.5 : 1,
          }}
        >
          ← Prev
        </button>

        {/* Page numbers */}
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              padding: '8px 12px',
              border: '1px solid',
              borderColor: page === currentPage ? '#3b82f6' : '#d1d5db',
              borderRadius: '6px',
              background: page === currentPage ? '#3b82f6' : 'white',
              color: page === currentPage ? 'white' : '#374151',
              cursor: 'pointer',
              fontWeight: page === currentPage ? 600 : 400,
            }}
          >
            {page}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            background: 'white',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            opacity: currentPage === totalPages ? 0.5 : 1,
          }}
        >
          Next →
        </button>
      </div>
    );
  }
---

## Task

Build a reusable pagination component for navigating through a list of items.

### Requirements

**Pagination Logic:**
- Calculate total pages from item count
- Slice data array for current page
- Handle prev/next navigation
- Disable buttons at boundaries

**Controls:**
- Previous/Next buttons
- Clickable page numbers
- Current page highlighted
- Items per page dropdown

**Display:**
- Show "1-10 of 50" info text
- Show page numbers (1, 2, 3...)
- Active page styled differently

### Formulas

```javascript
totalPages = Math.ceil(totalItems / itemsPerPage)
startIndex = (currentPage - 1) * itemsPerPage
endIndex = startIndex + itemsPerPage
currentItems = items.slice(startIndex, endIndex)
```

### Example Behavior

1. Page 1 with 10 items per page: shows items 1-10
2. Click Next: shows items 11-20
3. Click page 5: shows items 41-50
4. Change to 20 per page: resets to page 1, shows 1-20
5. On last page: Next button disabled

### Bonus Challenges

- Truncate page numbers with ellipsis (1 ... 4 5 6 ... 20)
- Add "Go to page" input
- Add first/last page buttons
- Keyboard navigation (← →)
- URL sync (page in query params)

### Testing Checklist

- [ ] Correct items shown per page
- [ ] Page numbers calculate correctly
- [ ] Current page is highlighted
- [ ] Prev disabled on page 1
- [ ] Next disabled on last page
- [ ] Items per page change resets to page 1
- [ ] Info text shows correct range
