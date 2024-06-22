import React, { useState } from 'react';
import { Title } from "./assets/HUs/HU05/Title";
import { PptToolbar } from "./assets/HUs/HU05/PptToolbar";
import { PptSidebar } from "./assets/HUs/HU05/PptSidebar";
import { PptEditor } from "./assets/HUs/HU05/PptEditor";
import { PptSecondaryMenu } from "./assets/HUs/HU05/PptSecondaryMenu";

import './assets/HUs/HU05/styles/HU05.css';

export function HU05 () {
    const [slides, setSlides] = useState([
        { id: 1, title: 'Slide 1', content: 'Contenido de la diapositiva 1' }
    ]);
    
    const [currentSlide, setCurrentSlide] = useState(slides[0]);

    const [menuOption, setMenuOption] = useState('inicio');
    
    const addSlide = () => {
        const newSlide = {
          id: slides.length + 1,
          title: `Slide ${slides.length + 1}`,
          content: ''
        };
        setSlides([...slides, newSlide]);
        setCurrentSlide(newSlide);
    };

    const onPaste = () => {
        try {
          const clipboardData = navigator.clipboard.readText();
          onPaste(clipboardData);
        } catch (error) {
          console.error('Error al pegar desde el portapapeles:', error);
        } 
    };

    return (
        <>
            <Title name="Historia 5" />
            <PptToolbar setMenuOption={setMenuOption}/>
            <PptSecondaryMenu addSlide={addSlide} onPaste={onPaste} menuOption={menuOption} />
            <div className="ppt-slides-container">
                <PptSidebar slides={slides} setCurrentSlide={setCurrentSlide}/>
                <PptEditor slide={currentSlide} />
            </div>
        </>
    )
}