import React, { Component } from 'react';

class Maze extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      cellSize: 40,
      player: { x: 1, y: 1, direction: 'right' },
    };
    this.maze = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 1, 3, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
  }

  componentDidMount() {
    this.drawMaze();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.player !== this.state.player) {
      this.drawMaze();
    }
  }

  drawMaze = () => {
    const ctx = this.canvasRef.current.getContext('2d');
    for (let row = 0; row < this.maze.length; row++) {
      for (let col = 0; col < this.maze[row].length; col++) {
        switch (this.maze[row][col]) {
            case 0:
              ctx.fillStyle = 'black';
              break;
            case 1:
              ctx.fillStyle = 'white';
              break;
            case 2:
              this.stateplayer.x = col;
              this.stateplayer.y = row;
              ctx.fillStyle = 'red';
              break;
            case 3:
              ctx.fillStyle = 'green';
              break;
            default:
              break;
          }
      }
    }
  };

  render() {return (<canvas ref={this.canvasRef}></canvas>);
  }
}

export default Maze;