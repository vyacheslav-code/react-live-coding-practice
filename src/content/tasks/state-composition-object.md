---
title: State Composition with Objects
description: Manage complex form state using a single state object
tags:
  - state management
  - forms
  - objects
difficulty: easy
timeEstimate: 20
learningGoals:
  - Manage related state as object
  - Update nested state immutably
  - Use spread operator for updates
  - Handle multiple form inputs efficiently
hints:
  - Use single state object for all fields
  - Spread previous state when updating
  - Use computed property names in handlers
  - Create one onChange handler for all inputs
starterCode: |
  export default function App() {
    // TODO: Create state object for form
    // const [form, setForm] = useState({ ... });

    // TODO: Create reusable onChange handler

    return (
      <div>
        <h1>User Profile</h1>
        <form>
          <div>
            <label>First Name:</label>
            <input type="text" name="firstName" />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" name="lastName" />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" />
          </div>
          <div>
            <label>Age:</label>
            <input type="number" name="age" />
          </div>
          <div>
            <label>Bio:</label>
            <textarea name="bio" />
          </div>
        </form>
        <div>
          <h2>Preview</h2>
          {/* TODO: Display form values */}
        </div>
      </div>
    );
  }
---

Create a user profile form that manages multiple related fields using a single state object.

## Requirements

- Form with fields: firstName, lastName, email, age, bio
- Use single state object for all fields
- Create one reusable onChange handler
- Display live preview of form data
- Update state immutably with spread operator
- Use input name attribute for dynamic updates

## Learning Objectives

This exercise demonstrates when and how to group related state into objects. You'll learn immutable update patterns, how to create generic event handlers, and best practices for managing complex form state efficiently.

## State Structure

```javascript
{
  firstName: '',
  lastName: '',
  email: '',
  age: '',
  bio: ''
}
```
