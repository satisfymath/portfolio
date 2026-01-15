import React from 'react';
import ReactDOM from 'react-dom/client';
import VConsole from 'vconsole';
import App from './App';
import '../styles/globals.css';

// Initialize vConsole for mobile debugging
// You can remove this line later when done debugging
if (import.meta.env.PROD || import.meta.env.DEV) {
    new VConsole();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
