import axios from 'axios';

export default async function agregarDocumento  (puntaje,test) {
    // const nuevoDocumento = { nombre: 'nombre1', test: 'algo', puntaje: 232334, tiempo: 0 
    const nuevoDocumento = { nombre: '', test: test, puntaje: parseInt(puntaje, 10)};
    console.log(nuevoDocumento);
    let response;
    try {
        response = await axios.post('http://localhost:8000/add-document', nuevoDocumento);
        console.log('Documento insertado', response.data);
    } catch (error) {
        console.error('Error al insertar el documento', error.response ? error.response.data : error);
        return false;
    }
    return response.data;
}
