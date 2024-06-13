import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import './HU8.css';

export default function HU8() {
  const [question, setQuestion] = useState("¿Cuál es la capital de Francia?");
  const [answer, setAnswer] = useState("");

  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Respuesta guardada:", answer);
    // Puedes almacenar la respuesta en una base de datos o en otro lugar
  };

  return (
    <Container sx={{ textAlign: "center", marginTop: "30px" }}>
      <Typography variant="h1" gutterBottom>
        {question}
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <TextField
          variant="outlined"
          fullWidth
          label="Escribe tu respuesta aquí"
          value={answer}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Guardar Respuesta
        </Button>
      </Box>
    </Container>
  );
}
