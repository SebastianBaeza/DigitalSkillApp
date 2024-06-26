import React from 'react';

export function PptSidebar ({ slides, setCurrentSlide }) {
  return (
    <div className="ppt-sidebar">
        {slides.map(slide => (
            <div key={slide.id} className="ppt-slide" onClick={() => setCurrentSlide(slide)}>
            {slide.id}
            </div>
        ))}
    </div>
  );
};

export default PptSidebar;