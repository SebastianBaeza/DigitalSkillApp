import { useEffect } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { /*save,*/ load } from './serialization';
import './index.css';
import Interpreter from 'js-interpreter';
import {initInterpreter} from './Interpreter.js';

import { toolboxXML, Blocks } from './Blocks.js';
// import Maze from './Maze.jsx';

export default function HU01() {
  useEffect(() => {
    const blocklyDiv = document.getElementById('blocklyDiv');
    // Registrar los bloques y generadores con Blockly
    Blocks();

    // Configurar elementos de la UI y inyectar Blockly
    
    const codeDiv = document.getElementById('generatedCode').firstChild;
    const outputDiv = document.getElementById('output');
    const ws = Blockly.inject(blocklyDiv, { toolbox : toolboxXML, trashcan: true});
    javascriptGenerator.addReservedWords('moveForward,moveBackward,turnRight,turnLeft,isPathForward,isPathRight,isPathBackward,isPathLeft');

    // Función para resetear los divs de código y output, mostrar el código generado y ejecutarlo
    const runCode = () => {

      const code = getCode(ws);
      console.log("Codigo generado:\n",code)
      const code1 = javascriptGenerator.workspaceToCode(ws);
      console.log("Codigo generado 1:\n",code1)
      const interpreter = new Interpreter(code1, initInterpreter);
    
    
      codeDiv.innerText = code;

      outputDiv.innerHTML = '';

      eval(code1);
    };

    // Cargar el estado inicial desde el almacenamiento y ejecutar el código
    load(ws);
    runCode();

    // Guardar los cambios en el almacenamiento cada vez que el workspace cambie de estado
    ws.addChangeListener((e) => {
      if (e.isUiEvent) return;
      // save(ws);
    });

    // Ejecutar el código cada vez que el workspace cambie significativamente
    ws.addChangeListener((e) => {
      if (
        e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING || ws.isDragging()
      ) {
        return;
      }
      runCode();
    });
  }, []);

  return (
    <div id="pageContainer">
      <div id="outputPane">
        {/* <Maze/> */}
        <pre id="generatedCode"><code></code></pre>
        <div id="output"></div>
      </div>
      <div id="blocklyDiv" style={{ height: '480px', width: '600px' }}></div>
    </div>
  );
}

/**
 * Get the user's code (XML or JS) from the editor (Blockly or ACE).
 * @returns {string} XML or JS code.
 */
function getCode (ws) {
  let text;
    // Blockly editor.
    const xml = Blockly.Xml.workspaceToDom(ws, true);
    // Remove x/y coordinates from XML if there's only one block stack. There's no reason to store this, removing it helps with anonymity.
    if (ws.getTopBlocks(false).length === 1 && xml.querySelector) {
      const block = xml.querySelector('block');
      if (block) {
        block.removeAttribute('x');
        block.removeAttribute('y');
      }
    }
    text = Blockly.Xml.domToText(xml);
  
  return text;
}
// import { useEffect } from 'react';
// import * as Blockly from 'blockly';
// import { javascriptGenerator } from 'blockly/javascript';
// import { /*save,*/ load } from './serialization';
// import './index.css';
// import {Container} from '@mui/material';
// import Interpreter from 'js-interpreter';
// import {initInterpreter} from './Interpreter.js';



// import { toolboxXML, Blocks } from './Blocks';

// // Set up UI elements and inject Blockly

// export default function HU01() {
//   Blocks();
//   useEffect(() => {
//     const blocklyDiv = document.getElementById('blockly');

//     // Inicializa los bloques y generadores
//     // Blocks();
    

//     // Configurar elementos de la UI y inyectar Blockly
//     const ws = Blockly.inject(blocklyDiv, { toolbox : toolboxXML });
//     console.log("Workspace inicializado:\n",ws);

//     const codeDiv = document.getElementById('generatedCode').firstChild;
//     const outputDiv = document.getElementById('output');
    

//     // Función para resetear los divs de código y output, mostrar el código generado y ejecutarlo
//     const runCode = () => {
//       console.log("Workspace cambio o se genero:\n",ws);
//       const code = javascriptGenerator.workspaceToCode(ws);
//       console.log("Codigo generado:\n",code);
//       const interpreter = new Interpreter(code, initInterpreter);
//       console.log("Interpretador Generado:\n",interpreter);
//       codeDiv.innerText = code; // Comentar esta línea para mostrar el código generado
//       if (code!='') {
//         outputDiv.innerHTML = '';
//         eval(code);
//       }
//     };

//     // Cargar el estado inicial desde el almacenamiento y ejecutar el código
//     load(ws);
//     runCode();

//     // Guardar los cambios en el almacenamiento cada vez que el workspace cambie de estado
//     ws.addChangeListener((e) => {
//       if (e.isUiEvent) return;
//       // save(ws);
//     });

//     // Ejecutar el código cada vez que el workspace cambie significativamente
//     ws.addChangeListener((e) => {
//       if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING || ws.isDragging()) {
//         return;
//       }
//       runCode();
//     });
//   }, []);

//   return (
//     <div id="pageContainer">
//       <Container id="outputPane">
//         <pre id="generatedCode"><code></code></pre>
//         <Container id="output"/>
//       </Container>
//       <div id="blockly"/>
//     </div>
//   );
// }