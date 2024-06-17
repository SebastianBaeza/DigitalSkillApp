// import React, { useState, useEffect } from 'react';
// import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import Entrypoint from './Entrypoint';
// import HU8 from './HUs/HU8/HU8';
// import HU9 from './HUs/HU9/HU9';
// import './App.css';

// export function App() {
//   const [clickCount, setClickCount] = useState(0);

//   useEffect(() => {
//     // Función para manejar el conteo de clicks
//     const handleClick = () => {
//       setClickCount(prevCount => prevCount + 1);
//     };

//     // Agregar un listener de evento para 'click' en todo el documento
//     document.addEventListener('click', handleClick);

//     // Limpieza del efecto para remover el listener cuando el componente se desmonta
//     return () => {
//       document.removeEventListener('click', handleClick);
//     };
//   }, []); // El array vacío [] asegura que este efecto se ejecute solo una vez, similar a componentDidMount

//   return (
//     <BrowserRouter>
//       {/* Mostrar el contador en la esquina superior izquierda */}
//       <div className="click-counter">
//         Clicks: {clickCount}
//       </div>
      
//       <Routes>
//         <Route path="/" element={<Entrypoint />} />
//         <Route path="/HUs/HU8/" element={<HU8 />} />
//         <Route path="/HUs/HU9/" element={<HU9 />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Entrypoint from './Entrypoint';
import HU8 from './HUs/HU8/HU8';
import HU9 from './HUs/HU9/HU9';
import './App.css';

export function App() {
  const [clickCount, setClickCount] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    // Función para manejar el conteo de clicks
    const handleClick = () => {
      setClickCount(prevCount => prevCount + 1);
    };

    // Agregar un listener de evento para 'click' en todo el documento
    document.addEventListener('click', handleClick);

    // Función para manejar el tiempo transcurrido
    const interval = setInterval(() => {
      setTimeSpent(prevTime => prevTime + 1);
    }, 1000); // Actualizar el tiempo cada segundo

    // Limpieza del efecto para remover el listener y el intervalo cuando el componente se desmonta
    return () => {
      document.removeEventListener('click', handleClick);
      clearInterval(interval);
    };
  }, []);

  // Función para formatear el tiempo transcurrido en formato hh:mm:ss
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Mostrar el contador de clicks en la esquina superior izquierda */}
        <div className="click-counter">
          Clicks: {clickCount}
        </div>

        {/* Mostrar el tiempo transcurrido en la esquina superior derecha */}
        <div className="time-spent">
          Tiempo: {formatTime(timeSpent)}
        </div>
      </div>
      
      <Routes>
        <Route path="/" element={<Entrypoint />} />
        <Route path="/HUs/HU8/" element={<HU8 />} />
        <Route path="/HUs/HU9/" element={<HU9 />} />
      </Routes>
    </BrowserRouter>
  );
}
