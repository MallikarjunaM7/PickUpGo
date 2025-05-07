import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FoodCard from '../components/FoodCard';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    // Mock data - in a real app, fetch from API
    const mockRestaurant = {
      id: parseInt(id),
      name: "Spice Paradise",
      cuisine: "Indian",
      rating: 4.5,
      image: "/api/placeholder/800/300",
      address: "123 Main St",
      phone: "555-123-4567",
      hours: "10:00 AM - 10:00 PM",
      description: "Authentic Indian cuisine with a modern twist.",
      preparationTime: 20
    };
    
    const mockFoods = [
      {
        id: 1,
        name: "Butter Chicken",
        description: "Tender chicken cooked in creamy tomato sauce.",
        price: 12.99,
        category: "Main Course",
        image: "/api/placeholder/300/200"
      },
      {
        id: 2,
        name: "Garlic Naan",
        description: "Freshly baked bread with garlic flavor.",
        price: 3.99,
        category: "Bread",
        image: "/api/placeholder/300/200"
      },
      {
        id: 3,
        name: "Vegetable Biryani",
        description: "Mixed vegetables with aromatic basmati rice.",
        price: 10.99,
        category: "Rice",
        image: "/api/placeholder/300/200"
      },
      {
        id: 4,
        name: "Gulab Jamun",
        description: "Sweet milk dumplings soaked in rose syrup.",
        price: 4.99,
        category: "Dessert",
        image: "/api/placeholder/300/200"
      },
      {
        id: 5,
        name: "Mango Lassi",
        description: "Refreshing yogurt drink with mango pulp.",
        price: 3.49,
        category: "Beverages",
        image: "/api/placeholder/300/200"
      },
      {
        id: 6,
        name: "Paneer Tikka",
        description: "Grilled cottage cheese with spices.",
        price: 9.99,
        category: "Appetizers",
        image: "/api/placeholder/300/200"
      },
    ];
    
    setRestaurant(mockRestaurant);
    setFoods(mockFoods);
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }
  
  if (!restaurant) {
    return <div className="text-center py-12">Restaurant not found</div>;
  }
  
  const categories = [...new Set(foods.map(food => food.category))];
  
  const filteredFoods = selectedCategory 
    ? foods.filter(food => food.category === selectedCategory)
    : foods;
  
  return (
    <div>
      {/* Restaurant Banner */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="container mx-auto px-4 py-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex items-center space-x-4 mb-2">
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                {restaurant.rating} ★
              </span>
              <span>{restaurant.cuisine}</span>
            </div>
            <p>{restaurant.address} • {restaurant.phone}</p>
          </div>
        </div>
      </div>
      
      {/* Restaurant Details */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <p className="text-gray-600">{restaurant.description}</p>
            <p className="text-gray-600 mt-2">Hours: {restaurant.hours}</p>
            <p className="text-gray-600">Preparation Time: {restaurant.preparationTime} minutes</p>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex overflow-x-auto space-x-2 py-2">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedCategory === '' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => setSelectedCategory('')}
            >
              All Items
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Food Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;