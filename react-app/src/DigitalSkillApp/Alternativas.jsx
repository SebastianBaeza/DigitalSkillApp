import { useState, useEffect} from 'react';
import { Container, Typography, FormControlLabel, RadioGroup, Radio, Checkbox, Button, Box } from '@mui/material';
import axios from 'axios';
import './Preguntas.css';

export default function Alternativas({ num, competencia, nivelPregunta }) {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [response, setResponse] = useState("");
  const [redirectToNextPage, setRedirectToNextPage] = useState(false);

  const api_key = ""; //Soy una api key
  // const model_id = "gpt-4";
  const model_id = "gpt-3.5-turbo";

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
            Crea una pregunta que se pueda utilizar para medir la competencia de una persona en el eje mencionado. La pregunta debe estar estructurada en texto plano, para cubrir el nivel ${nivelPregunta} de la competencia correspondiente, con respuestas proporcionadas de la misma forma. Se deben crear preguntas que hagan pensar al usuario, por tanto, se debe evitar preguntar al usuario la percepción que tiene de sus propios conocimientos, o de la competencia en si misma. Las preguntas deben dar contexto real al usuario, pues el usuario no conoce ni entiende todos los detalles de la competencia, por eso prueba sus conocimientos. Las preguntas deben permitir al usuario elegir entre 5 alternativas, de las cuales al menos una respuesta debe ser correcta, aunque múltiples tambien pueden serlo. Las preguntas que tienen una sola respuesta deben empezar por "Pregunta:". Las preguntas que tienen múltiples respuestas deben empezar por "Multiple:". El objetivo es comprobar el conocimiento del usuario, por lo que se requiere que las preguntas no den pistas, para que el usuario se base completamente en sus conocimientos del tema. La pregunta a generar puede tratar temas a lo largo de toda la competencia ${competencia}, por lo que trata de variar el contenido, a fin de siempre probar el conocimiento del usuario.
            Crea una pregunta que se pueda utilizar para medir la competencia de una persona en el eje mencionado. La pregunta debe estar estructurada en texto plano, para cubrir el nivel ${nivelPregunta} de la competencia correspondiente, con respuestas proporcionadas de la misma forma. Se deben crear preguntas que hagan pensar al usuario, por tanto, se debe evitar preguntar al usuario la percepción que tiene de sus propios conocimientos, o de la competencia en si misma. Las preguntas deben dar contexto real al usuario, pues el usuario no conoce ni entiende todos los detalles de la competencia, por eso prueba sus conocimientos. Las preguntas deben permitir al usuario elegir entre 5 alternativas, de las cuales al menos una respuesta debe ser correcta, aunque múltiples tambien pueden serlo. Las preguntas que tienen una sola respuesta deben empezar por "Pregunta:". Las preguntas que tienen múltiples respuestas deben empezar por "Multiple:". El objetivo es comprobar el conocimiento del usuario, por lo que se requiere que las preguntas no den pistas, para que el usuario se base completamente en sus conocimientos del tema. La pregunta a generar puede tratar temas a lo largo de toda la competencia ${competencia}, por lo que trata de variar el contenido, a fin de siempre probar el conocimiento del usuario.
          `
        }
      ],
      max_tokens: 250,
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
      console.log(content);
      const lines = content.split("\n").filter(line => line.trim() !== "");

      const isMultiple = lines[0].toLowerCase().startsWith("multiple:");
      // const pregunta = isMultiple ? lines[0].replace(/^multiple:\s*/i, '') : lines[0].replace(/^pregunta:\s*/i, '');
      const pregunta = lines[1];
      const opciones = lines.slice(2, 7);

      setCurrentQuestion({ pregunta, opciones, multiple: isMultiple });
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
            Análisis de respuesta
            Ante una pregunta entregada, evaluar (según tus propios conocimientos y el marco de competencias) el grado de exito del usuario para el nivel ${nivelPregunta}, clasificandolo con 2 puntajes distintos (y solo responde con el numero del puntaje correspondiente): 0 (Fracaso, es decir, que no entiende la competencia a evaluar) y 100 (llega al estado 2 del nivel ${nivelPregunta} de la competencia correspondiente) según el logro de la respuesta para el nivel correspondiente de la pregunta.
          `
        },
        {
          role: "user",
          content: `Mi respuesta a la pregunta "${currentQuestion.pregunta}" es: ${selectedOptions.join(", ")}`
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
      const responseContent = result.data.choices[0].message.content;
      setResponse(responseContent);
      saveResult(responseContent);
      setRedirectToNextPage(true);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const saveResult = (responseContent) => {
    console.log(responseContent);
    let resultado = parseInt(responseContent,10);
    console.log("Resultado: " + resultado);
    console.log("Session Storage: " + sessionStorage.getItem("resultado"));
    let uwu;
    if (num[0] == "3"){
      uwu=parseInt(sessionStorage.getItem("resultado3"),10);
      sessionStorage.setItem("resultado3", (isNaN(resultado)?uwu:(resultado*0.05)+uwu));
    } else if (num[0] == "4"){
      uwu=parseInt(sessionStorage.getItem("resultado4"),10);
      sessionStorage.setItem("resultado4", (isNaN(resultado)?uwu:(resultado*0.06667)+uwu));
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

  useEffect(() => {
    if (redirectToNextPage) {
      let nextPageUrl = "";
      switch (num) {
        case "3-1":
          nextPageUrl = "/DigitalSkillApp/Creacion_Contenido_Digital/" + nivelPregunta + "/Pregunta_Desarrollo/3-1";
          break;
        case "3-2":
          nextPageUrl = "/DigitalSkillApp/Creacion_Contenido_Digital/" + nivelPregunta + "/Pregunta_Desarrollo/3-2";
          break;
        case "3-3":
          nextPageUrl = "/DigitalSkillApp/Creacion_Contenido_Digital/" + nivelPregunta + "/Pregunta_Desarrollo/3-3";
          break;
        case "3-4":
          nextPageUrl = "/DigitalSkillApp/Creacion_Contenido_Digital/Bloques";
          break;
        case "4-1":
          nextPageUrl = "/DigitalSkillApp/Seguridad/" + nivelPregunta + "/Pregunta_Desarrollo/4-1";
          break;
        case "4-3":
          nextPageUrl = "/DigitalSkillApp/Seguridad/" + nivelPregunta + "/Pregunta_Desarrollo/4-3";
          break;
        case "4-4":
          nextPageUrl = "/DigitalSkillApp/Seguridad/" + nivelPregunta + "/Pregunta_Desarrollo/4-4";
          break;
        default:
          nextPageUrl = "/";
          break;
      }
      window.location.href = nextPageUrl;
    }
  }, [redirectToNextPage, nivelPregunta, num]);

  return (
    <Container sx={{ textAlign: "center", marginTop: "30px" }}>
      <Typography variant="h5" gutterBottom>{currentQuestion.pregunta}</Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        {currentQuestion.multiple ? (
          currentQuestion.opciones?.map((option, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox checked={selectedOptions.includes(option)} onChange={handleOptionChange} value={option}/>}
              label={option}
            />
          ))
        ) : (
          <RadioGroup value={selectedOptions[0] || ''} onChange={handleOptionChange}>
            {currentQuestion.opciones?.map((option, index) => (<FormControlLabel key={index} value={option} control={<Radio />} label={option} />))}
          </RadioGroup>
        )}
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>Guardar Respuesta</Button>
      </Box>
      <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/">Volver al inicio</Button>
    </Container>
  );
}
