import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { UserProvider } from './assets/userContext.jsx'
import App from './App.jsx'

const root= createRoot(document.getElementById('root'));

root.render(
    <UserProvider>
        <App />
    </UserProvider>
);

