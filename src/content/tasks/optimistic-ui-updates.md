---
title: Optimistic UI Updates
description: Implement optimistic updates pattern with rollback on error for better user experience
tags:
  - state management
  - async
  - error handling
  - UX patterns
difficulty: hard
timeEstimate: 35
learningGoals:
  - Implement optimistic UI update pattern
  - Handle async operations with loading states
  - Rollback state on API errors
  - Manage conflict resolution
  - Provide user feedback for all states
hints:
  - Update UI immediately before API call completes
  - Store rollback data in case of failure
  - Use async/await with try/catch for error handling
  - Show different states for pending, optimistic, and confirmed
  - Consider using useReducer for complex state transitions
starterCode: |
  import { useState, useReducer } from 'react';

  // Mock API with random failures
  const mockAPI = {
    updateLikes: async (postId, liked) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // 30% chance of failure
      if (Math.random() < 0.3) {
        throw new Error('Failed to update likes');
      }
      return { success: true, postId, liked };
    },

    deletePost: async (postId) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (Math.random() < 0.2) {
        throw new Error('Failed to delete post');
      }
      return { success: true, postId };
    },

    updatePost: async (postId, content) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (Math.random() < 0.25) {
        throw new Error('Failed to update post');
      }
      return { success: true, postId, content };
    }
  };

  const INITIAL_POSTS = [
    { id: 1, content: 'First post!', likes: 5, liked: false, status: 'confirmed' },
    { id: 2, content: 'Having a great day!', likes: 12, liked: false, status: 'confirmed' },
    { id: 3, content: 'Check out this cool feature', likes: 8, liked: true, status: 'confirmed' },
  ];

  // TODO: Define action types
  const ACTIONS = {
    LIKE_OPTIMISTIC: 'LIKE_OPTIMISTIC',
    LIKE_SUCCESS: 'LIKE_SUCCESS',
    LIKE_ROLLBACK: 'LIKE_ROLLBACK',
    // TODO: Add actions for delete and update
  };

  // TODO: Create reducer for managing posts with optimistic updates
  function postsReducer(state, action) {
    switch (action.type) {
      // TODO: Implement optimistic update logic
      default:
        return state;
    }
  }

  function Post({ post, onLike, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(post.content);

    const handleUpdate = () => {
      onUpdate(post.id, editContent);
      setIsEditing(false);
    };

    const isPending = post.status === 'pending';
    const isOptimistic = post.status === 'optimistic';

    return (
      <div style={{
        padding: '15px',
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '8px',
        opacity: isPending ? 0.6 : 1,
        position: 'relative'
      }}>
        {isPending && (
          <div style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            fontSize: '12px',
            color: '#666'
          }}>
            Saving...
          </div>
        )}

        {isEditing ? (
          <div>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              style={{ width: '100%', minHeight: '60px' }}
            />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <p>{post.content}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => onLike(post.id)}
                disabled={isPending}
                style={{
                  background: post.liked ? '#e91e63' : '#f0f0f0',
                  color: post.liked ? 'white' : 'black'
                }}
              >
                {post.liked ? '❤️' : '🤍'} {post.likes}
              </button>
              <button onClick={() => setIsEditing(true)} disabled={isPending}>
                Edit
              </button>
              <button onClick={() => onDelete(post.id)} disabled={isPending}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default function App() {
    const [posts, dispatch] = useReducer(postsReducer, INITIAL_POSTS);
    const [error, setError] = useState(null);

    // TODO: Implement optimistic like with rollback
    const handleLike = async (postId) => {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      // TODO: Dispatch optimistic update

      try {
        // TODO: Call API
        // TODO: Dispatch success
        setError(null);
      } catch (err) {
        // TODO: Dispatch rollback
        setError(`Failed to update like: ${err.message}`);
        setTimeout(() => setError(null), 3000);
      }
    };

    // TODO: Implement optimistic delete with rollback
    const handleDelete = async (postId) => {
      // TODO: Similar pattern to handleLike
    };

    // TODO: Implement optimistic update with rollback
    const handleUpdate = async (postId, content) => {
      // TODO: Similar pattern to handleLike
    };

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>Optimistic UI Updates</h1>

        {error && (
          <div style={{
            padding: '10px',
            background: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <div>
          {posts.map(post => (
            <Post
              key={post.id}
              post={post}
              onLike={handleLike}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>

        <div style={{ marginTop: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Instructions</h3>
          <ul>
            <li>Click like - UI updates instantly, rolls back on error (30% chance)</li>
            <li>Edit post - Changes appear immediately, rolls back on error (25% chance)</li>
            <li>Delete post - Post disappears immediately, reappears on error (20% chance)</li>
          </ul>
        </div>
      </div>
    );
  }
---

Build an optimistic UI update system that provides instant feedback and gracefully handles errors with rollback functionality.

## Requirements

- Implement optimistic updates for like, edit, and delete operations
- Update UI immediately before API call completes
- Show visual indicators for pending operations
- Rollback changes if API call fails
- Display error messages to user
- Disable interactions during pending state
- Track different states: confirmed, optimistic, pending
- Use reducer pattern for complex state transitions
- Handle concurrent operations correctly
- Auto-dismiss error messages after timeout

## Optimistic Update Pattern

For each action:
1. Immediately update UI (optimistic state)
2. Mark as pending/in-progress
3. Send API request
4. On success: confirm the change
5. On failure: rollback to previous state and show error

## State Management

Each post should track:
- `id`: Unique identifier
- `content`: Post text
- `likes`: Like count
- `liked`: Whether current user liked
- `status`: 'confirmed' | 'optimistic' | 'pending'

## Operations to Implement

### Like/Unlike
- Toggle like state immediately
- Update like count optimistically
- Rollback on API failure

### Edit Post
- Update content immediately
- Show saving indicator
- Rollback to previous content on failure

### Delete Post
- Remove from list immediately
- Restore if deletion fails
- Show error with context

## Visual Feedback

- Pending operations: reduced opacity or spinner
- Optimistic changes: maybe slightly different style
- Errors: toast/banner with error message
- Success: no extra feedback needed (already updated)

## Edge Cases

- Multiple rapid clicks on like button
- Editing while save in progress
- Network timeout scenarios
- Concurrent operations on same post
- Error recovery and retry logic

## Learning Objectives

Master optimistic UI patterns for better UX, understand state rollback strategies, handle async operations with multiple states, and implement proper error recovery. This pattern is critical for modern responsive web applications.
