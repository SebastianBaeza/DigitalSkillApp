import { useEffect } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { /*save,*/ load } from './serialization';
import './index.css';
import { Container} from '@mui/material';

import { toolboxXML, Blocks } from './Blocks';

// Set up UI elements and inject Blockly

export default function HU01() {
  useEffect(() => {
    const blocklyDiv = document.getElementById('blocklyDiv');

    // Inicializa los bloques y generadores
    Blocks();

    // Configurar elementos de la UI y inyectar Blockly
    const ws = Blockly.inject(blocklyDiv, { toolbox : toolboxXML });

    const codeDiv = document.getElementById('generatedCode').firstChild;
    const outputDiv = document.getElementById('output');
    

    // Función para resetear los divs de código y output, mostrar el código generado y ejecutarlo
    const runCode = () => {
      console.log("Ejecutando código en Workspace:\n",ws);
      const code = javascriptGenerator.workspaceToCode(ws);
      codeDiv.innerText = code; // Comentar esta línea para mostrar el código generado
      outputDiv.innerHTML = '';
      eval(code);
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
      if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING || ws.isDragging()) {
        return;
      }
      runCode();
    });
  }, []);

  return (
    <div id="pageContainer">
      <div id="outputPane">
        <pre id="generatedCode"><code></code></pre>
        <Container id="output"/>
      </div>
      <div id="blocklyDiv"/>
    </div>
  );
}