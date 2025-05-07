import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import CartItem from '../components/CartItems';
import Button from '../components/Button';

const Cart = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // Assuming 8% tax
  const total = subtotal + tax;
  
  const handleCheckout = () => {
    // Add checkout logic here
    navigate('/checkout');
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="p-8 bg-white shadow-md rounded-lg">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/restaurants">
            <Button>Browse Restaurants</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
            
            <div className="p-4">
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                Add a note for the restaurant
              </label>
              <textarea
                id="note"
                rows="3"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Special instructions, allergies, etc."
              ></textarea>
            </div>
            
            <div className="p-4 border-t flex justify-between">
              <button 
                onClick={clearCart}
                className="text-red-500 hover:text-red-700"
              >
                Clear Cart
              </button>
              <Link to="/restaurants" className="text-blue-600 hover:text-blue-800">
                Add More Items
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleCheckout} 
              className="w-full"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;