import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);
  
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <img 
          src={item.image || "/api/placeholder/80/80"} 
          alt={item.name} 
          className="w-16 h-16 object-cover rounded mr-4"
        />
        <div>
          <h4 className="font-medium">{item.name}</h4>
          <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center border rounded">
          <button 
            onClick={() => decreaseQuantity(item.id)} 
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-4">{item.quantity}</span>
          <button 
            onClick={() => increaseQuantity(item.id)} 
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <button 
          onClick={() => removeFromCart(item.id)} 
          className="ml-4 text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

