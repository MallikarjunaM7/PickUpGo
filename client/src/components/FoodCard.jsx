import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import Button from './Button';

const FoodCard = ({ food }) => {
  const { addToCart } = useContext(CartContext);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={food.image || "/api/placeholder/300/200"} 
        alt={food.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{food.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{food.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-orange-500 font-bold">${food.price.toFixed(2)}</span>
          <Button onClick={() => addToCart(food)}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;