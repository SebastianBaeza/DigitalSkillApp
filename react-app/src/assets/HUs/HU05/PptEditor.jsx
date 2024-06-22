import React, { useState } from 'react';
import { PptTextBox } from './PptTextBox';

export function PptEditor ({ slide }) {
  const [content, setContent] = useState(slide.content);

  const handleContentUpdate = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="ppt-editor">
      <h2>{slide.title}</h2>
      <PptTextBox initialText={content} onUpdate={handleContentUpdate} />
    </div>
  );
};

export default PptEditor;