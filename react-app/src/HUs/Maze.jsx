/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// src/components/Maze.js
import { useEffect, useRef, useState } from 'react';

// const finish = { x: 5, y: 4 };
/**
 * Constants for cardinal directions.  Subsequent code assumes these are in the range 0..3 and that opposites have an absolute difference of 2.
 * @enum {number}
 */
const DirectionType = {UP: 0,RIGTH: 1,DOWN: 2,LEFT: 3,};

const maze = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 3, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

export default function Maze( ) {
  const canvasRef = useRef(null);
  const cellSize = 40;
  const [player, setPlayer] = useState({ x: 0, y: 0, direction: DirectionType.RIGHT });

  useEffect(() => { drawMaze(); }, [player]);

  const drawMaze = () => {
    const ctx = canvasRef.current.getContext('2d');
    for (let row = 0; row < maze.length; row++) {
      for (let col = 0; col < maze[row].length; col++) {
        switch (maze[row][col]) {
          case 1:
            ctx.fillStyle = 'white';
            break;
          case 2:
            setPlayer({ x: col, y: row, direction: DirectionType.RIGHT });
            ctx.fillStyle = 'red';
            break;
          case 3:
            ctx.fillStyle = 'green';
            break;
          default:
            ctx.fillStyle = 'black';
            break;
        }
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  };

  return <canvas ref={canvasRef} width="400" height="400" />;
}