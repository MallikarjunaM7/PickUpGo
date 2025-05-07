import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import Button from '../components/Button';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
      }
    ];
    
    setRestaurants(mockRestaurants);
    setLoading(false);
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Order. Pick Up. Enjoy.</h1>
          <p className="text-xl mb-8">Skip the wait and pickup your favorite food</p>
          <Link to="/restaurants">
            <Button variant="secondary" className="text-lg px-6 py-3">
              Browse Restaurants
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Featured Restaurants */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Restaurants</h2>
        
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-8">
          <Link to="/restaurants">
            <Button>View All Restaurants</Button>
          </Link>
        </div>
      </div>
      
      {/* How It Works */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-4">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Browse & Order</h3>
              <p className="text-gray-600">Browse restaurants and select your favorite dishes</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Wait for Preparation</h3>
              <p className="text-gray-600">The restaurant will prepare your food</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Pick Up & Enjoy</h3>
              <p className="text-gray-600">Skip the line and pick up your food when it's ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;