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
import HU8 from './HUs/HU8/HU8.jsx';
import HU9 from './HUs/HU9/HU9.jsx';
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

export function App () {

  return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Entrypoint />} />
              <Route path="/HUs/HU8/" element={<HU8 />} />
              <Route path="/HUs/HU9/" element={<HU9 />} />
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