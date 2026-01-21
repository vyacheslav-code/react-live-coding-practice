---
title: Shopping Cart State Management
description: Build a complete shopping cart with complex state interactions
tags:
  - state management
  - useReducer
  - complex state
difficulty: medium
timeEstimate: 35
learningGoals:
  - Manage complex application state
  - Use useReducer for cart operations
  - Handle quantity updates immutably
  - Calculate derived values
hints:
  - Use useReducer for cart state
  - Implement ADD, REMOVE, UPDATE_QUANTITY actions
  - Check if item exists before adding
  - Calculate totals as derived state
starterCode: |
  const PRODUCTS = [
    { id: 1, name: 'Laptop', price: 999, image: '💻' },
    { id: 2, name: 'Phone', price: 699, image: '📱' },
    { id: 3, name: 'Headphones', price: 199, image: '🎧' },
    { id: 4, name: 'Keyboard', price: 149, image: '⌨️' },
  ];

  function cartReducer(state, action) {
    // TODO: Implement reducer
    switch (action.type) {
      case 'ADD_ITEM':
        // TODO
      case 'REMOVE_ITEM':
        // TODO
      case 'UPDATE_QUANTITY':
        // TODO
      case 'CLEAR_CART':
        // TODO
      default:
        return state;
    }
  }

  export default function App() {
    // TODO: Use useReducer

    // TODO: Calculate derived values (subtotal, tax, total)

    return (
      <div>
        <h1>Electronics Store</h1>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div>
            <h2>Products</h2>
            {/* TODO: Product grid */}
          </div>
          <div>
            <h2>Cart ({/* item count */})</h2>
            {/* TODO: Cart items */}
            {/* TODO: Totals */}
          </div>
        </div>
      </div>
    );
  }
---

Build a fully functional shopping cart with add, remove, quantity updates, and order calculations.

## Requirements

- Display products in a grid
- Add products to cart (if already in cart, increment quantity)
- Show cart with item list
- Update item quantities with +/- buttons
- Remove items from cart
- Display item count in cart header
- Calculate and show: subtotal, tax (10%), total
- Clear cart button
- Disable "Add to Cart" for items already at max quantity

## Cart State Structure

```javascript
[
  { id: 1, name: 'Laptop', price: 999, quantity: 2 },
  { id: 2, name: 'Phone', price: 699, quantity: 1 }
]
```

## Learning Objectives

This exercise combines multiple state management concepts into a realistic application. You'll practice useReducer for complex state, derived state calculations, immutable updates, and managing state interactions across a multi-component application.
