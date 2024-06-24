/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// src/components/Maze.js
import { useEffect, useRef, useState } from 'react';
// import { maze_moveForward} from './MazeFunctions.js';  // Importa las funciones

export default function Maze({ code }) {
  const canvasRef = useRef(null);
  const cellSize = 40;
  const [player, setPlayer] = useState({ x: 1, y: 1, direction: 'right' });

  let maze = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 1, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];

  useEffect(() => { drawMaze(); }, [player]);

  const drawMaze = () => {
    const ctx = canvasRef.current.getContext('2d');
    for (let row = 0; row < maze.length; row++) {
      for (let col = 0; col < maze[row].length; col++) {
        switch (maze[row][col]) {
          case 0:
            ctx.fillStyle = 'black';
            break;
          case 1:
            ctx.fillStyle = 'white';
            break;
          case 2:
            player.x = col;
            player.y = row;
            ctx.fillStyle = 'red';
            break;
          case 3:
            ctx.fillStyle = 'green';
            break;
          default:
            break;
        }
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  };

  useEffect(() => {
    let isCancelled = false; // Flag to check if the component is unmounted

    if (code) {
      const moveFunctions = {
        maze_moveForward: () => maze_moveForward(player, setPlayer, maze),
      };

      // Wrap the dynamic code execution in a try-catch block for safety
      try {
        const runCode = new Function('maze_moveForward', code);
        if (!isCancelled) { // Check if the component is still mounted
          runCode(moveFunctions.moveForward);
        }
      } catch (error) {
        console.error('Error executing user code:', error);
      }
    }

    // Cleanup function to set isCancelled to true when the component unmounts
    return () => {
      isCancelled = true;
    };
  }, [code, player, setPlayer]); // Add player and setPlayer to the dependency array

  return <canvas ref={canvasRef} width="400" height="400" />;
}

// eslint-disable-next-line react-refresh/only-export-components
// export { maze_moveForward};  // Exporta las funciones para su uso en otros componentes