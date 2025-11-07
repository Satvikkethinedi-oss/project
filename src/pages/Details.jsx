import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FoodContext } from '../context/FoodContext';

const Details = () => {
  const { id } = useParams();
  const { foods } = useContext(FoodContext);
  const food = foods.find(f => f.id === parseInt(id));

  return food ? (
    <div>
      <h2>{food.name}</h2>
      <img src={food.image} alt={food.name} />
      <p>{food.description}</p>
    </div>
  ) : (
    <div>Food not found</div>
  );
};

export default Details;