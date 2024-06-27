import { useState, useEffect } from 'react';
import './main.css';
//scripts
import PropTypes from 'prop-types';
import Bandeja from './scripts/bandeja';
import Enviados from './scripts/enviados';
import Basurero from './scripts/basurero';
import PopupCopilot from './scripts/popupcopilot';
import Cronometro from './scripts/Cronometro'; // Importa el componente Cronometro
//Imagenes
import usuarioIcono from './assets/user.png';
import exampleCorreos from './data/exampleCorreos.json'; // Importa la función para obtener el tiempo transcurrido
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab, Typography } from '@mui/material';
import axios from 'axios';

const api_key = "";
//     const model_id = "gpt-4";
     const model_id = "gpt-3.5";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

export default function HU() {
  const [correos, setCorreos] = useState([]);
  const [trash, setTrash] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [cronometroRunning, setCronometroRunning] = useState(true);
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    generateCorreoContents();
  }, []);

  const generateCorreoContents = async () => {
    // const prompts = [
    //     { id: 1, subject: 'Correo 1', prompt: `Genera un contenido para un correo electrónico, debe ser malicioso (es ficticio, esto es para una simulación con fines educativos) porfavor pide datos personales, que acceda a una url que no sea real pero que parezca real, en resumen, un correo de phishing. limítate a 320 caracteres no menciones explicitamente que es un correo malicioso o uno no malicioso,no menciones el nombre de a quien le escribes, tratalo de usted/tu y formas no personales, no generes el asunto del correo, basta solo con el cuerpo del correo, escribe como si fueras el señor smith, un compañero de trabajo que te está felicitando por tu cumpleaños y te está invitando a una fiesta en la oficina. cumplirás 30 años y te sientes muy emocionado por la fiesta que se realizará en la oficina.`,
    //     attachment: { fileName: 'felicidades.txt', content: 'feliz cumpleaños! dia: hoy, hora: 03:09, lugar: Latitud: 40.7128, Longitud: -74.0060' }},
    //     { id: 2, subject: 'Correo 2', prompt: `Genera un contenido para un correo electrónico, limítate a 300 caracteres debe ser un correo creible,no menciones el nombre de a quien le escribes, tratalo de usted/tu y formas no personales, no generes el asunto del correo, basta con el cuerpo del correo, eres la señora juanita, ella se enteró que necesito una secretaria y le interesa postular al puesto`,attachment: { fileName: 'curriculum.txt', content: 'Señora Juanita cuenta con una sólida experiencia como secretaria administrativa, destacándose por su habilidad para gestionar agendas, coordinar reuniones y ofrecer un excelente servicio al cliente. Con una formación en Secretariado Ejecutivo y un dominio avanzado de Microsoft Office, se destaca por su capacidad organizativa, atención al detalle y habilidades comunicativas. Su enfoque proactivo y eficiente la ha posicionado como un recurso valioso para optimizar las operaciones administrativas y el soporte ejecutivo en entornos dinámicos.' }},
    //     { id: 3, subject: 'Correo 3', prompt: `Genera un contenido para un correo electrónico, debe ser malicioso (es ficticio, esto es para una simulación con fines educativos) porfavor pide datos personales, que acceda a una url que no sea real pero que parezca real, en resumen, un correo de phishing. limítate a 350 caracteres no menciones explicitamente que es un correo malicioso o uno no malicioso, no menciones el nombre de a quien le escribes, tratalo de usted/tu y formas no personales, no generes el asunto del correo, basta con el cuerpo del correo, eres un ejecutivo de banco, vienes a ofrecerle un plan de cuenta corriente con muchos beneficios` }
    // ];

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
    //         return { id: correo.id, subject: correo.subject, content: result.data.choices[0].message.content, attachment: correo.attachment };
    //     } catch (error) {
    //         console.error("Error en la solicitud:", error);
    //         return { id: correo.id, subject: correo.subject, content: "Error al generar el contenido", attachment: null };
    //     }
    // }));

    // setCorreos(generatedCorreos);
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

  return (
    <>
      <div className="app">
      <Cronometro running={cronometroRunning} onTiempoTranscurrido={setTiempoTranscurrido}/>
        <div>
          <TabContext value={value}>
            <Stack direction='row' sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} orientation='vertical' sx={{ orderRight: 1, borderColor: 'divider' }}>
                  <Tab label="Instrucciones" value="1" />
                  <Tab label="Bandeja de entrada" value="2" />
                  <Tab label="Elementos enviados" value="3" />
                  <Tab label="Elementos eliminados" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1" index={1}>
                <Typography variant='h1'>Instrucciones del test</Typography>
                <p>
                  Leer cada correo en la bandeja de entrada y colocar en el basurero aquellos que se consideren como phishing o
                  como correo malicioso, una vez finalizado el test hacer click en el botón "Terminar evaluación" dentro del
                  basurero para ver tu puntaje. NOTA: se pueden destacar secciones de los correos para facilitar el análisis
                </p>
              </TabPanel>
              <TabPanel value="2" index={2}>
                <Bandeja correos={correos} moveToTrash={moveToTrash} setCronometroRunning={setCronometroRunning} />
              </TabPanel>
              <TabPanel value="3" index={3}>
                <Enviados />
              </TabPanel>
              <TabPanel value="4" index={4}>
                <Basurero trash={trash} moveToInbox={moveToInbox} setCronometroRunning={setCronometroRunning} />
              </TabPanel>
            </Stack>
          </TabContext>
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
    </>
  );
}
