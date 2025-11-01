import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import the router
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from './context/AppContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
       <AppContextProvider>
        <App />
       </AppContextProvider>
      
    </BrowserRouter>
  </React.StrictMode>
);