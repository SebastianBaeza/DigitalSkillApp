// src/components/mazeFunctions.js

export function maze_moveForward(player, setPlayer, maze) {
  console.log('Moving player forward');
  setPlayer((prev) => {
    
    let { x, y, direction } = prev;
    let newX = x, newY = y; // Temporary variables to hold potential new position

    // Calculate new position based on direction
    switch (direction) {
      case 'right':
        newX = x + 1;
        break;
      case 'left':
        newX = x - 1;
        break;
      case 'up':
        newY = y - 1;
        break;
      case 'down':
        newY = y + 1;
        break;
      default:
        break;
    }

    // Check if the new position is within the maze bounds and not a wall
    if (newX >= 0 && newX < maze[0].length && newY >= 0 && newY < maze.length && maze[newY][newX] !== 1) {
      // Update player's position if the new position is valid
      x = newX;
      y = newY;
    }

    // Return updated player object
    return { ...prev, x, y };
  });
  }