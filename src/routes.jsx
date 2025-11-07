import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Favorites from './pages/Favorites';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/details/:id" element={<Details />} />
    <Route path="/favorites" element={<Favorites />} />
  </Routes>
);

export default AppRoutes;