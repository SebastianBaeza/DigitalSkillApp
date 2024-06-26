import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Bandeja from './bandeja';
import Enviados from './enviados';
import Basurero from './basurero';
import PopupCopilot from './popupcopilot';
import TestCompletado from './TestCompletado';
import Instrucciones from './instrucciones';
import Cronometro from './Cronometro';
import usuarioIcono from './user.png';

function App() {
    // const [correos, setCorreos] = useState([]);
    const [correos, setCorreos] = useState([
      { 
          id: 1, 
          subject: 'Correo 1', 
          content: 'Contenido del correo 1', 
          attachment: { fileName: 'archivo1.txt', content: '' }
      },
      { 
          id: 2, 
          subject: 'Correo 2', 
          content: 'Contenido del correo 2', 
          attachment: { fileName: 'archivo2.txt', content: 'contenido malicioso' }
      },
      { id: 3, subject: 'Correo 3', content: 'Contenido del correo 3' }
  ]);
    const [trash, setTrash] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [evaluacionTerminada, setEvaluacionTerminada] = useState(false);
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
    const [cronometroRunning, setCronometroRunning] = useState(true);

    // useEffect(() => {
    //     generateCorreoContents();
    // }, []);

    const generateCorreoContents = async () => {
        const exampleCorreos = [
            { 
                id: 1, 
                subject: 'Correo 1', 
                content: 'Contenido del correo 1', 
                attachment: { fileName: 'archivo1.txt', content: '' }
            },
            { 
                id: 2, 
                subject: 'Correo 2', 
                content: 'Contenido del correo 2', 
                attachment: { fileName: 'archivo2.txt', content: 'contenido malicioso' }
            },
            { id: 3, subject: 'Correo 3', content: 'Contenido del correo 3' }
        ];

        setCorreos(exampleCorreos);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const closeDropdown = () => {
        setDropdownVisible(false);
    };

    const handleMenuItemClick = (option) => {
        if (option === 'Mesa de ayuda') {
            setIsPopupOpen(true);
        } else {
            alert("Esta sección no forma parte de la evaluación");
        }
    };

    const moveToTrash = (selectedCorreos) => {
        setTrash([...trash, ...selectedCorreos]);
        setCorreos(correos.filter(correo => !selectedCorreos.includes(correo)));
    };

    const moveToInbox = (selectedCorreos) => {
        setCorreos([...correos, ...selectedCorreos]);
        setTrash(trash.filter(correo => !selectedCorreos.includes(correo)));
    };

    const terminarEvaluacion = () => {
        setCronometroRunning(false);
        setEvaluacionTerminada(true);
    };

    return (
        <div className="app">
            <div className="sidebar">
                <ul>
                    <li><Link to="/DigitalSkillApp/Seguridad/Simulacion_Correos/Instrucciones">Instrucciones</Link></li>
                    <li><Link to="/DigitalSkillApp/Seguridad/Simulacion_Correos">Bandeja de entrada</Link></li>
                    <li><Link to="/DigitalSkillApp/Seguridad/Simulacion_Correos/Enviados">Elementos enviados</Link></li>
                    <li><Link to="/DigitalSkillApp/Seguridad/Simulacion_Correos/Basurero">Elementos eliminados</Link></li>
                </ul>
            </div>
            <div className="content">
                <Cronometro running={cronometroRunning} onTiempoTranscurrido={setTiempoTranscurrido} />
                <Routes>
                    <Route path="/DigitalSkillApp/Seguridad/Simulacion_Correos/Instrucciones" element={<Instrucciones />} />
                    <Route path="/DigitalSkillApp/Seguridad/Simulacion_Correos" element={<Bandeja correos={correos} moveToTrash={moveToTrash} setCronometroRunning={setCronometroRunning} />} />
                    {/* <Route path="/DigitalSkillApp/Seguridad/Simulacion_Correos/Enviados" element={<Enviados correos={correos} />} /> */}
                    <Route path="/DigitalSkillApp/Seguridad/Simulacion_Correos/Enviados" element={<Enviados/>} />
                    <Route path="/DigitalSkillApp/Seguridad/Simulacion_Correos/Basurero" element={<Basurero trash={trash} moveToInbox={moveToInbox} setEvaluacionTerminada={setEvaluacionTerminada} setCronometroRunning={setCronometroRunning} />} />
                    <Route path="/test-completado" element={<TestCompletado tiempoTranscurrido={tiempoTranscurrido} />} />
                </Routes>
            </div>
            <div className="dropdown" onClick={toggleDropdown} onMouseLeave={closeDropdown}>
                <button className="dropdown-button">
                    <img className="usuario-icono" src={usuarioIcono} alt="user" />
                    Usuario invitado
                </button>
                {dropdownVisible && (
                    <ul className="dropdown-list">
                        <li className="dropdown-item" onClick={() => handleMenuItemClick('Configuración')}>Configuración</li>
                        <li className="dropdown-item" onClick={() => handleMenuItemClick('Mesa de ayuda')}>Mesa de ayuda</li>
                        <li className="dropdown-item" onClick={() => handleMenuItemClick('Cerrar sesión')}>Cerrar sesión</li>
                    </ul>
                )}
            </div>
            <PopupCopilot isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </div>
    );
}

export default App;

