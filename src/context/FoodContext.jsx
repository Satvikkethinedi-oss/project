import React, { createContext, useState, useEffect } from 'react';
import { getFoods } from '../services/foodAPI';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFoods().then(setFoods);
  }, []);

  return (
    <FoodContext.Provider value={{ foods, favorites, setFavorites }}>
      {children}
    </FoodContext.Provider>
  );
};