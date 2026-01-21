---
title: Generic Data Table Component
description: Build a type-safe generic table component with inferred types and discriminated unions
tags:
  - typescript
  - generics
  - advanced
difficulty: hard
timeEstimate: 35
learningGoals:
  - Implement generic React components with type parameters
  - Use type inference from data arrays
  - Create discriminated unions for complex props
  - Build type-safe render prop patterns
  - Master conditional types in component APIs
hints:
  - Define a generic type parameter for the data array type
  - Use discriminated unions for column definitions (basic vs custom renderer)
  - Let TypeScript infer row types from the data prop
  - Create proper typings for cell renderer functions
starterCode: |
  export default function App() {
    const users = [
      { id: 1, name: 'Alice', email: 'alice@example.com', age: 28 },
      { id: 2, name: 'Bob', email: 'bob@example.com', age: 34 },
      { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 23 },
    ];

    const products = [
      { id: 101, title: 'Laptop', price: 999, inStock: true },
      { id: 102, title: 'Mouse', price: 29, inStock: false },
      { id: 103, title: 'Keyboard', price: 79, inStock: true },
    ];

    // TODO: Type the DataTable component with generics
    function DataTable({ data, columns }) {
      return (
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <div>
        <h2>Users</h2>
        <DataTable
          data={users}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            {
              key: 'age',
              header: 'Age',
              render: (user) => <strong>{user.age} years</strong>
            },
          ]}
        />

        <h2>Products</h2>
        <DataTable
          data={products}
          columns={[
            { key: 'title', header: 'Product' },
            {
              key: 'price',
              header: 'Price',
              render: (product) => `$${product.price}`
            },
            {
              key: 'inStock',
              header: 'Status',
              render: (product) => product.inStock ? '✓' : '✗'
            },
          ]}
        />
      </div>
    );
  }
---

Create a fully type-safe generic DataTable component that can render any array of objects with proper type inference and safety.

## Requirements

- Create a generic `DataTable<T>` component that accepts any data type
- Define column configurations with discriminated unions for basic vs custom rendering
- Ensure the `key` property is constrained to actual keys of the data type
- Type the render function to receive the correct row type
- Prevent accessing non-existent properties at compile time
- Support both direct property access and custom render functions
- Infer all types from the data prop when possible

## TypeScript Patterns to Implement

### Generic Component Type
```typescript
type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
};
```

### Discriminated Union for Columns
Columns should either display a simple value OR use a custom renderer (not both):
```typescript
type Column<T> =
  | { key: keyof T; header: string; render?: never }
  | { key: keyof T; header: string; render: (row: T) => React.ReactNode };
```

### Type Safety Goals
- `col.key` must be a valid property of the data objects
- `render` function receives properly typed row object
- TypeScript should catch typos in property names
- Auto-completion should work for all property accesses

## Example Behavior

The component should:
- Render a table with headers from column definitions
- Display cell values from the data or use custom renderers
- Provide full type safety and autocomplete in usage
- Catch errors like accessing `user.invalidProp` at compile time

## Bonus Challenges

- Add support for sortable columns with type-safe comparator functions
- Implement column width configuration
- Add a generic `keyExtractor` prop as alternative to array index
- Create a `ColumnBuilder` helper function for better ergonomics
