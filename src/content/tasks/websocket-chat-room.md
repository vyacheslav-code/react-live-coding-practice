---
title: WebSocket Chat Room with Reconnection
description: Build a real-time chat application with mock WebSocket, connection management, and typing indicators
tags:
  - websocket
  - real-time
  - async
  - state-management
  - useEffect
difficulty: hard
category: pet-projects
timeEstimate: 40
learningGoals:
  - Implement WebSocket connection lifecycle management
  - Handle connection state (connecting, connected, disconnected, reconnecting)
  - Build message queuing system for offline messages
  - Create typing indicators with debounce logic
  - Implement exponential backoff reconnection strategy
hints:
  - Use useEffect to manage WebSocket connection lifecycle and cleanup
  - Track connection state separately from messages (connecting, connected, disconnected, reconnecting)
  - Queue messages when offline and flush them when reconnected
  - Debounce typing events to avoid spamming the server
  - Implement exponential backoff for reconnection (1s, 2s, 4s, 8s, max 30s)
  - "Mock WebSocket API: Use a class that simulates random disconnections every 20-40 seconds"
starterCode: |
  import { useState, useEffect, useRef } from 'react';

  // Mock WebSocket implementation (simulates real WebSocket behavior)
  class MockWebSocket {
    constructor(url) {
      this.url = url;
      this.readyState = 0; // CONNECTING
      this.onopen = null;
      this.onmessage = null;
      this.onclose = null;
      this.onerror = null;

      // Simulate connection after random delay
      setTimeout(() => {
        this.readyState = 1; // OPEN
        this.onopen?.({ type: 'open' });

        // Simulate random disconnection after 20-40s
        setTimeout(() => {
          this.close();
        }, 20000 + Math.random() * 20000);
      }, 500 + Math.random() * 1000);
    }

    send(data) {
      if (this.readyState !== 1) {
        throw new Error('WebSocket is not open');
      }

      const parsed = JSON.parse(data);

      // Echo back message after small delay
      if (parsed.type === 'message') {
        setTimeout(() => {
          this.onmessage?.({
            data: JSON.stringify({
              type: 'message',
              user: 'Bot',
              text: `Echo: ${parsed.text}`,
              timestamp: Date.now()
            })
          });
        }, 100 + Math.random() * 300);
      }

      // Echo typing indicator
      if (parsed.type === 'typing') {
        setTimeout(() => {
          this.onmessage?.({
            data: JSON.stringify({
              type: 'typing',
              user: 'Bot',
              isTyping: Math.random() > 0.5
            })
          });
        }, 200);
      }
    }

    close() {
      if (this.readyState === 1) {
        this.readyState = 3; // CLOSED
        this.onclose?.({ type: 'close', code: 1000 });
      }
    }
  }

  export default function App() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [connectionState, setConnectionState] = useState('disconnected');
    const [typingUsers, setTypingUsers] = useState(new Set());

    // TODO: Add refs for WebSocket, message queue, reconnect attempts

    // TODO: Implement WebSocket connection with lifecycle management

    // TODO: Implement reconnection logic with exponential backoff

    // TODO: Implement message queuing for offline messages

    // TODO: Handle incoming messages and typing indicators

    // TODO: Implement send message with queue support

    // TODO: Implement typing indicator with debounce

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div style={{
          padding: '10px',
          background: connectionState === 'connected' ? '#d4edda' :
                     connectionState === 'connecting' || connectionState === 'reconnecting' ? '#fff3cd' : '#f8d7da',
          borderRadius: '4px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Status: <strong>{connectionState}</strong>
        </div>

        <div style={{
          height: '400px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          overflowY: 'auto',
          padding: '10px',
          marginBottom: '10px',
          background: '#f9f9f9'
        }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              marginBottom: '10px',
              padding: '8px',
              background: msg.user === 'You' ? '#e3f2fd' : '#fff',
              borderRadius: '4px',
              borderLeft: msg.user === 'You' ? '3px solid #2196F3' : '3px solid #4CAF50'
            }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                <strong>{msg.user}</strong> - {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
              <div>{msg.text}</div>
            </div>
          ))}

          {typingUsers.size > 0 && (
            <div style={{ fontStyle: 'italic', color: '#666', fontSize: '14px' }}>
              {Array.from(typingUsers).join(', ')} {typingUsers.size === 1 ? 'is' : 'are'} typing...
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              // TODO: Trigger typing indicator
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                // TODO: Send message
              }
            }}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
          <button
            onClick={() => {
              // TODO: Send message
            }}
            disabled={!inputValue.trim() || connectionState !== 'connected'}
            style={{
              padding: '10px 20px',
              borderRadius: '4px',
              border: 'none',
              background: '#2196F3',
              color: 'white',
              cursor: !inputValue.trim() || connectionState !== 'connected' ? 'not-allowed' : 'pointer',
              opacity: !inputValue.trim() || connectionState !== 'connected' ? 0.5 : 1
            }}
          >
            Send
          </button>
        </div>

        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Note: Connection will randomly disconnect to test reconnection logic
        </div>
      </div>
    );
  }
---

## Task

Build a real-time chat application with WebSocket connection management, automatic reconnection, message queuing, and typing indicators.

### Requirements

1. **Connection Management**
   - Track connection states: `disconnected`, `connecting`, `connected`, `reconnecting`
   - Automatically connect on mount
   - Clean up connection on unmount
   - Display current connection status to user

2. **Reconnection Logic**
   - Implement exponential backoff strategy (1s, 2s, 4s, 8s, etc.)
   - Cap maximum retry delay at 30 seconds
   - Show "reconnecting" state in UI
   - Reset retry count on successful connection

3. **Message Queuing**
   - Queue messages sent while offline
   - Automatically flush queue when connection is restored
   - Show visual indicator for queued messages
   - Maintain message order

4. **Typing Indicators**
   - Send typing events while user is typing
   - Debounce typing events (send at most once per second)
   - Display when other users are typing
   - Clear typing state after inactivity

5. **Message Display**
   - Show all messages with timestamp
   - Differentiate between user's messages and others
   - Auto-scroll to latest message
   - Display user name with each message

### Example Behavior

- User opens chat → Connection state changes: `connecting` → `connected`
- User types message → Typing indicator sent (debounced)
- User sends message while connected → Message appears immediately
- Connection drops → State changes to `reconnecting`, retry delay increases
- User sends message while offline → Message queued locally
- Connection restored → Queued messages sent automatically
- Bot responds to messages with echoes and random typing indicators

### Bonus Challenges

- Add message delivery confirmation (sent/delivered status)
- Implement message persistence with localStorage
- Add sound notification for new messages
- Show connection quality indicator (ping/latency)
- Add user presence (online/offline status)
- Implement message read receipts
