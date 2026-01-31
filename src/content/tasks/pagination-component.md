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
    // TODO: Add state for currentPage and itemsPerPage

    // TODO: Calculate pagination values
    // - totalPages = Math.ceil(totalItems / itemsPerPage)
    // - startIndex, endIndex for slicing
    // - currentUsers = allUsers.slice(startIndex, endIndex)

    // TODO: Handle page change (with bounds checking)

    // TODO: Handle items per page change (reset to page 1)

    return (
      <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
        <h1>User List</h1>

        {/* TODO: Items per page selector (dropdown: 5, 10, 20, 50) */}

        {/* TODO: User table showing currentUsers */}

        {/* TODO: Pagination component with prev/next and page numbers */}

        {/* TODO: Info text showing "Showing X-Y of Z users" */}
      </div>
    );
  }

  // TODO: Create Pagination component
  // Props: currentPage, totalPages, onPageChange
  // - Prev button (disabled on first page)
  // - Page number buttons (highlight current)
  // - Next button (disabled on last page)
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
