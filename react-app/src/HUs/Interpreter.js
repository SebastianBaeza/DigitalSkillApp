
/**
 * Log of Pegman's moves.  Recorded during execution, played back for animation.
 * @type !Array<!Array<string>>
 */
const log = [];

/**
 * Coordenadas de la meta.
 * @param {number} x Coordenada x
 * @param {number} y Coordenada y
 */
const finish = { x: 5, y: 4 };

/**
 * Constants for cardinal directions.  Subsequent code assumes these are in the range 0..3 and that opposites have an absolute difference of 2.
 * @enum {number}
 */
const DirectionType = {UP: 0,RIGHT: 1,DOWN: 2,LEFT: 3,};

/**
 * Inject the Maze API into a JavaScript interpreter.
 * @param {!Interpreter} interpreter The JS-Interpreter.
 * @param {!Interpreter.Object} globalObject Global object.
 */

export function initInterpreter(interpreter, globalObject) {
  // API
  let wrapper;
  wrapper = function(id) {move(0, id);};
  console.log("wrapper: ",wrapper);
  wrap('moveForward');

  wrapper = function(id) {move(2, id);};
  console.log("wrapper: ",wrapper);
  wrap('moveBackward');

  wrapper = function(id) {turn(0, id);};
  wrap('turnLeft');

  wrapper = function(id) {turn(1, id);};
  wrap('turnRight');

  wrapper = function(id) {return isPath(0, id);};
  wrap('isPathForward');

  wrapper = function(id) {return isPath(1, id);};
  wrap('isPathRight');

  wrapper = function(id) {return isPath(2, id);};
  wrap('isPathBackward');

  wrapper = function(id) {return isPath(3, id);};
  wrap('isPathLeft');

  wrapper = function() {return notDone();};
  wrap('notDone');

  function wrap(name) {
    console.log("wrap: ",name);
    interpreter.setProperty(globalObject, name, interpreter.createNativeFunction(wrapper, false));
    console.log("result: ",interpreter);
    console.log("globalObject: ",interpreter.getProperty(name));
    }
}

/**
 * Attempt to move pegman forward
 * @param {number} direction Direction to move forward.
 * @param {string} id ID of block that triggered this action.
 * @param {DirectionType} DIR Direction player is facing. 
 * @throws {true} If the end of the maze is reached.
 * @throws {false} If player collides with a wall.
 */
function move(DIR, id,x,y) {
    if (!isPath(DIR, null)) {
        console.log("fail_" + (DIR ? 'backward' : 'forward'), id);
        throw false;
    }
    // If moving backward, flip the effective direction.
    let command;
    switch (DIR) {
        case DirectionType.UP:
            y--;
            command = 'UP';
            break;
        case DirectionType.RIGHT:
            x++;
            command = 'RIGHT';
            break;
        case DirectionType.DOWN:
            y++;
            command = 'DOWN';
            break;
        case DirectionType.LEFT:
            x--;
            command = 'LEFT';
            break;
    }
    log.push([command, id]);
}
/**
 * Turn pegman left or right.
 * @param {number} direction Direction to turn (0 = left, 1 = right).
 * @param {string} id ID of block that triggered this action.
 */
function turn(direction, id) {
    if (direction) {
    // Right turn (clockwise).
      log.push(['right', id]);
    } else {
    // Left turn (counterclockwise).
      log.push(['left', id]);
    }
}
  
/**
 * Is there a path next to pegman?
 * @param {number} direction Direction to look (0 = forward, 1 = right, 2 = backward, 3 = left).
 * @param {?string} id ID of block that triggered this action. Null if called as a helper function in move().
 * @returns {boolean} True if there is a path.
 */
function isPath(id,DIR,map,x,y) {
  const SquareType = {WALL: 0,OPEN: 1,START: 2,FINISH: 3,};
  // const effectiveDirection = DIR + direction;
  let square, command;
  switch (DIR) {
    case DirectionType.UP:
      square = map[y - 1] && map[y - 1][x];
      command = 'look_UP';
      break;
    case DirectionType.RIGHT:
      square = map[y][x + 1];
      command = 'look_RIGHT';
      break;
    case DirectionType.DOWN:
      square = map[y + 1] && map[y + 1][x];
      command = 'look_DOWN';
      break;
    case DirectionType.LEFT:
      square = map[y][x - 1];
      command = 'look_LEFT';
      break;
  }
  if (id) {
    log.push([command, id]);
  }
  return square !== SquareType.WALL && square !== undefined;
}

/**
 * Is the player at the finish marker?
 * @returns {boolean} True if not done, false if done.
 */
function notDone(x,y) {return x !== finish.x || y !== finish.y;}