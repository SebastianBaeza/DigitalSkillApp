// Evaluar.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Evaluar = ({ trash, highlightedText, evaluationRequested }) => {
    const [evaluationResult, setEvaluationResult] = useState(null);

    const api_key = ""; // Reemplaza con tu API key de OpenAI
    // const model_id = "gpt-4"; // Modelo de OpenAI a utilizar
    const model_id = "gpt-3.5"; // Modelo de OpenAI a utilizar

    useEffect(() => {
        const evaluatePerformance = async () => {
            if (evaluationRequested) {
                let inputText = "";

                trash.forEach(correo => {
                    inputText += `Correo en el basurero: ${correo.content}\n`;
                });

                inputText += "\nTextos destacados por el usuario:\n";
                highlightedText.forEach(text => {
                    inputText += `- ${text}\n`;
                });

                console.log("Input para evaluación:", inputText); // Verificar el input enviado a la API

                try {
                    const response = await axios.post(
                        "https://api.openai.com/v1/chat/completions",
                        {
                            model: model_id,
                            messages: [
                                { role: "user", content: inputText }
                            ],
                            max_tokens: 150,
                            temperature: 0.7,
                            stop: ["\n"]
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${api_key}`
                            }
                        }
                    );

                    console.log("Respuesta de la API de OpenAI:", response.data); // Verificar la respuesta de la API

                    if (response && response.data && response.data.choices && response.data.choices.length > 0) {
                        const chatGPTResponse = response.data.choices[0].message.content;
                        setEvaluationResult(chatGPTResponse);
                    } else {
                        setEvaluationResult("No se pudo obtener una respuesta adecuada del modelo.");
                    }
                } catch (error) {
                    console.error("Error al llamar a la API de OpenAI:", error);
                    setEvaluationResult("Error al evaluar la tarea.");
                }
            } else {
                setEvaluationResult(null); // Resetear el resultado cuando no se solicite evaluación
            }
        };

        evaluatePerformance();
    }, [trash, highlightedText, evaluationRequested]);

    return (
        <div className="evaluation-container">
            <h2>Evaluación del Desempeño</h2>
            <p>Destaca textos en los correos del basurero para evaluar la tarea.</p>
            {evaluationResult ? (
                <div className="evaluation-result">
                    <p>{evaluationResult}</p>
                </div>
            ) : (
                <p>Evaluando...</p>
            )}
        </div>
    );
};

export default Evaluar;
