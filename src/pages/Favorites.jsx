import React, { useContext } from 'react';
import { FoodContext } from '../context/FoodContext';
import FoodCard from '../components/FoodCard';

const Favorites = () => {
  const { favorites } = useContext(FoodContext);

  return (
    <div>
      <h2>Your Favorites</h2>
      {favorites.length ? (
        favorites.map(food => <FoodCard key={food.id} food={food} />)
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default Favorites;
