import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import './Preguntas.css';

export default function Desarrollo({ competencia, nivelPregunta }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState("");
  const [redirectToNextPage, setRedirectToNextPage] = useState(false);

  const api_key = "";
  const model_id = "gpt-4";

  useEffect(() => {
    generateQuestion();
  }, []);

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
            Crea una pregunta que se pueda utilizar para medir la competencia de una persona en la competencia digital mencionada. La pregunta debe estar estructurada en texto plano, para cubrir el nivel ${nivelPregunta} de la competencia correspondiente, con respuestas proporcionadas de la misma forma. Se deben crear preguntas que hagan pensar al usuario, por tanto, se debe evitar preguntar al usuario la percepcion que tiene de sus propios conocimientos, o preguntas que le permitan elegir entre multiples alternativas. El objetivo es comprobar el conocimiento del usuario, por lo que se requiere que redacte la respuesta basado completamente en sus conocimientos del tema. La pregunta a generar puede tratar temas a lo largo de toda la competencia ${competencia}, por lo que trata de variar el contenido, a fin de siempre probar el conocimiento del usuario.
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
      setQuestion(result.data.choices[0].message.content);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const analyzeAnswer = async () => {
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
          content: `Mi respuesta a la pregunta ${question} es: ${answer}`
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
      top_p: 1.0
    };

//     try {
//       const result = await axios.post("https://api.openai.com/v1/chat/completions", request_data, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${api_key}`
//         }
//       });
//       setResponse(result.data.choices[0].message.content);
//     } catch (error) {
//       console.error("Error en la solicitud:", error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setAnswer(event.target.value);
//   };

//   const handleSubmit = () => {
//     analyzeAnswer();
//   };

//   return (
//     <Container sx={{ textAlign: "center", marginTop: "30px" }}>
//       <Typography variant="h5" gutterBottom>
//         {question}
//       </Typography>
//       <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
//         <TextField
//           variant="outlined"
//           fullWidth
//           label="Escribe tu respuesta aquí"
//           value={answer}
//           onChange={handleInputChange}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//           onClick={handleSubmit}
//         >
//           Guardar Respuesta
//         </Button>
//       </Box>
//       {response && (
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Respuesta del asistente:
//           </Typography>
//           <Typography variant="body1">{response}</Typography>
//         </Box>
//       )}
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ mt: 2 }}
//         href="/"
//       >
//         Volver al inicio
//       </Button>
//     </Container>
//   );
// }
  try {
    const result = await axios.post("https://api.openai.com/v1/chat/completions", request_data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${api_key}`
      }
    });
    const responseContent = result.data.choices[0].message.content;
    setResponse(responseContent);
    downloadResponse(responseContent);
    setRedirectToNextPage(true);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const downloadResponse = (responseContent) => {
    const element = document.createElement("a");
    const file = new Blob([responseContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "response.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    analyzeAnswer();
  };

  useEffect(() => {
    if (redirectToNextPage) {
      // Aquí podrías implementar la lógica de redirección a diferentes páginas según el nivelPregunta
      let nextPageUrl = "";
      switch (competencia){
        case "3-1":
          nextPageUrl = "/DigitalSkillApp/Creacion_Contenido_Digital/" + nivelPregunta + "/Pregunta_Desarrollo/3-2";
          break;
        case "3-2":
          nextPageUrl = "/DigitalSkillApp/Creacion_Contenido_Digital/" + nivelPregunta + "/Pregunta_Desarrollo/3-3";
          break;
        case "3-3":
          nextPageUrl = "/DigitalSkillApp/Creacion_Contenido_Digital/" + nivelPregunta + "/Pregunta_Desarrollo/3-4";
          break;
          case "3-4":
          nextPageUrl = "/DigitalSkillApp/Creacion_Contenido_Digital/" + nivelPregunta + "/Pregunta_Desarrollo/Resultados"; //O otro test, no se
          break;
        case "4-1":
          nextPageUrl = "/DigitalSkillApp/Seguridad/" + nivelPregunta + "/Pregunta_Desarrollo/4-2";
          break;
        case "4-2":
          nextPageUrl = "/DigitalSkillApp/Seguridad/" + nivelPregunta + "/Pregunta_Desarrollo/4-3";
          break;
        case "4-3":
          nextPageUrl = "/DigitalSkillApp/Seguridad/" + nivelPregunta + "/Pregunta_Desarrollo/4-4";
          break;
        case "4-4":
          nextPageUrl = "/DigitalSkillApp/Seguridad/" + nivelPregunta + "/Pregunta_Desarrollo/Resultados";
          break;
        default:
          nextPageUrl = "/";
          break;
      }
      window.location.href = nextPageUrl;
    }
  }, [redirectToNextPage, nivelPregunta]);

  return (
    <Container sx={{ textAlign: "center", marginTop: "30px" }}>
      <Typography variant="h5" gutterBottom>
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