import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, FormControlLabel, RadioGroup, Radio, Checkbox, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './HU9.css';

export default function HU8() {
  const preguntas = [
    {
      pregunta: '¿Cuál es la capital de Francia?',
      opciones: ['París', 'Madrid', 'Berlín', 'Roma', 'Lisboa'],
      multiple: false
    },
    {
      pregunta: '¿Cuánto son 2 + 2?',
      opciones: ['3', '4', '5', '6', '7'],
      multiple: false
    },
    {
      pregunta: '¿Los fideos se parten o no?',
      opciones: ['Sí', 'No'],
      multiple: false
    },
    {
      pregunta: 'Selecciona tus frutas favoritas:',
      opciones: ['Manzana', 'Banana', 'Naranja', 'Pera', 'Uva'],
      multiple: true
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleQuestionDisplay();
  }, []);

  const handleQuestionDisplay = () => {
    const randomNumber = Math.floor(Math.random() * preguntas.length);
    setCurrentQuestion(preguntas[randomNumber]);
    setSelectedOptions([]);
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    if (currentQuestion.multiple) {
      if (selectedOptions.includes(value)) {
        setSelectedOptions(selectedOptions.filter(option => option !== value));
      } else {
        setSelectedOptions([...selectedOptions, value]);
      }
    } else {
      setSelectedOptions([value]);
    }
  };

  const handleSubmit = () => {
    console.log("Respuesta guardada:", selectedOptions);
    // Puedes almacenar la respuesta en una base de datos o en otro lugar
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container sx={{ textAlign: "center", marginTop: "30px" }}>
      <Typography variant="h1" gutterBottom>
        {currentQuestion.pregunta}
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        {currentQuestion.multiple ? (
          currentQuestion.opciones?.map((option, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedOptions.includes(option)}
                  onChange={handleOptionChange}
                  value={option}
                />
              }
              label={option}
            />
          ))
        ) : (
          <RadioGroup value={selectedOptions[0] || ''} onChange={handleOptionChange}>
            {currentQuestion.opciones?.map((option, index) => (
              <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        )}
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
        onClick={handleBackToHome}
      >
        Volver al inicio
      </Button>
    </Container>
  );
}
