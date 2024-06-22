
import * as Blockly from 'blockly';
import {blocks} from './blocks/text';
import {forBlock} from './generators/javascript';
import {javascriptGenerator} from 'blockly/javascript';
import {save, load} from './serialization';
import {toolbox} from './toolbox';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
Object.assign(javascriptGenerator.forBlock, forBlock);

var codeDiv;
var outputDiv;
var ws;

document.addEventListener('DOMContentLoaded', () => {
  // Set up UI elements and inject Blockly
  const gcode = document.getElementById('generatedCode');
  if (!gcode) {
    throw new Error('generatedCode element not found');
  }

  codeDiv = gcode.firstChild;
  if (!codeDiv) {
    throw new Error('FirstChild div not found');
  }
  
  outputDiv = document.getElementById('output');

  ws = Blockly.inject(document.getElementById('blocklyDiv'), {toolbox});
  
});


// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
  const code = javascriptGenerator.workspaceToCode(ws);
  codeDiv.innerText = code;

  outputDiv.innerHTML = '';

  eval(code);
};

// Load the initial state from storage and run the code.
load(ws);
runCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(ws);
});

// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
  // Don't run the code when the workspace finishes loading; we're
  // already running it once when the application starts.
  // Don't run the code during drags; we might have invalid state.
  if (
    e.isUiEvent ||
    e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()
  ) {
    return;
  }
  runCode();
});
