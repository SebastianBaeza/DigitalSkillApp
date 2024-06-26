import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTiempoTranscurrido } from './globalVariables'; // Importa la función para obtener el tiempo transcurrido

const TestCompletado = () => {
    const location = useLocation();
    const { evaluationScore } = location.state || { evaluationScore: 0 };
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);

    useEffect(() => {
        // Obtener el tiempo transcurrido una sola vez al montar el componente
        const tiempo = getTiempoTranscurrido();
        setTiempoTranscurrido(tiempo);
    }, []);

    return (
        <div>
            <h1>Test completado</h1>
            <p>Puntaje de evaluación: {evaluationScore}</p>
            <p>Tiempo transcurrido: {tiempoTranscurrido} segundos</p>
        </div>
    );
};

export default TestCompletado;

