import React, { createContext, useState } from 'react';

// Crear el contexto
export const GlobalContext = createContext();

// Proveedor del contexto
export const GlobalProvider = ({ children }) => {
    // Definir el estado global como un arreglo de objetos
    const [globalState, setGlobalState] = useState([]);
    const [puntaje, setPuntaje] = useState(0);

    // Función para agregar un nuevo documento al arreglo global
    const appendDocumento = (documento) => {
        setGlobalState((prevState) => [...prevState, documento]);
    };

    const SumarPuntaje = (puntajeObtenido, ponderacion) => {
        console.log("Puntaje Obtenido: " + puntajeObtenido);
        console.log("Ponderación: " + ponderacion);
        const puntaje_pond = puntajeObtenido * ponderacion;
        setPuntaje((prevPuntaje) => {
            console.log("PrevPuntaje: " + prevPuntaje);
            const nuevoPuntaje = prevPuntaje + puntaje_pond;
            console.log(nuevoPuntaje); // Aquí se muestra el valor actualizado
            return nuevoPuntaje;
        });
    };

    return (
        // Proveer el contexto con el arreglo global y la función de append
        <GlobalContext.Provider value={{ globalState, appendDocumento, SumarPuntaje }}>
            {children}
        </GlobalContext.Provider>
    );
};
