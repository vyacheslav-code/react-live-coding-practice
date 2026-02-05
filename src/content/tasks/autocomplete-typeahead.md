---
title: Autocomplete/Typeahead Search
description: Build an autocomplete input with debounced API search and keyboard navigation
tags:
  - useState
  - useEffect
  - debounce
  - keyboard navigation
  - async
difficulty: medium
timeEstimate: 30
learningGoals:
  - Implement debounced search input
  - Handle async API calls with loading states
  - Build keyboard navigation (arrow keys, Enter, Escape)
  - Manage dropdown visibility and focus
hints:
  - Debounce the search with setTimeout/clearTimeout
  - Track highlighted index separately from selection
  - Arrow keys change highlighted index
  - Enter selects highlighted item, Escape closes
starterCode: |
  import { useState, useEffect, useRef } from 'react';

  // Mock API - simulates network delay
  const searchUsers = async (query) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const allUsers = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
      { id: 4, name: 'Diana Ross', email: 'diana@example.com' },
      { id: 5, name: 'Edward Norton', email: 'edward@example.com' },
      { id: 6, name: 'Fiona Apple', email: 'fiona@example.com' },
      { id: 7, name: 'George Lucas', email: 'george@example.com' },
      { id: 8, name: 'Hannah Montana', email: 'hannah@example.com' },
      { id: 9, name: 'Ivan Drago', email: 'ivan@example.com' },
      { id: 10, name: 'Julia Roberts', email: 'julia@example.com' },
    ];

    if (!query.trim()) return [];

    return allUsers.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
  };

  export default function App() {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
      <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
        <h1>User Search</h1>

        <Autocomplete
          placeholder="Search users..."
          onSelect={setSelectedUser}
          fetchSuggestions={searchUsers}
        />

        {selectedUser && (
          <div style={{
            marginTop: '20px',
            padding: '16px',
            background: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #86efac',
          }}>
            <strong>Selected:</strong>
            <p style={{ margin: '8px 0 0' }}>
              {selectedUser.name} ({selectedUser.email})
            </p>
          </div>
        )}
      </div>
    );
  }

  function Autocomplete({ placeholder, onSelect, fetchSuggestions }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef(null);

    // TODO: Debounced search effect
    // useEffect(() => {
    //   if (!query.trim()) {
    //     setSuggestions([]);
    //     return;
    //   }
    //
    //   const timer = setTimeout(async () => {
    //     setIsLoading(true);
    //     const results = await fetchSuggestions(query);
    //     setSuggestions(results);
    //     setIsLoading(false);
    //     setIsOpen(true);
    //   }, 300);
    //
    //   return () => clearTimeout(timer);
    // }, [query, fetchSuggestions]);

    // TODO: Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          // Move highlight down
          break;
        case 'ArrowUp':
          e.preventDefault();
          // Move highlight up
          break;
        case 'Enter':
          e.preventDefault();
          // Select highlighted item
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    const handleSelect = (item) => {
      onSelect(item);
      setQuery(item.name);
      setIsOpen(false);
      setHighlightedIndex(-1);
    };

    return (
      <div style={{ position: 'relative', maxWidth: '400px' }}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            outline: 'none',
          }}
        />

        {isLoading && (
          <div style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af',
          }}>
            Loading...
          </div>
        )}

        {/* Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <ul style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            padding: 0,
            listStyle: 'none',
            background: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxHeight: '300px',
            overflow: 'auto',
            zIndex: 10,
          }}>
            {suggestions.map((item, index) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setHighlightedIndex(index)}
                style={{
                  padding: '12px',
                  cursor: 'pointer',
                  background: index === highlightedIndex ? '#f3f4f6' : 'white',
                }}
              >
                <div style={{ fontWeight: 500 }}>{item.name}</div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>{item.email}</div>
              </li>
            ))}
          </ul>
        )}

        {isOpen && !isLoading && query && suggestions.length === 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            padding: '12px',
            background: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            color: '#6b7280',
          }}>
            No results found
          </div>
        )}
      </div>
    );
  }
---

## Task

Build an autocomplete search input with debounced API calls and full keyboard navigation.

### Requirements

**Search:**
- Debounce input (300ms delay)
- Show loading indicator while fetching
- Display suggestions in dropdown
- Show "No results" when empty

**Keyboard Navigation:**
- Arrow Down: highlight next item
- Arrow Up: highlight previous item
- Enter: select highlighted item
- Escape: close dropdown
- Wrap around at ends (optional)

**Mouse Interaction:**
- Click item to select
- Hover to highlight
- Click outside to close (optional)

**Selection:**
- Populate input with selected value
- Call onSelect callback
- Close dropdown

### Example Behavior

1. Type "al": loading shows
2. After 300ms: suggestions appear (Alice, etc.)
3. Press Down: first item highlighted
4. Press Down: second item highlighted
5. Press Enter: item selected, dropdown closes
6. Press Escape: dropdown closes without selection

### Bonus Challenges

- Add click-outside to close dropdown
- Highlight matching text in suggestions
- Add recent searches
- Add "clear" button
- Cache previous results
- Add minimum character requirement

### Testing Checklist

- [ ] Typing triggers debounced search
- [ ] Loading state shows during fetch
- [ ] Suggestions appear in dropdown
- [ ] Arrow keys navigate items
- [ ] Enter selects highlighted item
- [ ] Escape closes dropdown
- [ ] Mouse click selects item
- [ ] Selected value populates input
