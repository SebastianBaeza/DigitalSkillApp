import { useState } from 'react';
import { Button } from '@mui/material'; // Import Material-UI components
import { stopCronometro } from './globalVariables'; // Import the function to stop the timer

const Basurero = ({ trash, moveToInbox, setCronometroRunning }) => { // Destructure props
    const [selectedCorreos, setSelectedCorreos] = useState([]);
    const [selectedCorreo, setSelectedCorreo] = useState(null);
    const [score, setScore] = useState(0);

    const handleCheckboxChange = (correo) => {
        setSelectedCorreos(prevState => {
            if (prevState.includes(correo)) {
                return prevState.filter(c => c !== correo);
            } else {
                return [...prevState, correo];
            }
        });
    };

    const handleClickCorreo = (correo) => {
        setSelectedCorreo(correo);
    };

    const handleMoveToInbox = () => {
        moveToInbox(selectedCorreos);
        setSelectedCorreos([]);
    };

    const handleEvaluate = () => {
        if (trash.length > 0) {
            const correctIds = [1, 3]; // IDs of correct emails
            const incorrectInTrash = trash.filter(correo => !correctIds.includes(correo.id));
            const correctInTrash = trash.filter(correo => correctIds.includes(correo.id));
            const calculatedScore = Math.max((correctInTrash.length * 50) - (incorrectInTrash.length * 25), 0);
            console.log('Score:', calculatedScore);
            setScore(calculatedScore); // or send it to the database
            let uwu=parseInt(sessionStorage.getItem("resultado"),10);
            sessionStorage.setItem("resultado", (score*0.1667)+uwu);
            window.location.href="/DigitalSkillApp/Creacion_Contenido_Digital/Basico/Pregunta_Desarrollo/4-2"; //redirigir a la página principal

        }

        // Stop the timer and mark evaluation as finished
        stopCronometro();
        setCronometroRunning(false);
    };

    return (
        <div className="recuadro-gris">
            <h1>Basurero</h1>
            {trash.length > 0 ? (
                <ul className="correo-lista">
                    <h4>Haz click en un correo para ver sus contenidos</h4>
                    {trash.map(correo => (
                        <li key={correo.id} className={correo.id === selectedCorreo?.id ? 'selected' : ''}>
                            <input type="checkbox" checked={selectedCorreos.includes(correo)} onChange={() => handleCheckboxChange(correo)}/>
                            <span onClick={() => handleClickCorreo(correo)}>{correo.subject}</span>
                            {selectedCorreo && selectedCorreo.id === correo.id && (
                                <div className="correo-content">
                                    <h2>{correo.subject}</h2>
                                    <p>{correo.content}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay correos en el basurero</p>
            )}
            {selectedCorreos.length > 0 && (
                <Button onClick={handleMoveToInbox} variant="contained" color="primary" className="move-inbox-button">Mover a Bandeja de entrada</Button>
            )}
            <Button onClick={handleEvaluate} variant="contained" color="secondary" className="evaluate-button">Terminar evaluación</Button>
        </div>
    );
};

export default Basurero;
