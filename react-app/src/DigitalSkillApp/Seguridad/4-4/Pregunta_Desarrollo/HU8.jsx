import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import './HU8.css';

export default function HU8() {
  const preguntas = [
    '¿Cuál es la capital de Francia?',
    '¿Cuánto son 2 + 2?',
    '¿Los fideos se parten o no?',
    '¿Queso rallado a gusto?',
  ];

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    handleQuestionDisplay();
  }, []);

  const handleQuestionDisplay = () => {
    const randomNumber = Math.floor(Math.random() * preguntas.length);
    setQuestion(preguntas[randomNumber]);
  };

  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Respuesta guardada:", answer);
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
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        href="/"
      >
        Volver al inicio
      </Button>
    </Container>
  );
}
