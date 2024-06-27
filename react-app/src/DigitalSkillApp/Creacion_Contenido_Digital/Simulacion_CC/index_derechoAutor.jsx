// import { useState, useEffect } from 'react';
// import './Simulador_CC.css';

// import paisajeImage from './assets/Paisaje.jpg';
// import musicaImage from './assets/MusicaAmbiental.jpg';
// import cientificoImage from './assets/articuloCientifico.jpg';
// import educacionImage from './assets/videoEducativo.jpg';

// export default function Simulador_CC() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredWorks, setFilteredWorks] = useState([]);
//   const [correctAnswer, setCorrectAnswer] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [accuracyPercentage, setAccuracyPercentage] = useState(null);
//   const [showLicenseQuestion, setShowLicenseQuestion] = useState(false);
//   const [redirectToNextPage, setRedirectToNextPage] = useState(false);

//   const works = [
//     {
//       title: 'Fotografía de Paisaje',
//       description: 'Hermosa fotografía de un paisaje de playa.',
//       imageUrl: paisajeImage,
//       license: 'CC BY',
//     },
//     {
//       title: 'Música Ambiental',
//       description: 'Pieza musical relajante para uso libre.',
//       imageUrl: musicaImage,
//       license: 'CC BY-SA',
//     },
//     {
//       title: 'Artículo Científico',
//       description: 'Investigación sobre el cambio climático.',
//       imageUrl: cientificoImage,
//       license: 'CC BY-NC',
//     },
//     {
//       title: 'Video Educativo',
//       description: 'Tutorial sobre programación web.',
//       imageUrl: educacionImage,
//       license: 'CC BY-ND',
//     },
//   ];

//   useEffect(() => {
//     setFilteredWorks(works);
//     const licenseButton = document.createElement('button');
//     licenseButton.textContent = 'Respuesta sobre Licencia';
//     licenseButton.classList.add('license-info-button');
//     licenseButton.onclick = () => {
//       setShowLicenseQuestion(true);
//     };
//     document.body.appendChild(licenseButton);
//     return () => {
//       document.body.removeChild(licenseButton);
//     };
//   }, []);

//   const searchWorks = () => {
//     const query = searchQuery.toLowerCase();
//     const filtered = works.filter(
//       (work) =>
//         work.title.toLowerCase().includes(query) ||
//         work.description.toLowerCase().includes(query) ||
//         work.license.toLowerCase().includes(query)
//     );
//     setFilteredWorks(filtered);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   const submitQuestion = () => {
//     const question = document.getElementById('license-question').value.trim().toUpperCase();
//     let correctLettersCount = 0;

//     for (let i = 0; i < correctAnswer.length; i++) {
//       if (correctAnswer[i] === question[i]) {
//         correctLettersCount++;
//       }
//     }

//     const accuracy = (correctLettersCount / correctAnswer.length) * 100;
//     setAccuracyPercentage(accuracy);
//     setShowLicenseQuestion(false);
//     setRedirectToNextPage(true);
//     alert(`Porcentaje de acierto: ${accuracy}%`);
//   };

//   const startEvaluation = () => {
//     const randomIndex = Math.floor(Math.random() * works.length);
//     const randomWork = works[randomIndex];
//     const query = randomWork.title.toLowerCase();
//     setCorrectAnswer(randomWork.license);

//     document.getElementById('welcome-page').style.display = 'none';
//     document.getElementById('sidebar-reminder').style.display = 'block';
//     document.getElementById('sidebar-instruction-text').innerText = `Debe buscar la licencia que tiene el trabajo de "${query}".`;
//   };

//   useEffect(() => {
//     if (redirectToNextPage) {
//       window.location.href = "/DigitalSkillApp/Creacion_Contenido_Digital/Basico/Pregunta_Alternativas/3-2"
//     }
//   }, []);

