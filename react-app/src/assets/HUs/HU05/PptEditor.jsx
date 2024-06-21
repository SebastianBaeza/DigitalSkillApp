import React from 'react';

export function PptEditor ({ slide }) {
  return (
    <div className="ppt-editor">
      <h2>{slide.title}</h2>
      <p>{slide.content}</p>
    </div>
  );
};

export default PptEditor;