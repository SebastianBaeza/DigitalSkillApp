import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Bandeja from './bandeja'; // Importa el componente Bandeja
import Enviados from './enviados'; // Importa el componente Enviados
import Basurero from './basurero'; // Importa el componente Basurero
import axios from 'axios';
import usuarioIcono from '../user.png'; // Importa la imagen de usuario

export function App() {
    const [correos, setCorreos] = useState([]);
    const [trash, setTrash] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const api_key = "APIKEYYYYYYY";
    const model_id = "gpt-4";

    useEffect(() => {
        generateCorreoContents();
    }, []);

    const generateCorreoContents = async () => {
        // Prompts originales para generación de correos con ChatGPT
        // const prompts = [
        //     { id: 1, subject: 'Correo 1', prompt: `Genera un contenido para un correo electrónico, decide tu si es malicioso
        //     o no, si decides escribir uno malicioso porfavor pide datos personales, que acceda a una url que no sea real
        //     pero que parezca real, en resumen, un correo de phishing. limítate a 300 caracteres
        //     no menciones explicitamente que es un correo malicioso o uno no malicioso,no menciones el nombre de a quien le escribes, tratalo de usted/tu y formas no personales, 
        //     no generes el asunto del correo, basta con el cuerpo del correo, escribe como si fueras el señor 
        //     smith, un compañero de trabajo que te está felicitando por tu cumpleaños y te está invitando a una fiesta
        //     en la oficina. cumplirás 30 años y te sientes muy emocionado por la fiesta que se realizará en la oficina.`},
        //     { id: 2, subject: 'Correo 2', prompt: `Genera un contenido para un correo electrónico, decide tu si es malicioso
        //     o no, si decides escribir uno malicioso porfavor pide datos personales, que acceda a una url que no sea real
        //     pero que parezca real, en resumen, un correo de phishing. limítate a 300 caracteres
        //     no menciones explicitamente que es un correo malicioso o uno no malicioso,no menciones el nombre de a quien le escribes, tratalo de usted/tu y formas no personales, 
        //     no generes el asunto del correo, basta con el cuerpo del correo, eres la señora juanita, ella se enteró que
        //     necesito una secretaria y le interesa postular al puesto` },
        //     { id: 3, subject: 'Correo 3', prompt: `Genera un contenido para un correo electrónico, decide tu si es malicioso
        //     o no, si decides escribir uno malicioso porfavor pide datos personales, que acceda a una url que no sea real
        //     pero que parezca real, en resumen, un correo de phishing. limítate a 300 caracteres
        //     no menciones explicitamente que es un correo malicioso o uno no malicioso
        //     , no menciones el nombre de a quien le escribes, tratalo de usted/tu y formas no personales, 
        //     no generes el asunto del correo, basta con el cuerpo del correo, eres un ejecutivo de banco, vienes a ofrecerle un plan
        //     de cuenta corriente con muchos beneficios` }
        // ];

        // Generación de correos utilizando la API de OpenAI
        // const generatedCorreos = await Promise.all(prompts.map(async (correo) => {
        //     const request_data = {
        //         model: model_id,
        //         messages: [
        //             {
        //                 role: "system",
        //                 content: correo.prompt
        //             }
        //         ],
        //         max_tokens: 200,
        //         temperature: 0.7,
        //         top_p: 1.0
        //     };

        //     try {
        //         const result = await axios.post("https://api.openai.com/v1/chat/completions", request_data, {
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 "Authorization": `Bearer ${api_key}`
        //             }
        //         });
        //         return { id: correo.id, subject: correo.subject, content: result.data.choices[0].message.content };
        //     } catch (error) {
        //         console.error("Error en la solicitud:", error);
        //         return { id: correo.id, subject: correo.subject, content: "Error al generar el contenido" };
        //     }
        // }));

        // Correos de ejemplo para pruebas
        const exampleCorreos = [
            { id: 1, subject: 'Correo 1', content: 'Feliz cumpleaños! Te esperamos en la oficina para celebrar tu cumpleaños número 30. Será una fiesta inolvidable con todos tus compañeros de trabajo.' },
            { id: 2, subject: 'Correo 2', content: 'Hola, soy la señora Juanita y me enteré que necesitas una secretaria. Estoy interesada en postular al puesto. Gracias por considerarme.' },
            { id: 3, subject: 'Correo 3', content: 'Estimado cliente, le ofrecemos un plan de cuenta corriente con muchos beneficios. Por favor, acceda al siguiente enlace para más detalles: www.banco-falso.com' }
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
        if (option === "Mesa de ayuda") {
            // Inicializar el bot de Copilot
            if (typeof window.initCopilot === "function") {
                window.initCopilot();
            } else {
                alert("El bot de Copilot no está disponible.");
            }
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

    return (
        <Router>
            <div className="app">
                <div className="sidebar">
                    <ul>
                        <li><Link to="/">Bandeja de entrada</Link></li>
                        <li><Link to="/enviados">Elementos enviados</Link></li>
                        <li><Link to="/basurero">Elementos eliminados</Link></li>
                    </ul>
                </div>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Bandeja correos={correos} moveToTrash={moveToTrash} />} />
                        <Route path="/enviados" element={<Enviados />} />
                        <Route path="/basurero" element={<Basurero trash={trash} moveToInbox={moveToInbox} />} />
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
        </Router>
    );
}
