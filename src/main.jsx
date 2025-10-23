import './ui/css/index.css'
import {AuthProvider} from "./infrastructure/client/axios/context/AuthProvider.tsx";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import {ServicesContext} from "@/infrastructure/client/ServiceContext.js";
import {createServices} from "@/infrastructure/client/createService.js";

const services = createServices(AuthProvider);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <ServicesContext.Provider value={services}>
                <App />
            </ServicesContext.Provider>
        </AuthProvider>
    </React.StrictMode>
);