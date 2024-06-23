import React, { useState } from 'react';
import "./correo.css";

const Basurero = ({ trash, moveToInbox }) => {
    const [selectedCorreos, setSelectedCorreos] = useState([]);

    const handleCheckboxChange = (correo) => {
        setSelectedCorreos(prevState => {
            if (prevState.includes(correo)) {
                return prevState.filter(c => c !== correo);
            } else {
                return [...prevState, correo];
            }
        });
    };

    const handleMoveToInbox = () => {
        moveToInbox(selectedCorreos);
        setSelectedCorreos([]);
    };

    return (
        <div className="recuadro-gris">
            <h1>Basurero</h1>
            {trash.length > 0 ? (
                <ul>
                    {trash.map(correo => (
                        <li key={correo.id}>
                            <input
                                type="checkbox"
                                checked={selectedCorreos.includes(correo)}
                                onChange={() => handleCheckboxChange(correo)}
                            />
                            <span>{correo.subject}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay correos en el basurero</p>
            )}
            {selectedCorreos.length > 0 && (
                <button onClick={handleMoveToInbox} className="move-inbox-button">Mover a Bandeja de entrada</button>
            )}
        </div>
    );
};

export default Basurero;
