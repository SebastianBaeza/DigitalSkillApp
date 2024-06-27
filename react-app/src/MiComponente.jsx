import { useContext } from 'react';
import { GlobalContext } from './GlobalState';
import axios from 'axios';

const MiComponente = () => {
    const { appendDocumento, globalState } = useContext(GlobalContext);

    const agregarDocumento = async () => {
        // const nuevoDocumento = { nombre: 'nombre1', test: 'algo', puntaje: 232334, tiempo: 0 };
        const nuevoDocumento = { nombre: 'nombre1', test: 'algo', puntaje: 232334};
        console.log(nuevoDocumento);

        try {
            const response = await axios.post('http://localhost:8000/add-document', nuevoDocumento);
            console.log('Documento insertado', response.data);
            appendDocumento(nuevoDocumento); // Actualiza el estado global si la inserción es exitosa
        } catch (error) {
            console.error('Error al insertar el documento', error.response ? error.response.data : error);
        }
    };

    return (
        <div>
            <button onClick={agregarDocumento}>Agregar Documento</button>
            <pre>{JSON.stringify(globalState, null, 2)}</pre>
            <ul>
                {globalState.map((documento, index) => (
                    <li key={index}>Nombre: {documento.nombre}, Test: {documento.test}, Puntaje: {documento.puntaje}</li>
                ))}
            </ul>
        </div>
    );
};

export default MiComponente;