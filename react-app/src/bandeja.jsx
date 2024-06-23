import React, { useState } from 'react';
import './correo.css';

const Bandeja = ({ correos, moveToTrash }) => {
    const [selectedCorreos, setSelectedCorreos] = useState([]);
    const [selectedCorreo, setSelectedCorreo] = useState(null);

    const handleClick = (correo) => {
        setSelectedCorreo(correo);
    };

    const handleCheckboxChange = (correo) => {
        setSelectedCorreos(prevState => {
            if (prevState.includes(correo)) {
                return prevState.filter(c => c !== correo);
            } else {
                return [...prevState, correo];
            }
        });
    };

    const handleMoveToTrash = () => {
        moveToTrash(selectedCorreos);
        setSelectedCorreos([]);
    };

    return (
        <div className="pagina">
            <div className="bandeja-lista">
                <div className="titulo">Bandeja de entrada</div>
                <ul>
                    {correos.map(correo => (
                        <li key={correo.id} className={correo.id === selectedCorreo?.id ? 'selected' : ''}>
                            <input
                                type="checkbox"
                                checked={selectedCorreos.includes(correo)}
                                onChange={() => handleCheckboxChange(correo)}
                            />
                            <span onClick={() => handleClick(correo)}>{correo.subject}</span>
                        </li>
                    ))}
                </ul>
                {selectedCorreos.length > 0 && (
                    <button onClick={handleMoveToTrash} className="move-trash-button">Mover a Basurero</button>
                )}
            </div>
            <div className="correo-content">
                {selectedCorreo ? (
                    <>
                        <h1>{selectedCorreo.subject}</h1>
                        <p>{selectedCorreo.content}</p>
                    </>
                ) : (
                    <p>Selecciona un correo para leer el contenido</p>
                )}
            </div>
        </div>
    );
};

export default Bandeja;
