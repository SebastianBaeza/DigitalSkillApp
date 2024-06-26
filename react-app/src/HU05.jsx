import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Title } from "./assets/HUs/HU05/Title";
import { PptToolbar } from "./assets/HUs/HU05/PptToolbar";
import { PptSidebar } from "./assets/HUs/HU05/PptSidebar";
import { PptEditor } from "./assets/HUs/HU05/PptEditor";
import { PptSecondaryMenu } from "./assets/HUs/HU05/PptSecondaryMenu";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import './assets/HUs/HU05/styles/HU05.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function HU05 () {
    const [open, setOpen] = useState(false);
    const [instruction, setInstruction] = useState(true);
    const [showCounter, setShowCounter] = useState(true);
    const [counter, setCounter] = useState(0);
    const [isApproved, setIsApproved] = useState(null);


    useEffect(() => {
        let timer = null;
        if (showCounter) {
          timer = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);
          }, 1000); // Avanza el contador cada segundo
        } else {
          clearInterval(timer); // Detiene el contador si showCounter es false
        }
    
        return () => {
          clearInterval(timer); // Limpia el intervalo al desmontar el componente
        };
    }, [showCounter]);

    const handleInstructionClose = () => setInstruction(false);

    const handleInstructionOpen = () => setInstruction(true);

    const handleClose = () => setOpen(false);

    const [slides, setSlides] = useState([
        { id: 1,
            content: [] 
        }
    ]);
    
    const [currentSlide, setCurrentSlide] = useState(slides[0]);
    const [currentContent, setCurrentContent] = useState('');

    const [menuOption, setMenuOption] = useState('inicio');
    
    const addSlide = () => {
        const newSlide = {
          id: slides.length + 1,
          content: []
        };
        setSlides([...slides, newSlide]);
        setCurrentSlide(newSlide);
    };

    const addText = () => {
        const newText = {
            id: currentSlide.content.length + 1,
            type: 'text',
            content: 'Haga click para cambiar el texto',
            position: { top: 300, left: 760 },
        };

        const updatedSlide = {
            ...currentSlide,
            content: [...currentSlide.content, newText],
        };

        const updatedSlides = slides.map(slide =>
            slide.id === currentSlide.id ? updatedSlide : slide
        );

        setSlides(updatedSlides);
        setCurrentSlide(updatedSlide);
    };

    const deleteSlide = () => {
        setSlides(slides.filter(slide => slide.id !== currentSlide.id));

        if (slides.length > 1) {
            setCurrentSlide(slides[0]);
        } else {
            setCurrentSlide(null);
        }
    };

    const evaluateTest = () => {
        console.log(slides);
        for (const slide of slides) {
            if (slide.content.length != 0) {
                setShowCounter(false);
                setIsApproved(true);
                setOpen(true);
                return;
            }
        }
        setShowCounter(false);
        setIsApproved(false);
        setOpen(true);
        return;
    };

    return (
        <>
            {instruction && (
            <div>
                <Modal
                    open={instruction}
                    onClose={handleInstructionClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Instrucción: Realice una presentación que contenga texto.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleInstructionClose}
                        sx={{
                            mt: 2,
                            mx: 'auto',
                            display: 'block',
                            backgroundColor: '#3a8589', // Color de fondo del botón Cerrar
                            '&:hover': {
                                backgroundColor: '#2e6f72', // Color de fondo al pasar el ratón
                            },
                            textTransform: 'none'
                        }}
                    >
                        Cerrar
                    </Button>
                    </Box>
                </Modal>
            </div>
            )}
            <Button 
                sx={{
                    backgroundColor: '#128e0e',
                    color: 'white',
                    borderRadius: '6px',
                    '&:hover': {
                    backgroundColor: '#128e0e',
                    },
                    padding: '5px 15px 5px 15px',
                    marginTop: '11px',
                    marginLeft: '10px',
                    height: '28.4px',
                    fontSize: '16px',
                    border: 'none',
                    textTransform: 'none',
                    fontFamily: 'Arial',
                    position: 'absolute',
                    zIndex: '30'
                }}
                onClick={handleInstructionOpen}>
                Instrucción
            </Button>
            <Title name="Historia 5" evaluateTest={evaluateTest}/>
            <PptToolbar setMenuOption={setMenuOption} />
            <PptSecondaryMenu addSlide={addSlide} deleteSlide={deleteSlide} addText={addText} menuOption={menuOption} />
            <div className="ppt-slides-container">
                <PptSidebar slides={slides} setCurrentSlide={setCurrentSlide}/>
                {currentSlide ? <PptEditor slide={currentSlide} content={currentContent} setCurrentContent={setCurrentContent}/> : 
                <button onClick={addSlide} className='ppt-add-button'>
                    <div>
                    <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <div>
                    Añadir diapositiva
                    </div>
                </button>}
            </div>
            { isApproved ? 
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Prueba superada
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Tiempo transcurrido: {counter} segundos
                    </Typography>
                    </Box>
                </Modal>
            </div> : 
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Prueba no superada
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Tiempo transcurrido: {counter} segundos
                    </Typography>
                    </Box>
                </Modal>
            </div>
            }
        </>
    )
}