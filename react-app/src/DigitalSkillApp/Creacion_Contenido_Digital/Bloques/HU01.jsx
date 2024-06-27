import { useEffect,useState} from 'react';
import * as Blockly from 'blockly';
import { blocks } from './blocks/text';
import { forBlock } from './generators/javascript';
import { javascriptGenerator } from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';
// import { save, load } from './serialization';
import { toolbox } from './toolbox';
import './';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Container,  Typography,Button} from '@mui/material';

import UsePython from './Python/RunPyCode';

// Definir el bloque de variable con un número específico en el XML inicial
const xmlText = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="variables_set" x="20" y="20">
    <field name="VAR">num</field>
    <value name="VALUE">
      <block type="math_number">
        <field name="NUM">42</field>
      </block>
    </value>
  </block>
</xml>`
;

export default function HU01() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    // Registrar los bloques y generadores con Blockly
    Blockly.common.defineBlocks(blocks);
    Object.assign(javascriptGenerator.forBlock, forBlock);

    // Configurar elementos de la UI y inyectar Blockly
    const blocklyDiv = document.getElementById('blocklyDiv');
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '>';
    const ws = Blockly.inject(blocklyDiv, { toolbox });

    ws.getAllBlocks().forEach(block => {
      block.setMovable(false);
      block.setDeletable(false);
      block.setEditable(false);
      block.setDisabledReason(false);
    });
    
    // Cargar el estado inicial desde el almacenamiento
    // load(ws);

    try {
      console.log("XML Text",xmlText);
      const xml = Blockly.utils.xml.textToDom(xmlText);
      console.log("Text to Dom",xml);
      Blockly.Xml.domToWorkspace(xml, ws);

      // Bloquear el bloque para que no se pueda mover ni eliminar
      ws.getAllBlocks().forEach(block => {
        block.setMovable(false);
        block.setDeletable(false);
      });
    } catch (error) {
      console.error('Error loading Blockly XML:', error);
    }
    // Guardar los cambios en el almacenamiento cada vez que el workspace cambie de estado
    ws.addChangeListener((e) => {
      if (e.isUiEvent) return;
      // save(ws);
    });
  }, []);

  const runCode = async () => {
    const codeDiv = document.getElementById('generatedCode').firstChild;
    
    const ws = Blockly.getMainWorkspace();
    let codePy = pythonGenerator.workspaceToCode(ws);
    codePy = codePy + "print(num)";
    codeDiv.innerText = codePy;
    try {
      const codigo = await UsePython(codePy);
      if (codigo !== '>') {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = '> '+codigo;
        if (codigo[0] == '14.0') {
          setIsModalOpen(true);
        }
      }
    } catch (error) {
      console.error('Error executing Python code:', error);
    }
  };
  //Función que renderiza el modal
  const renderModal = () => (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <DialogTitle>Felicidades!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          El valor es el correcto!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsModalOpen(false)} href='/' >Seguir</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      {renderModal()}
      <Typography variant="h4" className='Titulo'>Instrucciones: Haz que el numero sea 3 veces menos al original</Typography>
      <div id="pageContainer">
        <Container id="outputPane">
          <pre id="generatedCode">
            <code/>
          </pre>
          <div style={{display:'contents'}}>
            <Typography variant="h6">Console:</Typography>
            <Container id="output"/>
            <Button variant="contained" color="primary" onClick={runCode}>Run Code</Button>
          </div>
        </Container>
        <div id="blocklyDiv"/>
      </div>
    </>
    
  );
}