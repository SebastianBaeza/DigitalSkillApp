import { Container, Typography, Button, TextField } from '@mui/material';
import UsePython from './Python/RunPyCode';
import './index.css';

export default function HU02() {
  const runCode = async (event) => {
    event.preventDefault();
    const outputDiv = document.getElementById('output');
    const codePy = event.target.elements.pythonCode.value; // Obtener el valor del input directamente
    console.log("codigo a enviar:",codePy);
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
      <form onSubmit={runCode}>
        <TextField
          name="pythonCode"
          label="Enter Python Code"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Run Code
        </Button>
      </form>
      <Typography variant="h6">Console:</Typography>
      <Container id="output"></Container>
    </div>
  );
}
