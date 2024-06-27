import { useState, useEffect } from 'react';
import { getTiempoTranscurrido } from './globalVariables'; // Importa la función para obtener el tiempo transcurrido

function TestCompletado( evaluationScore ) {
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);

    useEffect(() => {
        const fetchTiempoTranscurrido = async () => {
            const tiempo = await getTiempoTranscurrido();
            setTiempoTranscurrido(tiempo);
        };

        fetchTiempoTranscurrido();
    }, []);

    return (
        <div>
            <h1>Test completado</h1>
            <p>Puntaje de evaluación: {evaluationScore}</p>
            <p>Tiempo transcurrido: {tiempoTranscurrido} segundos</p>
        </div>
    );
}

export default TestCompletado;
