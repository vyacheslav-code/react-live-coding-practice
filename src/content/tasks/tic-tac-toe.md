---
title: Tic-Tac-Toe Game
description: Build a two-player tic-tac-toe game with win detection and game reset
tags:
  - useState
  - game logic
  - arrays
  - conditional rendering
difficulty: easy
timeEstimate: 25
learningGoals:
  - Manage game state with arrays
  - Implement win detection algorithm
  - Handle turn-based logic
  - Reset game state properly
hints:
  - Store board as array of 9 elements (null, 'X', or 'O')
  - Check all 8 winning combinations after each move
  - Toggle player after each valid move
  - Disable clicks on filled squares or after game ends
starterCode: |
  import { useState } from 'react';

  export default function App() {
    // Board: array of 9 squares, null = empty, 'X' or 'O' = filled
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    // TODO: Calculate winner
    const calculateWinner = (squares) => {
      const lines = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal
        [2, 4, 6], // anti-diagonal
      ];

      // TODO: Check each line for winner
      // If all 3 squares have same non-null value, return that value
      // Otherwise return null

      return null;
    };

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every(square => square !== null);

    // TODO: Handle square click
    const handleClick = (index) => {
      // Don't allow click if:
      // - Square is already filled
      // - Game is over (winner exists)

      // Create copy of board
      // Set square to current player
      // Toggle player
    };

    const resetGame = () => {
      setBoard(Array(9).fill(null));
      setIsXNext(true);
    };

    // Status message
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else if (isDraw) {
      status = "It's a draw!";
    } else {
      status = `Next player: ${isXNext ? 'X' : 'O'}`;
    }

    return (
      <div style={{ padding: '20px', fontFamily: 'system-ui', textAlign: 'center' }}>
        <h1>Tic-Tac-Toe</h1>

        <div style={{
          fontSize: '20px',
          marginBottom: '20px',
          fontWeight: 500,
          color: winner ? '#16a34a' : '#1f2937',
        }}>
          {status}
        </div>

        {/* Board */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gap: '4px',
          justifyContent: 'center',
          background: '#374151',
          padding: '4px',
          borderRadius: '8px',
          width: 'fit-content',
          margin: '0 auto',
        }}>
          {board.map((square, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              style={{
                width: '100px',
                height: '100px',
                fontSize: '48px',
                fontWeight: 'bold',
                background: 'white',
                border: 'none',
                cursor: square || winner ? 'not-allowed' : 'pointer',
                color: square === 'X' ? '#3b82f6' : '#ef4444',
              }}
            >
              {square}
            </button>
          ))}
        </div>

        <button
          onClick={resetGame}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            fontSize: '16px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Reset Game
        </button>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: '#f9fafb',
          borderRadius: '8px',
          maxWidth: '300px',
          margin: '24px auto 0',
        }}>
          <h3 style={{ margin: '0 0 8px' }}>How to play:</h3>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
            Players take turns clicking squares.<br />
            First to get 3 in a row wins!
          </p>
        </div>
      </div>
    );
  }
---

## Task

Build a classic two-player tic-tac-toe game with win detection.

### Requirements

**Game Board:**
- 3x3 grid of clickable squares
- Display X or O in filled squares
- Prevent clicking filled squares

**Game Logic:**
- Players alternate turns (X goes first)
- Detect winner (3 in a row: horizontal, vertical, diagonal)
- Detect draw (all squares filled, no winner)
- Show game status (whose turn / winner / draw)

**Reset:**
- Reset button clears board
- X goes first after reset

### Win Conditions

Check these 8 lines:
```
Rows:     [0,1,2] [3,4,5] [6,7,8]
Columns:  [0,3,6] [1,4,7] [2,5,8]
Diagonals: [0,4,8] [2,4,6]
```

### Example Behavior

1. X clicks center (index 4)
2. O clicks corner (index 0)
3. X clicks another square
4. ...continue until win or draw
5. Show winner message
6. Disable further clicks
7. Click reset to play again

### Bonus Challenges

- Highlight winning line
- Add score tracking (X wins, O wins, draws)
- Add move history with undo
- Add AI opponent (minimax algorithm)
- Add animations for moves

### Testing Checklist

- [ ] X goes first
- [ ] Players alternate turns
- [ ] Can't click filled squares
- [ ] Win detection works (all 8 lines)
- [ ] Draw detection works
- [ ] Status message updates correctly
- [ ] Reset clears board
- [ ] Game stops after winner
