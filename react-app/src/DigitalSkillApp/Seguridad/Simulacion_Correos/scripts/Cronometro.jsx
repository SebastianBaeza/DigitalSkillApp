// Cronometro.jsx
import { useEffect, useState } from 'react';
import { setTiempoTranscurrido } from './globalVariables'; // Importa la función para actualizar la variable global

const Cronometro = ({ running }) => {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    let intervalo;
    if (running) {
      intervalo = setInterval(() => {
        setSegundos((s) => {
          setTiempoTranscurrido(s + 1); // Actualiza la variable global cada segundo
          return s + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [running]);

  return <div style={{display : 'flex'}}>{segundos+" segundos"}</div>;
};

export default Cronometro;
