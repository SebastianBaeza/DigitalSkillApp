import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Entrypoint from './Entrypoint.jsx';
import Competencia3 from './DigitalSkillApp/Competencia3.jsx';
import Competencia4 from './DigitalSkillApp/Competencia4.jsx';
import Desarrollo from './DigitalSkillApp/Desarrollo.jsx';
import Alternativas from './DigitalSkillApp/Alternativas.jsx';
import Simulador_Bloques from './DigitalSkillApp/Creacion_Contenido_Digital/Bloques/HU01.jsx';
import Simulador_Codigo from './DigitalSkillApp/Creacion_Contenido_Digital/Codigo/HU02.jsx';
// import Simulador_CC from './DigitalSkillApp/Creacion_Contenido_Digital/Simulacion_CC/.jsx';
import Simulador_Powerpoint from './DigitalSkillApp/Creacion_Contenido_Digital/Simulacion_Contenido_Digital/HU05.jsx';

import Simulador_Ergonomia from './DigitalSkillApp/Seguridad/Simulacion_Ergonomia/App.jsx';
import Simulador_Web from './DigitalSkillApp/Seguridad/Simulacion_Web/index_compra.jsx';
import Simulador_Correos_Bandeja from './DigitalSkillApp/Seguridad/Simulacion_Correos/App.jsx';
import Simulador_Correos_Enviados from './DigitalSkillApp/Seguridad/Simulacion_Correos/bandeja.jsx';
import Simulador_Correos_Instrucciones from './DigitalSkillApp/Seguridad/Simulacion_Correos/instrucciones.jsx';
import Simulador_Correos_Basurero from './DigitalSkillApp/Seguridad/Simulacion_Correos/basurero.jsx';

import './App.css';


