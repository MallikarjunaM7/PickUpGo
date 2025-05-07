import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  
  return (
    <nav className="bg-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">PickandGo</Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/restaurants" className="hover:text-orange-200">Restaurants</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hover:text-orange-200">
                {user?.name || 'Profile'}
              </Link>
              <button onClick={logout} className="hover:text-orange-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-orange-200">Login</Link>
              <Link to="/register" className="hover:text-orange-200">Register</Link>
            </>
          )}
          
          <Link to="/cart" className="relative">
            <span className="hover:text-orange-200">Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
