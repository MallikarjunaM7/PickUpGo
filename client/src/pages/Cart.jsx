"use client"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import CartItem from "../components/CartItem"
import { useCart } from "../context/CartContext"

const Cart = () => {
  const { cartItems, restaurant, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center"
      >
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-center mb-6">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/restaurants">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-rose-500 text-white rounded-md font-medium hover:bg-rose-600"
            >
              Browse Restaurants
            </motion.button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Your Cart</h1>
      </div>

      {restaurant && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="font-medium text-gray-900">Order from: {restaurant.name}</h2>
          <p className="text-gray-600 text-sm mt-1">{restaurant.location}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">${(getCartTotal() * 0.1).toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={clearCart}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50"
        >
          Clear Cart
        </motion.button>
        <Link to="/checkout" className="flex-grow">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 bg-rose-500 text-white rounded-md font-medium hover:bg-rose-600"
          >
            Proceed to Checkout
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}

export default Cart
