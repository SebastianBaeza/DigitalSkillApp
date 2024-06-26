import React, { useState } from 'react';

const DestacarTexto = ({ texto }) => {
    const [highlightedTexts, setHighlightedTexts] = useState([]);

    const toggleHighlight = () => {
        const selection = window.getSelection();
        const selectedText = selection.toString();

        if (selectedText && texto.includes(selectedText)) {
            const startIndex = texto.indexOf(selectedText);
            const endIndex = startIndex + selectedText.length;

            const newHighlight = {
                text: selectedText,
                startIndex,
                endIndex
            };

            setHighlightedTexts([...highlightedTexts, newHighlight]);
        }
    };

    const removeHighlight = (index) => {
        const updatedHighlights = [...highlightedTexts];
        updatedHighlights.splice(index, 1);
        setHighlightedTexts(updatedHighlights);
    };

    const styles = {
        destacarTexto: {
            marginBottom: '20px',
        },
        highlightedSection: {
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
        },
        removeHighlightButton: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginTop: '5px',
        },
        removeHighlightIcon: {
            width: '16px',
            height: '16px',
        },
    };

    return (
        <div style={styles.destacarTexto}>
            <p onMouseUp={toggleHighlight}>
                {texto.split('').map((char, index) => {
                    const isHighlighted = highlightedTexts.some(highlight => (
                        index >= highlight.startIndex && index < highlight.endIndex
                    ));
                    return (
                        <span key={index} style={isHighlighted ? { backgroundColor: '#ff0' } : {}}>
                            {char}
                        </span>
                    );
                })}
            </p>
            {highlightedTexts.length > 0 && (
                <div style={styles.highlightedSection}>
                    <h2>Textos resaltados</h2>
                    {highlightedTexts.map((highlight, index) => (
                        <div key={index}>
                            <p>{highlight.text}</p>
                            <button onClick={() => removeHighlight(index)} style={styles.removeHighlightButton}>
                                <img src="./goma.png" alt="Borrar resaltado" style={styles.removeHighlightIcon} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DestacarTexto;
