---
title: Accessible Modal Dialog
description: Build an accessible modal with focus management and ARIA attributes
tags:
  - UI
  - accessibility
  - portals
  - focus management
difficulty: medium
timeEstimate: 30
learningGoals:
  - Create accessible modals
  - Implement focus trapping
  - Use ARIA attributes correctly
  - Handle keyboard navigation
hints:
  - Use ReactDOM.createPortal for modal
  - Trap focus inside modal when open
  - Close on Escape key
  - Restore focus on close
starterCode: |
  import { useState, useEffect, useRef } from 'react';
  import { createPortal } from 'react-dom';

  function Modal({ isOpen, onClose, title, children }) {
    const modalRef = useRef(null);

    // TODO: Implement focus trap
    // TODO: Handle Escape key
    // TODO: Prevent body scroll when open

    if (!isOpen) return null;

    return createPortal(
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={onClose}
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'white',
            padding: '30px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%',
          }}
        >
          <h2 id="modal-title">{title}</h2>
          <div>{children}</div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>,
      document.body
    );
  }

  export default function App() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <h1>Accessible Modal</h1>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Example Modal"
        >
          <p>This is modal content.</p>
          <input type="text" placeholder="Focus trap test" />
          <button>Action Button</button>
        </Modal>
      </div>
    );
  }
---

Create a fully accessible modal dialog with proper focus management and keyboard support.

## Requirements

- Modal opens and closes correctly
- Focus moves to modal when opened
- Focus trapped inside modal (Tab cycles through modal elements)
- Escape key closes modal
- Focus returns to trigger button when closed
- Click outside modal closes it
- Body scroll disabled when modal open
- Proper ARIA attributes
- Use createPortal to render outside DOM hierarchy

## Accessibility Checklist

- [ ] role="dialog" and aria-modal="true"
- [ ] aria-labelledby pointing to title
- [ ] Focus trapped inside modal
- [ ] Escape key closes modal
- [ ] Focus restored on close
- [ ] Keyboard navigation works

## Learning Objectives

This exercise teaches how to build accessible modals following ARIA patterns. You'll learn focus management, keyboard handling, and portal usage - essential skills for building inclusive web applications.

## Focus Trap Implementation

Track all focusable elements inside modal and prevent Tab from escaping.
