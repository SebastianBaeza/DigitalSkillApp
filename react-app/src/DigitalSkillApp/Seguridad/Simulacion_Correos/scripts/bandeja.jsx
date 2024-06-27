import { useState } from 'react';
import './Css/correo.css';
import DestacarTexto from './destacar'; // Asegúrate de importar DestacarTexto desde donde esté definido
import downloadIcon from '../assets/download-icon.png'; // Importa la imagen para el botón de descarga
import { Stack } from '@mui/material';

const Bandeja = ({ correos, moveToTrash }) => {
    const [selectedCorreos, setSelectedCorreos] = useState([]);
    const [selectedCorreo, setSelectedCorreo] = useState(null);
    const [highlightedText, setHighlightedText] = useState({}); // Estado para el texto resaltado

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

    const toggleHighlight = () => {
        if (selectedCorreo) {
            const { id, content } = selectedCorreo;
            const selection = window.getSelection();
            const selectedText = selection.toString();

            if (selectedText && content.includes(selectedText)) {
                const startIndex = content.indexOf(selectedText);
                const endIndex = startIndex + selectedText.length;

                setHighlightedText({
                    ...highlightedText,
                    [id]: {text: selectedText,startIndex,endIndex}
                });
            }
        }
    };

    const removeHighlight = () => {
        if (selectedCorreo) {
            const { id } = selectedCorreo;
            const updatedHighlights = { ...highlightedText };
            delete updatedHighlights[id];
            setHighlightedText(updatedHighlights);
        }
    };

    const handleMoveToTrash = () => {
        moveToTrash(selectedCorreos);
        setSelectedCorreos([]);
    };

    const handleDownloadAttachment = (correo) => {
        if (correo.attachment) {
            const { fileName, content } = correo.attachment;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <Stack direction='row' className="pagina">
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
                            {correo.attachment && (
                                <button onClick={() => handleDownloadAttachment(correo)} className="download-button">
                                    <img src={downloadIcon} alt="Descargar" /> {/* Imagen de descarga */}
                                </button>
                            )}
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
                        <div className="contenido-email">
                            <DestacarTexto texto={selectedCorreo.content} />
                            {Object.keys(highlightedText).includes(selectedCorreo.id) && (
                                <div className="highlighted-section">
                                    <h2>Contenido sospechoso</h2>
                                    <p>{highlightedText[selectedCorreo.id].text}</p>
                                    <button onClick={removeHighlight} className="remove-highlight-button">
                                        <img src="goma-icono.png" alt="Borrar resaltado" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <p>Selecciona un correo para leer el contenido</p>
                )}
            </div>
        </Stack>
    );
};

export default Bandeja;
