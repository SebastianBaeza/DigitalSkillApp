import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Title } from "./assets/HUs/HU05/Title";
import { PptToolbar } from "./assets/HUs/HU05/PptToolbar";
import { PptSidebar } from "./assets/HUs/HU05/PptSidebar";
import { PptEditor } from "./assets/HUs/HU05/PptEditor";
import { PptSecondaryMenu } from "./assets/HUs/HU05/PptSecondaryMenu";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './assets/HUs/HU05/styles/HU05.css';
import { text } from '@fortawesome/fontawesome-svg-core';

export function HU05 () {
    const [slides, setSlides] = useState([
        { id: 1,
            content: [] 
        }
    ]);
    
    const [currentSlide, setCurrentSlide] = useState(slides[0]);

    const [menuOption, setMenuOption] = useState('inicio');

    const [isOpen, setIsOpen] = useState(false);
    
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
        if (slides.length === 0) {
            console.log(false);
            alert("Ha fallado la prueba");
            return false;
        }

        for (const slide of slides) {
            if (slide.content.length != 0) {
                console.log(true);
                alert("Felicidades, lo ha logrado");
                return true;
            }
        }
        console.log(false);
        alert("Ha fallado la prueba");
        return false;
    };

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const closePopup = (e) => {
        if (e.target.className === 'popup-overlay') {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            // No cierres la ventana emergente si el clic proviene del botón o de la ventana emergente misma
            if (isOpen && !document.getElementById('popup').contains(e.target) && e.target.id !== 'help-button') {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <>
            <Title name="Historia 5" />
            <PptToolbar setMenuOption={setMenuOption} />
            <PptSecondaryMenu addSlide={addSlide} evaluateTest={evaluateTest} deleteSlide={deleteSlide} addText={addText} menuOption={menuOption} />
            <div className="ppt-slides-container">
                <PptSidebar slides={slides} setCurrentSlide={setCurrentSlide}/>
                {currentSlide ? <PptEditor slide={currentSlide} /> : 
                <button onClick={addSlide} className='ppt-add-button'>
                    <div>
                    <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <div>
                    Añadir diapositiva
                    </div>
                </button>}
            </div>
        </>
    )
}