import axios from 'axios';

export default async function obtenerDocumento (nombre) {
    let response;
    try {
        response = await axios.get(`http://localhost:8000/get-documents${nombre ? `?nombre=${nombre}` : ''}`);
        console.log('Documentos obtenidos', response.data);
    } catch (error) {
        console.error('Error al obtener los documentos', error.response ? error.response.data : error);
        return false;
    }
    return response.data;
}