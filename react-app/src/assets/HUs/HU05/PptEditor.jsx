import React, { useState } from 'react';
import { PptTextBox } from './PptTextBox';
import ResizableTextBox from './ResizableTextBox';
import PptSlide from './PptSlide';

export function PptEditor ({ slide }) {
  const [content, setContent] = useState(slide.content);

  const handleContentUpdate = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="ppt-editor">
      <h2>{slide.title}</h2>
      <ResizableTextBox />
      <ResizableTextBox />
      <ResizableTextBox />
      <img src='https://gogocatrina.com/wp-content/uploads/2021/11/smiling-friends-adult-swim.jpg' style={{height:"260px", width: "400px"}}/>
    </div>
  );
};

export default PptEditor;