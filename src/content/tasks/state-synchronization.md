---
title: State Synchronization
description: Keep multiple components in sync with shared state
tags:
  - state management
  - synchronization
  - patterns
difficulty: medium
timeEstimate: 25
learningGoals:
  - Synchronize state across components
  - Understand single source of truth
  - Implement state update callbacks
  - Handle bidirectional data flow
hints:
  - Keep single source of truth in parent
  - Pass both state and setState to children
  - Update derived state based on primary state
  - Use useEffect for synchronization side effects
starterCode: |
  export default function App() {
    // TODO: Add state management

    return (
      <div>
        <h1>Shopping Cart</h1>
        <ProductList />
        <Cart />
        <OrderSummary />
      </div>
    );
  }

  function ProductList({ products, onAddToCart }) {
    return (
      <div>
        <h2>Products</h2>
        {/* TODO: Map products with Add to Cart button */}
      </div>
    );
  }

  function Cart({ items, onUpdateQuantity, onRemove }) {
    return (
      <div>
        <h2>Cart</h2>
        {/* TODO: Show cart items with quantity controls */}
      </div>
    );
  }

  function OrderSummary({ items }) {
    // TODO: Calculate totals
    return (
      <div>
        <h2>Summary</h2>
        {/* TODO: Show item count, subtotal, tax, total */}
      </div>
    );
  }
---

Build a shopping cart system where product list, cart, and order summary stay synchronized.

## Requirements

- Display list of products with prices
- Add products to cart with quantity
- Update quantities in cart
- Remove items from cart
- Show live order summary with totals
- All components stay synchronized
- Single source of truth for cart state

## Products Data

```javascript
const products = [
  { id: 1, name: 'T-Shirt', price: 19.99 },
  { id: 2, name: 'Jeans', price: 49.99 },
  { id: 3, name: 'Sneakers', price: 79.99 },
  { id: 4, name: 'Hat', price: 14.99 },
];
```

## Calculations

- Subtotal: Sum of (price × quantity) for all items
- Tax: 10% of subtotal
- Total: Subtotal + Tax

## Learning Objectives

This exercise demonstrates managing synchronized state across multiple components. You'll learn how to maintain a single source of truth, update state correctly from different locations, and keep derived data in sync.
