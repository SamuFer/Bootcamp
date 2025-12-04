import {BrowserRouter} from 'react-router'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // al Modo Estricto (StrictMode) -> usa el doble-invocar donde todo proceso se repite una segunda vez para la detección de errores.
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
