import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import './tailwind.css';

createRoot(document.getElementById('root')!).render(
  <div>
    <App />
  </div>,
)
