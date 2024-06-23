import React, { useState, useRef } from 'react';
import './styles/ResizableTextBox.css';

export function ResizableTextBox () {
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [size, setSize] = useState({ width: 200, height: 100 });
  const boxRef = useRef(null);

  const handleMouseDown = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startTop = position.top;
    const startLeft = position.left;

    const handleMouseMove = (e) => {
      if (direction === 'move') {
        setPosition({
          top: startTop + e.clientY - startY,
          left: startLeft + e.clientX - startX,
        });
      } else {
        let newWidth = startWidth;
        let newHeight = startHeight;
        let newTop = startTop;
        let newLeft = startLeft;

        if (direction.includes('right')) {
          newWidth = startWidth + e.clientX - startX;
        }
        if (direction.includes('bottom')) {
          newHeight = startHeight + e.clientY - startY;
        }
        if (direction.includes('left')) {
          newWidth = startWidth - (e.clientX - startX);
          newLeft = startLeft + (e.clientX - startX);
        }
        if (direction.includes('top')) {
          newHeight = startHeight - (e.clientY - startY);
          newTop = startTop + (e.clientY - startY);
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ top: newTop, left: newLeft });
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="resizable-box"
      style={{ top: position.top, left: position.left, width: size.width, height: size.height }}
      ref={boxRef}
    >
      <div className="text-box" contentEditable={true}></div>
      <div className="border-move" onMouseDown={(e) => handleMouseDown(e, 'move')}></div>
      <div className="resizer top-left" onMouseDown={(e) => handleMouseDown(e, 'top-left')}></div>
      <div className="resizer top-right" onMouseDown={(e) => handleMouseDown(e, 'top-right')}></div>
      <div className="resizer bottom-left" onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}></div>
      <div className="resizer bottom-right" onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}></div>
      <div className="resizer top" onMouseDown={(e) => handleMouseDown(e, 'top')}></div>
      <div className="resizer right" onMouseDown={(e) => handleMouseDown(e, 'right')}></div>
      <div className="resizer bottom" onMouseDown={(e) => handleMouseDown(e, 'bottom')}></div>
      <div className="resizer left" onMouseDown={(e) => handleMouseDown(e, 'left')}></div>
    </div>
  );
}

export default ResizableTextBox;