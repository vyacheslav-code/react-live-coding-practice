---
title: Star Rating Component
description: Build an interactive star rating component with hover preview and click to select
tags:
  - useState
  - events
  - accessibility
  - UI components
difficulty: easy
timeEstimate: 20
learningGoals:
  - Handle mouse events (hover, click, leave)
  - Manage multiple state values (selected vs hovered)
  - Build reusable controlled/uncontrolled component
  - Add keyboard accessibility
hints:
  - Track both hovered star and selected star separately
  - Use onMouseEnter on each star, onMouseLeave on container
  - Render filled vs empty stars based on hover or selected state
  - Use aria-label for accessibility
starterCode: |
  import { useState } from 'react';

  export default function App() {
    const [rating, setRating] = useState(0);

    return (
      <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
        <h1>Star Rating</h1>

        {/* TODO: Build StarRating component */}
        <StarRating
          value={rating}
          onChange={setRating}
          maxStars={5}
        />

        <p style={{ marginTop: '16px' }}>
          Selected: {rating} star{rating !== 1 ? 's' : ''}
        </p>

        <button
          onClick={() => setRating(0)}
          style={{ marginTop: '8px', padding: '8px 16px' }}
        >
          Reset
        </button>
      </div>
    );
  }

  function StarRating({ value, onChange, maxStars = 5 }) {
    // TODO: Add state for hovered star index

    // TODO: Handle mouse enter on star
    // TODO: Handle mouse leave on container
    // TODO: Handle click to select

    return (
      <div
        style={{ display: 'flex', gap: '4px', cursor: 'pointer' }}
        // TODO: Add onMouseLeave
      >
        {Array.from({ length: maxStars }, (_, index) => {
          const starNumber = index + 1;
          // TODO: Determine if star should be filled
          // Hint: filled if hovered >= starNumber OR (not hovering AND value >= starNumber)
          const isFilled = false;

          return (
            <span
              key={starNumber}
              // TODO: Add onClick and onMouseEnter
              style={{
                fontSize: '32px',
                color: isFilled ? '#fbbf24' : '#d1d5db',
                transition: 'color 0.15s',
              }}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  }
---

## Task

Build an interactive 5-star rating component with hover preview and click to select.

### Requirements

**Core Functionality:**
- Display 5 stars in a row
- Hovering over a star highlights it and all stars before it
- Clicking a star selects that rating
- Moving mouse away shows the selected rating
- Clicking same star again can optionally deselect (set to 0)

**Visual Feedback:**
- Filled stars: gold/yellow color (#fbbf24)
- Empty stars: gray color (#d1d5db)
- Smooth color transition on hover

**State Management:**
- Track `hoveredStar` (null when not hovering, 1-5 when hovering)
- Track `selectedStar` via props (controlled component)
- Display logic: show hovered state if hovering, otherwise show selected

**Props:**
- `value`: current rating (0-5)
- `onChange`: callback when rating changes
- `maxStars`: number of stars (default 5)

### Example Behavior

1. Initial: 5 gray stars
2. Hover star 3: stars 1-3 turn gold
3. Move to star 4: stars 1-4 turn gold
4. Click star 4: star 4 selected
5. Mouse leave: stars 1-4 stay gold (selected)
6. Hover star 2: stars 1-2 gold, 3-4 gray (preview)
7. Mouse leave: back to 1-4 gold (selected)

### Bonus Challenges

- Add half-star ratings (0.5 increments)
- Add keyboard navigation (arrow keys, Enter to select)
- Add disabled state
- Allow custom star icons
- Add animation on selection
- Make it work with touch events

### Testing Checklist

- [ ] Stars highlight on hover
- [ ] Click selects rating
- [ ] Mouse leave shows selected rating
- [ ] Reset button works
- [ ] Hover preview overrides selection visually
- [ ] Smooth transitions between states
