---
title: Multi-Step Form Wizard
description: Create a multi-step form with validation and navigation between steps
tags:
  - UI
  - forms
  - validation
  - state management
difficulty: medium
timeEstimate: 35
learningGoals:
  - Build multi-step form flows
  - Validate each step before proceeding
  - Manage complex form state
  - Implement progress indicators
hints:
  - Use state for current step and form data
  - Validate before allowing next step
  - Show progress indicator
  - Allow navigation to completed steps
starterCode: |
  import { useState } from 'react';

  const STEPS = [
    { id: 1, title: 'Personal Info' },
    { id: 2, title: 'Account Details' },
    { id: 3, title: 'Preferences' },
    { id: 4, title: 'Review' },
  ];

  export default function App() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
      // Step 1
      firstName: '',
      lastName: '',
      email: '',
      // Step 2
      username: '',
      password: '',
      confirmPassword: '',
      // Step 3
      newsletter: false,
      notifications: true,
      theme: 'light',
    });
    const [errors, setErrors] = useState({});

    const updateField = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateStep = (step) => {
      const newErrors = {};

      if (step === 1) {
        if (!formData.firstName) newErrors.firstName = 'First name required';
        if (!formData.lastName) newErrors.lastName = 'Last name required';
        if (!formData.email) newErrors.email = 'Email required';
        if (formData.email && !formData.email.includes('@')) {
          newErrors.email = 'Invalid email';
        }
      }

      if (step === 2) {
        if (!formData.username) newErrors.username = 'Username required';
        if (!formData.password) newErrors.password = 'Password required';
        if (formData.password.length < 8) {
          newErrors.password = 'Password must be 8+ characters';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords must match';
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
      if (validateStep(currentStep)) {
        setCurrentStep(prev => prev + 1);
      }
    };

    const handleBack = () => {
      setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = () => {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    };

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>Registration Form</h1>

        {/* Progress indicator */}
        <div style={{ display: 'flex', marginBottom: '30px' }}>
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '10px',
                background: currentStep >= step.id ? '#007bff' : '#e9ecef',
                color: currentStep >= step.id ? 'white' : '#666',
                borderRight: index < STEPS.length - 1 ? '2px solid white' : 'none',
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{step.id}</div>
              <div style={{ fontSize: '12px' }}>{step.title}</div>
            </div>
          ))}
        </div>

        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div>
            <h2>Personal Information</h2>
            <div style={{ marginBottom: '15px' }}>
              <label>First Name:</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                style={{ width: '100%', padding: '8px' }}
              />
              {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Last Name:</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                style={{ width: '100%', padding: '8px' }}
              />
              {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                style={{ width: '100%', padding: '8px' }}
              />
              {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
            </div>
          </div>
        )}

        {/* Step 2: Account Details */}
        {currentStep === 2 && (
          <div>
            <h2>Account Details</h2>
            {/* TODO: Add username, password, confirmPassword fields */}
          </div>
        )}

        {/* Step 3: Preferences */}
        {currentStep === 3 && (
          <div>
            <h2>Preferences</h2>
            {/* TODO: Add newsletter, notifications, theme fields */}
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div>
            <h2>Review Your Information</h2>
            {/* TODO: Display all form data for review */}
          </div>
        )}

        {/* Navigation buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            style={{ padding: '10px 20px' }}
          >
            Back
          </button>
          {currentStep < 4 ? (
            <button onClick={handleNext} style={{ padding: '10px 20px' }}>
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} style={{ padding: '10px 20px' }}>
              Submit
            </button>
          )}
        </div>
      </div>
    );
  }
---

Build a multi-step registration form with validation, progress tracking, and review step.

## Requirements

- Four steps: Personal Info, Account Details, Preferences, Review
- Progress indicator showing current step
- Validation before proceeding to next step
- Back button to return to previous step
- Review step displays all entered data
- Submit button on final step
- Error messages for validation failures

## Steps Content

**Step 1 - Personal Info:**
- First Name (required)
- Last Name (required)
- Email (required, valid format)

**Step 2 - Account Details:**
- Username (required)
- Password (required, min 8 chars)
- Confirm Password (must match)

**Step 3 - Preferences:**
- Newsletter checkbox
- Notifications toggle
- Theme selection (light/dark)

**Step 4 - Review:**
- Display all entered information
- Allow editing by going back

## Learning Objectives

This exercise teaches complex form management across multiple steps. You'll learn form validation strategies, state management for multi-part forms, progress indication, and creating smooth user flows through complex data entry processes.