//   return (
//     <div>
//       <div
//         id="welcome-page"
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           backgroundColor: 'rgba(0, 0, 0, 0.8)',
//           color: 'white',
//           zIndex: 10000,
//           flexDirection: 'column',
//           textAlign: 'center',
//         }}
//       >
//         <h1>Evaluación de Creative Commons</h1>
//         <p>Instrucciones: Debe buscar la licencia indicado en el recordatorio</p>
//         <button onClick={startEvaluation}>Comenzar</button>
//       </div>
//       <header>
//         <h1>Simulación de Creative Commons</h1>
//       </header>
//       <nav>
//         <a href="#home">Inicio</a>
//         <a href="#about">Acerca de</a>
//         <a href="#contact">Contacto</a>
//       </nav>
//       <div className="container">
//         <div
//           id="sidebar-reminder"
//           style={{
//             display: 'none',
//             position: 'fixed',
//             top: '5%',
//             right: 0,
//             backgroundColor: '#80b382',
//             color: 'white',
//             padding: '10px',
//             borderRadius: '10px 0 0 10px',
//           }}
//         >
//           <h3>Recordatorio:</h3>
//           <p id="sidebar-instruction-text"></p>
//         </div>
//         <div className="search-bar">
//           <input
//             type="text"
//             id="search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Buscar trabajos licenciados..."
//           />
//           <button onClick={searchWorks}>Buscar</button>
//         </div>
//         <div className="results" id="results">
//           {filteredWorks.length > 0 ? (
//             filteredWorks.map((work) => (
//               <div className="result-item" key={work.title}>
//                 <img src={work.imageUrl} alt={work.title} />
//                 <h3>{work.title}</h3>
//                 <p>{work.description}</p>
//                 <p>
//                   <strong>Licencia:</strong> {work.license}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p>No se encontraron trabajos.</p>
//           )}
//         </div>
//       </div>
//       <footer>
//         <p>&copy; 2024 Simulación de Creative Commons. Todos los derechos reservados.</p>
//       </footer>

//       {showLicenseQuestion && (
//         <div className="modal" style={{ display: 'block' }}>
//           <div className="modal-content">
//             <span className="close" onClick={() => setShowLicenseQuestion(false)}>
//               &times;
//             </span>
//             <h2>¿A qué licencia pertenece la obra?</h2>
//             <input type="text" id="license-question" placeholder="Escribe tu respuesta..." />
//             <button onClick={submitQuestion}>Enviar</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
import { useState, useEffect } from 'react';
import './Simulador_CC.css';

import paisajeImage from './assets/Paisaje.jpg';
import musicaImage from './assets/MusicaAmbiental.jpg';
import cientificoImage from './assets/articuloCientifico.jpg';
import educacionImage from './assets/videoEducativo.jpg';

