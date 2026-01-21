---
title: Lifting State Up
description: Share state between sibling components by lifting it to their parent
tags:
  - state management
  - component communication
  - props
difficulty: easy
timeEstimate: 20
learningGoals:
  - Understand state lifting pattern
  - Share state between siblings
  - Pass callbacks as props
  - Implement controlled components
hints:
  - Move state to the common parent
  - Pass state as props to children
  - Pass setState as callback prop
  - Keep components controlled
starterCode: |
  function TemperatureInput({ scale, temperature, onChange }) {
    // TODO: Implement controlled input
    return (
      <div>
        <label>Enter temperature in {scale}:</label>
        <input type="number" />
      </div>
    );
  }

  function TemperatureDisplay({ celsius, fahrenheit }) {
    // TODO: Display both temperatures
    return <div></div>;
  }

  export default function App() {
    // TODO: Lift state here
    // TODO: Implement conversion logic

    return (
      <div>
        <h1>Temperature Converter</h1>
        <TemperatureInput scale="Celsius" />
        <TemperatureInput scale="Fahrenheit" />
        <TemperatureDisplay />
      </div>
    );
  }
---

Build a temperature converter that demonstrates the "lifting state up" pattern.

## Requirements

- Two input fields: Celsius and Fahrenheit
- Changing Celsius updates Fahrenheit automatically
- Changing Fahrenheit updates Celsius automatically
- Display both values in a summary below inputs
- Use the lifting state up pattern correctly
- Keep inputs synchronized

## Conversion Formulas

```
Celsius to Fahrenheit: (C × 9/5) + 32
Fahrenheit to Celsius: (F - 32) × 5/9
```

## Learning Objectives

This exercise teaches one of React's most important patterns: lifting state up. When multiple components need to share state, you move it to their closest common ancestor. This pattern is fundamental to understanding data flow in React applications.
