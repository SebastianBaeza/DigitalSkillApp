import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTiempoTranscurrido } from './globalVariables'; // Importa la función para obtener el tiempo transcurrido
import { stopCronometro } from './globalVariables'; // Importa la función para detener el cronómetro

const Basurero = ({ trash, moveToInbox, setEvaluacionTerminada, setCronometroRunning }) => {
    const [selectedCorreos, setSelectedCorreos] = useState([]);
    const [selectedCorreo, setSelectedCorreo] = useState(null);
    const [highlightedText, setHighlightedText] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const handleCheckboxChange = (correo) => {
        setSelectedCorreos(prevState => {
            if (prevState.includes(correo)) {
                return prevState.filter(c => c !== correo);
            } else {
                return [...prevState, correo];
            }
        });
    };

    const toggleHighlight = (correo) => {
        const { id, content } = correo;
        const selection = window.getSelection();
        const selectedText = selection.toString();

        if (selectedText && content.includes(selectedText)) {
            const startIndex = content.indexOf(selectedText);
            const endIndex = startIndex + selectedText.length;

            setHighlightedText({
                ...highlightedText,
                [id]: {
                    text: selectedText,
                    startIndex,
                    endIndex
                }
            });
        }
    };

    const removeHighlight = (correo) => {
        const { id } = correo;
        const updatedHighlights = { ...highlightedText };
        delete updatedHighlights[id];
        setHighlightedText(updatedHighlights);
    };

    const handleMoveToInbox = () => {
        moveToInbox(selectedCorreos);
        setSelectedCorreos([]);
    };

    const handleClickCorreo = (correo) => {
        setSelectedCorreo(correo);
    };

    const handleEvaluate = () => {
        let score = 0;
        if (trash.length > 0) {
            const correctIds = [1, 3];
            const incorrectInTrash = trash.filter(correo => !correctIds.includes(correo.id));
            const correctInTrash = trash.filter(correo => correctIds.includes(correo.id));
            score = (correctInTrash.length * 50) - (incorrectInTrash.length * 25);
            score = Math.max(score, 0);
        }

        // Detener el cronómetro y marcar la evaluación como terminada
        stopCronometro();
        setCronometroRunning(false);
        setEvaluacionTerminada(true);

        // Navegar a la página de test completado con el puntaje
        navigate('/test-completado', { state: { evaluationScore: score } });
    };

    return (
        <div className="recuadro-gris">
            <h1>Basurero</h1>
            {trash.length > 0 ? (
                <ul className="correo-lista">
                    <h4>Haz click en un correo para ver sus contenidos</h4>
                    {trash.map(correo => (
                        <li key={correo.id} className={correo.id === selectedCorreo?.id ? 'selected' : ''}>
                            <input
                                type="checkbox"
                                checked={selectedCorreos.includes(correo)}
                                onChange={() => handleCheckboxChange(correo)}
                            />
                            <span onClick={() => handleClickCorreo(correo)}>{correo.subject}</span>
                            {selectedCorreo && selectedCorreo.id === correo.id && (
                                <div className="correo-content">
                                    <h2>{correo.subject}</h2>
                                    <p>{correo.content}</p>
                                    <div className="highlighted-section">
                                        {/* Aquí puedes agregar la lógica para mostrar el texto resaltado si es necesario */}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay correos en el basurero</p>
            )}
            {selectedCorreos.length > 0 && (
                <button onClick={handleMoveToInbox} className="move-inbox-button">Mover a Bandeja de entrada</button>
            )}
            <button onClick={handleEvaluate} className="evaluate-button">Terminar evaluación</button>
        </div>
    );
};

export default Basurero;
