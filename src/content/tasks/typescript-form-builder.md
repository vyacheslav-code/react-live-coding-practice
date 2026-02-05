---
title: Type-Safe Form Builder
description: Create a schema-driven form builder with full type inference and validation
tags:
  - typescript
  - forms
  - generics
difficulty: hard
category: pet-projects
timeEstimate: 40
learningGoals:
  - Build schema-driven forms with type inference
  - Create mapped types for form values
  - Implement discriminated unions for field types
  - Use conditional types for field-specific props
  - Master type-safe validation patterns
hints:
  - Define a schema type that describes all possible field configurations
  - Use mapped types to infer form values from schema
  - Create discriminated unions for text/number/select field types
  - Type validation functions to match their field types
  - Consider using generics on the Form component to infer value types
starterCode: |
  export default function App() {
    // TODO: Type the form schema
    const userFormSchema = {
      username: {
        type: 'text',
        label: 'Username',
        required: true,
        validate: (value) => value.length >= 3 || 'Too short',
      },
      age: {
        type: 'number',
        label: 'Age',
        required: true,
        min: 18,
        max: 120,
      },
      country: {
        type: 'select',
        label: 'Country',
        required: true,
        options: ['USA', 'Canada', 'UK', 'Other'],
      },
      bio: {
        type: 'text',
        label: 'Bio',
        required: false,
        multiline: true,
      },
    };

    // TODO: Type the FormBuilder component
    function FormBuilder({ schema, onSubmit }) {
      const [values, setValues] = React.useState({});
      const [errors, setErrors] = React.useState({});

      const handleChange = (fieldName, value) => {
        setValues(prev => ({ ...prev, [fieldName]: value }));
        setErrors(prev => ({ ...prev, [fieldName]: undefined }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        Object.entries(schema).forEach(([key, field]) => {
          const value = values[key];

          if (field.required && !value) {
            newErrors[key] = 'Required';
          } else if (field.validate && value) {
            const result = field.validate(value);
            if (result !== true) newErrors[key] = result;
          }
        });

        if (Object.keys(newErrors).length === 0) {
          onSubmit(values);
        } else {
          setErrors(newErrors);
        }
      };

      return (
        <form onSubmit={handleSubmit}>
          {Object.entries(schema).map(([key, field]) => (
            <div key={key}>
              <label>{field.label}</label>
              {field.type === 'text' && (
                <input
                  type="text"
                  value={values[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              )}
              {field.type === 'number' && (
                <input
                  type="number"
                  value={values[key] || ''}
                  min={field.min}
                  max={field.max}
                  onChange={(e) => handleChange(key, Number(e.target.value))}
                />
              )}
              {field.type === 'select' && (
                <select
                  value={values[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                >
                  <option value="">Select...</option>
                  {field.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
              {errors[key] && <span>{errors[key]}</span>}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      );
    }

    const handleSubmit = (values) => {
      console.log('Submitted:', values);
      // TODO: Values should be properly typed based on schema
    };

    return (
      <div>
        <h1>User Registration</h1>
        <FormBuilder schema={userFormSchema} onSubmit={handleSubmit} />
      </div>
    );
  }
---

Build a type-safe form builder that generates forms from schema definitions with complete type inference for field values and validation.

## Requirements

- Define a schema type with discriminated unions for different field types
- Infer form values type from the schema automatically
- Type validation functions specific to their field type
- Ensure field-specific props (min/max, options) are type-safe
- Make the values passed to onSubmit fully typed
- Validate that all required fields are present in schema
- Support text, number, and select field types

## TypeScript Patterns to Implement

### Field Type Discriminated Union
```typescript
type TextField = {
  type: 'text';
  label: string;
  required: boolean;
  multiline?: boolean;
  validate?: (value: string) => true | string;
};

type NumberField = {
  type: 'number';
  label: string;
  required: boolean;
  min?: number;
  max?: number;
  validate?: (value: number) => true | string;
};

// ... similar for SelectField
```

### Infer Values from Schema
```typescript
type FormValues<Schema> = {
  [K in keyof Schema]: Schema[K] extends { type: 'text' }
    ? string
    : Schema[K] extends { type: 'number' }
    ? number
    : Schema[K] extends { type: 'select' }
    ? string
    : never;
};
```

### Generic Form Props
```typescript
type FormBuilderProps<Schema> = {
  schema: Schema;
  onSubmit: (values: FormValues<Schema>) => void;
};
```

## Type Safety Goals

- TypeScript should infer the exact shape of values from schema
- Validation functions must match their field's value type
- Field-specific props only available on correct field types
- No `any` types in the implementation
- Full autocomplete for all form values in onSubmit

## Example Behavior

When you submit the form:
```typescript
onSubmit({
  username: "john_doe",  // string
  age: 25,               // number
  country: "USA",        // string
  bio: "Hello"           // string | undefined
})
```

TypeScript should know the exact type of each field value.

## Bonus Challenges

- Add support for checkbox and radio field types
- Implement field dependencies (show field X only if field Y has value Z)
- Add async validation with debouncing
- Create a `useForm` hook that extracts the form logic
