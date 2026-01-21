---
title: Form Validation with useState
description: Create a form with real-time validation for email and password fields
tags:
  - useState
  - forms
  - validation
difficulty: easy
timeEstimate: 20
learningGoals:
  - Manage multiple state variables
  - Implement form validation logic
  - Display conditional error messages
  - Handle form submission
hints:
  - Use separate state for email, password, and errors
  - Validate on blur or on change
  - Use regular expressions for email validation
starterCode: |
  export default function App() {
    // TODO: Add state for email, password, and errors

    return (
      <form>
        <div>
          <label>Email:</label>
          <input type="email" />
          {/* TODO: Show error message if invalid */}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" />
          {/* TODO: Show error message if too short */}
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
---

Build a registration form with email and password fields that validates input in real-time.

## Requirements

- Email field must contain a valid email format
- Password must be at least 8 characters long
- Display error messages below invalid fields
- Disable submit button if form is invalid
- Show success message on valid submission
- Clear form after successful submission

## Validation Rules

- Email: Must match basic email pattern (contains @ and domain)
- Password: Minimum 8 characters

## Learning Objectives

This exercise demonstrates managing multiple related state variables and implementing validation logic. You'll practice conditional rendering and form handling patterns common in React applications.
