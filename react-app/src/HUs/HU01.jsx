import { useEffect} from 'react';
import * as Blockly from 'blockly';
import { blocks } from './blocks/text';
import { forBlock } from './generators/javascript';
import { javascriptGenerator } from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';
import { save, load } from './serialization';
import { toolbox } from './toolbox';
import './index.css';
import {Container,  Typography,Button } from '@mui/material';

import UsePython from './Python/RunPyCode';



export default function HU01() {

  useEffect(() => {
    // Registrar los bloques y generadores con Blockly
    Blockly.common.defineBlocks(blocks);
    Object.assign(javascriptGenerator.forBlock, forBlock);

    // Configurar elementos de la UI y inyectar Blockly
    const blocklyDiv = document.getElementById('blocklyDiv');
    const ws = Blockly.inject(blocklyDiv, { toolbox });

    ws.getAllBlocks().forEach(block => {
      block.setMovable(false);
      block.setDeletable(false);
    });
    
    // Cargar el estado inicial desde el almacenamiento
    load(ws);

    // Guardar los cambios en el almacenamiento cada vez que el workspace cambie de estado
    ws.addChangeListener((e) => {
      if (e.isUiEvent) return;
      save(ws);
    });
  }, []);

  const runCode = async () => {
    const codeDiv = document.getElementById('generatedCode').firstChild;
    const outputDiv = document.getElementById('output');
    const ws = Blockly.getMainWorkspace();
    let codePy = pythonGenerator.workspaceToCode(ws);
    codePy = codePy + "print(num)";
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

  return (
    <div id="pageContainer">
      <Container id="outputPane">
        <pre id="generatedCode"><code></code></pre>
        <Typography variant="h6">Console:</Typography>
        <Container id="output" ></Container>
        <Button variant="contained" color="primary" onClick={runCode}>Run Code</Button>
      </Container>
      <div id="blocklyDiv"/>
    </div>
  );
}