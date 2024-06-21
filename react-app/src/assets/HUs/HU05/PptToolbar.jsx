import React, { useState } from 'react';

export function PptToolbar ({ setMenuOption  }) {

  return (
    <div className="ppt-toolbar">
      <button className="ppt-toolbar-option" onClick={() => setMenuOption('inicio')}>Inicio</button>
      <button className="ppt-toolbar-option" onClick={() => setMenuOption('insertar')}>Insertar</button>
      <button className="ppt-toolbar-option" onClick={() => setMenuOption('dibujar')}>Dibujar</button>
      <button className="ppt-toolbar-option" onClick={() => setMenuOption('diseño')}>Diseño</button>
      <button className="ppt-toolbar-option" onClick={() => setMenuOption('transiciones')}>Transiciones</button>
      <button className="ppt-toolbar-option" onClick={() => setMenuOption('animaciones')}>Animaciones</button>
      <button className="ppt-toolbar-option" onClick={() => setMenuOption('pre-con-diapo')}>Presentación con diapositivas</button>
      <button className="ppt-toolbar-option" onClick={() => setMenuOption('grabar')}>Grabar</button>
      <button className="ppt-toolbar-option" onClick={() => setMenuOption('revisar')}>Revisar</button>
      <button className="ppt-toolbar-option" onClick={() => setMenuOption('vista')}>Vista</button>
      <button className="ppt-toolbar-option" onClick={() => setMenuOption('ayuda')}>Ayuda</button>
    </div>
  );
};

export default PptToolbar;