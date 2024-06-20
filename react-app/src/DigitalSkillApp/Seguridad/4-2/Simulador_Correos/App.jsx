import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Bandeja from './bandeja'; // Importa el componente Bandeja
import Enviados from './enviados'; // Importa el componente Enviados
import Basurero from './basurero'; // Importa el componente Basurero

export function App() {
    const Sidebar = () => {
        return (
            <div className="sidebar">
                <ul>
                    <li><Link to="/">Bandeja de entrada</Link></li>
                    <li><Link to="/enviados">Elementos enviados</Link></li>
                    <li><Link to="/basurero">Elementos eliminados</Link></li>
                </ul>
            </div>
        );
    };

    return (
        <Router>
            <div className="app">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Bandeja />} />
                        <Route path="/enviados" element={<Enviados />} />
                        <Route path="/basurero" element={<Basurero />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}