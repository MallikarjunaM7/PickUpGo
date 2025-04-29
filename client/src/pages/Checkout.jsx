"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Clock } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

const Checkout = () => {
  const { cartItems, restaurant, getCartTotal, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickupTime: "",
    paymentMethod: "cash",
  })

  useEffect(() => {
    // Pre-fill form with user data if authenticated
    if (isAuthenticated && user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.name || prevData.name,
        phone: user.phone || prevData.phone,
      }))
    }
  }, [isAuthenticated, user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Order submitted:", { items: cartItems, restaurant, customer: formData })
    clearCart()
    navigate("/order-confirmation")
  }

  // Generate pickup time options (every 15 minutes for the next 3 hours)
  const generatePickupTimes = () => {
    const times = []
    const now = new Date()
    const startTime = new Date(now.getTime() + 30 * 60000) // Start 30 minutes from now

    for (let i = 0; i < 12; i++) {
      // 12 slots = 3 hours
      const time = new Date(startTime.getTime() + i * 15 * 60000)
      const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      times.push(formattedTime)
    }

    return times
  }

  const pickupTimes = generatePickupTimes()

  if (cartItems.length === 0) {
    navigate("/cart")
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex items-center mb-6">
        <Link to="/cart" className="flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Cart
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Your Order</h2>

            {restaurant && (
              <div className="mb-4">
                <h3 className="font-medium">{restaurant.name}</h3>
                <p className="text-gray-600 text-sm">{restaurant.location}</p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between py-2">
                  <span className="text-gray-700">
                    {item.quantity} × {item.name}
                  </span>
                  <span className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${(getCartTotal() * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-medium">
                <span>Total</span>
                <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                />
              </div>

              <div>
                <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="pickupTime"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                  >
                    <option value="">Select a pickup time</option>
                    {pickupTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">Payment Method</span>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleChange}
                      className="h-4 w-4 text-rose-500 focus:ring-rose-500 border-gray-300"
                    />
                    <label htmlFor="cash" className="ml-2 text-gray-700">
                      Pay at Pickup (Cash)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                      className="h-4 w-4 text-rose-500 focus:ring-rose-500 border-gray-300"
                    />
                    <label htmlFor="card" className="ml-2 text-gray-700">
                      Pay at Pickup (Card)
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-3 bg-rose-500 text-white rounded-md font-medium hover:bg-rose-600"
              >
                Place Order
              </motion.button>
            </div>

            {!isAuthenticated && (
              <div className="mt-4 text-center text-sm text-gray-500">
                <Link to="/login" className="text-rose-500 hover:text-rose-600">
                  Sign in
                </Link>{" "}
                or{" "}
                <Link to="/register" className="text-rose-500 hover:text-rose-600">
                  create an account
                </Link>{" "}
                to save your details for future orders.
              </div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default Checkout
