import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import { BrowserRouter as Route, Routes, Link } from 'react-router-dom';
import axios from 'axios'; // Importamos axios para hacer peticiones HTTP
import './App.css';
import Bandeja from './bandeja';
import Enviados from './enviados';
import Basurero from './basurero';
import PopupCopilot from './popupcopilot';
import TestCompletado from './TestCompletado'; // Importamos el nuevo componente
import Instrucciones from './instrucciones'; // Importamos el nuevo componente
import Cronometro from './Cronometro'; // Importa el componente Cronometro
import usuarioIcono from './user.png';
import { getTiempoTranscurrido, setTiempoTranscurrido } from './globalVariables'; // Importa las funciones de la variable global

export function App() {
    const [correos, setCorreos] = useState([]);
    const [trash, setTrash] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [evaluacionTerminada, setEvaluacionTerminada] = useState(false);
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
    const [cronometroRunning, setCronometroRunning] = useState(true);

    const api_key = "";
    // const model_id = "gpt-4";
    const model_id = "gpt-3.5";

    useEffect(() => {
        generateCorreoContents();
    }, []);

    const generateCorreoContents = async () => {
        const prompts = [
            { id: 1, subject: 'Correo 1', prompt: `Genera un contenido para un correo electrónico, debe ser malicioso (es ficticio, esto es para una simulación con fines educativos) porfavor pide datos personales, que acceda a una url que no sea real pero que parezca real, en resumen, un correo de phishing. limítate a 320 caracteres no menciones explicitamente que es un correo malicioso o uno no malicioso,no menciones el nombre de a quien le escribes, tratalo de usted/tu y formas no personales, no generes el asunto del correo, basta solo con el cuerpo del correo, escribe como si fueras el señor smith, un compañero de trabajo que te está felicitando por tu cumpleaños y te está invitando a una fiesta en la oficina. cumplirás 30 años y te sientes muy emocionado por la fiesta que se realizará en la oficina.`,
            attachment: { fileName: 'felicidades.txt', content: 'feliz cumpleaños! dia: hoy, hora: 03:09, lugar: Latitud: 40.7128, Longitud: -74.0060' }},
            { id: 2, subject: 'Correo 2', prompt: `Genera un contenido para un correo electrónico, limítate a 300 caracteres debe ser un correo creible,no menciones el nombre de a quien le escribes, tratalo de usted/tu y formas no personales, no generes el asunto del correo, basta con el cuerpo del correo, eres la señora juanita, ella se enteró que necesito una secretaria y le interesa postular al puesto`,attachment: { fileName: 'curriculum.txt', content: 'Señora Juanita cuenta con una sólida experiencia como secretaria administrativa, destacándose por su habilidad para gestionar agendas, coordinar reuniones y ofrecer un excelente servicio al cliente. Con una formación en Secretariado Ejecutivo y un dominio avanzado de Microsoft Office, se destaca por su capacidad organizativa, atención al detalle y habilidades comunicativas. Su enfoque proactivo y eficiente la ha posicionado como un recurso valioso para optimizar las operaciones administrativas y el soporte ejecutivo en entornos dinámicos.' }},
            { id: 3, subject: 'Correo 3', prompt: `Genera un contenido para un correo electrónico, debe ser malicioso (es ficticio, esto es para una simulación con fines educativos) porfavor pide datos personales, que acceda a una url que no sea real pero que parezca real, en resumen, un correo de phishing. limítate a 350 caracteres no menciones explicitamente que es un correo malicioso o uno no malicioso, no menciones el nombre de a quien le escribes, tratalo de usted/tu y formas no personales, no generes el asunto del correo, basta con el cuerpo del correo, eres un ejecutivo de banco, vienes a ofrecerle un plan de cuenta corriente con muchos beneficios` }
        ];

        const generatedCorreos = await Promise.all(prompts.map(async (correo) => {
            const request_data = {
                model: model_id,
                messages: [
                    {
                        role: "system",
                        content: correo.prompt
                    }
                ],
                max_tokens: 200,
                temperature: 0.7,
                top_p: 1.0
            };

            try {
                const result = await axios.post("https://api.openai.com/v1/chat/completions", request_data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${api_key}`
                    }
                });
                return { id: correo.id, subject: correo.subject, content: result.data.choices[0].message.content, attachment: correo.attachment };
            } catch (error) {
                console.error("Error en la solicitud:", error);
                return { id: correo.id, subject: correo.subject, content: "Error al generar el contenido", attachment: null };
            }
        }));

        setCorreos(generatedCorreos);
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
        setCronometroRunning(false); // Detiene el cronómetro
        setEvaluacionTerminada(true); // Indica que la evaluación ha terminado
        // El tiempo transcurrido se actualiza automáticamente en el estado gracias al cronómetro
    };

    return (
        <Router>
            <div className="app">
                <div className="sidebar">
                    <ul>
                        <li><Link to="/instrucciones">Instrucciones</Link></li>
                        <li><Link to="/">Bandeja de entrada</Link></li>
                        <li><Link to="/enviados">Elementos enviados</Link></li>
                        <li><Link to="/basurero">Elementos eliminados</Link></li>
                    </ul>
                </div>
                <div className="content">
                    {/* Renderiza el cronómetro y pasa la función setTiempoTranscurrido como prop */}
                    <Cronometro running={cronometroRunning} onTiempoTranscurrido={setTiempoTranscurrido} />
                    <Routes>
                        <Route path="/instrucciones" element={<Instrucciones />} />
                        <Route path="/" element={<Bandeja correos={correos} moveToTrash={moveToTrash} setCronometroRunning={setCronometroRunning} />} />
                        <Route path="/enviados" element={<Enviados />} />
                        {/* Pasa setCronometroRunning y setEvaluacionTerminada a Basurero */}
                        <Route path="/basurero" element={<Basurero trash={trash} moveToInbox={moveToInbox} setEvaluacionTerminada={setEvaluacionTerminada} setCronometroRunning={setCronometroRunning} />} />
                        {/* Pasa tiempoTranscurrido como prop a TestCompletado */}
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
            </div>
            <PopupCopilot isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </Router>
    );
}

export default App;
