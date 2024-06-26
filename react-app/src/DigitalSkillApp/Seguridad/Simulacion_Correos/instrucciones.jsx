import React from 'react';
import "./correo.css";

const instrucciones = () => {
    return (
        <div className="recuadro-gris"> 
            <h1>Instrucciones del test</h1>
            <p>Leer cada correo en la bandeja de entrada y colocar en el basurero aquellos que se consideren como phishing o 
                como correo malicioso, una vez finalizado el test hacer click en el botón "Terminar evaluación" dentro del 
                basurero para ver tu puntaje. NOTA: se pueden destacar secciones de los correos para facilitar el análisis 
            </p>
        </div>
    );
};

export default instrucciones;