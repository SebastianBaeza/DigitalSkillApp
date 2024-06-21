import React from 'react';

export function PptToolbar ({ addSlide }) {
  return (
    <div className="ppt-toolbar">
      <button className="ppt-toolbar-option">File</button>
      <button className="ppt-toolbar-option">Edit</button>
      <button className="ppt-toolbar-option">View</button>
      <button className="ppt-toolbar-option" onClick={addSlide}>Añadir Diapositiva</button>
    </div>
  );
};

export default PptToolbar;