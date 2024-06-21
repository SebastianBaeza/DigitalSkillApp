import React, { useState } from 'react';
import { Title } from "./assets/HUs/HU05/Title";
import { PptToolbar } from "./assets/HUs/HU05/PptToolbar";
import { PptSidebar } from "./assets/HUs/HU05/PptSidebar";
import { PptEditor } from "./assets/HUs/HU05/PptEditor";

import './assets/HUs/HU05/styles/HU05.css';

export function HU05 () {
    const [slides, setSlides] = useState([
        { id: 1, title: 'Slide 1', content: 'Contenido de la diapositiva 1' }
    ]);
    
    const [currentSlide, setCurrentSlide] = useState(slides[0]);
    
    const addSlide = () => {
        const newSlide = {
          id: slides.length + 1,
          title: `Slide ${slides.length + 1}`,
          content: ''
        };
        setSlides([...slides, newSlide]);
        setCurrentSlide(newSlide);
    };

    return (
        <>
            <Title name="Historia 5" />
            <PptToolbar addSlide={addSlide}/>
            <aside className="ppt-slides-container">
                <PptSidebar slides={slides} setCurrentSlide={setCurrentSlide}/>
                <PptEditor slide={currentSlide} />
            </aside>
        </>
    )
}