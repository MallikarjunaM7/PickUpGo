
import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurants/${restaurant.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img 
          src={restaurant.image || "/api/placeholder/400/250"} 
          alt={restaurant.name} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{restaurant.name}</h3>
          <div className="flex items-center mt-1">
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
              {restaurant.rating} ★
            </span>
            <span className="text-gray-600 text-sm">{restaurant.cuisine}</span>
          </div>
          <p className="text-gray-600 text-sm mt-2">{restaurant.address}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {restaurant.preparationTime} min preparation
            </span>
            <span className="text-blue-600 text-sm font-medium">View Menu</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;