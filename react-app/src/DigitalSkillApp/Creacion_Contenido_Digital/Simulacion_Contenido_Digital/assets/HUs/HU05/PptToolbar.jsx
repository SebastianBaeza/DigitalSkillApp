import { useEffect, useState } from 'react';
import './styles/Ayuda.css';

export function PptToolbar ({ setMenuOption}) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const closePopup = (e) => {
    if (e.target.className === 'popup-overlay') {
        setIsOpen(false);
    }
  };

  useEffect(() => {
      const handleOutsideClick = (e) => {
        // No cierres la ventana emergente si el clic proviene del botón o de la ventana emergente misma
        if (isOpen && !document.getElementById('popup').contains(e.target) && e.target.id !== 'help-button') {
          setIsOpen(false);
        }
      };

      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
  }, [isOpen]);

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
      <button className="ppt-toolbar-option" id="help-button" onClick={togglePopup}>Ayuda</button>
      {isOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div id="popup" className="popup-content">
            <iframe src="https://npy5yesnxt173mlnc905e.chat.copilot.live/" title="Help" width="600" height="400" style={{ border: 'none' }}/>
          </div>
        </div>
      )}     
    </div>
  );
}