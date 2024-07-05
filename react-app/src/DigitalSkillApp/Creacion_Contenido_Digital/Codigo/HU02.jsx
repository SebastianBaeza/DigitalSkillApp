import { Container, Typography, Button, TextField,Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Stack } from '@mui/material';
import UsePython from './Python/RunPyCode';
import './index.css';
import { useState } from 'react';
import agregarDocumento from '/src/POST.js';

export default function HU02() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addDocument = async () => {
    const resultado = await agregarDocumento(sessionStorage.getItem('resultado3'), "3");
    console.log(resultado);
    return;
  }

  const runCode = async (event) => {
    event.preventDefault();
    const codePy = event.target.elements.pythonCode.value; // Obtener el valor del input directamente
    console.log("codigo a enviar:",codePy);
    try {
      const codigo = await UsePython(codePy);
      console.log(codigo);
      if (codigo !== '>') {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = '> '+(codigo===null?'':codigo);
        if (codigo[0] == 'Hola Mundo!') {
          let uwu = parseInt(sessionStorage.getItem("resultado3"),10);
          sessionStorage.setItem("resultado3", uwu+12.5);
          console.log(sessionStorage.getItem("resultado3"));
          addDocument();
          
        }
      }
    } catch (error) {
      console.error('Error executing Python code:', error);
    }
  }
  //Función que renderiza el modal
  const renderModal = () => (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <DialogTitle>Felicidades!</DialogTitle>
      <DialogContent><DialogContentText>El valor es el correcto!</DialogContentText></DialogContent>
      <DialogActions><Button onClick={() => setIsModalOpen(false)} href='/DigitalSkillApp/Creacion_Contenido_Digital/Resultados' >Seguir</Button></DialogActions>
    </Dialog>
  );

  return (
    <div className='CodePage'>
      {renderModal()}
      <Typography variant="h4" className='Titulo' >Instrucciones: Imprime "Hola Mundo!"</Typography>
      <Stack direction={'row-reverse'} id="pageContainer">
        <Container id="blocklyDiv">
          <Typography variant="h6">Input:</Typography>
          <form onSubmit={runCode}>
            <TextField name="pythonCode" label="Introduce Codigo de Python" multiline rows={4} variant="outlined" fullWidth margin="normal"/>
            <Button variant="contained" color="primary" type="submit">Run Code</Button>
          </form>
        </Container>
          <Container className='outputPane'>
            <Typography variant="h6">Console:</Typography>
            <Container id="output">{'>'}</Container>
          </Container>
      </Stack>
    </div>
    
  );
}
