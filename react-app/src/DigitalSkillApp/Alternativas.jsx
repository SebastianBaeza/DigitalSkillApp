import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControlLabel, RadioGroup, Radio, Checkbox, Button, Box } from '@mui/material';
import axios from 'axios';
import './Preguntas.css';

export default function HU8({ competencia, nivelPregunta }) {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [response, setResponse] = useState("");

  const api_key = "";
  const model_id = "gpt-4";

  useEffect(() => {
    generateQuestion();
  }, [competencia, nivelPregunta]);

  const generateQuestion = async () => {
    const request_data = {
      model: model_id,
      messages: [
        {
          role: "system",
          content: `
            Contexto:
            Estás evaluando la competencia digital del usuario, basado en el modelo de competencia digital para la ciudadanía DigComp 2.2. Eres un experto en el tema, en especifico en la competencia ${competencia}. Se requiere que generes preguntas o valides la correctitud de las respuestas según corresponda al caso.
            Prompt:
            Pregunta para Medir la Competencia
            Crea una pregunta que se pueda utilizar para medir la competencia de una persona en la competencia digital mencionada. La pregunta debe estar estructurada en texto plano, para cubrir el nivel ${nivelPregunta} de la competencia correspondiente, con respuestas proporcionadas de la misma forma. Se deben crear preguntas que hagan pensar al usuario, por tanto, se debe evitar preguntar al usuario la percepcion que tiene de sus propios conocimientos. Las preguntas deben permitir al usuario elegir entre 5 alternativas, de las cuales una o multiples pueden ser correctas. El objetivo es comprobar el conocimiento del usuario, por lo que se requiere que las preguntas no den pistas, sino que las respuestas requieran que se base completamente en sus conocimientos del tema. La pregunta a generar puede tratar temas a lo largo de toda la competencia ${competencia}, por lo que trata de variar el contenido, a fin de siempre probar el conocimiento del usuario.
          `
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
      top_p: 1.0
    };

    try {
      const result = await axios.post("https://api.openai.com/v1/chat/completions", request_data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${api_key}`
        }
      });
      const content = result.data.choices[0].message.content;
      const lines = content.split("\n").filter(line => line.trim() !== "");
      const pregunta = lines[0];
      const opciones = lines.slice(1, 6);
      const multiple = opciones.some(option => option.toLowerCase().includes("multiple: true"));
      
      setCurrentQuestion({ pregunta, opciones, multiple });
      setSelectedOptions([]);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const verifyAnswer = async () => {
    const request_data = {
      model: model_id,
      messages: [
        {
          role: "system",
          content: `
            Contexto:
            Estás evaluando la competencia digital del usuario, basado en el modelo de competencia digital para la ciudadanía DigComp 2.2. Eres un experto en el tema, en especifico en la competencia ${competencia}. Se requiere que generes preguntas o valides la correctitud de las respuestas según corresponda al caso.
            Prompt:
            Analisis de respuesta
            Ante una pregunta entregada, evaluar (según tus propios conocimientos y el marco de competencias) el grado de exito del usuario para el nivel ${nivelPregunta}, ubicandolo en 3 estados distintos: Fracaso, o grado 1 o 2 según el logro de la respuesta para el nivel correspondiente de la pregunta.
          `
        },
        {
          role: "user",
          content: `Mi respuesta a la pregunta ${currentQuestion} es: ${selectedOptions.join(", ")}`
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
      top_p: 1.0
    };

    try {
      const result = await axios.post("https://api.openai.com/v1/chat/completions", request_data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${api_key}`
        }
      });
      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
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
    verifyAnswer();
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
      {response && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Respuesta del asistente:
          </Typography>
          <Typography variant="body1">{response}</Typography>
        </Box>
      )}
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
