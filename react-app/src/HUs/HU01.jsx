import { useEffect} from 'react';
import * as Blockly from 'blockly';
import { blocks } from './blocks/text';
import { forBlock } from './generators/javascript';
import { javascriptGenerator } from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';
import { save, load } from './serialization';
import { toolbox } from './toolbox';
import './index.css';
import {Container,  Typography } from '@mui/material';

import UsePython from './Python/RunPyCode';



export default function HU01() {
  
  
  useEffect(() => {
    // Registrar los bloques y generadores con Blockly
    Blockly.common.defineBlocks(blocks);
    Object.assign(javascriptGenerator.forBlock, forBlock);

    // Configurar elementos de la UI y inyectar Blockly
    const codeDiv = document.getElementById('generatedCode').firstChild;
    const outputDiv = document.getElementById('output');
    const blocklyDiv = document.getElementById('blocklyDiv');
    const ws = Blockly.inject(blocklyDiv, { toolbox });

    // Función para resetear los divs de código y output, mostrar el código generado y ejecutarlo
    const runCode = async () => {
      // const code = javascriptGenerator.workspaceToCode(ws);
      const codePy = pythonGenerator.workspaceToCode(ws);
      codeDiv.innerText = codePy;
      try {
        const codigo = await UsePython(codePy);
        if (codigo !== undefined) {
          outputDiv.innerHTML = codigo;
        }
      } catch (error) {
        console.error('Error executing Python code:', error);
      }
    };

    // Cargar el estado inicial desde el almacenamiento y ejecutar el código
    load(ws);
    runCode();

    // Guardar los cambios en el almacenamiento cada vez que el workspace cambie de estado
    ws.addChangeListener((e) => {
      if (e.isUiEvent) return;
      save(ws);
    });

    // Ejecutar el código cada vez que el workspace cambie significativamente
    ws.addChangeListener((e) => {
      if (
        e.isUiEvent ||
        e.type == Blockly.Events.FINISHED_LOADING ||
        ws.isDragging()
      ) {
        return;
      }
      runCode();
    });
  }, []);

  return (
    <div id="pageContainer">
      <Container id="outputPane">
        <pre id="generatedCode"><code></code></pre>
        <Typography variant="h6">Console:</Typography>
        <Container id="output" ></Container>
      </Container>
      <div id="blocklyDiv"/>
    </div>
  );
}