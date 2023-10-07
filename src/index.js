import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // импортируем BrowserRouter
import App from './components/App/App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
