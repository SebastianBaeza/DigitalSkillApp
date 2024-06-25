import React from 'react';
import ResizableTextBox from './ResizableTextBox';

const PptSlide = ({ slide }) => {
  return (
    <div className="slide">
      {slide.content.map((element) => {
        if (element.type === 'text') {
          return (
            <ResizableTextBox
              initialContent={element.content}
            />
          );
        } else if (element.type === 'image') {
          return (
            <h1 key={index}>IMAGEN</h1>
          );
        }
        return null;
      })}
    </div>
  );
};

export default PptSlide;