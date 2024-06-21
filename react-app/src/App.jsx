// import './App.css'
// import { TwitterFollowCard } from './TwitterFollowCard'

// export function App () {
    
//     return (
        
//         <section className='App'>
//             <button>Click me</button>
//             <TwitterFollowCard 
//                 Username="@panchuwu"
//                 isFollowing
//                 name="Francisca González"
//             />

//             <TwitterFollowCard
//                 Username="@panchuwu"
//                 isFollowing={false}
//                 name="Francisca González"
//             />
//         </section>
        
//     )
// }
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Entrypoint from './Entrypoint.jsx';
import Competencia3 from './DigitalSkillApp/Competencia3.jsx';
import Competencia4 from './DigitalSkillApp/Competencia4.jsx';
import Tests_3_1 from './DigitalSkillApp/Creacion_Contenido_Digital/3-1/Tests.jsx';
import Desarrollo_3_1 from './DigitalSkillApp/Creacion_Contenido_Digital/3-1/Pregunta_Desarrollo/HU8.jsx';
import Tests_3_2 from './DigitalSkillApp/Creacion_Contenido_Digital/3-2/Tests.jsx';
import Tests_3_3 from './DigitalSkillApp/Creacion_Contenido_Digital/3-3/Tests.jsx';
import Tests_3_4 from './DigitalSkillApp/Creacion_Contenido_Digital/3-4/Tests.jsx';
import Tests_4_1 from './DigitalSkillApp/Seguridad/4-1/Tests.jsx';
import Tests_4_2 from './DigitalSkillApp/Seguridad/4-2/Tests.jsx';
import Tests_4_3 from './DigitalSkillApp/Seguridad/4-3/Tests.jsx';
import Tests_4_4 from './DigitalSkillApp/Seguridad/4-4/Tests.jsx';
import './App.css';

// import Register from './user/Register';
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
// DigitalSkillApp/Creacion_Contenido_Digital/3-1/Pregunta_Desarrollo/HU8.jsx

export function App () {

  return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Entrypoint />} />
              <Route path="/DigitalSkillApp/Creacion-Contenido-Digital" element={<Competencia3 />} />
              <Route path="/DigitalSkillApp/Seguridad" element={<Competencia4 />} />
              <Route path="/DigitalSkillApp/Creacion-Contenido-Digital/3-1" element={<Tests_3_1 />} />
              <Route path="/DigitalSkillApp/Creacion-Contenido-Digital/3-1/Pregunta_Desarrollo" element={<Desarrollo_3_1 />} />
              <Route path="/DigitalSkillApp/Creacion-Contenido-Digital/3-2" element={<Tests_3_2 />} />
              <Route path="/DigitalSkillApp/Creacion-Contenido-Digital/3-3" element={<Tests_3_3 />} />
              <Route path="/DigitalSkillApp/Creacion-Contenido-Digital/3-4" element={<Tests_3_4 />} />
              <Route path="/DigitalSkillApp/Seguridad/4-1" element={<Tests_4_1 />} />
              <Route path="/DigitalSkillApp/Seguridad/4-2" element={<Tests_4_2 />} />
              <Route path="/DigitalSkillApp/Seguridad/4-3" element={<Tests_4_3 />} />
              <Route path="/DigitalSkillApp/Seguridad/4-4" element={<Tests_4_4 />} />
              {/* <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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