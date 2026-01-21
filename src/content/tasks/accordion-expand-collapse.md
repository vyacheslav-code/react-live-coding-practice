---
title: Accordion Expand/Collapse
description: Create an accordion component with smooth expand/collapse animations
tags:
  - UI
  - components
  - animations
  - accessibility
difficulty: easy
timeEstimate: 25
learningGoals:
  - Build accordion UI pattern
  - Implement expand/collapse logic
  - Add ARIA attributes for accessibility
  - Handle multiple vs single open panels
hints:
  - Use state array for open panels
  - Toggle panel ID in array
  - Use role="region" for panels
  - aria-expanded indicates state
starterCode: |
  import { useState } from 'react';

  const ACCORDION_DATA = [
    {
      id: 1,
      title: 'What is React?',
      content: 'React is a JavaScript library for building user interfaces. It lets you build complex UIs from small, isolated pieces of code called components.',
    },
    {
      id: 2,
      title: 'What are React Hooks?',
      content: 'Hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, and useContext.',
    },
    {
      id: 3,
      title: 'What is JSX?',
      content: 'JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in your JavaScript files.',
    },
    {
      id: 4,
      title: 'What is the Virtual DOM?',
      content: 'The Virtual DOM is a lightweight copy of the actual DOM. React uses it to optimize updates by only changing what actually needs to change.',
    },
  ];

  function AccordionItem({ item, isOpen, onToggle }) {
    return (
      <div style={{ border: '1px solid #ddd', marginBottom: '10px' }}>
        <button
          onClick={onToggle}
          style={{
            width: '100%',
            padding: '15px',
            textAlign: 'left',
            background: '#f8f9fa',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>{item.title}</span>
          <span>{isOpen ? '−' : '+'}</span>
        </button>
        {isOpen && (
          <div style={{ padding: '15px', background: 'white' }}>
            {item.content}
          </div>
        )}
      </div>
    );
  }

  export default function App() {
    const [openItems, setOpenItems] = useState([]);

    const handleToggle = (id) => {
      // TODO: Toggle item in openItems array
      // If id exists, remove it; if not, add it
    };

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1>FAQ Accordion</h1>

        <div>
          <button onClick={() => setOpenItems([])}>Collapse All</button>
          <button onClick={() => setOpenItems(ACCORDION_DATA.map(item => item.id))}>
            Expand All
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>
          {ACCORDION_DATA.map(item => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openItems.includes(item.id)}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    );
  }
---

Build an FAQ accordion component that allows multiple panels to be open simultaneously.

## Requirements

- Display FAQ items in accordion format
- Click header to expand/collapse content
- Multiple panels can be open at once
- Show +/- indicator based on state
- Collapse All button closes all panels
- Expand All button opens all panels
- Smooth visual transitions

## Bonus Features

- Add aria-expanded attribute
- Implement single-open mode (only one panel at a time)
- Add smooth height animation
- Keyboard navigation support

## Learning Objectives

This exercise teaches the accordion pattern, a common UI component for organizing content. You'll learn how to manage multiple open/closed states, implement toggle logic, and create a reusable component structure.

## State Management

Track open items as array of IDs:
```javascript
[1, 3] // Items 1 and 3 are open
```

Toggle logic:
```javascript
includes(id) ? remove(id) : add(id)
```
