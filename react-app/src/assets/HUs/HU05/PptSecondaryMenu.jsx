import React from 'react';

export function PptSecondaryMenu ({ addSlide, menuOption }) {
  return (
    <div className="ppt-secondary-menu">
      {menuOption === 'inicio' && (
        <>
          <button>Pegar</button>
          <button onClick={addSlide}>Añadir Diapositiva</button>
          <button>Fuente</button>
        </>
      )}
      {menuOption === 'insertar' && (
        <>
          <button>Insertar Texto</button>
          <button>Insertar Imagen</button>
          <button>Insertar Forma</button>
        </>
      )}
      {menuOption === 'dibujar' && (
        <>
          <button>Lapiz</button>
          <button>Borrador</button>
          <button>Regla</button>
        </>
      )}
      {menuOption === 'diseño' && (
        <>
          <button>Tema 1</button>
          <button>Tema 2</button>
          <button>Tema 3</button>
        </>
      )}
      {menuOption === 'transiciones' && (
        <>
          <button>Vista previa</button>
          <button>Transición 1</button>
          <button>Transición 2</button>
        </>
      )}
      {menuOption === 'animaciones' && (
        <>
          <button>Vista previa</button>
          <button>Animación 1</button>
          <button>Animación 2</button>
        </>
      )}
      {menuOption === 'pre-con-diapo' && (
        <>
          <button>Desde el principio</button>
          <button>Desde la diapositiva actual</button>
          <button>Ensayar</button>
        </>
      )}
      {menuOption === 'grabar' && (
        <>
          <button>Vista previa</button>
          <button>Desde el principio</button>
          <button>Desde la diapositiva actual</button>
        </>
      )}
      {menuOption === 'revisar' && (
        <>
          <button>Ortografía</button>
          <button>Idioma</button>
          <button>Nuevo comentario</button>
        </>
      )}
      {menuOption === 'vista' && (
        <>
          <button>Normal</button>
          <button>Esquema</button>
          <button>Patrón de diapositivas</button>
        </>
      )}
      {menuOption === 'ayuda' && (
        <>
          <button>Ayuda</button>
          <button>Soporte técnico</button>
          <button>Comentarios</button>
        </>
      )}
    </div>
  );
};

export default PptSecondaryMenu;