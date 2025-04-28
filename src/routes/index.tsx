import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/base">
      <Routes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