export default function Simulador_CC() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [accuracyPercentage, setAccuracyPercentage] = useState(null);
  const [showLicenseQuestion, setShowLicenseQuestion] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState('');

  const works = [
    {
      title: 'Fotografía de Paisaje',
      description: 'Hermosa fotografía de un paisaje de playa.',
      imageUrl: paisajeImage,
      license: 'CC BY',
    },
    {
      title: 'Música Ambiental',
      description: 'Pieza musical relajante para uso libre.',
      imageUrl: musicaImage,
      license: 'CC BY-SA',
    },
    {
      title: 'Artículo Científico',
      description: 'Investigación sobre el cambio climático.',
      imageUrl: cientificoImage,
      license: 'CC BY-NC',
    },
    {
      title: 'Video Educativo',
      description: 'Tutorial sobre programación web.',
      imageUrl: educacionImage,
      license: 'CC BY-ND',
    },
  ];

  useEffect(() => {
    setFilteredWorks(works);
    const licenseButton = document.createElement('button');
    licenseButton.textContent = 'Respuesta sobre Licencia';
    licenseButton.classList.add('license-info-button');
    licenseButton.onclick = () => {
      setShowLicenseQuestion(true);
    };
    document.body.appendChild(licenseButton);
    return () => {
      document.body.removeChild(licenseButton);
    };
  }, []);

  const searchWorks = () => {
    const query = searchQuery.toLowerCase();
    const filtered = works.filter(
      (work) =>
        work.title.toLowerCase().includes(query) ||
        work.description.toLowerCase().includes(query) ||
        work.license.toLowerCase().includes(query)
    );
    setFilteredWorks(filtered);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const submitQuestion = () => {
    const question = document.getElementById('license-question').value.trim().toUpperCase();
    let correctLettersCount = 0;

    for (let i = 0; i < correctAnswer.length; i++) {
      if (correctAnswer[i] === question[i]) {
        correctLettersCount++;
      }
    }

    const accuracy = (correctLettersCount / correctAnswer.length) * 100;
    setAccuracyPercentage(accuracy);
    setShowLicenseQuestion(false);
    alert(`Porcentaje de acierto: ${accuracy}%`);

    // Redirección directa
    window.location.assign("/DigitalSkillApp/Creacion_Contenido_Digital/Basico/Pregunta_Alternativas/3-4");
  };

  const startEvaluation = () => {
    const randomIndex = Math.floor(Math.random() * works.length);
    const randomWork = works[randomIndex];
    const query = randomWork.title.toLowerCase();
    setCorrectAnswer(randomWork.license);

    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('sidebar-reminder').style.display = 'block';
    document.getElementById('sidebar-instruction-text').innerText = `Debe buscar la licencia que tiene el trabajo de "${query}".`;
  };

  const openInfoModal = (title, content) => {
    setInfoModalContent(
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    );
    setInfoModalVisible(true);
  };

  return (
    <div>
      <div
        id="welcome-page"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          zIndex: 10000,
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <h1>Evaluación de Creative Commons</h1>
        <p>Instrucciones: Debe buscar la licencia indicado en el recordatorio</p>
        <button onClick={startEvaluation}>Comenzar</button>
      </div>
      <header>
        <h1>Simulación de Creative Commons</h1>
      </header>
      <nav>
        <a href="#home" onClick={() => openInfoModal('Inicio', 'Ayuda: Estas saliendo de la zona para completar la actividad.')}>Inicio</a>
        <a href="#about" onClick={() => openInfoModal('Acerca de', 'Creative Commons es una organización global sin fines de lucro que habilita el intercambio y la reutilización del conocimiento y la creatividad a través de la provisión gratuita de herramientas legales. Fundada en 2001, nuestra misión es ayudar a los individuos y organizaciones a compartir y aprovechar su trabajo creativamente bajo términos legales claros y estándar, facilitando así la innovación y el acceso al conocimiento.')}>Acerca de</a>
        <a href="#contact" onClick={() => openInfoModal('Contacto', 'Para ponerte en contacto con Creative Commons, puedes enviarnos un correo electrónico a info@creativecommons.org o llamarnos al +1 (123) 456-7890. Nuestra oficina principal está ubicada en 1234 Main St, Anytown. Estamos disponibles de lunes a viernes de 9:00 a.m. a 5:00 p.m.')}>Contacto</a>
      </nav>
      <div className="container">
        <div
          id="sidebar-reminder"
          style={{
            display: 'none',
            position: 'fixed',
            top: '5%',
            right: 0,
            backgroundColor: '#80b382',
            color: 'white',
            padding: '10px',
            borderRadius: '10px 0 0 10px',
          }}
        >
          <h3>Recordatorio:</h3>
          <p id="sidebar-instruction-text"></p>
        </div>
        <div className="search-bar">
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar trabajos licenciados..."
          />
          <button onClick={searchWorks}>Buscar</button>
        </div>
        <div className="results" id="results">
          {filteredWorks.length > 0 ? (
            filteredWorks.map((work) => (
              <div className="result-item" key={work.title}>
                <img src={work.imageUrl} alt={work.title} />
                <h3>{work.title}</h3>
                <p>{work.description}</p>
                <p>
                  <strong>Licencia:</strong> {work.license}
                </p>
              </div>
            ))
          ) : (
            <p>No se encontraron trabajos.</p>
          )}
        </div>
      </div>
      <footer>
        <p>&copy; 2024 Simulación de Creative Commons. Todos los derechos reservados.</p>
      </footer>

      {showLicenseQuestion && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowLicenseQuestion(false)}>
              &times;
            </span>
            <h2>¿A qué licencia pertenece la obra?</h2>
            <input type="text" id="license-question" placeholder="Escribe tu respuesta..." />
            <button onClick={submitQuestion}>Enviar</button>
          </div>
        </div>
      )}
      {infoModalVisible && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => setInfoModalVisible(false)}>&times;</span>
            {infoModalContent}
          </div>
        </div>
      )}
    </div>
  );
}