---
title: Rich Text Editor with ContentEditable
description: Build a basic rich text editor with bold, italic, lists, and proper selection management
tags:
  - contenteditable
  - selection-api
  - sanitization
  - text-manipulation
  - accessibility
difficulty: hard
timeEstimate: 40
learningGoals:
  - Master contentEditable API and its quirks
  - Use Selection and Range APIs for cursor tracking
  - Implement text formatting with document.execCommand
  - Handle HTML sanitization to prevent XSS
  - Manage focus and selection state properly
hints:
  - Use contentEditable="true" on a div and listen to input events
  - document.execCommand('bold') applies formatting to current selection
  - window.getSelection() and selection.getRangeAt(0) track cursor position
  - Save and restore selection when clicking toolbar buttons
  - Sanitize HTML on paste to prevent script injection
starterCode: |
  import { useState, useRef, useEffect } from 'react';

  // Simple HTML sanitizer (production should use DOMPurify)
  const sanitizeHTML = (html) => {
    const allowedTags = ['b', 'i', 'u', 'strong', 'em', 'ul', 'ol', 'li', 'br', 'p'];
    const div = document.createElement('div');
    div.innerHTML = html;

    // Remove script tags and event handlers
    const scripts = div.querySelectorAll('script');
    scripts.forEach(script => script.remove());

    return div.innerHTML;
  };

  export default function App() {
    const [content, setContent] = useState('<p>Start typing here...</p>');
    const editorRef = useRef(null);
    const savedSelection = useRef(null);

    // TODO: Save selection when editor loses focus
    const saveSelection = () => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        savedSelection.current = selection.getRangeAt(0);
      }
    };

    // TODO: Restore selection before applying formatting
    const restoreSelection = () => {
      if (savedSelection.current) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(savedSelection.current);
      }
    };

    // TODO: Apply formatting command
    const applyFormat = (command, value = null) => {
      // Restore selection
      // Execute command
      // Focus editor
      // Save new selection
    };

    // TODO: Handle content changes
    const handleInput = (e) => {
      setContent(e.currentTarget.innerHTML);
      saveSelection();
    };

    // TODO: Handle paste to sanitize content
    const handlePaste = (e) => {
      e.preventDefault();
      // Get pasted HTML or plain text
      // Sanitize it
      // Insert at cursor position
    };

    // TODO: Check if format is active at cursor
    const isFormatActive = (command) => {
      return document.queryCommandState(command);
    };

    return (
      <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1>Rich Text Editor</h1>

          {/* Toolbar */}
          <div style={{
            display: 'flex',
            gap: '4px',
            padding: '8px',
            background: '#f5f5f5',
            borderRadius: '8px 8px 0 0',
            border: '1px solid #ddd',
            borderBottom: 'none',
          }}>
            {/* TODO: Add formatting buttons */}
            {/* Bold, Italic, Underline, Unordered List, Ordered List */}
            {/* Each button should call applyFormat with appropriate command */}
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyFormat('bold')}
              style={{
                padding: '6px 12px',
                background: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              B
            </button>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyFormat('italic')}
              style={{
                padding: '6px 12px',
                background: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                fontStyle: 'italic',
              }}
            >
              I
            </button>
            {/* Add more buttons */}
          </div>

          {/* Editor */}
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onPaste={handlePaste}
            onBlur={saveSelection}
            dangerouslySetInnerHTML={{ __html: content }}
            style={{
              minHeight: '300px',
              padding: '16px',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '0 0 8px 8px',
              outline: 'none',
              lineHeight: '1.6',
              fontSize: '16px',
            }}
          />

          {/* HTML Preview */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: '#f9f9f9',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666' }}>
              HTML Output:
            </h3>
            <pre style={{
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              fontSize: '12px',
              fontFamily: 'monospace',
              color: '#333',
            }}>
              {content}
            </pre>
          </div>

          <div style={{
            marginTop: '16px',
            padding: '16px',
            background: '#fef3c7',
            borderRadius: '8px',
          }}>
            <h3>Instructions:</h3>
            <ul style={{ lineHeight: '1.8', marginBottom: 0 }}>
              <li>Select text and click formatting buttons</li>
              <li>Try bold, italic, underline, and lists</li>
              <li>Paste content from other sources (will be sanitized)</li>
              <li>Check HTML output below to see generated markup</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
---

## Task

Build a basic rich text editor using the contentEditable API with formatting toolbar, proper selection management, HTML sanitization for security, and cursor tracking.

### Requirements

**Core Functionality:**
- ContentEditable div for text input
- Toolbar with formatting buttons:
  - Bold (Cmd+B / Ctrl+B)
  - Italic (Cmd+I / Ctrl+I)
  - Underline
  - Unordered List (bullet points)
  - Ordered List (numbered)
- Real-time HTML preview
- Paste sanitization to prevent XSS

**Selection Management:**
- Save selection when editor loses focus (clicking toolbar)
- Restore selection before applying format
- Toolbar buttons should NOT steal focus from editor
- Use `onMouseDown={(e) => e.preventDefault()}` on toolbar buttons

**Formatting Commands:**
- Use `document.execCommand()` for formatting
  - `execCommand('bold')` - Toggle bold
  - `execCommand('italic')` - Toggle italic
  - `execCommand('underline')` - Toggle underline
  - `execCommand('insertUnorderedList')` - Toggle bullet list
  - `execCommand('insertOrderedList')` - Toggle numbered list
- Visual feedback: highlight active formats in toolbar

**HTML Sanitization:**
- Sanitize pasted content to remove:
  - `<script>` tags
  - Event handlers (onclick, onerror, etc.)
  - Dangerous protocols (javascript:, data:)
- Allow only safe formatting tags: b, i, u, strong, em, ul, ol, li, br, p
- Use DOMPurify in production (basic implementation here)

**Edge Cases:**
- Handle paste as plain text option
- Prevent empty editor (always have at least one <p>)
- Handle multi-paragraph selection
- Nested lists handling
- Cursor position after formatting

**UI/UX:**
- Toolbar buttons show active state (pressed appearance when format active)
- Min height to prevent layout shift
- Focus border on editor
- Keyboard shortcuts work (Cmd+B, Cmd+I)

### Example Behavior

1. User types "Hello World" in editor
2. User selects "World"
3. User clicks Bold button
4. "World" becomes `<strong>World</strong>`
5. HTML preview updates below
6. User clicks in middle of "World"
7. Bold button shows active state
8. User pastes content from external site
9. Content is sanitized (scripts removed)
10. Only safe HTML tags remain

### Bonus Challenges

- Add more formats:
  - Strikethrough
  - Code block
  - Blockquote
  - Headings (H1-H6)
  - Text alignment (left, center, right)
  - Font size selector
- Link insertion with URL prompt
- Image upload and insertion
- Markdown shortcuts (type `**text**` → auto-convert to bold)
- Undo/Redo with Cmd+Z / Cmd+Shift+Z
- Word count display
- Character limit with warning
- Export as Markdown
- Collaborative editing (real-time with WebSocket)
- Comments/annotations on selected text

### Testing Checklist

- [ ] Formatting buttons apply correct HTML tags
- [ ] Selection is preserved when clicking toolbar
- [ ] Keyboard shortcuts work (Cmd+B, Cmd+I)
- [ ] Active format buttons show visual state
- [ ] Pasted content is sanitized (no scripts)
- [ ] Lists render correctly with proper nesting
- [ ] Editor remains focused after formatting
- [ ] HTML preview matches editor content
- [ ] Empty editor shows placeholder or default <p>
- [ ] No XSS vulnerabilities from pasted content

### Security Note

This basic implementation demonstrates concepts. For production:
- Use a proper sanitization library like [DOMPurify](https://github.com/cure53/DOMPurify)
- Consider using a battle-tested editor like [Lexical](https://lexical.dev/) or [Slate](https://www.slatejs.org/)
- Validate and sanitize on the backend as well
- Be aware that `contentEditable` behavior varies across browsers
