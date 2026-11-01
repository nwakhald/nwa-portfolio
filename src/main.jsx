import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/base.css';
import './styles/britishlightup.css';
import './styles/online-ncc.css';
import './styles/decor-planet.css';
import './styles/marketing.css';
import './styles/graphic-design.css';
import './styles/react.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>,
);
