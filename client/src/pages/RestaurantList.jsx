import React, { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  
  useEffect(() => {
    // Mock data - in a real app, fetch from API
    const mockRestaurants = [
      {
        id: 1,
        name: "Spice Paradise",
        cuisine: "Indian",
        rating: 4.5,
        image: "/api/placeholder/400/250",
        address: "123 Main St",
        preparationTime: 20
      },
      {
        id: 2,
        name: "Burger Heaven",
        cuisine: "American",
        rating: 4.2,
        image: "/api/placeholder/400/250",
        address: "456 Oak Ave",
        preparationTime: 15
      },
      {
        id: 3,
        name: "Pizza Palace",
        cuisine: "Italian",
        rating: 4.7,
        image: "/api/placeholder/400/250",
        address: "789 Pine Blvd",
        preparationTime: 25
      },
      {
        id: 4,
        name: "Sushi Spot",
        cuisine: "Japanese",
        rating: 4.6,
        image: "/api/placeholder/400/250",
        address: "101 Maple Dr",
        preparationTime: 30
      },
      {
        id: 5,
        name: "Taco Time",
        cuisine: "Mexican",
        rating: 4.3,
        image: "/api/placeholder/400/250",
        address: "202 Elm St",
        preparationTime: 18
      },
    ];
    
    setRestaurants(mockRestaurants);
    setLoading(false);
  }, []);
  
  const cuisines = [...new Set(restaurants.map(r => r.cuisine))];
  
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = !selectedCuisine || restaurant.cuisine === selectedCuisine;
    
    return matchesSearch && matchesCuisine;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Restaurants</h1>
      
      <div className="mb-8 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <select
          
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Cuisines</option>
            {cuisines.map(cuisine => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : filteredRestaurants.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No restaurants found matching your criteria</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
