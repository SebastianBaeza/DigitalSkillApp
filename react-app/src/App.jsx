import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Entrypoint from './Entrypoint.jsx';
import './App.css';

import HU01 from './HUs/HU01';
// import Composer_index from './Composer_index';
// import Composer from './Composer';
// import Perfil from './user/Perfil';
// import Login from './user/Login';
// import Etapa from './Etapa'
// import Piano from './Actividades/Piano';
// import Asociacion from './Actividades/Asociacion';
// import Sonido from './Sonido';
// import Draw from './Actividades/Draw';
// import AddLeccionr from './AddLeccion';

export function App () {

  return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Entrypoint />} />
              <Route path="/HU01" element={<HU01 />} />
              {/* <Route path="/login" element={<Login />} />
              <Route path="/sound" element={<Sonido />} />
              <Route path="/compositor" element={<Composer_index />} />
              <Route path="/compositor/:id" element={<Composer />} />
              <Route path="/perfil" element={<Perfil />}/>
              <Route path="/etapa" element={<Etapa />}/>
              <Route path="/piano" element={<Piano />} />
              <Route path="/asociacion" element={<Asociacion />} />
              <Route path="/llavesol" element={<Draw />} />
              <Route path="/AddLeccion" element={<AddLeccionr />} /> */}
            </Routes>
          </BrowserRouter>
  );
}

// export default App();