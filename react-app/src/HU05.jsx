import React, { useState } from 'react';
import { Title } from "./assets/HUs/HU05/Title";
import { PptToolbar } from "./assets/HUs/HU05/PptToolbar";
import { PptSidebar } from "./assets/HUs/HU05/PptSidebar";
import { PptEditor } from "./assets/HUs/HU05/PptEditor";
import { PptSecondaryMenu } from "./assets/HUs/HU05/PptSecondaryMenu";

import './assets/HUs/HU05/styles/HU05.css';

export function HU05 () {
    const [slides, setSlides] = useState([
        { id: 1,
            content: [
              {
                type: 'text',
                content: 'Haga click para cambiar el texto',
                position: { top: 300, left: 760 },
              }
            ] 
        }
    ]);
    
    const [currentSlide, setCurrentSlide] = useState(slides[0]);

    const [menuOption, setMenuOption] = useState('inicio');
    
    const addSlide = () => {
        const newSlide = {
          id: slides.length + 1,
          content: [
            {
              type: 'text',
              content: 'Haga click para cambiar el texto',
              position: { top: 300, left: 760 },
            }
          ]
        };
        setSlides([...slides, newSlide]);
        setCurrentSlide(newSlide);
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
        for (const slide of slides) {
            if (slide.content.length === 0) {
                console.log(false);
            }
        }
        console.log(true);
    };

    return (
        <>
            <Title name="Historia 5" />
            <PptToolbar setMenuOption={setMenuOption}/>
            <PptSecondaryMenu addSlide={addSlide} evaluateTest={evaluateTest} deleteSlide={deleteSlide} menuOption={menuOption} />
            <div className="ppt-slides-container">
                <PptSidebar slides={slides} setCurrentSlide={setCurrentSlide}/>
                <PptEditor slide={currentSlide} />
            </div>
        </>
    )
}