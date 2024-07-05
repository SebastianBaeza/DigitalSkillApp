import { useState, useEffect} from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import agregarDocumento from "../POST"
import './Preguntas.css';

export default function Desarrollo({ num, competencia, nivelPregunta }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState("");
  const [redirectToNextPage, setRedirectToNextPage] = useState(false);

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
            Estás evaluando la competencia digital del usuario, basado en el modelo de competencia digital para la ciudadanía DigComp 2.2. 
            Eres un experto en el tema, en especifico en la competencia ${competencia}. 
            Se requiere que generes preguntas según requerido.
            Prompt:
            Crea una pregunta que se pueda utilizar para medir la competencia de una persona en la competencia digital mencionada. 
            La pregunta debe estar estructurada en texto plano, para cubrir el nivel ${nivelPregunta} de la competencia correspondiente, con respuestas proporcionadas de la misma forma. 
            No debes entregar la respuesta a la pregunta, pues se requiere que el usuario responda sin ayuda. 
            Se deben crear preguntas que hagan pensar al usuario, por tanto, se debe evitar preguntar al usuario la percepcion que tiene de sus propios conocimientos, o preguntas que le permitan elegir entre multiples alternativas. 
            El objetivo es comprobar el conocimiento del usuario, por lo que se requiere que redacte la respuesta basado completamente en sus conocimientos del tema. 
            La pregunta a generar puede tratar temas a lo largo de toda la competencia ${competencia}, por lo que trata de variar el contenido, a fin de siempre probar el conocimiento del usuario.
            Lo que entregues debe seguir el siguiente formato: "<pregunta_aqui>", sin las comillas.
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
      console.log(result);
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
            Estás evaluando la competencia digital del usuario, basado en el modelo de competencia digital para la ciudadanía DigComp 2.2. Eres un experto en el tema, en especifico en la competencia ${competencia}.
            Se requiere que valides la correctitud de las respuestas según corresponda al caso.
            Prompt:
            Analisis de respuesta
            Ante una pregunta entregada, evaluar (según tus propios conocimientos y el marco de competencias) el grado de exito del usuario para el nivel ${nivelPregunta}, clasificandolo con puntajes distintos (y solo responde con el numero del puntaje correspondiente) entre los siguientes numeros: 0 (Fracaso, es decir, que no entiende la competencia a evaluar) y 100 (llega al estado 2 del nivel ${nivelPregunta} de la competencia correspondiente) según el logro de la respuesta para el nivel correspondiente de la pregunta.
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
    if (num == "4-4"){
      const enviarDocumento = async () => {
        const resultado = agregarDocumento(sessionStorage.getItem("resultado4"),4)
        console.log(resultado);
      };
    }
    setRedirectToNextPage(true);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const saveResult = (responseContent) => {
    console.log(responseContent);
    let resultado = parseInt(responseContent,10);
    console.log("Resultado: " + resultado);
    let uwu;
    if (num[0] == "3"){
      uwu=parseInt(sessionStorage.getItem("resultado3"),10);
      sessionStorage.setItem("resultado3", (isNaN(resultado)?uwu:(resultado*0.1)+uwu));
    } else if (num[0] == "4"){
      uwu=parseInt(sessionStorage.getItem("resultado4"),10);
      sessionStorage.setItem("resultado4", (isNaN(resultado)?uwu:(resultado*0.075)+uwu));
    }
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
      switch (num){
        case "3-1":
          nextPageUrl = "/Creacion_Contenido_Digital/Simulador_Powerpoint";
          nextPageUrl = "/Creacion_Contenido_Digital/Simulador_Powerpoint";
          break;
        case "3-2":
          nextPageUrl = "/Creacion_Contenido_Digital/" + nivelPregunta + "/Pregunta_Alternativas/3-3";
          break;
        case "3-3":
          nextPageUrl = "/Creacion_Contenido_Digital/Simulador_CC";
          break;
        // case "3-4":
        //   nextPageUrl = "/Creacion_Contenido_Digital/" + nivelPregunta + "/Pregunta_Desarrollo/Resultados"; //O otro test, no se
        //   break;
        case "4-1":
          nextPageUrl = "/Seguridad/Simulador_Web";
          break;
        case "4-2":
          nextPageUrl = "/Seguridad/" + nivelPregunta + "/Pregunta_Alternativas/4-3";
          break;
        case "4-3":
          nextPageUrl = "/Seguridad/Simulador_Ergonomia";
          break;
        case "4-4":
          nextPageUrl = "/";    
          break;
        default:
          nextPageUrl = "/";
          break;
      }
      window.location.assign(nextPageUrl);
    }
  }, [redirectToNextPage, nivelPregunta, num]);

  return (
    <Container sx={{ textAlign: "center", marginTop: "30px" }}>
      <Typography variant="h5" gutterBottom>{question}</Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <TextField variant="outlined" fullWidth label="Escribe tu respuesta aquí" value={answer} onChange={handleInputChange}/>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>Guardar Respuesta</Button>
      </Box>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}href="/">Volver al inicio</Button>
    </Container>
  );
}