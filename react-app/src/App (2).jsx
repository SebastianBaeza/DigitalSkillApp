import React from 'react';
import { GlobalProvider } from './GlobalState';
import MiComponente from './MiComponente';

export function App() {
    return (
        <GlobalProvider>
            <MiComponente />
        </GlobalProvider>
    );
}

export default App;