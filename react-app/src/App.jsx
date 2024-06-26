import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Entrypoint from './Entrypoint.jsx';
import './App.css';

import HU01 from './HUs/HU01';
import HU02 from './HUs/HU02';

export function App () {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entrypoint />} />
        <Route path="/HU01" element={<HU01 />} />
        <Route path="/HU02" element={<HU02 />} />
      </Routes>
    </BrowserRouter>
  );
}