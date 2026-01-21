---
title: Smart Polling Notification System
description: Build a notification system with intelligent polling that backs off when inactive and stops on unmount
tags:
  - polling
  - async
  - useEffect
  - intervals
  - state-management
difficulty: medium
timeEstimate: 30
learningGoals:
  - Implement interval-based polling with useEffect cleanup
  - Create adaptive polling that adjusts frequency based on user activity
  - Detect new items by comparing response data
  - Handle mark as read functionality with optimistic updates
  - Properly clean up intervals to prevent memory leaks
hints:
  - Use setInterval in useEffect and return cleanup function
  - Track last activity time to adjust polling frequency
  - Compare notification IDs between polls to detect new items
  - Use separate state for read/unread notifications
  - Implement exponential backoff for polling (5s active, 30s inactive, 60s idle)
  - Stop polling completely on unmount to prevent memory leaks
starterCode: |
  import { useState, useEffect, useRef } from 'react';

  // Mock API for notifications
  const mockNotifications = [
    { id: 1, text: 'John commented on your post', timestamp: Date.now() - 300000, read: false },
    { id: 2, text: 'Sarah liked your photo', timestamp: Date.now() - 600000, read: false },
    { id: 3, text: 'New follower: Mike', timestamp: Date.now() - 900000, read: true },
  ];

  let notificationIdCounter = 4;

  const fetchNotifications = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));

    // Randomly add new notification (20% chance)
    if (Math.random() < 0.2) {
      mockNotifications.unshift({
        id: notificationIdCounter++,
        text: `New notification #${notificationIdCounter - 1}`,
        timestamp: Date.now(),
        read: false
      });
    }

    return [...mockNotifications];
  };

  const markAsReadAPI = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const notification = mockNotifications.find(n => n.id === id);
    if (notification) notification.read = true;
    return { success: true };
  };

  export default function App() {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [pollingInterval, setPollingInterval] = useState(5000); // Start with 5s
    const [lastActivity, setLastActivity] = useState(Date.now());
    const [isVisible, setIsVisible] = useState(false);

    // TODO: Add refs for tracking previous notification IDs and intervals

    // TODO: Implement polling logic with adaptive intervals
    // Active (< 30s since activity): poll every 5 seconds
    // Inactive (30s - 2min): poll every 30 seconds
    // Idle (> 2min): poll every 60 seconds

    // TODO: Track user activity to reset polling frequency

    // TODO: Detect new notifications by comparing IDs

    // TODO: Implement mark as read with optimistic update

    // TODO: Calculate unread count

    const handleMarkAsRead = async (id) => {
      // TODO: Optimistically update UI, then call API
    };

    const handleMarkAllAsRead = async () => {
      // TODO: Mark all notifications as read
    };

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h1 style={{ margin: 0 }}>Notifications</h1>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsVisible(!isVisible)}
              style={{
                padding: '10px 20px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                background: '#fff',
                cursor: 'pointer',
                fontSize: '16px',
                position: 'relative'
              }}
            >
              🔔 Notifications
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#f44336',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div style={{
          fontSize: '12px',
          color: '#666',
          marginBottom: '20px',
          padding: '10px',
          background: '#f5f5f5',
          borderRadius: '4px'
        }}>
          Polling interval: <strong>{pollingInterval / 1000}s</strong> |
          Last activity: <strong>{Math.floor((Date.now() - lastActivity) / 1000)}s ago</strong>
        </div>

        {isVisible && (
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: '#fff'
          }}>
            <div style={{
              padding: '15px',
              borderBottom: '1px solid #ddd',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ margin: 0, fontSize: '18px' }}>
                {unreadCount > 0 ? `${unreadCount} Unread` : 'All caught up!'}
              </h2>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  style={{
                    padding: '5px 10px',
                    fontSize: '12px',
                    border: 'none',
                    background: '#2196F3',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Mark all read
                </button>
              )}
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {notifications.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                  No notifications yet
                </div>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                    style={{
                      padding: '15px',
                      borderBottom: '1px solid #f0f0f0',
                      background: notification.read ? '#fff' : '#e3f2fd',
                      cursor: notification.read ? 'default' : 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      {!notification.read && (
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#2196F3',
                          marginTop: '6px',
                          flexShrink: 0
                        }} />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontWeight: notification.read ? 'normal' : 'bold',
                          marginBottom: '4px'
                        }}>
                          {notification.text}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {new Date(notification.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          Click anywhere to register activity and speed up polling
        </div>
      </div>
    );
  }
---

## Task

Build an intelligent notification polling system that adjusts polling frequency based on user activity, detects new notifications, and handles mark-as-read functionality.

### Requirements

1. **Smart Polling Logic**
   - Poll every 5 seconds when user is active (< 30s since last activity)
   - Poll every 30 seconds when inactive (30s - 2 minutes)
   - Poll every 60 seconds when idle (> 2 minutes)
   - Update polling interval dynamically based on activity
   - Stop polling completely on component unmount

2. **Activity Tracking**
   - Track last user activity time
   - Any click, scroll, or interaction counts as activity
   - Update activity timestamp on interaction
   - Display time since last activity

3. **New Notification Detection**
   - Compare notification IDs between polls
   - Identify truly new notifications (not just polling refreshes)
   - Show visual indicator for new items
   - Update unread count badge

4. **Mark as Read**
   - Click notification to mark as read
   - Implement optimistic UI update (update immediately, then call API)
   - Add "Mark all as read" button
   - Distinguish visually between read/unread items

5. **UI Polish**
   - Display unread count badge on bell icon
   - Toggle notification panel visibility
   - Auto-scroll to new notifications
   - Show current polling interval in debug info

### Example Behavior

- Component mounts → Start polling every 5 seconds
- Fetch notifications → Calculate unread count
- New notification arrives → Badge updates, highlight item
- User clicks notification → Optimistically mark as read, call API
- No activity for 30s → Polling slows to 30 seconds
- No activity for 2 minutes → Polling slows to 60 seconds
- User clicks anywhere → Polling speeds back to 5 seconds
- Component unmounts → Polling stops completely

### Bonus Challenges

- Add browser notification API for new items
- Persist read/unread state to localStorage
- Add notification categories/filters
- Implement pagination for large notification lists
- Add pull-to-refresh gesture
- Show "New" badge that fades after viewing
- Add notification sounds (with user preference)
