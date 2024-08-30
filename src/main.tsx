import { createRoot } from 'react-dom/client'
import App from './App'
import './App.css';
import './tailwind.css';

createRoot(document.getElementById('root')!).render(
  <div>
    <App />
  </div>,
)