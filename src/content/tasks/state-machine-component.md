---
title: State Machine Component
description: Implement a finite state machine for a multi-step wizard with validation and transition guards
tags:
  - state management
  - useReducer
  - state machines
  - forms
difficulty: hard
timeEstimate: 35
learningGoals:
  - Implement finite state machine pattern
  - Create state transitions with guards
  - Validate state transitions based on conditions
  - Handle side effects during transitions
  - Build multi-step wizard with state machine
hints:
  - Define all possible states and transitions upfront
  - Use transition guards to validate before state changes
  - Store form data separately from machine state
  - Implement side effects (onEnter/onExit) for each state
  - Consider using useReducer for state machine logic
starterCode: |
  import { useReducer, useState } from 'react';

  // State machine definition
  const STATES = {
    ACCOUNT_INFO: 'ACCOUNT_INFO',
    PERSONAL_INFO: 'PERSONAL_INFO',
    PREFERENCES: 'PREFERENCES',
    REVIEW: 'REVIEW',
    SUBMITTING: 'SUBMITTING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
  };

  const TRANSITIONS = {
    NEXT: 'NEXT',
    BACK: 'BACK',
    SUBMIT: 'SUBMIT',
    RETRY: 'RETRY',
    RESET: 'RESET',
  };

  // TODO: Define state machine configuration
  const stateMachineConfig = {
    initial: STATES.ACCOUNT_INFO,
    states: {
      [STATES.ACCOUNT_INFO]: {
        on: {
          [TRANSITIONS.NEXT]: {
            target: STATES.PERSONAL_INFO,
            guard: 'validateAccountInfo', // TODO: Implement guard
          },
        },
      },
      [STATES.PERSONAL_INFO]: {
        on: {
          [TRANSITIONS.NEXT]: {
            target: STATES.PREFERENCES,
            guard: 'validatePersonalInfo',
          },
          [TRANSITIONS.BACK]: STATES.ACCOUNT_INFO,
        },
      },
      // TODO: Define other states
    },
  };

  // TODO: Create validation guards
  const guards = {
    validateAccountInfo: (formData) => {
      // TODO: Validate email and password
      return formData.email && formData.password && formData.password.length >= 8;
    },
    validatePersonalInfo: (formData) => {
      // TODO: Validate name and age
      return formData.firstName && formData.lastName && formData.age >= 18;
    },
    // TODO: Add more guards
  };

  // TODO: Create state machine reducer
  function stateMachineReducer(state, action) {
    const currentState = state.current;
    const stateConfig = stateMachineConfig.states[currentState];

    if (!stateConfig) return state;

    const transition = stateConfig.on?.[action.type];
    if (!transition) return state;

    // Handle guard
    let nextState;
    let guardName;

    if (typeof transition === 'object') {
      nextState = transition.target;
      guardName = transition.guard;
    } else {
      nextState = transition;
    }

    // Check guard if exists
    if (guardName && guards[guardName]) {
      const canTransition = guards[guardName](action.formData);
      if (!canTransition) {
        return {
          ...state,
          error: `Cannot proceed: validation failed for ${guardName}`
        };
      }
    }

    return {
      current: nextState,
      previous: currentState,
      error: null,
      history: [...state.history, currentState],
    };
  }

  function AccountInfoStep({ formData, onChange, onNext }) {
    return (
      <div>
        <h2>Step 1: Account Information</h2>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Email:
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => onChange({ email: e.target.value })}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Password:
            <input
              type="password"
              value={formData.password || ''}
              onChange={(e) => onChange({ password: e.target.value })}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
          <div style={{ fontSize: '12px', color: '#666' }}>Min 8 characters</div>
        </div>
        <button onClick={onNext}>Next</button>
      </div>
    );
  }

  function PersonalInfoStep({ formData, onChange, onNext, onBack }) {
    return (
      <div>
        <h2>Step 2: Personal Information</h2>
        <div style={{ marginBottom: '15px' }}>
          <label>
            First Name:
            <input
              value={formData.firstName || ''}
              onChange={(e) => onChange({ firstName: e.target.value })}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Last Name:
            <input
              value={formData.lastName || ''}
              onChange={(e) => onChange({ lastName: e.target.value })}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Age:
            <input
              type="number"
              value={formData.age || ''}
              onChange={(e) => onChange({ age: parseInt(e.target.value) })}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
          <div style={{ fontSize: '12px', color: '#666' }}>Must be 18+</div>
        </div>
        <button onClick={onBack}>Back</button>
        <button onClick={onNext} style={{ marginLeft: '10px' }}>Next</button>
      </div>
    );
  }

  // TODO: Create PreferencesStep component
  // TODO: Create ReviewStep component
  // TODO: Create SuccessStep component
  // TODO: Create ErrorStep component

  export default function App() {
    const [machineState, dispatch] = useReducer(stateMachineReducer, {
      current: STATES.ACCOUNT_INFO,
      previous: null,
      error: null,
      history: [],
    });

    const [formData, setFormData] = useState({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      age: '',
      newsletter: false,
      theme: 'light',
    });

    const updateFormData = (updates) => {
      setFormData(prev => ({ ...prev, ...updates }));
    };

    const handleNext = () => {
      dispatch({ type: TRANSITIONS.NEXT, formData });
    };

    const handleBack = () => {
      dispatch({ type: TRANSITIONS.BACK, formData });
    };

    const handleSubmit = async () => {
      dispatch({ type: TRANSITIONS.SUBMIT, formData });

      // TODO: Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Simulate 20% failure rate
        if (Math.random() < 0.2) throw new Error('Submission failed');

        // TODO: Transition to SUCCESS
      } catch (error) {
        // TODO: Transition to ERROR
      }
    };

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>Registration Wizard (State Machine)</h1>

        {machineState.error && (
          <div style={{
            padding: '10px',
            background: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            {machineState.error}
          </div>
        )}

        <div style={{ marginBottom: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Current State:</strong> {machineState.current}
        </div>

        {machineState.current === STATES.ACCOUNT_INFO && (
          <AccountInfoStep
            formData={formData}
            onChange={updateFormData}
            onNext={handleNext}
          />
        )}

        {machineState.current === STATES.PERSONAL_INFO && (
          <PersonalInfoStep
            formData={formData}
            onChange={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* TODO: Render other steps based on state */}

        <div style={{ marginTop: '30px', padding: '15px', background: '#e3f2fd', borderRadius: '8px' }}>
          <h3>State Machine Info</h3>
          <p>History: {machineState.history.join(' → ') || 'No history yet'}</p>
        </div>
      </div>
    );
  }
---

Build a multi-step registration wizard using finite state machine pattern with validation guards and transition management.

## Requirements

- Implement finite state machine with defined states and transitions
- Create 4 form steps: Account Info, Personal Info, Preferences, Review
- Add validation guards that prevent invalid transitions
- Support forward and backward navigation
- Implement submission with loading and success/error states
- Show current state and transition history
- Validate form data before allowing state transitions
- Handle async submission with proper state management
- Display validation errors without changing state
- Support retry on submission error

## States to Implement

1. **ACCOUNT_INFO**: Email and password input
2. **PERSONAL_INFO**: Name and age input
3. **PREFERENCES**: Newsletter and theme selection
4. **REVIEW**: Show all entered data
5. **SUBMITTING**: Loading state during API call
6. **SUCCESS**: Show success message
7. **ERROR**: Show error with retry option

## Transitions

- `NEXT`: Move to next step (with validation guard)
- `BACK`: Move to previous step (no validation)
- `SUBMIT`: Submit form (from REVIEW to SUBMITTING)
- `RETRY`: Return to REVIEW from ERROR
- `RESET`: Start over from SUCCESS

## Validation Guards

Implement guards for each transition:
- **Account Info**: Email format, password min 8 chars
- **Personal Info**: First/last name required, age >= 18
- **Preferences**: Any selections valid (optional fields)
- **Review**: All previous validations pass

## State Machine Configuration

Define config object with:
- Initial state
- All possible states
- Transitions for each state
- Guards for protected transitions
- Side effects (onEnter/onExit) optional

## Form Steps

### Step 1: Account Info
- Email input (validated)
- Password input (min 8 chars)
- Next button (triggers validation)

### Step 2: Personal Info
- First name input
- Last name input
- Age input (must be 18+)
- Back and Next buttons

### Step 3: Preferences
- Newsletter checkbox
- Theme selection (light/dark)
- Back and Next buttons

### Step 4: Review
- Display all entered information
- Edit button for each section (navigate back)
- Submit button (triggers SUBMITTING state)

### Step 5: Submitting
- Show loading spinner
- Disable all inputs
- Auto-transition to SUCCESS or ERROR

### Step 6: Success
- Show success message
- Display submitted data
- Reset button to start over

### Step 7: Error
- Show error message
- Retry button (back to REVIEW)
- Reset button

## Edge Cases

- Prevent transitions without valid data
- Handle rapid button clicks
- Validate all fields before submission
- Show helpful error messages
- Track state history for debugging
- Handle browser back button (bonus)

## Learning Objectives

Master finite state machine pattern, implement transition guards and validation, understand state-driven UI, and manage complex multi-step flows. State machines prevent impossible states and make complex UIs predictable and maintainable.
