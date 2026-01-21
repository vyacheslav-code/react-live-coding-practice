---
title: Derived State Calculation
description: Calculate derived values from state instead of storing them separately
tags:
  - state management
  - performance
  - best practices
difficulty: easy
timeEstimate: 20
learningGoals:
  - Avoid redundant state
  - Calculate values during render
  - Understand when to derive vs store state
  - Implement filtering and sorting
hints:
  - Don't store filtered/sorted data in state
  - Calculate derived values in render
  - Only store minimal state needed
  - Use filter and sort methods
starterCode: |
  const PRODUCTS = [
    { id: 1, name: 'Laptop', price: 999, category: 'electronics' },
    { id: 2, name: 'Phone', price: 699, category: 'electronics' },
    { id: 3, name: 'Desk', price: 299, category: 'furniture' },
    { id: 4, name: 'Chair', price: 199, category: 'furniture' },
    { id: 5, name: 'Monitor', price: 349, category: 'electronics' },
  ];

  export default function App() {
    // TODO: Add state for search and category filter
    // Don't store filtered results!

    // TODO: Calculate filtered products here

    return (
      <div>
        <h1>Product List</h1>
        <input type="text" placeholder="Search products..." />
        <select>
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
        </select>
        <div>
          {/* TODO: Display filtered products */}
          {/* TODO: Show total count and sum */}
        </div>
      </div>
    );
  }
---

Build a product filter that demonstrates calculating derived state instead of storing it.

## Requirements

- Display list of products
- Search filter that matches product names
- Category dropdown filter
- Show count of filtered products
- Display total price of filtered products
- Calculate all derived values during render
- Do not store filtered results in state

## Learning Objectives

This exercise teaches a critical React best practice: avoiding redundant state. Instead of storing derived values in state, calculate them during render. This prevents synchronization bugs and keeps your state minimal and manageable.

## Anti-Pattern to Avoid

```javascript
// BAD: Storing derived state
const [filteredProducts, setFilteredProducts] = useState([]);

// GOOD: Calculating derived state
const filteredProducts = products.filter(...);
```
