// globalVariables.js

let tiempoTranscurrido = 0;
let intervalId = null;

export const startCronometro = () => {
    intervalId = setInterval(() => {
        tiempoTranscurrido++;
    }, 1000); // Incrementa el tiempo cada segundo
};

export const stopCronometro = () => {
    clearInterval(intervalId);
};

export const getTiempoTranscurrido = () => tiempoTranscurrido;

export const setTiempoTranscurrido = (nuevoTiempo) => {
    tiempoTranscurrido = nuevoTiempo;
};

