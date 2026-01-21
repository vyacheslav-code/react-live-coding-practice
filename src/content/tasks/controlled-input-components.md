---
title: Controlled Input Components
description: Build fully controlled form inputs with various input types
tags:
  - forms
  - controlled components
  - state management
difficulty: easy
timeEstimate: 25
learningGoals:
  - Understand controlled vs uncontrolled inputs
  - Handle different input types
  - Manage checkbox and radio state
  - Control select dropdowns
hints:
  - Set value prop from state
  - Use checked prop for checkboxes
  - Handle onChange for all inputs
  - Radio buttons share name but different values
starterCode: |
  export default function App() {
    // TODO: Add state for all form fields

    return (
      <div>
        <h1>Survey Form</h1>
        <form>
          <div>
            <label>Name:</label>
            <input type="text" />
          </div>

          <div>
            <label>Email:</label>
            <input type="email" />
          </div>

          <div>
            <label>Age:</label>
            <input type="number" />
          </div>

          <div>
            <label>Country:</label>
            <select>
              <option value="">Select...</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
            </select>
          </div>

          <div>
            <label>Gender:</label>
            <label><input type="radio" name="gender" value="male" /> Male</label>
            <label><input type="radio" name="gender" value="female" /> Female</label>
            <label><input type="radio" name="gender" value="other" /> Other</label>
          </div>

          <div>
            <label>
              <input type="checkbox" />
              Subscribe to newsletter
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>

        <div>
          <h2>Form Data</h2>
          {/* TODO: Display current form state */}
        </div>
      </div>
    );
  }
---

Create a comprehensive form demonstrating controlled components for all common input types.

## Requirements

- Text input for name
- Email input
- Number input for age
- Select dropdown for country
- Radio buttons for gender
- Checkbox for newsletter subscription
- All inputs must be controlled (value from state)
- Display current form state below form
- Handle form submission

## Learning Objectives

This exercise teaches the controlled component pattern, which is fundamental to React forms. You'll learn how to handle different input types, understand the difference between controlled and uncontrolled components, and implement proper two-way data binding.

## Controlled vs Uncontrolled

A controlled component's value is controlled by React state:
```javascript
<input value={state} onChange={e => setState(e.target.value)} />
```

An uncontrolled component manages its own state in the DOM.
