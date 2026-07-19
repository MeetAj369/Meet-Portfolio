import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* Global styles — order matters */
import './styles/typography.css';
import './styles/animations.css';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