export function App () {
  const competencia_1_1 = "Navegación, búsqueda y filtrado de datos, información y contenido digital. Esta competencia implica la capacidad de buscar, localizar y acceder a datos, información y contenidos digitales de manera eficaz y eficiente. Incluye el uso de motores de búsqueda, bases de datos y otras herramientas digitales para encontrar información relevante."; // Se puede modificar para otras competencias;
  const competencia_1_2 = "Evaluación de datos, información y contenido digital. Esta competencia se refiere a la capacidad de evaluar críticamente la relevancia, fiabilidad y calidad de los datos, información y contenidos digitales. Incluye la habilidad de diferenciar entre fuentes confiables y no confiables."; // Se puede modificar para otras competencias;
  const competencia_1_3 = "Gestión de datos, información y contenido digital. Esta competencia se centra en la capacidad de organizar, almacenar y recuperar datos, información y contenidos digitales. Incluye el uso de sistemas de gestión de información y la aplicación de estrategias para mantener la información organizada y accesible."; // Se puede modificar para otras competencias;
  const competencia_2_1 = "Interacción mediante tecnologías digitales. Esta competencia implica la capacidad de comunicarse y colaborar a través de herramientas digitales. Incluye el uso de correos electrónicos, mensajería instantánea, videoconferencias y redes sociales para interactuar con otros de manera efectiva."; // Se puede modificar para otras competencias;
  const competencia_2_2 = "Compartir información y contenido digital. Esta competencia se refiere a la capacidad de compartir datos, información y contenidos digitales con otros. Incluye la habilidad de seleccionar los medios y herramientas apropiadas para compartir contenido de manera segura y eficaz."; // Se puede modificar para otras competencias;
  const competencia_2_3 = "Participación en ciudadanía mediante tecnologías digitales. Esta competencia implica la capacidad de participar activamente en la sociedad digital. Incluye la participación en redes y comunidades en línea, y el uso de plataformas digitales para la participación cívica y social."; // Se puede modificar para otras competencias;
  const competencia_2_4 = "Colaboración mediante tecnologías digitales. Esta competencia se centra en la capacidad de trabajar de manera colaborativa en entornos digitales. Incluye la habilidad de utilizar herramientas digitales para la gestión de proyectos, la cooperación y la co-creación de contenido."; // Se puede modificar para otras competencias;
  const competencia_2_5 = "Comportamiento en la red. Esta competencia se refiere a la comprensión y aplicación de normas y comportamientos apropiados en la comunicación y colaboración digital. Incluye el respeto por la privacidad de los demás y la conducta ética en entornos en línea."; // Se puede modificar para otras competencias;
  const competencia_2_6 = "Gestión de la identidad digital. Esta competencia implica la capacidad de crear, gestionar y proteger la identidad digital de uno mismo. Incluye el manejo de perfiles en línea, la reputación digital y la protección de datos personales."; // Se puede modificar para otras competencias;
  const competencia_3_1 = "Desarrollo de Contenidos Digitales. Esta competencia implica la capacidad de crear y editar contenidos digitales en diversos formatos. Incluye la habilidad de expresarse eficazmente a través de medios digitales. Los niveles de esta competencia van desde la identificación y selección básica de formas simples de contenido digital hasta la resolución avanzada de problemas y la innovación en la creación de contenidos.";
  const competencia_3_2 = "Integración y reelaboración de contenido digital. Esta competencia se refiere a la capacidad de modificar, mejorar y combinar contenidos digitales de diferentes fuentes y formatos. Incluye la creación de nuevos contenidos a partir de materiales existentes."; // Se puede modificar para otras competencias;
  const competencia_3_3 = "Derechos de autor y licencias. Esta competencia implica la comprensión y aplicación de las normativas sobre derechos de autor y licencias en el entorno digital. Incluye la capacidad de utilizar y compartir contenidos digitales respetando los derechos de propiedad intelectual."; // Se puede modificar para otras competencias;
  const competencia_3_4 = "Programación. Esta competencia se centra en la capacidad de comprender y aplicar los principios básicos de la programación. Incluye la creación y modificación de programas informáticos y aplicaciones básicas."; // Se puede modificar para otras competencias;
  const competencia_4_1 = "Protección de dispositivos. Esta competencia implica la capacidad de proteger dispositivos digitales y sus contenidos. Incluye el uso de software antivirus, cortafuegos y otras medidas de seguridad para prevenir el acceso no autorizado y el daño a los dispositivos."; // Se puede modificar para otras competencias;
  const competencia_4_2 = "Protección de datos personales y privacidad. Esta competencia se refiere a la capacidad de proteger la información personal y la privacidad en entornos digitales. Incluye la gestión de configuraciones de privacidad y la protección de datos personales contra el uso indebido."; // Se puede modificar para otras competencias;
  const competencia_4_3 = "Protección de la salud y el bienestar. Esta competencia implica la capacidad de gestionar los riesgos y proteger el bienestar físico y mental en el uso de tecnologías digitales. Incluye la adopción de prácticas seguras y saludables en el uso de dispositivos y aplicaciones digitales."; // Se puede modificar para otras competencias;
  const competencia_4_4 = "Protección del medioambiente. Esta competencia se centra en la capacidad de utilizar tecnologías digitales de manera que minimicen el impacto ambiental. Incluye el conocimiento y la aplicación de prácticas sostenibles en el uso de dispositivos digitales y la gestión de residuos electrónicos."; // Se puede modificar para otras competencias;
  const competencia_5_1 = "Resolución de problemas técnicos. Esta competencia implica la capacidad de identificar y resolver problemas técnicos en el uso de tecnologías digitales. Incluye la habilidad de solucionar problemas básicos y la búsqueda de soluciones en línea."; // Se puede modificar para otras competencias;
  const competencia_5_2 = "Identificación de necesidades y respuestas tecnológicas. Esta competencia se refiere a la capacidad de evaluar las necesidades tecnológicas y seleccionar soluciones adecuadas para cumplir con esos requerimientos. Incluye la adaptación y personalización de herramientas digitales para satisfacer necesidades específicas."; // Se puede modificar para otras competencias;
  const competencia_5_3 = "Innovación y uso creativo de la tecnología digital. Esta competencia implica la capacidad de utilizar tecnologías digitales de manera creativa para innovar y mejorar procesos y productos. Incluye la aplicación de soluciones tecnológicas novedosas en diversos contextos."; // Se puede modificar para otras competencias;
  const competencia_5_4 = "Identificación de lagunas en competencias digitales. Esta competencia se centra en la capacidad de evaluar y reconocer las propias necesidades de desarrollo en competencias digitales. Incluye la planificación de actividades de aprendizaje y la búsqueda de recursos para mejorar las habilidades digitales."; // Se puede modificar para otras competencias;
  return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Entrypoint />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital" element={<Competencia3 />} />
              <Route path="/DigitalSkillApp/Seguridad" element={<Competencia4 />} />
              
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Basico/Pregunta_Desarrollo/3-1" element={<Desarrollo num={"3-1"} competencia={competencia_3_1} nivelPregunta={"Basico"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Intermedio/Pregunta_Desarrollo/3-1" element={<Desarrollo num={"3-1"} competencia={competencia_3_1} nivelPregunta={"Intermedio"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Avanzado/Pregunta_Desarrollo/3-1" element={<Desarrollo num={"3-1"} competencia={competencia_3_1} nivelPregunta={"Avanzado"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Basico/Pregunta_Alternativas/3-1" element={<Alternativas num={"3-1"} competencia={competencia_3_1} nivelPregunta={"Basico"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Intermedio/Pregunta_Alternativas/3-1" element={<Alternativas num={"3-1"} competencia={competencia_3_1} nivelPregunta={"Intermedio"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Avanzado/Pregunta_Alternativas/3-1" element={<Alternativas num={"3-1"} competencia={competencia_3_1} nivelPregunta={"Avanzado"} />} />
              
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Basico/Pregunta_Desarrollo/3-2" element={<Desarrollo num={"3-2"} competencia={competencia_3_2} nivelPregunta={"Basico"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Intermedio/Pregunta_Desarrollo/3-2" element={<Desarrollo num={"3-2"} competencia={competencia_3_2} nivelPregunta={"Intermedio"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Avanzado/Pregunta_Desarrollo/3-2" element={<Desarrollo num={"3-2"} competencia={competencia_3_2} nivelPregunta={"Avanzado"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Basico/Pregunta_Alternativas/3-2" element={<Alternativas num={"3-2"} competencia={competencia_3_2} nivelPregunta={"Basico"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Intermedio/Pregunta_Alternativas/3-2" element={<Alternativas num={"3-2"} competencia={competencia_3_2} nivelPregunta={"Intermedio"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Avanzado/Pregunta_Alternativas/3-2" element={<Alternativas num={"3-2"} competencia={competencia_3_2} nivelPregunta={"Avanzado"} />} />
              
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Basico/Pregunta_Desarrollo/3-3" element={<Desarrollo num={"3-3"} competencia={competencia_3_3} nivelPregunta={"Basico"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Intermedio/Pregunta_Desarrollo/3-3" element={<Desarrollo num={"3-3"} competencia={competencia_3_3} nivelPregunta={"Intermedio"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Avanzado/Pregunta_Desarrollo/3-3" element={<Desarrollo num={"3-3"} competencia={competencia_3_3} nivelPregunta={"Avanzado"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Basico/Pregunta_Alternativas/3-3" element={<Alternativas num={"3-3"} competencia={competencia_3_3} nivelPregunta={"Basico"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Intermedio/Pregunta_Alternativas/3-3" element={<Alternativas num={"3-3"} competencia={competencia_3_3} nivelPregunta={"Intermedio"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Avanzado/Pregunta_Alternativas/3-3" element={<Alternativas num={"3-3"} competencia={competencia_3_3} nivelPregunta={"Avanzado"} />} />
              
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Basico/Pregunta_Desarrollo/3-4" element={<Desarrollo num={"3-4"} competencia={competencia_3_4} nivelPregunta={"Basico"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Intermedio/Pregunta_Desarrollo/3-4" element={<Desarrollo num={"3-4"} competencia={competencia_3_4} nivelPregunta={"Intermedio"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Avanzado/Pregunta_Desarrollo/3-4" element={<Desarrollo num={"3-4"} competencia={competencia_3_4} nivelPregunta={"Avanzado"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Basico/Pregunta_Alternativas/3-4" element={<Alternativas num={"3-4"} competencia={competencia_3_4} nivelPregunta={"Basico"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Intermedio/Pregunta_Alternativas/3-4" element={<Alternativas num={"3-4"} competencia={competencia_3_4} nivelPregunta={"Intermedio"} />} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Avanzado/Pregunta_Alternativas/3-4" element={<Alternativas num={"3-4"} competencia={competencia_3_4} nivelPregunta={"Avanzado"} />} />
              
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Bloques" element={<Simulador_Bloques/>} />
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Codigo" element={<Simulador_Codigo/>} />
              {/* <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/" element={<Simulador_CC/>} /> */}
              <Route path="/DigitalSkillApp/Creacion_Contenido_Digital/Simulador_Powerpoint" element={<Simulador_Powerpoint/>} />

              <Route path="/DigitalSkillApp/Seguridad/Basico/Pregunta_Desarrollo/4-1" element={<Desarrollo num={"4-1"} competencia={competencia_4_1} nivelPregunta={"Basico"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Intermedio/Pregunta_Desarrollo/4-1" element={<Desarrollo num={"4-1"} competencia={competencia_4_1} nivelPregunta={"Intermedio"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Avanzado/Pregunta_Desarrollo/4-1" element={<Desarrollo num={"4-1"} competencia={competencia_4_1} nivelPregunta={"Avanzado"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Basico/Pregunta_Alternativas/4-1" element={<Alternativas num={"4-1"} competencia={competencia_4_1} nivelPregunta={"Basico"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Intermedio/Pregunta_Alternativas/4-1" element={<Alternativas num={"4-1"} competencia={competencia_4_1} nivelPregunta={"Intermedio"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Avanzado/Pregunta_Alternativas/4-1" element={<Alternativas num={"4-1"} competencia={competencia_4_1} nivelPregunta={"Avanzado"}  />} />

              <Route path="/DigitalSkillApp/Seguridad/Basico/Pregunta_Desarrollo/4-2" element={<Desarrollo num={"4-2"} competencia={competencia_4_2} nivelPregunta={"Basico"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Intermedio/Pregunta_Desarrollo/4-2" element={<Desarrollo num={"4-2"} competencia={competencia_4_2} nivelPregunta={"Intermedio"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Avanzado/Pregunta_Desarrollo/4-2" element={<Desarrollo num={"4-2"} competencia={competencia_4_2} nivelPregunta={"Avanzado"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Basico/Pregunta_Alternativas/4-2" element={<Alternativas num={"4-2"} competencia={competencia_4_2} nivelPregunta={"Basico"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Intermedio/Pregunta_Alternativas/4-2" element={<Alternativas num={"4-2"} competencia={competencia_4_2} nivelPregunta={"Intermedio"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Avanzado/Pregunta_Alternativas/4-2" element={<Alternativas num={"4-2"} competencia={competencia_4_2} nivelPregunta={"Avanzado"}  />} />
              
              <Route path="/DigitalSkillApp/Seguridad/Basico/Pregunta_Desarrollo/4-3" element={<Desarrollo num={"4-3"} competencia={competencia_4_3} nivelPregunta={"Basico"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Intermedio/Pregunta_Desarrollo/4-3" element={<Desarrollo num={"4-3"} competencia={competencia_4_3} nivelPregunta={"Intermedio"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Avanzado/Pregunta_Desarrollo/4-3" element={<Desarrollo num={"4-3"} competencia={competencia_4_3} nivelPregunta={"Avanzado"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Basico/Pregunta_Alternativas/4-3" element={<Alternativas num={"4-3"} competencia={competencia_4_3} nivelPregunta={"Basico"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Intermedio/Pregunta_Alternativas/4-3" element={<Alternativas num={"4-3"} competencia={competencia_4_3} nivelPregunta={"Intermedio"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Avanzado/Pregunta_Alternativas/4-3" element={<Alternativas num={"4-3"} competencia={competencia_4_3} nivelPregunta={"Avanzado"}  />} />
              
              <Route path="/DigitalSkillApp/Seguridad/Basico/Pregunta_Desarrollo/4-4" element={<Desarrollo num={"4-4"} competencia={competencia_4_4} nivelPregunta={"Basico"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Intermedio/Pregunta_Desarrollo/4-4" element={<Desarrollo num={"4-4"} competencia={competencia_4_4} nivelPregunta={"Intermedio"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Avanzado/Pregunta_Desarrollo/4-4" element={<Desarrollo num={"4-4"} competencia={competencia_4_4} nivelPregunta={"Avanzado"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Basico/Pregunta_Alternativas/4-4" element={<Alternativas num={"4-4"} competencia={competencia_4_4} nivelPregunta={"Basico"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Intermedio/Pregunta_Alternativas/4-4" element={<Alternativas num={"4-4"} competencia={competencia_4_4} nivelPregunta={"Intermedio"}  />} />
              <Route path="/DigitalSkillApp/Seguridad/Avanzado/Pregunta_Alternativas/4-4" element={<Alternativas num={"4-4"} competencia={competencia_4_4} nivelPregunta={"Avanzado"}  />} />
              
              <Route path="/DigitalSkillApp/Seguridad/Simulador_Ergonomia" element={<Simulador_Ergonomia/>} />
              <Route path="/DigitalSkillApp/Seguridad/Simulador_Web" element={<Simulador_Web/>} />
              <Route path="/DigitalSkillApp/Seguridad/Simulador_Correos/Bandeja" element={<Simulador_Correos_Bandeja/>} />
              <Route path="/DigitalSkillApp/Seguridad/Simulador_Correos/Enviados" element={<Simulador_Correos_Enviados/>} />
              <Route path="/DigitalSkillApp/Seguridad/Simulador_Correos/Basurero" element={<Simulador_Correos_Basurero/>} />
              <Route path="/DigitalSkillApp/Seguridad/Simulador_Correos/Instrucciones" element={<Simulador_Correos_Instrucciones/>} />
            </Routes>
          </BrowserRouter>
  );
}