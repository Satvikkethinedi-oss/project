import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FoodProvider } from './context/FoodContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <FoodProvider>
      <App />
    </FoodProvider>
  </BrowserRouter>
);